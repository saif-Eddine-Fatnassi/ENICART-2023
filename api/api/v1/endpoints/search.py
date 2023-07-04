from fastapi import APIRouter, Depends, Path
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

from crud import search
from db.mongodb import get_database
from models.contract import FitnetContract
from models.document import Document

router = APIRouter()


@router.get("/", response_model=list, status_code=status.HTTP_200_OK)
async def search_documents_and_contracts(db: AsyncIOMotorClient = Depends(get_database),
                                         keywords: str = ""):
    """
    :param db: Async Database client
    :param keywords: parameters of the search
    :return: Returns the query for both contracts and documents
    """
    return await search.search_documents_and_contracts(db, keywords)


@router.get("/documents", response_model=list[Document], status_code=status.HTTP_200_OK)
async def search_documents(db: AsyncIOMotorClient = Depends(get_database),
                           keywords: str = ""):
    """

    :param db: Async Database client
    :param keywords: parameters of the search
    :return: Returns the query for documents
    """
    return await search.search_documents(db, keywords=keywords)


@router.get("/contracts", response_model=list[FitnetContract], status_code=status.HTTP_200_OK)
async def search_contracts(db: AsyncIOMotorClient = Depends(get_database),
                           keywords: str = ""):
    """
    :param db: Async Database client
    :param keywords: parameters of the search
    :return: Returns the query for contracts
    """
    return await search.search_contracts(db, keywords)
