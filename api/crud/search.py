from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger

from core.exceptions import raise_404, raise_500
from models.contract import FitnetContract
from models.document import NewDocument, Document, document_from_row
from crud import documents, contracts

TEXT = "$text"
SEARCH = "$search"


async def search_documents(db: AsyncIOMotorClient, keywords: str) -> list[Document]:
    try:
        res = await db["documents_search"].find(
            {TEXT: {SEARCH: keywords}},
            {"score": {"$meta": "textScore"}}
        ).sort([("score", {"$meta": "textScore"})]).to_list(length=5)

        found_ids = [row["document_id"] for row in res]
        found_documents = list()
        print(found_ids)

        for id in found_ids:
            doc = await documents.read_document(db, id)
            found_documents.append(doc)

        return found_documents
    except Exception as e:
        logger.error(e)
        raise_500()


async def search_contracts(db: AsyncIOMotorClient, keywords: str) -> list[FitnetContract]:
    try:
        res = await db["contracts_search"].find(
            {TEXT: {SEARCH: keywords}},
            {"score": {"$meta": "textScore"}}
        ).sort([("score", {"$meta": "textScore"})]).to_list(length=5)

        found_ids = [row["contract_id"] for row in res]
        found_contracts = list()
        for id in found_ids:
            contract = await contracts.get_contract(db, id)
            found_contracts.append(contract)

        return found_contracts
    except Exception as e:
        logger.error(e)
        raise_500()


async def search_documents_and_contracts(db: AsyncIOMotorClient, keywords: str) -> list[any]:
    search_result = list()

    try:
        search_result.extend(await search_documents(db, keywords))
    except error:
        logger.error(e)

    try:
        search_result.extend(await search_contracts(db, keywords))

    except error:
        logger.error(e)

    return search_result

