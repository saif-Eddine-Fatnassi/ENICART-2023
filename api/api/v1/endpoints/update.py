from fastapi import APIRouter, Depends, Path
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

import crud
from crud import update_time, fitnet
from db.mongodb import get_database
from models.update_date import NewUpdateDate

router = APIRouter()


@router.post("/", response_model=NewUpdateDate, status_code=status.HTTP_202_ACCEPTED)
async def update(db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :return: Updates the database with the last contracts and assignments, and returns the new ones
    """

    await crud.fitnet.fetch_all_contracts(db)
    await crud.fitnet.fetch_all_activities(db)
    await crud.fitnet.calculate_activities_by_contract(db)

    return await crud.update_time.insert_update(db)


@router.get("/datetime", status_code=status.HTTP_200_OK)
async def get_update_time(db: AsyncIOMotorClient = Depends(get_database)):
    """
    :param db: Async Database client
    :return: Returns the datetime of the last update
    """
    return await crud.update_time.get_last_update(db)


@router.post("/datetime", status_code=status.HTTP_200_OK)
async def set_update_time(db: AsyncIOMotorClient = Depends(get_database)):
    """
    :param db: Async Database client
    :return: Returns the datetime of the last update
    """
    return await crud.update_time.insert_update(db)
