from motor.motor_asyncio import AsyncIOMotorClient

from models.document import Document
from crud.contracts_search import generate_ngrams

DOCUMENTS_TEXT_SEARCH_FIELDS = [
    'contract_name',
    'creator',
    'summary',
    'projectName',
    'name',
    'year',
    'domain',
    'type'
]


async def update_search_index(db: AsyncIOMotorClient,
                              document: Document) -> None:
    ngrams_set = set()

    for attr, value in document.__dict__.items():
        if attr in DOCUMENTS_TEXT_SEARCH_FIELDS and value is not None:
            ngrams = generate_ngrams(value)
            ngrams_set.update(ngrams)

    search_string = " ".join(ngrams_set).lower()

    search_dict = {
        "document_id": document.document_id,
        "ngrams_string": search_string
    }

    await db["documents_search"].update_one({"document_id": document.document_id},
                                            {'$set': {**search_dict}}, True)

    return


async def delete_search_index(db, document_id):
    await db["documents_search"].delete_one({"document_id": document_id})
    return None