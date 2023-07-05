const isInVersion = (documentsType, id) => {
  return !documentsType.filter((item) => item.isInVersion === true && item.document_type_id === id).length > 0
}

const getLibeleByKey = (documentsType, id) => {
  const result = documentsType.find((item) => item.document_type_id === id)
  if (result) return result.value
  return "inconnu"
}

const getKeyById = (documentsType, id) => {
  console.log(documentsType, id)
  const result = documentsType.find((item) => item.document_type_id === id)
  if (result) return result.key
  return "???"
}

const getMetadataByID = (idList, metadataList) => {
  console.log(idList, metadataList)
  console.log("ICI")
  let testList = []

  if (idList){
    testList = idList
  }
  const result = []
  Object.keys(metadataList).map((key) =>
    // eslint-disable-next-line consistent-return
    metadataList[key].map((metadata) => {
      if (testList.includes(metadata.metadata_id)) {
        if (result[key]) {
          result[key].obj.push(metadata)
          result[key].list.push(metadata.value)
          result[key].idList.push(metadata.metadata_id)
        } else {
          result[key] = { obj: [metadata], list: [metadata.value], idList: [metadata.metadata_id] }
        }
      }
    })
  )
  console.log(result)
  return result
}

const getListValueByID = (idList, metadataList) => {
  console.log(idList, metadataList)
  const result = []
  Object.keys(metadataList).map((key) =>
    // eslint-disable-next-line consistent-return
    metadataList[key].map((metadata) => {
      if (idList.includes(metadata.metadata_id)) {
        result.push(metadata.value)
      }
    })
  )
  console.log(result)
  return result
}

export { isInVersion, getLibeleByKey, getMetadataByID, getKeyById, getListValueByID }
