import aiomysql
import asyncio
import os
DB_CONFIG = {
    'host': os.getenv("MARIADB_HOST"),
    'port':int(os.getenv("MARIADB_PORT")),
    'user': os.getenv("MARIADB_USER"),
    'password': os.getenv("MARIADB_PASSWORD"),
    'db': os.getenv("MARIADB_DB")
}

async def colors_tag_get():
    async with aiomysql.create_pool(**DB_CONFIG) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute("SELECT * FROM colors_tag")
                tags = await cur.fetchall()
                return tags

async def patterns_tag_get():
    async with aiomysql.create_pool(**DB_CONFIG) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute("SELECT * FROM patterns_tag") 
                tags = await cur.fetchall()
                return tags

async def materials_tag_get():
    async with aiomysql.create_pool(**DB_CONFIG) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor(aiomysql.DictCursor) as cur:
                await cur.execute("SELECT * FROM materials_tag")
                tags = await cur.fetchall()
                return tags

async def colors_tag_add(data):
    async with aiomysql.create_pool(**DB_CONFIG) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                for i in data:
                    # 해당 name이 존재하는지 확인
                    name=i['name']
                    colorCode=i['colorCode']
                    await cur.execute("SELECT COUNT(*) FROM colors_tag WHERE name = %s", (name,))
                    (count,) = await cur.fetchone()
                    
                    # name이 존재하지 않으면 새로운 데이터 삽입
                    if count == 0:
                        await cur.execute("INSERT INTO colors_tag (colorCode, name) VALUES (%s, %s)", (colorCode, name))
                        print(f"Inserted: {colorCode}, {name}")
                    else:
                        print(f"Exists, skipped: {name}")
                
                await conn.commit()  # 변경사항 커밋

async def patterns_tag_add(data):
    async with aiomysql.create_pool(**DB_CONFIG) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                for i in data:
                    # 해당 name이 존재하는지 확인
                    name=i['name']
                    await cur.execute("SELECT COUNT(*) FROM patterns_tag WHERE name = %s", (name,))
                    (count,) = await cur.fetchone()
                    
                    # name이 존재하지 않으면 새로운 데이터 삽입
                    if count == 0:
                        await cur.execute("INSERT INTO patterns_tag (name) VALUES (%s)", (name))
                        print(f"Inserted:  {name}")
                    else:
                        print(f"Exists, skipped: {name}")
                
                await conn.commit()  # 변경사항 커밋

async def materials_tag_add(data):
    async with aiomysql.create_pool(**DB_CONFIG) as pool:
        async with pool.acquire() as conn:
            async with conn.cursor() as cur:
                for i in data:
                    # 해당 name이 존재하는지 확인
                    name=i['name']
                    await cur.execute("SELECT COUNT(*) FROM materials_tag WHERE name = %s", (name,))
                    (count,) = await cur.fetchone()
                    
                    # name이 존재하지 않으면 새로운 데이터 삽입
                    if count == 0:
                        await cur.execute("INSERT INTO materials_tag (name) VALUES (%s)", (name))
                        print(f"Inserted:  {name}")
                    else:
                        print(f"Exists, skipped: {name}")
                
                await conn.commit()  # 변경사항 커밋