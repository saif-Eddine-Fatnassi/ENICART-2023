from typing import Optional

from pydantic import BaseModel


class FitnetActivity(BaseModel):
    contract_id: str
    activity_id: int
    type_of_service_id: Optional[int]
    collaborator: str
    daily_price: float
    days_worked: float
    total_charges: float


def fitnet_activity_from_data(data) -> FitnetActivity:

    matching = {
        "contract_id": str(data["contractId"]),
        "activity_id": data["id"],
        "collaborator": data["collaborator"],
        "daily_price": data["dailyPrice"],
        "days_worked": data["effectiveCharge"],
        "type_of_service": data["typeOfWorkRealised"],
        "total_charges": data["dailyPrice"] * data["effectiveCharge"]
    }

    return FitnetActivity(**matching)
