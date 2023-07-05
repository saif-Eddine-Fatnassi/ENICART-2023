from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger

from core.exceptions import raise_404, raise_500
from models.document import NewDocument, Document, document_from_row
from crud import documents_search


async def create_document(db: AsyncIOMotorClient,
                          new_document: NewDocument) -> Document:
    result = await db["documents"].insert_one(new_document.dict())
    document = new_document.with_id(result.inserted_id)
    await documents_search.update_search_index(db, document)
    return document


async def read_document(db: AsyncIOMotorClient,
                        document_id: str) -> Document:
    result = await db["documents"].find_one({"_id": ObjectId(document_id)})
    if result is not None:
        return document_from_row(result)
    else:
        raise_404()


async def read_all_documents(db: AsyncIOMotorClient) -> list[Document]:
    documents: list[Document] = []
    result = db["documents"].find({})
    for row in await result.sort([("_id", -1)]).to_list(length=100000):
        documents.append(document_from_row(row))

    return documents


async def update_document(db: AsyncIOMotorClient,
                          document_id: str,
                          updated_document: NewDocument) -> Document:
    result = await db["documents"].replace_one({"_id": ObjectId(document_id)},
                                               dict(updated_document))
    if result.modified_count > 0:
        document = await read_document(db, document_id)
        await documents_search.update_search_index(db, document)
        return document
    else:
        raise_404()


async def delete_document(db: AsyncIOMotorClient,
                          document_id: str) -> ():
    result = await db["documents"].delete_one({"_id": ObjectId(document_id)})
    if result.deleted_count > 0:
        await documents_search.delete_search_index(db, document_id)
        return
    else:
        raise_404()


async def get_associated_documents(db: AsyncIOMotorClient,
                                   document_id: str) -> list[Document]:
    documents: list[Document] = []
    document = await read_document(db, document_id)

    result = db["documents"].find({
        "contract_id": document.contract_id,
        "_id": {"$ne": ObjectId(document_id)}}
    ).sort([("_id", -1)])

    for row in await result.to_list(length=100):
        documents.append(document_from_row(row))

    return documents


async def read_documents_by_contract(db: AsyncIOMotorClient, contract_id: str) -> list[Document]:
    documents: list[Document] = []
    result = db["documents"].find({"contract_id": contract_id}).sort([("_id", -1)])

    for row in await result.to_list(length=200):
        documents.append(document_from_row(row))

    return documents


async def read_documents_pagination(db: AsyncIOMotorClient,
                                    skip: int,
                                    limit: int) -> list[Document]:
    try:
        logger.error(limit)
        result = await db["documents"].find({}).sort([("_id", -1)]).skip(skip).to_list(length=1)
        return [document_from_row(row) for row in result]
    except Exception as e:
        logger.error(e)
        raise_500()


async def get_all_keywords(db: AsyncIOMotorClient) -> list[str]:
    documents = await read_all_documents(db)
    keywords = set()
    for doc in documents:
        keywords.update(doc.keywords)

    return list(keywords)
