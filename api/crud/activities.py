from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger

import crud
from core.exceptions import raise_500
from crud import contracts
from models.activity import FitnetActivity


async def insert_multiple_activities(db: AsyncIOMotorClient,
                                      activities: list[FitnetActivity]):

    activities_dict = list(map(dict, activities))
    # res = await db["activities"].update_many(activities_dict, {"upsert": True})
    for activity in activities_dict:
        await db["activities"].update_one({"activity_id": activity["activity_id"]}, {'$set': {**activity}}, True)


async def get_activities(db: AsyncIOMotorClient,
                          contract_id: int) -> list[FitnetActivity]:

    await crud.contracts.check_contract_existence(db, contract_id)
    try:
        result = await db["activities"].find({"contract_id": contract_id}).to_list(length=100000)
        return [FitnetActivity(**row) for row in result]
    except Exception as e:
        logger.error(e)
        raise_500()
