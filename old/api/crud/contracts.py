from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.config import logger

import crud.documents
from core.exceptions import raise_404, raise_500
from models.contract import FitnetContract


async def get_contract(db: AsyncIOMotorClient, contract_id: str) -> FitnetContract:
    result = await db["contracts"].find_one({"contract_id": contract_id})
    print(result)
    if result is None:
        raise_404()
    else:
        return FitnetContract(**result)


async def get_all_contracts(db: AsyncIOMotorClient) -> list[FitnetContract]:
    try:
        result = await db["contracts"].find({}).sort([("contract_id", -1)]).to_list(length=10000)
        return [FitnetContract(**row) for row in result]
    except Exception as e:
        logger.error(e)
        raise_500()


async def insert_multiple_contracts(db: AsyncIOMotorClient,
                                    contracts: list[FitnetContract]):
    contracts_dict = list(map(dict, contracts))
    for contract in contracts_dict:
        await db["contracts"].update_one({"contract_id": contract["contract_id"]}, {'$set': {**contract}}, True)


async def modify_contract(db: AsyncIOMotorClient,
                          contract_id: str,
                          values: dict) -> FitnetContract:
    try:
        await db["contracts"].update_one({"contract_id": contract_id}, {'$set': {**values}}, False)
        return await get_contract(db, contract_id=contract_id)
    except Exception as e:
        logger.error(e)
        raise_500()


async def check_contract_existence(db: AsyncIOMotorClient,
                                   contract_id: str) -> ():
    """
    Checks if the contract exists, raises a 404 if not, passes otherwise.
    :param db: mongo database
    :param contract_id: The contract to check
    :return:
    """
    if (await db["contracts"].find_one({'contract_id': contract_id})) is None:
        raise_404()
    else:
        return


async def read_contracts_pagination(db: AsyncIOMotorClient,
                                    skip: int,
                                    limit: int) -> list[FitnetContract]:
    try:
        result = await db["contracts"].find().sort([("contract_id", -1)]).skip(skip).to_list(length=limit)
        return [FitnetContract(**row) for row in result]
    except Exception as e:
        logger.error(e)
        raise_500()


async def set_metadatas_from_documents(db: AsyncIOMotorClient,
                                       contract_id: str) -> FitnetContract:
    """
    Gathers all the metadatas from the associated documents, and puts them in the contract info.
    :param db: mongo database
    :param contract_id: The contract to get
    :return: The modified contract
    """

    associated_docs = await crud.documents.read_documents_by_contract(db, contract_id)

    metadatas = set()

    for doc in associated_docs:
        metadatas.update(doc.metadata)

    contract = await modify_contract(
        db,
        contract_id,
        {"metadata": list(metadatas)}
    )

    return contract
