from datetime import datetime

from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger
from models.update_date import NewUpdateDate, DBUpdateDate, UpdateDate


async def get_last_update(db: AsyncIOMotorClient) -> UpdateDate:
    result = await db["updates"].find_one(sort=[("_id", -1)])

    if result is None:
        return UpdateDate(update_datetime=datetime.strptime("01/01/2015", '%d/%m/%Y'))

    return DBUpdateDate(**result)


async def insert_update(db: AsyncIOMotorClient) -> NewUpdateDate:
    new_timestamp = NewUpdateDate()

    result = await db["updates"].insert_one(new_timestamp.dict())
    if result is None:
        logger.error("Failed to insert update.")

    return new_timestamp
