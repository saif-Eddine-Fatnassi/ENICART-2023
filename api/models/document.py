from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from models.utils.PydanticObjectId import PydanticObjectId


class NewDocument(BaseModel):
    contract_id: str
    contract_name: str
    name: str
    domain: str
    customer: str
    type: str
    year: str
    date: datetime
    version: Optional[str]
    sequentialNumber: Optional[int]
    extension: str
    projectName: str
    creator: str
    creationDate: datetime
    summary: str
    url: Optional[str]
    metadata: list[str]
    keywords: list[str]

    def with_id(self, inserted_id):
        return Document(document_id=inserted_id, **dict(self))


class Document(NewDocument):
    """Class describing a document stored in DB."""
    document_id: PydanticObjectId


def document_from_row(row):
    return Document(document_id=row["_id"], **row)
