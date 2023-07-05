import os

VERBOSE = True

# Main app config
API_V1_STR = "/v1"
PROJECT_NAME = "AGD"

# DB config
DB_NAME = "agd"
MONGO_USER = None#"root"
MONGO_PASS = None#"ZuperPassword"
MONGO_HOST = os.getenv("MONGO_HOST", "localhost")
MONGO_PORT = "27017"
MAX_CONNECTIONS_COUNT = 10
MIN_CONNECTIONS_COUNT = 5

# Environnement
ENV = os.getenv('DEPLOYMENT_ENV')

# Fitnet
FITNET_BASE_URL = "https://bialx.fitnetmanager.com/FitnetManager/rest"
FITNET_CREDENTIALS = "Basic aW5mcmFAYmlhbC14LmNvbTpUaWMmVGFjNjk="
FITNET_COMPANY_IDS = [1, 2]
FITNET_QUERIES_FIRST_YEAR = 2015

# Metadata filesize
FILEPATH_DOCUMENTS_TYPES = "./json/documentsTypes.json"
FILEPATH_METADATAS = "./json/metadata.json"
