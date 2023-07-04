from functools import cache
from motor.motor_asyncio import AsyncIOMotorClient
from models.contract import FitnetContract

CONTRACTS_TEXT_SEARCH_FIELDS = [
    'contract_id',
    'company',
    'creator',
    'customer_name',
    'customer_code',
    'status',
    'title'
]


async def create_search_index(db: AsyncIOMotorClient,
                              contract: FitnetContract) -> None:
    ngrams_set = set()

    for attr, value in contract.__dict__.items():
        if attr in CONTRACTS_TEXT_SEARCH_FIELDS and value is not None:
            ngrams = generate_ngrams(value)
            ngrams_set.update(ngrams)

    search_string = " ".join(ngrams_set).lower()

    search_dict = {
        "contract_id": contract.contract_id,
        "ngrams_string": search_string
    }

    await db["contracts_search"].update_one({"contract_id": contract.contract_id},
                                                     {'$set': {**search_dict}}, True)

    return


@cache
def generate_ngrams(string, lower_bound=3):
    ngrams_set = set()
    for length in range(lower_bound, len(string)+1):
        ngrams_set.update(([string[i:i + length] for i in range(len(string) - length + 1)]))

    return ngrams_set

