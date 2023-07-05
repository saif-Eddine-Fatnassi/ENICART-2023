const ApiPath = process.env.REACT_APP_API_PATH

//* ******************** Skeleton ************************* //

export const ADD_BREADCRUMB = "ADD_BREADCRUMB"
export const addBreadcrumb = (payload) => {
  return { type: ADD_BREADCRUMB, payload }
}

export const SET_LOADING = "SET_LOADING"
export const setLoading = (payload) => {
  return { type: SET_LOADING, payload }
}

export const SET_LOADING_DATABASE = "SET_LOADING_DATABASE"
export const setLoadingDatabase = (payload) => {
  return { type: SET_LOADING_DATABASE, payload }
}

export const SET_NAVBAR = "SET_NAVBAR"
export const setNavbar = (payload) => {
  return { type: SET_NAVBAR, payload }
}

//* ******************** database ************************* //
export const UPDATE = "UPDATE"
export const update = () => async (dispatch) => {
  let error = null
  try {
    await fetch(`${ApiPath}update`, {
      method: "POST",
    })
  } catch (err) {
    error = `An error has occured: ${err.toString()}`
  }
  dispatch({
    type: UPDATE,
    payload: error,
  })
  return { type: SET_LOADING, payload: true }
}

export const GET_UPDATE_TIME = "GET_UPDATE_TIME"
export const getUpdateTime = () => async (dispatch) => {
  let payload = null
  try {
    const response = await fetch(`${ApiPath}update/datetime`)
    payload = await response.json()
    payload = payload.update_datetime.substr(0, 16)
  } catch (error) {
    payload = `An error has occured: ${error.toString()}`
  }
  dispatch({
    type: GET_UPDATE_TIME,
    payload,
  })
  return { type: SET_LOADING, payload: true }
}

//* ******************** Contract ************************* //

export const UPDATE_ALL_CONTRACTS = "UPDATE_ALL_CONTRACTS"
export const updateAllContracts = () => async (dispatch) => {
  const contracts = { error: "", data: [] }
  try {
    const response = await fetch(`${ApiPath}contracts`)
    if (!response.ok) {
      contracts.error = `An error has occured: ${response.status}`
    } else {
      contracts.data = await response.json()
    }
  } catch (error) {
    contracts.error = `An error has occured: ${error.toString()}`
  }
  dispatch({
    type: UPDATE_ALL_CONTRACTS,
    payload: contracts,
  })
}

//* ******************** Metadata ************************* //
export const UPDATE_ALL_METADATA = "UPDATE_ALL_METADATA"
export const updateAllMetadata = () => async (dispatch) => {
  const metadata = { error: "", data: [] }
  try {
    const metadataResponse = await fetch(`${ApiPath}metadata`)
    if (!metadataResponse.ok) {
      metadata.error = `An error has occured: ${metadataResponse.status}`
    } else {
      const metadataJson = await metadataResponse.json()
      const metadataDocumentsTypes = await fetch(`${ApiPath}documentsTypes`)
      if (!metadataDocumentsTypes.ok) {
        metadata.error = `An error has occured: ${metadataDocumentsTypes.status}`
      } else {
        const documentsTypesJson = await metadataDocumentsTypes.json()
        metadata.data = { metadata: metadataJson, documentsTypes: documentsTypesJson }
      }
    }
  } catch (error) {
    metadata.error = `An error has occured: ${error.toString()}`
  }
  dispatch({ type: UPDATE_ALL_METADATA, payload: metadata })
}

export const UPDATE_METADATA = "UPDATE_METADATA"
export const updateMetadata = (payload) => {
  // L'appel à l'API ce fait avant
  return { type: UPDATE_METADATA, payload }
}

export const DELETE_METADATA = "DELETE_METADATA"
export const deleteMetadata = (payload) => {
  // L'appel à l'API ce fait avant
  return { type: DELETE_METADATA, payload }
}

export const ADD_METADATA = "ADD_METADATA"
export const addMetadata = (payload) => {
  // L'appel à l'API ce fait avant
  return { type: ADD_METADATA, payload }
}

export const EDIT_GROUP = "EDIT_GROUP"
export const editGroup = (payload) => {
  // L'appel à l'API ce fait avant
  return { type: EDIT_GROUP, payload }
}

export const DELETE_GROUP = "DELETE_GROUP"
export const deleteGroup = (payload) => {
  // L'appel à l'API ce fait avant
  return { type: DELETE_GROUP, payload }
}

//* ******************** Documents ************************* //
export const UPDATE_ALL_DOCUMENTS = "UPDATE_ALL_DOCUMENTS"
export const updateAllDocuments = () => async (dispatch) => {
  const documents = { error: "", data: [] }
  try {
    const response = await fetch(`${ApiPath}documents`)
    if (!response.ok) {
      documents.error = `An error has occured: ${response.status}`
    } else {
      documents.data = await response.json()
    }
  } catch (error) {
    documents.error = `An error has occured: ${error.toString()}`
  }
  dispatch({
    type: UPDATE_ALL_DOCUMENTS,
    payload: documents,
  })
}

export const ADD_DOCUMENT = "ADD_DOCUMENT"
export const addDocument = (payload) => {
  // L'appel à l'API ce fait avant
  return { type: ADD_DOCUMENT, payload }
}

export const DELETE_DOCUMENT = "DELETE_DOCUMENT"
export const deleteDocument = (id) => async (dispatch) => {
  let error = ""
  try {
    const response = await fetch(`${ApiPath}documents/${id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      error = `An error has occured: ${response.error}`
    }
  } catch (err) {
    error = `An error has occured: ${err.toString()}`
  }
  dispatch({
    type: DELETE_DOCUMENT,
    payload: { error, id },
  })
  return { type: SET_LOADING, payload: true }
}

export const UPDATE_DOCUMENT = "UPDATE_DOCUMENT"
export const updateDocument = (payload) => {
  return { type: UPDATE_DOCUMENT, payload }
}

//* ******************** Init ************************ //
export const INIT_ALL = "INIT_ALL"
export const initAll = () => async (dispatch) => {
  const metadata = { error: "", data: [] }
  const documents = { error: "", data: [] }
  const contracts = { error: "", data: [] }
  let updateTime = null
  try {
    const metadataResponse = await fetch(`${ApiPath}metadata`)
    if (!metadataResponse.ok) {
      metadata.error = `An error has occured: ${metadataResponse.status}`
    } else {
      const metadataJson = await metadataResponse.json()
      const metadataDocumentsTypes = await fetch(`${ApiPath}documentsTypes`)
      if (!metadataDocumentsTypes.ok) {
        metadata.error = `An error has occured: ${metadataDocumentsTypes.status}`
      } else {
        const documentsTypesJson = await metadataDocumentsTypes.json()
        metadata.data = { metadata: metadataJson, documentsTypes: documentsTypesJson }
        const documentResponse = await fetch(`${ApiPath}documents`)
        if (!documentResponse.ok) {
          documents.error = `An error has occured: ${documentResponse.status}`
        } else {
          documents.data = await documentResponse.json()
          const contractResponse = await fetch(`${ApiPath}contracts`)
          if (!contractResponse.ok) {
            contracts.error = `An error has occured: ${contractResponse.status}`
          } else {
            contracts.data = await contractResponse.json()
            const UpdateTimeResponse = await fetch(`${ApiPath}update/datetime`)
            updateTime = await UpdateTimeResponse.json()
            updateTime = updateTime.update_datetime.substr(0, 16)
          }
        }
      }
    }
  } catch (error) {
    metadata.error = `An error has occured: ${error.toString()}`
    documents.error = `An error has occured: ${error.toString()}`
    contracts.error = `An error has occured: ${error.toString()}`
    updateTime = `An error has occured: ${error.toString()}`
  }
  dispatch({ type: INIT_ALL, payload: { metadata, documents, contracts, updateTime } })
}

export const UPDATE_FILTER_CONTRACT = "UPDATE_FILTER_CONTRACT"
export const updateFilterContract = (payload) => {
  return { type: UPDATE_FILTER_CONTRACT, payload }
}

export const UPDATE_FILTER_DOCUMENT = "UPDATE_FILTER_DOCUMENT"
export const updateFilterDocument = (payload) => {
  return { type: UPDATE_FILTER_DOCUMENT, payload }
}


//* ******************** Keywords ************************* //

export const GET_ALL_KEYWORDS = "GET_ALL_KEYWORDS"
export const getAllKeywords = () => async (dispatch) => {
  const keywords = { error: "", data: [] }
  try {
    const response = await fetch(`${ApiPath}documents/keywords/`)
    if (!response.ok) {
      keywords.error = `An error has occured: ${response.status}`
    } else {
      keywords.data = await response.json()
    }
  } catch (error) {
    keywords.error = `An error has occured: ${error.toString()}`
  }
  dispatch({
    type: GET_ALL_KEYWORDS,
    payload: keywords,
  })
}

//* ******************** Contract metadata ************************* //

export const SET_METADATA_FROM_DOCUMENTS = "SET_METADATA_FROM_DOCUMENTS"
export const setMetadatasFromDocuments = (contractId) => async (dispatch) => {
  const contract = { error: "", data: [], "contractId": contractId}
  try {
    const response = await fetch(`${ApiPath}contracts/metadatas/${contractId}`, {
      method: "POST",
    })
    if (!response.ok) {
      contract.error = `An error has occured: ${response.status}`
    } else {
      contract.data = await response.json()
    }
  } catch (error) {
    contract.error = `An error has occured: ${error.toString()}`
  }
  dispatch({
    type: SET_METADATA_FROM_DOCUMENTS,
    payload: contract,
  })
}

