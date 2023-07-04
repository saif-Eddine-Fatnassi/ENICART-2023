from fastapi import APIRouter

from api.v1.endpoints import documents, assignments, update, contracts, search, metadata, documentsTypes

api_router = APIRouter()
api_router.include_router(
    contracts.router, prefix="/contracts", tags=["contracts"])
api_router.include_router(
    assignments.router, prefix="/assignments", tags=["assignments"])
api_router.include_router(update.router, prefix="/update", tags=["update"])
api_router.include_router(
    documents.router, prefix="/documents", tags=["documents"])
api_router.include_router(search.router, prefix="/search", tags=["search"])
api_router.include_router(
    metadata.router, prefix="/metadata", tags=["metadata"])
api_router.include_router(
    documentsTypes.router, prefix="/documentsTypes", tags=["documentsTypes"])
