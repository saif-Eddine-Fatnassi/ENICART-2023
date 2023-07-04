from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger

from core.exceptions import raise_404, raise_500
from models.metadata import NewMetadata, Metadata, metadata_from_row


async def create_metadata(db: AsyncIOMotorClient,
                          new_metadata: NewMetadata) -> Metadata:
    result = await db["metadata"].insert_one(new_metadata.dict())
    return new_metadata.with_id(result.inserted_id)


async def read_metadata(db: AsyncIOMotorClient,
                        metadata_id: str) -> Metadata:
    result = await db["metadata"].find_one({"_id": ObjectId(metadata_id)})
    if result is not None:
        return metadata_from_row(result)
    else:
        raise_404()


async def read_all_metadata(db: AsyncIOMotorClient) -> list[Metadata]:
    metadata: list[Metadata] = []
    result = db["metadata"].find({})
    for row in await result.sort([("_id", -1)]).to_list(length=100000):
        metadata.append(metadata_from_row(row))

    return metadata


async def update_metadata(db: AsyncIOMotorClient,
                          metadata_id: str,
                          updated_metadata: NewMetadata) -> Metadata:
    result = await db["metadata"].replace_one({"_id": ObjectId(metadata_id)},
                                              dict(updated_metadata))
    if result.modified_count > 0:
        return await read_metadata(db, metadata_id)
    else:
        raise_404()


async def delete_metadata(db: AsyncIOMotorClient,
                          metadata_id: str) -> ():
    result = await db["metadata"].delete_one({"_id": ObjectId(metadata_id)})
    if result.deleted_count > 0:
        return
    else:
        raise_404()

async def delete_group(db: AsyncIOMotorClient,
                          group: str) -> ():
    result = await db["metadata"].delete_many({"group": group})
    if result.deleted_count > 0:
        return
    else:
        raise_404()

async def update_group(db : AsyncIOMotorClient,
                       group : str,
                       newGroup : str) -> None:
    result = await db["metadata"].update_many(
        {"group": group },
        {
            "$set": { "group" : newGroup }
        }
    )
    if result.modified_count > 0:
        return
    else:
        raise_404()

