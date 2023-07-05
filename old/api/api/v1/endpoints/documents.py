from fastapi import APIRouter, Depends, Path, Body
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

from db.mongodb import get_database
import crud.documents
from models.document import Document, NewDocument

router = APIRouter()


@router.get("/", response_model=list[Document], status_code=status.HTTP_200_OK)
async def get_all_documents(db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :return: The list of all stored documents
    """
    return await crud.documents.read_all_documents(db)


@router.get("/paginated/", response_model=list[Document], status_code=status.HTTP_200_OK)
async def get_documents_paginated(db: AsyncIOMotorClient = Depends(get_database),
                                  skip: int = 0,
                                  limit: int = 100):
    """

    :param db: Async Database client
    :param skip
    :param limit
    :return: The specified document if it exists
    """
    return await crud.documents.read_documents_pagination(db, skip, limit)


@router.get("/{document_id}", response_model=Document, status_code=status.HTTP_200_OK)
async def get_document(db: AsyncIOMotorClient = Depends(get_database),
                       document_id: str = Path(None)):
    """

    :param db: Async Database client
    :param document_id: the id identifying the document to retrieve.
    :return: The specified document if it exists
    """
    return await crud.documents.read_document(db, document_id)


@router.post("/", response_model=Document, status_code=status.HTTP_201_CREATED)
async def create_document(db: AsyncIOMotorClient = Depends(get_database),
                          new_document: NewDocument = Body(None)):
    """

    :param db: Async Database client
    :param new_document: the document data
    :return: The specified document if it exists
    """
    return await crud.documents.create_document(db, new_document)


@router.put("/{document_id}", response_model=Document, status_code=status.HTTP_200_OK)
async def update_document(db: AsyncIOMotorClient = Depends(get_database),
                          document_id: str = Path(None),
                          updated_document: NewDocument = Body(None)):
    """

    :param db: Async Database client
    :param document_id: the id identifying the document to retrieve.
    :param updated_document: the document data
    :return: The specified document if it exists
    """
    return await crud.documents.update_document(db, document_id, updated_document)


@router.delete("/{document_id}", response_model=None, status_code=status.HTTP_200_OK)
async def delete_document(db: AsyncIOMotorClient = Depends(get_database),
                          document_id: str = Path(None)):
    """

    :param db: Async Database client
    :param document_id: the id identifying the document to delete.
    :return: The specified document if it exists
    """
    return await crud.documents.delete_document(db, document_id)


@router.get("/associated/{document_id}", response_model=list[Document], status_code=status.HTTP_200_OK)
async def get_associated_documents(db: AsyncIOMotorClient = Depends(get_database),
                                   document_id: str = Path(None)):
    """

    :param db: Async Database client
    :param document_id: the id identifying the document which similar ones we search.
    :return: The specified document if it exists
    """
    return await crud.documents.get_associated_documents(db, document_id)


@router.get("/byContract/{contract_id}", response_model=list[Document], status_code=status.HTTP_200_OK)
async def get_documents_by_contract(db: AsyncIOMotorClient = Depends(get_database),
                                    contract_id: str = Path(None)):
    """

    :param db: Async Database client
    :param contract_id: the id identifying the contract for which we want the documents.
    :return: The documents if contract exists
    """
    return await crud.documents.read_documents_by_contract(db, contract_id)


@router.get("/keywords/", response_model=list[str], status_code=status.HTTP_200_OK)
async def get_all_keywords(db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :return: All the keywords present in the database
    """
    return await crud.documents.get_all_keywords(db)
