from datetime import datetime
from pydantic import BaseModel
from models.utils import PydanticObjectId


class UpdateDate(BaseModel):
    update_datetime: datetime

    def to_string(self, **kwargs):
        return self.update_datetime.strftime("%d-%m-%Y")

    def add_years(self, nb_years):
        new_datetime = self.update_datetime
        return UpdateDate(update_datetime=new_datetime.replace(year=new_datetime.year + nb_years))


class DBUpdateDate(UpdateDate):
    """Class describing an UpdateDate stored in DB."""
    _id: PydanticObjectId


class NewUpdateDate(UpdateDate):
    update_datetime = datetime.now()
