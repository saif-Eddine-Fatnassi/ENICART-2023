import json
import logging
from collections import Counter, defaultdict
from datetime import datetime
from typing import Final, Any

import aiohttp

from motor.motor_asyncio import AsyncIOMotorClient
from uvicorn.main import logger

from crud import contracts, activities, update_time, contracts_search
from core import config
from models.activity import fitnet_activity_from_data, FitnetActivity
from models.contract import fitnet_contract_from_data


async def fetch_fitnet(url: str) -> Any:
    AUTH_HEADER: Final[dict] = {'Authorization': config.FITNET_CREDENTIALS}

    async with aiohttp.ClientSession() as session:
        async with session.get(url=url, headers=AUTH_HEADER) as response:
            html = await response.text()
            if response.status == 200:
                return json.loads(html)
            else:
                response.raise_for_status()


async def fetch_all_contracts(db: AsyncIOMotorClient):

    last_update = await update_time.get_last_update(db)
    end_date = datetime.now()
    end_date = end_date.replace(year=end_date.year + 1).strftime("%d-%m-%Y")

    for company_id in config.FITNET_COMPANY_IDS:
        url = config.FITNET_BASE_URL + f"/contracts/readByDates/{str(company_id)}/{last_update.to_string()}/{end_date}"
        print(url)
        try:
            result = await fetch_fitnet(url)
            fetched_contracts = [fitnet_contract_from_data(row) for row in result]

            for contract in fetched_contracts:
                await contracts_search.create_search_index(db, contract)
            await contracts.insert_multiple_contracts(db, fetched_contracts)
        except Exception as e:
            logging.error(e)
            logging.error(f"Fetching all contracts from Fitnet failed for company {company_id}.")


async def fetch_all_activities(db: AsyncIOMotorClient):
    last_update = await update_time.get_last_update(db)
    today = datetime.now().strftime("%d-%m-%Y")

    for company_id in config.FITNET_COMPANY_IDS:

        url = config.FITNET_BASE_URL + f"/activities/getActivitiesOnContract/{str(company_id)}/{last_update.to_string()}/{today}"
        print(url)
        try:
            result = await fetch_fitnet(url)
            fetched_activities = [fitnet_activity_from_data(row) for row in result]
            if len(fetched_activities) != 0:
                await activities.insert_multiple_activities(db, fetched_activities)


        except Exception as e:
            logging.error(e)
            logging.error(
                f"Fetching all activities from Fitnet failed for company {company_id}, date - {today}")


async def get_contract(contract_id: str):
    async with aiohttp.ClientSession() as session:
        url = config.FITNET_BASE_URL + f"/contracts/read/{contract_id}"
        async with session.get(url=url) as response:

            print("Status:", response.status)

            html = await response.text()
            print("Body:", html, "...")

            if response.status == 200:
                return json.loads(html)
            else:
                response.raise_for_status()


def calculate_activities_count(activities_list) -> Counter:
    ids_list = []
    for activity in activities_list:
        ids_list.append(activity.contract_id)

    return Counter(ids_list)


def calculate_activities_sales(activities_list) -> defaultdict:
    sales_dict = defaultdict(float)
    for activity in activities_list:
        sales_dict[activity.contract_id] += activity.total_charges

    return sales_dict


async def update_count_and_sales(db, activities_count, activities_sales):
    for contract_id in activities_count.keys():
        total_values = {
           "total_charges": activities_sales[contract_id],
           "total_days": activities_count[contract_id]
        }
        await contracts.modify_contract(db, str(contract_id), total_values)


async def calculate_activities_by_contract(db: AsyncIOMotorClient):

    activities_list: list[FitnetActivity] = []
    result = db["activities"].find({})
    for row in await result.to_list(length=100000):
        activities_list.append(FitnetActivity(**row))

    activities_count = calculate_activities_count(activities_list)
    activities_sales = calculate_activities_sales(activities_list)
    await update_count_and_sales(db, activities_count, activities_sales)
