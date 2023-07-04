from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from models.utils.PydanticObjectId import PydanticObjectId


class NewMetadata(BaseModel):
    group: str
    value: str

    def with_id(self, inserted_id):
        return Metadata(metadata_id=inserted_id, **dict(self))


class Metadata(NewMetadata):
    """Class describing a metadata stored in DB."""
    metadata_id: PydanticObjectId


def metadata_from_row(row):
    return Metadata(metadata_id=row["_id"], **row)
