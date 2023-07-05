/* eslint-disable no-nested-ternary */
const optionsDate = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
const optionsDateYear = { year: "numeric" }

const getDate = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", optionsDate)
}

const getYear = (date) => {
  return new Date(date).toLocaleDateString("fr-FR", optionsDateYear)
}

const getEmptyDoc = () => {
  return {
    id: null,
    contract_id: null,
    contract_name: null,
    name: null,
    domain: null,
    type: null,
    year: null,
    date: null,
    version: null,
    sequentialNumber: null,
    extension: null,
    projectName: null,
    creator: "",
    creationDate: "2008-09-15T15:53:00+05:00",
    summary: "",
    metadata: [],
    keywords: [],
    isNew: true,
  }
}

const generateName = (contract, document, isVersion, key, numeroAffaireFitnet) => {
  const year = document.year.toString().substring(2, 4)
  const XorR = contract.company === "BIAL-X" ? "X" : "R"
  const date = document.date.format("YYYYMMDD")
  if (!isVersion) {
    return `${document.domain + year}-${contract.customer_name}-${numeroAffaireFitnet}${XorR}-${key}-${
      document.projectName
    }-${date}-${document.sequentialNumber}.${document.extension}`
  }
  return `${document.domain + year}-${contract.customer_name}-${numeroAffaireFitnet}${XorR}-${key}-${document.projectName}-v${
    document.version
  }.${document.extension}`
}

const dateFormat = "dddd Do MMMM YYYY"

const getIdByContract = (title, ifFailed) => {
  return title && title.split("-")[1]
    ? title.split("-")[1].match(/^\d+$/)
      ? title.split("-")[1]
      : title.split("-")[0]
    : ifFailed
}

export { getDate, getYear, getEmptyDoc, generateName, dateFormat, getIdByContract }
