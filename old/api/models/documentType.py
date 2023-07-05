from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from models.utils.PydanticObjectId import PydanticObjectId


class NewDocumentType(BaseModel):
    key: str
    isInVersion: bool
    value: str

    def with_id(self, inserted_id):
        return DocumentType(document_type_id=inserted_id, **dict(self))


class DocumentType(NewDocumentType):
    """Class describing a document type stored in DB."""
    document_type_id: PydanticObjectId


def document_type_from_row(row):
    return DocumentType(document_type_id=row["_id"], **row)
