from fastapi import APIRouter, Depends, Path, Body
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

from db.mongodb import get_database
import crud.documentsTypes
from models.documentType import DocumentType, NewDocumentType

router = APIRouter()


@router.get("/", response_model=list[DocumentType], status_code=status.HTTP_200_OK)
async def get_all_documents_types(db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :return: The list of all stored documents types
    """
    return await crud.documentsTypes.read_all_documents_types(db)


@router.get("/{document_type_id}", response_model=DocumentType, status_code=status.HTTP_200_OK)
async def get_document_type(db: AsyncIOMotorClient = Depends(get_database),
                            document_type_id: str = Path(None)):
    """

    :param db: Async Database client
    :param document_type_id: the id identifying the document type to retrieve.
    :return: The specified document type if it exists
    """
    return await crud.documentsTypes.read_document_type(db, document_type_id)


@router.post("/", response_model=DocumentType, status_code=status.HTTP_201_CREATED)
async def create_document_type(db: AsyncIOMotorClient = Depends(get_database),
                               new_document_type: NewDocumentType = Body(None)):
    """

    :param db: Async Database client
    :param new_document_type: the document type data
    :return: The specified document type if it exists
    """
    return await crud.documentsTypes.create_document_type(db, new_document_type)


@router.put("/{document_type_id}", response_model=DocumentType, status_code=status.HTTP_200_OK)
async def update_document_type(db: AsyncIOMotorClient = Depends(get_database),
                               document_type_id: str = Path(None),
                               updated_document_type: NewDocumentType = Body(None)):
    """

    :param db: Async Database client
    :param document_type_id: the id identifying the document type to retrieve.
    :param updated_document_type: the document type data
    :return: The specified document if it exists
    """
    return await crud.documentsTypes.update_document_type(db, document_type_id, updated_document_type)


@router.delete("/{document_type_id}", response_model=None, status_code=status.HTTP_200_OK)
async def delete_document_type(db: AsyncIOMotorClient = Depends(get_database),
                               document_type_id: str = Path(None)):
    """

    :param db: Async Database client
    :param document_type_id: the id identifying the document type to delete.
    :return: The specified document type if it exists
    """
    return await crud.documentsTypes.delete_document_type(db, document_type_id)
