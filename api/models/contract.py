from datetime import datetime, date
from typing import Optional

from pydantic import BaseModel


class DBContract(BaseModel):
    """Class describing a contract stored in DB."""
    id: str


class FitnetContract(BaseModel):
    contract_id: str
    title: str
    customer_name: str
    customer_code: Optional[str]
    affected_commercials: list[dict]
    affected_project_managers: Optional[list[dict]]
    company: str
    begin_date: datetime
    end_date: datetime
    billing_date: Optional[datetime]
    status: str
    creator: Optional[str]
    total_charges: Optional[float]
    total_days: Optional[float]
    metadata: Optional[list[str]]

    def __getitem__(self, name):
        return getattr(self, name)


def fitnet_contract_from_data(data) -> FitnetContract:
    matching = {
        "contract_id": str(data["contractId"]),
        "title": data["title"],
        "customer_name": data["customerName"],
        "affected_commercials": data["affectedCommercialsList"],
        "affected_project_managers": data["affectedProjectManagerList"],
        "company": data["companyName"],
        "begin_date": datetime.strptime(data["beginDate"], '%d/%m/%Y'),
        "end_date": datetime.strptime(data["endDate"], '%d/%m/%Y'),
        "billing_date": None if data["billingDate"] is None else datetime.strptime(data["billingDate"], '%d/%m/%Y'),
        "status": data["statusName"],
        "creator": data["contractCreator"]
    }

    return FitnetContract(**matching)
