from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger

from core.exceptions import raise_404, raise_500
from models.documentType import NewDocumentType, DocumentType, document_type_from_row


async def create_document_type(db: AsyncIOMotorClient,
                               new_document_type: NewDocumentType) -> DocumentType:
    result = await db["documentsTypes"].insert_one(new_document_type.dict())
    return new_document_type.with_id(result.inserted_id)


async def read_document_type(db: AsyncIOMotorClient,
                             document_type_id: str) -> DocumentType:
    result = await db["documentsTypes"].find_one({"_id": ObjectId(document_type_id)})
    if result is not None:
        return document_type_from_row(result)
    else:
        raise_404()


async def read_all_documents_types(db: AsyncIOMotorClient) -> list[DocumentType]:
    documents_types: list[DocumentType] = []
    result = db["documentsTypes"].find({})
    for row in await result.sort([("_id", -1)]).to_list(length=100000):
        documents_types.append(document_type_from_row(row))

    return documents_types


async def update_document_type(db: AsyncIOMotorClient,
                               document_type_id: str,
                               updated_document_type: NewDocumentType) -> DocumentType:
    result = await db["documentsTypes"].replace_one({"_id": ObjectId(document_type_id)},
                                                    dict(updated_document_type))
    if result.modified_count > 0:
        return await read_document_type(db, document_type_id)
    else:
        raise_404()


async def delete_document_type(db: AsyncIOMotorClient,
                               document_type_id: str) -> ():
    result = await db["documentsTypes"].delete_one({"_id": ObjectId(document_type_id)})
    if result.deleted_count > 0:
        return
    else:
        raise_404()
