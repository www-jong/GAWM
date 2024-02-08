import os
from PIL import Image, ImageDraw
from transformers import pipeline
import psutil
import numpy as np

# 이미지 처리 파이프라인 초기화
pipe = pipeline("object-detection", model="./classifi_model")

def generate_image(size):
    """
    지정된 크기의 단색 이미지를 생성합니다.
    """
    image = Image.new("RGB", (size, size), color="red")
    return image

def monitor_resources():
    """
    현재 CPU와 메모리 사용량을 반환합니다.
    """
    cpu_usage = psutil.cpu_percent()
    memory_usage = psutil.virtual_memory().percent
    return cpu_usage, memory_usage

def check_overload(cpu_threshold=90, memory_threshold=90):
    """
    오버로드 조건을 검사합니다.
    """
    cpu_usage, memory_usage = monitor_resources()
    return cpu_usage > cpu_threshold or memory_usage > memory_threshold

def find_overload_point(start_size=256, max_size=4096, step=32):
    """
    오버로드가 발생하는 이미지 크기를 찾습니다.
    """
    for size in range(start_size, max_size + step, step):
        image = generate_image(size)
        try:
            # 이미지 처리
            pipe(image)
        except Exception as e:
            print(f"Error processing image of size {size}: {e}")
            break

        if check_overload():
            print(f"Overload detected at image size {size}x{size}")
            return size
        
        print(f"Image size {size}x{size} processed successfully.")

    return None

overload_point = find_overload_point()
if overload_point:
    print(f"Overload point detected at image size {overload_point}x{overload_point}.")
else:
    print("No overload point detected within the given size range.")