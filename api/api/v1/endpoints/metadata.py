from fastapi import APIRouter, Depends, Path, Body
from motor.motor_asyncio import AsyncIOMotorClient
from starlette import status

from db.mongodb import get_database
import crud.metadata
from models.metadata import Metadata, NewMetadata

router = APIRouter()


@router.get("/", response_model=list[Metadata], status_code=status.HTTP_200_OK)
async def get_all_metadata(db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :return: The list of all stored metadata
    """
    return await crud.metadata.read_all_metadata(db)


@router.get("/{metadata_id}", response_model=Metadata, status_code=status.HTTP_200_OK)
async def get_metadata(db: AsyncIOMotorClient = Depends(get_database),
                       metadata_id: str = Path(None)):
    """

    :param db: Async Database client
    :param metadata_id: the id identifying the metadata to retrieve.
    :return: The specified metadata if it exists
    """
    return await crud.metadata.read_metadata(db, metadata_id)


@router.post("/", response_model=Metadata, status_code=status.HTTP_201_CREATED)
async def create_metadata(db: AsyncIOMotorClient = Depends(get_database),
                          new_metadata: NewMetadata = Body(None)):
    """

    :param db: Async Database client
    :param newmetadata: the metadata data
    :return: The specified metadata if it exists
    """
    return await crud.metadata.create_metadata(db, new_metadata)

@router.put("/update_group", status_code=status.HTTP_200_OK)
async def update_group(group: str,
                       newGroup: str, 
                       db: AsyncIOMotorClient = Depends(get_database)):
    """

    :param db: Async Database client
    :param group: the old group.
    :param newGroup: the new group
    """ 
    return await crud.metadata.update_group(db, group, newGroup)

@router.put("/{metadata_id}", response_model=Metadata, status_code=status.HTTP_200_OK)
async def update_metadata(db: AsyncIOMotorClient = Depends(get_database),
                          metadata_id: str = Path(None),
                          updated_metadata: NewMetadata = Body(None)):
    """

    :param db: Async Database client
    :param metadata_id: the id identifying the metadata to retrieve.
    :param updated_metadata: the metadata data
    :return: The specified metadata if it exists
    """
    return await crud.metadata.update_metadata(db, metadata_id, updated_metadata)

@router.delete("/delete_group/{group}", response_model=None, status_code=status.HTTP_200_OK)
async def delete_group(db: AsyncIOMotorClient = Depends(get_database),
                          group: str = Path(None)):
    """

    :param db: Async Database client
    :param group: the group identifying the metadata to delete.
    :return: The specified metadata if it exists
    """
    return await crud.metadata.delete_group(db, group)

@router.delete("/{metadata_id}", response_model=None, status_code=status.HTTP_200_OK)
async def delete_metadata(db: AsyncIOMotorClient = Depends(get_database),
                          metadata_id: str = Path(None)):
    """

    :param db: Async Database client
    :param metadata_id: the id identifying the metadata to delete.
    :return: The specified metadata if it exists
    """
    return await crud.metadata.delete_metadata(db, metadata_id)
