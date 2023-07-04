import time

from starlette.exceptions import HTTPException

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.requests import Request
from starlette.status import HTTP_422_UNPROCESSABLE_ENTITY

from api.v1.api import api_router
from core.config import API_V1_STR
from core.errors import http_error_handler, http_422_error_handler
from db.mongodb_utils import connect_to_mongo, close_mongo_connection

app = FastAPI(title="agd_api")


@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.add_event_handler("startup", connect_to_mongo)


app.add_event_handler("shutdown", close_mongo_connection)

app.add_exception_handler(HTTPException, http_error_handler)
app.add_exception_handler(HTTP_422_UNPROCESSABLE_ENTITY, http_422_error_handler)

app.include_router(api_router, prefix=API_V1_STR)
