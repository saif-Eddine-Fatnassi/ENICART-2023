import {
  ADD_BREADCRUMB,
  SET_LOADING,
  SET_NAVBAR,
  UPDATE_ALL_CONTRACTS,
  UPDATE_ALL_METADATA,
  UPDATE_ALL_DOCUMENTS,
  DELETE_DOCUMENT,
  UPDATE_DOCUMENT,
  ADD_DOCUMENT,
  UPDATE,
  GET_UPDATE_TIME,
  UPDATE_METADATA,
  ADD_METADATA,
  DELETE_METADATA,
  SET_LOADING_DATABASE,
  INIT_ALL,
  UPDATE_FILTER_CONTRACT,
  UPDATE_FILTER_DOCUMENT,
  EDIT_GROUP,
  DELETE_GROUP,
  GET_ALL_KEYWORDS,
  SET_METADATA_FROM_DOCUMENTS,
} from "../actions/index"
import { stringSimplfier } from "../../utils/fitler"

const initialState = {
  navbar: "",
  breadcrumb: [],
  loading: false,
  loadingDatabase: false,
  contracts: {
    error: "",
    data: [],
    filter: { commercials: [], projectManagers: [], creator: [], company: [] },
  },
  metadata: {
    documentsTypes: [],
    others: {},
    error: "",
  },
  documents: {
    error: "",
    data: [],
  },
  updateTime: "",
  filter: {
    document: undefined,
    contract: undefined,
  },
  keywords: {
    error: "",
    data: [],
  },
}

const getFilterContractOptions = (payload) => {
  // Filter
  const commercials = []
  const projectManagers = []
  const creator = []
  const company = []
  if (payload.data) {
    payload.data.map((data) => {
      if (data.affected_commercials) {
        data.affected_commercials.map(
          (item) => item !== [] && !commercials.find((elem) => elem.employeeId === item.employeeId) && commercials.push(item)
        )
      }
      if (data.affected_project_managers) {
        data.affected_project_managers.map(
          (item) =>
            item !== [] &&
            !projectManagers.find((elem) => elem.employeeId === item.employeeId) &&
            projectManagers.push({ ...item, company: data.company })
        )
      }
      if (data.creator && !creator.find((elem) => stringSimplfier(data.creator) === stringSimplfier(elem))) {
        creator.push(data.creator.trim())
      }
      if (data.company && !company.find((elem) => stringSimplfier(data.company) === stringSimplfier(elem))) {
        company.push(data.company.trim())
      }
    })
  }

  const projectManagersTmp = []
  projectManagers.map((man) => {
    const exist = projectManagersTmp.find((elem) => stringSimplfier(elem.fullName) === stringSimplfier(man.fullName))
    if (!exist) {
      projectManagersTmp.push({ fullName: man.fullName, employeeId: [man.employeeId] })
    } else {
      exist.employeeId.push(man.employeeId)
    }
  })

  return {
    commercials: commercials.sort((a, b) => a.fullName.trim().localeCompare(b.fullName.trim())),
    projectManagers: projectManagersTmp.sort((a, b) => a.fullName.trim().localeCompare(b.fullName.trim())),
    creator: creator.sort((a, b) => a.trim().localeCompare(b.trim())),
    company: company.sort((a, b) => a.trim().localeCompare(b.trim())),
  }
}

const orderMetadata = (data) => {
  const result = {}
  data.map((item) => {
    const isExist = result[item.group]
    if (isExist) {
      result[item.group].push(item)
    } else {
      result[item.group] = [item]
    }
  })

  // sort values
  Object.keys(result).map((key) => result[key].sort((a, b) => a.value.trim().localeCompare(b.value.trim())))

  const sortedResult = {}
  // sort key
  Object.keys(result)
    .sort((a, b) => a.trim().localeCompare(b.trim()))
    .map((key) => {
      sortedResult[key] = result[key]
    })

  return sortedResult
}

const quotes = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    //* ******************** Skeleton ************************* //
    case ADD_BREADCRUMB:
      if (action.payload.reset) {
        return {
          ...state,
          breadcrumb: [...action.payload.data],
        }
      }
      return {
        ...state,
        breadcrumb: [...state.breadcrumb, ...action.payload.data],
      }
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      }
    case SET_LOADING_DATABASE:
      return {
        ...state,
        loadingDatabase: action.payload,
      }
    case SET_NAVBAR:
      return {
        ...state,
        navbar: action.payload,
      }
    //* ******************** database ************************* //
    case UPDATE:
      return {
        ...state,
        loadingDatabase: false,
      }
    case GET_UPDATE_TIME:
      return {
        ...state,
        updateTime: action.payload,
        loading: false,
      }
    //* ******************** Contract ************************* //

    case UPDATE_ALL_CONTRACTS:
      return {
        ...state,
        contracts: {
          error: action.payload.error,
          data: action.payload.data,
          filter: getFilterContractOptions(action.payload),
        },
        loading: false,
      }
    //* ******************** Metadata ************************* //

    case UPDATE_ALL_METADATA: {
      let metadata = {}
      if (action.payload.error !== "") {
        metadata = {
          documentsTypes: [],
          others: {},
          error: action.payload.error,
        }
      } else {
        const documentsTypes = []
        action.payload.data.documentsTypes.map((obj) => {
          documentsTypes.push({ group: "documentsTypes", ...obj })
        })
        metadata = {
          documentsTypes: documentsTypes.sort((a, b) => a.key.trim().localeCompare(b.key.trim())),
          others: orderMetadata(action.payload.data.metadata),
          error: "",
        }
      }

      return {
        ...state,
        metadata,
        loading: false,
      }
    }
    case UPDATE_METADATA: {
      if (!action.payload.group) {
        const index = state.metadata.documentsTypes.findIndex((type) => type.document_type_id === action.payload.document_type_id)
        const array = [...state.metadata.documentsTypes]
        array[index] = { group: "documentsTypes", ...action.payload }
        return {
          ...state,
          metadata: { ...state.metadata, documentsTypes: array },
        }
      }
      const index = state.metadata.others[action.payload.group].findIndex(
        (type) => type.metadata_id === action.payload.metadata_id
      )
      const array = [...state.metadata.others[action.payload.group]]
      array[index] = action.payload
      const others = { ...state.metadata.others }
      others[action.payload.group] = array
      return {
        ...state,
        metadata: { ...state.metadata, others },
      }
    }
    case ADD_METADATA: {
      if (!action.payload.group) {
        return {
          ...state,
          metadata: {
            ...state.metadata,
            documentsTypes: [{ group: "documentsTypes", ...action.payload }, ...state.metadata.documentsTypes],
          },
        }
      }
      const others = { ...state.metadata.others }
      if (others[action.payload.group]) {
        others[action.payload.group] = [action.payload, ...others[action.payload.group]]
      } else {
        others[action.payload.group] = [action.payload]
      }
      return {
        ...state,
        metadata: { ...state.metadata, others },
      }
    }
    case DELETE_METADATA: {
      if (!action.payload.group) {
        return {
          ...state,
          metadata: {
            ...state.metadata,
            documentsTypes: [...state.metadata.documentsTypes.filter((item) => item.document_type_id !== action.payload.id)],
          },
        }
      }
      const others = { ...state.metadata.others }
      others[action.payload.group] = [...others[action.payload.group].filter((item) => item.metadata_id !== action.payload.id)]
      return {
        ...state,
        metadata: { ...state.metadata, others },
      }
    }
    case EDIT_GROUP: {
      const others = { ...state.metadata.others }
      const newObj = {}
      Object.keys(others).map((key) => {
        if (key !== action.payload.group) {
          newObj[key] = others[key]
        } else {
          newObj[action.payload.newGroup] = others[key]
        }
      })
      return {
        ...state,
        metadata: { ...state.metadata, others: newObj },
      }
    }
    case DELETE_GROUP: {
      const others = { ...state.metadata.others }
      const newObj = {}
      Object.keys(others).map((key) => {
        if (key !== action.payload.group) {
          newObj[key] = others[key]
        }
      })
      return {
        ...state,
        metadata: { ...state.metadata, others: newObj },
      }
    }
    //* ******************** Documents ************************* //

    case UPDATE_ALL_DOCUMENTS:
      return {
        ...state,
        documents: {
          error: action.payload.error,
          data: action.payload.data,
        },
        loading: false,
      }
    case DELETE_DOCUMENT:
      return {
        ...state,
        documents: {
          error: action.payload.error,
          data: state.documents.data.filter((item) => item.document_id !== action.payload.id),
        },
        loading: false,
      }
    case UPDATE_DOCUMENT:
      return {
        ...state,
        documents: {
          error: state.documents.error,
          data: [...state.documents.data.filter((item) => item.document_id !== action.payload.document_id), action.payload],
        },
        loading: false,
      }
    case ADD_DOCUMENT:
      return {
        ...state,
        documents: {
          ...state.documents,
          data: [...state.documents.data, action.payload],
        },
      }
    //* ******************** Init ************************* //

    case INIT_ALL: {
      let metadata = {}
      if (action.payload.metadata.error !== "") {
        metadata = {
          documentsTypes: [],
          others: {},
          error: action.payload.error,
        }
      } else {
        const documentsTypes = []
        action.payload.metadata.data.documentsTypes.map((obj) => {
          documentsTypes.push({ group: "documentsTypes", ...obj })
        })
        metadata = {
          documentsTypes: documentsTypes.sort((a, b) => a.key.trim().localeCompare(b.key.trim())),
          others: orderMetadata(action.payload.metadata.data.metadata),
          error: action.payload.error,
        }
      }

      return {
        ...state,
        metadata,
        documents: {
          error: action.payload.documents.error,
          data: action.payload.documents.data,
        },
        contracts: {
          error: action.payload.contracts.error,
          data: action.payload.contracts.data,
          filter: getFilterContractOptions(action.payload.contracts),
        },
        updateTime: action.payload.updateTime,
        loading: false,
      }
    }
    //* ******************** filter ************************* //
    case UPDATE_FILTER_DOCUMENT:
      return {
        ...state,
        filter: {
          ...state.filter,
          document: action.payload,
        },
      }

    case UPDATE_FILTER_CONTRACT:
      return {
        ...state,
        filter: {
          ...state.filter,
          contract: action.payload,
        },
      }


    case GET_ALL_KEYWORDS:
      return {
        ...state,
        keywords: action.payload,
      }

    case SET_METADATA_FROM_DOCUMENTS: {
      const modifiedContract = action.payload.data
      const contracts = state.contracts.data.map(function(item) { 
        return item.contract_id === modifiedContract.contract_id ? modifiedContract : item 
      })

      return {
        ...state,
        contracts: {
          ...state.contracts,
          data: contracts
        }
      }
    }
      

    default:
      return state
  }
}

export default quotes
