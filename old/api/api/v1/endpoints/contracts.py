from fastapi import APIRouter, Depends, Path
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

from core.exceptions import raise_400
from db.mongodb import get_database
import crud.contracts
from models.contract import FitnetContract
from models.document import Document

router = APIRouter()


@router.get("/", response_model=list[FitnetContract], status_code=status.HTTP_200_OK)
async def get_all_contracts(db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :return: The list of all stored contracts
    """
    return await crud.contracts.get_all_contracts(db)


@router.get("/{contract_id}", response_model=FitnetContract, status_code=status.HTTP_200_OK)
async def get_contract(db: AsyncIOMotorClient = Depends(get_database),
                       contract_id: str = Path(None)):
    """

    :param db: Async Database client
    :param contract_id: the id identifying the contract to retrieve.
    :return: The specified contract if it exists
    """
    try:
        return await crud.contracts.get_contract(db, contract_id)
    except ValueError:
        raise_400()


@router.get("/paginated/", response_model=list[FitnetContract], status_code=status.HTTP_200_OK)
async def get_all_contracts_paginated(db: AsyncIOMotorClient = Depends(get_database),
                                      skip: int = 0,
                                      limit: int = 100):
    """

    :param db: Async Database client
    :return: The list of all stored contracts
    """
    return await crud.contracts.read_contracts_pagination(db, skip, limit)


@router.post("/metadatas/{contract_id}", response_model=FitnetContract, status_code=status.HTTP_200_OK)
async def set_metadatas_from_documents(db: AsyncIOMotorClient = Depends(get_database),
                                       contract_id: str = Path(None)):
    """

    :param db: Async Database client
    :param contract_id: the contract to modify
    :return: The list of all stored contracts
    """
    return await crud.contracts.set_metadatas_from_documents(db, contract_id=contract_id)
