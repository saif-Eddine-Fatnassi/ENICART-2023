from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger
import json

from .mongodb import db

from core.config import (
    DB_NAME,
    MONGO_USER,
    MONGO_PASS,
    MONGO_HOST,
    MONGO_PORT,
    MAX_CONNECTIONS_COUNT,
    MIN_CONNECTIONS_COUNT,
    FILEPATH_DOCUMENTS_TYPES,
    FILEPATH_METADATAS
)


async def connect_to_mongo():
    #MONGODB_URL = "mongodb://" + MONGO_USER + ":" + MONGO_PASS + "@" + MONGO_HOST + ":" + MONGO_PORT
    MONGODB_URL = "mongodb://" + MONGO_HOST + ":" + MONGO_PORT
    logger.info("Connection to MongoDB database @ " + MONGO_HOST + " ...")
    db.client = AsyncIOMotorClient(str(MONGODB_URL),
                                   maxPoolSize=MAX_CONNECTIONS_COUNT,
                                   minPoolSize=MIN_CONNECTIONS_COUNT)[DB_NAME]
    logger.info("Connection to " + MONGO_HOST + " successful.")

    create_indexes(db.client)
    logger.info("Indexes created.")

    await fill_initial_metadata(db.client)
    logger.info("Initial metadatas inserted in base.")


async def close_mongo_connection():
    logger.warning("Closing MongoDB connection ...")
    db.client.close()
    logger.info("Connection closed ！")


def create_indexes(db):

    logger.info("Creation of mongodb indexes ...")

    db.documents.create_index([('contract_id', 1)], name='documents_contract_id_index', default_language='french')
    db.documents.create_index([('contract_name', "text"),
                               ('creator', "text"),
                               ('summary', "text"),
                               ('techniques', "text"),
                               ('projectName', "text"),
                               ('name', "text"),
                               ('functionalDomain', "text"),
                               ('year', "text"),
                               ('domain', "text"),
                               ('type', "text"),
                               ], name='documents_search_index', default_language='french')
    db.documents_search.create_index([('ngrams_string', "text")], name='documents_partial_search_index', default_language='french')

    db.contracts.create_index([('contract_id', 1)], name='contract_id_index')
    db.contracts.create_index([('contract_id', "text"),
                               ('company', "text"),
                               ('creator', "text"),
                               ('customer_name', "text"),
                               ('customer_code', "text"),
                               ('status', "text"),
                               ('title', "text")
                               ], name='contracts_search_index', default_language='french')
    db.contracts_search.create_index([('ngrams_string', "text")], name='contracts_partial_search_index', default_language='french')


async def fill_initial_metadata(db):

    logger.info("Insertion of initial metadatas ...")

    with open(FILEPATH_DOCUMENTS_TYPES) as documents_types:
        list_types = json.load(documents_types)
        for document_type in list_types:
            await db["documentsTypes"].update_one(
                {"key":  document_type["key"]},
                {"$set": dict(document_type)},
                upsert=True
            )

    with open(FILEPATH_METADATAS) as metadatas:
        list_metadatas = json.load(metadatas)
        for metadata in list_metadatas:
            await db["metadata"].update_one(
                {"group":  metadata["group"], "value": metadata["value"]},
                {"$set": dict(metadata)},
                upsert=True
            )