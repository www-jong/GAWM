from PIL import Image
import io
import boto3
from fastapi import HTTPException
from dotenv import load_dotenv
import os
import asyncio, io, boto3, os,httpx
load_dotenv()


def resize_image(image: Image.Image, max_size: tuple = (512, 512)) -> Image.Image:
    original_width, original_height = image.size
    ratio = min(max_size[0] / original_width, max_size[1] / original_height)
    
    new_width = int(original_width * ratio)
    new_height = int(original_height * ratio)

    resized_image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    return resized_image


#omnicommers에 이미지 업로드
async def submit_product_info(product_id,image_url):
    data = {
        "products": [
            {
                "id": product_id,
                "url": image_url,
                "salesUrl": "https://sales_url.com",
                "detection": "AUTO_DETECT"
            }
        ]
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(
            os.getenv("OMNICOMMERS_URL")+"management/products",
            headers={
                "X-Api-Key": os.getenv("OMNICOMMERS_MANAGEMENT_KEY"),
                "Content-Type": "application/json"
            },
            json=data
        )
        return response
    
    #옴니커머스 대기코드
async def check_status_until_done(product_id, attempts=20, delay=2):
    OMNICOMMERS_URL=os.getenv("OMNICOMMERS_URL")
    url = f"{OMNICOMMERS_URL}management/status/{product_id}"
    headers = {"X-Api-Key": os.getenv("OMNICOMMERS_MANAGEMENT_KEY")}

    async with httpx.AsyncClient() as client:
        for _ in range(attempts):
            response = await client.get(url, headers=headers)
            if response.status_code == 200:
                status_data = response.json()
                print(status_data)
                if status_data.get("status") == "DONE":
                    return status_data  
            print('조회실패, 재시도',response)
            await asyncio.sleep(delay)  
    return {"error": "Status check attempts exceeded or failed."}

async def get_tagging_info(product_id,lang="KO"):
    OMNICOMMERS_URL=os.getenv("OMNICOMMERS_URL")
    url = f"{OMNICOMMERS_URL}tagging/tags/{product_id}"
    headers = {
        "X-Api-Key": os.getenv("OMNICOMMERS_TAGGING_KEY"),
        "Content-Type": "application/json",
        "Accept-Language": lang
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers)
        if response.status_code in [200,201]:
            return response.json()
        else:
            return {"error": "Failed to get tagging information."}
        

def resize_image(image, max_size=(512, 512)):
    original_width, original_height = image.size
    ratio = min(max_size[0] / original_width, max_size[1] / original_height)
    
    new_width = int(original_width * ratio)
    new_height = int(original_height * ratio)

    resized_image = image.resize((new_width, new_height), Image.Resampling.LANCZOS)
    return resized_image


def get_tagging_dto(tagging_info):
    response={}
    try:
        tagging_info=tagging_info['matchedObjects'][0]['tags'][0]
        print(tagging_info)
        data={}
        data['m_category']=tagging_info['category']['name']
        data['s_category']=tagging_info['item']['name']
        data['colors']=[color['name'] for color in tagging_info['colors']]
        data['patterns']=[color['name'] for color in tagging_info['prints']]
        data['materials']=[color['name'] for color in tagging_info['textures']]
        response={
            "status":200,
            "data":data
        }
    except Exception as e:
        response = {
            "status" : 500,
            "name" :  str(e),
            "message" : "S3 오류"
            }
    return response