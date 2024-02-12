from contextlib import asynccontextmanager
from fastapi import FastAPI
from PIL import Image
from rembg import remove,new_session
from starlette.middleware.cors import CORSMiddleware
import asyncio, sys, io, uvicorn, os, uuid
from contextlib import asynccontextmanager
from fastapi import File, UploadFile, APIRouter
from fastapi.responses import JSONResponse,StreamingResponse
from PIL import Image
import asyncio, sys, io, uvicorn, os,datetime
from dotenv import load_dotenv
from transformers import pipeline
from math import sqrt
from util.image_util import check_status_until_done,get_tagging_dto,resize_image,submit_product_info,get_tagging_info
from util.s3_util import upload_file_to_s3
from starlette.exceptions import HTTPException as StarletteHTTPException

load_dotenv()

model_directory = "./classifi_model"
if not os.path.exists(model_directory):
    os.makedirs(model_directory)  # 디렉토리가 없으면 생성
model_files = os.listdir(model_directory)

if sys.platform == "win32":
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

@asynccontextmanager
async def app_lifespan(app: FastAPI):
    # 시작시 rembg 로드하기
    print("Loading rembg model...")
    dummy_image = Image.new("RGB", (10, 10), color="red")
    dummy_bytes = io.BytesIO()
    dummy_image.save(dummy_bytes, format="PNG")
    app.state.rembg_session = new_session(model_name="u2netp")
    if len(model_files):
        app.state.classifi_model=pipeline("object-detection", model="./classifi_model")
    else:
        print('model download')
        model=pipeline("object-detection", model="valentinafeve/yolos-fashionpedia")
        model.save_pretrained(model_directory)
        app.state.classifi_model=model
    remove(dummy_bytes.getvalue())
    print("AI Model Loaded")
    yield
    print("종료")

app = FastAPI(lifespan=app_lifespan)
prefix_router = APIRouter(prefix="/gawm/ai")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],# 배포시, 프론트로 도메인바꾸기
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
session=''

@prefix_router.get("/healthcheck")
async def root():
    return {"message": "Server On"}

def calculate_distance(box_center, image_center):
    return sqrt((box_center[0] - image_center[0]) ** 2 + (box_center[1] - image_center[1]) ** 2)

@prefix_router.post("/masking/")
async def masking_image(image_file: UploadFile = File(...)):
    try:
        image_bytes = await image_file.read()
        image_pil = Image.open(io.BytesIO(image_bytes))
        resized_image = resize_image(image_pil, max_size=(512, 512))
        buf = io.BytesIO()
        resized_image.save(buf, format='PNG')
        output_image_bytes = buf.getvalue()

        output_image_bytes = remove(image_bytes,session=app.state.rembg_session)
        return StreamingResponse(io.BytesIO(output_image_bytes), media_type="image/png")
    except Exception as e:
        return JSONResponse(status_code=500, content={"status":500,"message": "이미지 처리 중 오류가 발생했습니다.", "error": str(e)})

#omnicommers에 업로드
@prefix_router.post("/tag/upload/")
async def upload_image(image_file: UploadFile = File(...)):
    try:
        file_uuid=uuid.uuid4()
        extension = image_file.filename.split(".")[-1]
        file_name = f"{file_uuid}.{extension}"
        s3_response = await upload_file_to_s3(file=image_file,file_name=file_name)
        if s3_response['status']==200:
            result = await submit_product_info(product_id=str(file_uuid),image_url=s3_response["data"]["url"])
            print(result.json())
            if result.status_code in [200,202]:
                print('done')
                return JSONResponse(status_code=200, content={"status":200,"data": {"uuid":str(file_uuid),"file_name":file_name}})
            else:
                return JSONResponse(status_code=500, content={"status":500,"name":"error","message": "이미지 저장 중 오류가 발생했습니다. :"+result})
        else:
            return s3_response
    except Exception as e:
        return JSONResponse(status_code=500, content={"status":500,"name":"error","message": "이미지 저장 중 오류가 발생했습니다. :"+str(e)})

#omnicommers에서 태그가져오기
@prefix_router.post("/tag/get/{product_id}")
async def past_tagging(product_id: str):
    if not product_id:
        raise JSONResponse(status_code=400, content={"status":500,"name":"error","message": "product_id가 없습니다. :"})
    status_response = await check_status_until_done(product_id)# 등록완료되었는지 조회
    print('옷 처리결과',status_response)
    if status_response.get("status") == "DONE":
        tagging_info = await get_tagging_info(product_id)# 완료되었을 경우 태그값 조회
        response=get_tagging_dto(tagging_info)
        return JSONResponse(status_code=200,content=response)
    else:
        return JSONResponse(status_code=500, content={"status":500,"name":"error","message": "태깅정보 조회중 오류가 발생했습니다. :"})


@prefix_router.post("/tagging/")
async def upload_image(image_file: UploadFile = File(...)):
    extension = image_file.filename.split(".")[-1]
    file_uuid=uuid.uuid4()
    file_name = f"{file_uuid}.{extension}"
    result = await upload_file_to_s3(file=image_file,file_name=file_name)
    print(result)
    if result['status']==200:
        image_url = result['data']["url"]
        product_id = datetime.datetime.now().strftime("%Y%m%d%H%M%S%f")[:-4]
        response = await submit_product_info(product_id,image_url)#옴니커머스 옷 등록
        if response.status_code in [200,202]:
            print('등록완')
            status_response = await check_status_until_done(product_id)# 등록완료되었는지 조회
            print('옷 처리결과',status_response)
            if status_response.get("status") == "DONE":
                #print('태그조회완')
                tagging_info = await get_tagging_info(product_id)# 완료되었을 경우 태그값 조회
                return tagging_info
            else:
                return JSONResponse(status_code=500, content={"status":500,"name":"error","message": "태깅정보 조회 중 오류가 발생했습니다."})
        else:
            return JSONResponse(status_code=500, content={"status":500,"name":"error","message": "옷 등록 중 오류가 발생했습니다."})
    else:
        return result

@prefix_router.post("/test/")
async def test(image_file: UploadFile = File(...)):
    image_bytes = await image_file.read()
    image = Image.open(io.BytesIO(image_bytes))
    image = resize_image(image)
    result=app.state.classifi_model(image)
    image_center = (image.width/2,image.height/2)
    objects_with_distance = []
    for obj in result:
        box_center = ((obj['box']['xmin'] + obj['box']['xmax']) / 2, (obj['box']['ymin'] + obj['box']['ymax']) / 2)
        distance = calculate_distance(box_center, image_center)
        objects_with_distance.append({
            "label": obj['label'],
            "score": round(obj['score'] * 100, 2),  # 점수를 백분율로 변환
            "distance": distance
        })
    objects_sorted_by_distance = sorted(objects_with_distance, key=lambda x: x['distance'])
    return objects_sorted_by_distance

@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request, exc):
    if exc.status_code == 404:
        return JSONResponse(
            status_code=404,
            content={"status":exc.status_code,"message": "요청하신 페이지를 찾을 수 없습니다.", "error": "Not Found"},
        )
    # 다른 상태 코드에 대한 기본 처리
    return JSONResponse(
        status_code=exc.status_code,
        content={"status":exc.status_code,"message": exc.detail,"error": "Not Found"},
    )

if __name__ == "__main__":
    app.include_router(prefix_router)
    uvicorn.run(app, host="0.0.0.0", port=8000)
