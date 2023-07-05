from starlette import status
from starlette.exceptions import HTTPException


def raise_400():
    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Bad request or parameters.")


def raise_404():
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Could not find resource.")


def raise_424():
    raise HTTPException(status_code=status.HTTP_424_FAILED_DEPENDENCY, detail="Failed resource insertion.")


def raise_500():
    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Internal Server Error.")