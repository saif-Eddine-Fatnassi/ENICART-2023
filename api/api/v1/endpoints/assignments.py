from fastapi import APIRouter, Depends, Path
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

import crud
from core.exceptions import raise_400
from crud import activities
from db.mongodb import get_database
from models.activity import FitnetActivity

router = APIRouter()


@router.get("/{contract_id}", response_model=list[FitnetActivity], status_code=status.HTTP_200_OK)
async def get_activities(db: AsyncIOMotorClient = Depends(get_database),
                         contract_id: str = Path(None)):
    """

    :param contract_id: the id of the contract whose assignments we fetch
    :param db: Async Database client
    :return: The list of all stored assignments for said contract
    """
    try:
        int_contract_id = int(contract_id)
        return await crud.activities.get_activities(db, int_contract_id)
    except ValueError:
        raise_400()
