from PIL import Image
import io
import boto3
from dotenv import load_dotenv
import os,uuid
import asyncio, io, boto3, os,httpx
from fastapi.responses import JSONResponse
from fastapi import File, UploadFile
from .image_util import resize_image
load_dotenv()

# S3 클라이언트 설정
s3_client = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
)

async def upload_file_to_s3(file: UploadFile = File(...), file_name: str = None):
    response=''
    try:
        if file_name is None:
            extension = file.filename.split(".")[-1]
            file_name = f"{uuid.uuid4()}.{extension}"
        file_content = await file.read()
        if not file_content:
            raise JSONResponse(status_code=400, content={"message": "파일이 없습니다."})
        # 파일 컨텐츠를 PIL 이미지로 변환하고 리사이즈
        image = Image.open(io.BytesIO(file_content))
        resized_image = resize_image(image)

        # 리사이즈된 이미지를 바이트로 변환
        img_byte_arr = io.BytesIO()
        resized_image.save(img_byte_arr, format=image.format)
        img_byte_arr = img_byte_arr.getvalue()
        print(os.getenv("AWS_BUCKET_NAME"))
        s3_client.put_object(
            Bucket=os.getenv("AWS_BUCKET_NAME"), Key=file_name, Body=img_byte_arr, ACL="public-read"
        )
        file_url = f"https://{os.getenv('AWS_BUCKET_NAME')}.s3.{os.getenv('AWS_REGION_NAME')}.amazonaws.com/{file_name}"
        print(file_url)
        response= {"status": 200, "data": {"url":str(file_url)}}
    except Exception as e:
        response = {
            "status" : 500,
            "name" :  str(e),
            "message" : "S3 오류"
            }
    print(response)
    return response

