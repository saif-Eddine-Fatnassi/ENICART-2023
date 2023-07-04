/* ########################################################### */
/* ##                       Contract                           */
/* ########################################################### */

export const getContract = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}contracts/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le contrat n'existe pas ou plus")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

/* ########################################################### */
/* ##                       Document                           */
/* ########################################################### */

export const getDocument = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documents/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le document n'existe pas ou plus")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const getDocumentsAssociated = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documents/associated/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le document n'existe pas ou plus")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const addDocumentInBase = (doc) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documents`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: doc,
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Le document n'as pas été inséré")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const updateDocumentInBase = (doc) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documents/${doc.document_id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(doc),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Le document n'as pas été modifié")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const getDocumentsByContract = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documents/byContract/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le contrat n'existe pas ou plus")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const deleteDocumentInBase = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documents/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le document n'as pas été supprimé")
        }
        return response.json()
      })
      .then(() => {
        resolve(id)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

/* ########################################################### */
/* ##                       Metadata                           */
/* ########################################################### */

export const addMetadata = (data) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}metadata`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("La metadata n'as pas été insérée")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const updateMetadata = (id, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}metadata/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La metadata n'as pas été modifié")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const deleteMetadata = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}metadata/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("La metadata n'as pas été supprimé")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const updateMetadataGroup = (group, newGroup) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}metadata/update_group?group=${group}&newGroup=${newGroup}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Le groupe n'as pas été modifié")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const deleteMetadataGroup = (group) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}metadata/delete_group/${group}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Le groupe n'as pas été supprimé")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

/* ########################################################### */
/* ##                    Document type                         */
/* ########################################################### */

export const addDocumentType = (data) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documentsTypes`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("La metadata n'as pas été insérée")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const updateDocumentType = (id, data) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documentsTypes/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La metadata n'as pas été modifié")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}

export const deleteDocumentType = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`${process.env.REACT_APP_API_PATH}documentsTypes/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("La metadata n'as pas été supprimé")
        }
        return response.json()
      })
      .then((response) => {
        resolve(response)
      })
      .catch((err) => {
        reject(Error(`An error has occured: ${err.toString()}`))
      })
  })
}
