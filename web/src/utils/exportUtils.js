import { getKeyById, getListValueByID } from "./metadata"

const exportToCSVContracts = (contracts) => {
  let csv = ""
  csv +=
    "contract_id;title;customer_name;affected_commercials;affected_project_managers;company;begin_date;end_date;billing_date;status;creator\n"
  contracts.map((contract) => {
    csv += `"${contract.contract_id}";`
    csv += `"${contract.title}";`
    csv += `"${contract.customer_name}";`

    if (contract.affected_commercials.length > 0) {
      let affectedCommercials = ""
      contract.affected_commercials.map((item) => {
        affectedCommercials += `${item.fullName},`
      })
      csv += `[${affectedCommercials.slice(0, -1)}];`
    } else {
      csv += "[];"
    }

    if (contract.affected_project_managers != null && contract.affected_project_managers.length > 0) {
      let affectedProjectManagers = ""
      contract.affected_project_managers.map((item) => {
        affectedProjectManagers += `${item.fullName},`
      })
      csv += `[${affectedProjectManagers.slice(0, -1)}];`
    } else {
      csv += "[];"
    }

    csv += `"${contract.company}";`
    csv += `"${contract.begin_date}";`
    csv += `"${contract.end_date}";`
    csv += `"${contract.billing_date}";`
    csv += `"${contract.status}";`
    csv += `"${contract.creator}"\n`
  })

  const BOM = new Uint8Array([0xef, 0xbb, 0xbf])
  const blob = new Blob([BOM, csv], { encoding: "UTF-8", type: "text/csv;charset=UTF-8" })
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, "affaires.csv")
  } else {
    const link = document.createElement("a")
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "affaires.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

const exportToCSVDocument = (documents, type, metadata) => {
  let csv = ""
  csv +=
    "contract_id;contract_name;name;domain;type;year;date;version;sequentialNumber;extension;projectName;creator;creationDate;summary;metadata;keywords;document_id\n"
  documents.map((document) => {
    csv += `"${document.contract_id}";`
    csv += `"${document.contract_name}";`
    csv += `"${document.name}";`
    csv += `"${document.domain}";`
    csv += `"${getKeyById(type, document.type)}";`
    csv += `${document.year};`
    csv += `"${document.date}";`
    csv += `"${document.version}";`
    csv += `${document.sequentialNumber};`
    csv += `"${document.extension}";`
    csv += `"${document.projectName}";`
    csv += `"${document.creator}";`
    csv += `"${document.creationDate}";`
    csv += `"${document.summary}";`
    csv += `[${getListValueByID(document.metadata, metadata)}];`
    csv += `[${document.keywords}];`
    csv += `"${document.document_id}"\n`
  })

  const BOM = new Uint8Array([0xef, 0xbb, 0xbf])
  const blob = new Blob([BOM, csv], { encoding: "UTF-8", type: "text/csv;charset=UTF-8" })
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, "documents.csv")
  } else {
    const link = document.createElement("a")
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "documents.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }
}

export { exportToCSVDocument, exportToCSVContracts }
