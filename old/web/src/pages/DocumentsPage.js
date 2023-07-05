/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect, useDispatch } from "react-redux"
import { Button, Alert, Space, message, Col, Row, Divider } from "antd"
import { navigate } from "@reach/router"
import ListDocuments from "../components/ListDocuments"
import Filter from "../components/Filter"
import {
  addBreadcrumb,
  update,
  setLoading,
  deleteDocument,
  setNavbar,
  setLoadingDatabase,
  updateAllDocuments,
  updateAllMetadata,
  updateFilterDocument,
} from "../redux/actions"
import { exportToCSVDocument } from "../utils/exportUtils"
import { getStrByFilter, getDateBeetweenTwoFilter, getManyByFilterMany } from "../utils/fitler"

function DocumentsPage({ documents, loading, loadingDatabase, metadata, filter, documentTypes, keywords}) {
  const dispatch = useDispatch()

  const [documentFiltered, setDocumentFiltered] = useState([])

  useEffect(() => {
    dispatch(setNavbar("documents"))
    dispatch(
      addBreadcrumb({
        reset: true,
        data: [{ name: "Documents", href: "/documents" }],
      })
    )
  }, [dispatch])

  useEffect(() => {
    if (documents.data && filter) {
      setDocumentFiltered(
        documents.data.filter((document) => {
          return (
            // contract_name
            getStrByFilter(document.contract_name, filter.contract_name) &&
            // name
            getStrByFilter(document.name, filter.name) &&
            // domain
            getStrByFilter(document.domain, filter.domain) &&
            // type
            getStrByFilter(document.type, filter.type) &&
            // date
            getDateBeetweenTwoFilter(document.date, filter.date) &&
            // creationDate
            getDateBeetweenTwoFilter(document.creationDate, filter.creationDate) &&
            // extension
            getStrByFilter(document.extension, filter.extension) &&
            // tags
            getManyByFilterMany(document.keywords, filter.keywords) &&
            // metadata
            getManyByFilterMany(document.metadata, filter.metadata) &&
            // customer
            getStrByFilter(document.customer, filter.customer)


          )
        })
      )
    } else {
      setDocumentFiltered(documents.data)
    }
  }, [filter, documents])

  return (
    <div>
      <Helmet>
        <title>Documents</title>
      </Helmet>
      <Space style={{ paddingLeft: 10 }}>
        <Button
          type="primary"
          onClick={() => {
            exportToCSVDocument(documents.data, documentTypes, metadata)
          }}
          className="classic-button"
          loading={loading}
        >
          Exporter les documents
        </Button>
        <Button
          type="primary"
          onClick={() => {
            navigate("/documents/create")
          }}
          className="classic-button"
          loading={loading}
        >
          Nouveau
        </Button>
      </Space>
      <Space style={{ paddingRight: "10px", float: "right" }}>
        <Button
          onClick={() => {
            dispatch(setLoading(true))
            dispatch(updateAllDocuments())
          }}
          className="classic-button"
          loading={loading}
        >
          Actualiser les documents
        </Button>
        <Button
          onClick={() => {
            dispatch(setLoading(true))
            dispatch(updateAllMetadata())
          }}
          className="classic-button"
          loading={loading}
        >
          Actualiser les metadata
        </Button>
        <Button
          onClick={() => {
            dispatch(setLoadingDatabase(true))
            dispatch(update())
            message.warning("L'actualisation de la base de données peut prendre plusieurs minutes.")
          }}
          className="classic-button"
          loading={loadingDatabase}
        >
          Actualiser les données en base
        </Button>
      </Space>

      <Divider />
      <Filter
        isDocument
        OnFilter={(values) => dispatch(updateFilterDocument(values))}
        loading={loading}
        metadata={metadata}
        style={{ marginLeft: "10px" }}
        filter={filter}
        OnReset={() => dispatch(updateFilterDocument(undefined))}
        keywords={keywords}
      />
      <Row style={{ marginLeft: "10px", marginTop: "10px" }}>
        <Col span={24}>
          <ListDocuments documents={documentFiltered} size={12} loading={loading} documentsTypes={documentTypes} />
        </Col>
      </Row>

      {documents.error !== "" && (
        <Alert
          style={{ marginTop: "10px" }}
          message="Erreur de chargement des données"
          description={documents.error}
          type="error"
        />
      )}
    </div>
  )
}

function mapStateToProps(state) {
  return {
    documents: state.documents,
    loading: state.loading,
    loadingDatabase: state.loadingDatabase,
    metadata: { ...state.metadata.others, documentsTypes: state.metadata.documentsTypes },
    documentTypes: state.metadata.documentsTypes,
    filter: state.filter.document,
    keywords: state.keywords.data
  }
}

export default connect(mapStateToProps, {
  addBreadcrumb,
  update,
  setLoading,
  deleteDocument,
  setNavbar,
  setLoadingDatabase,
  updateAllDocuments,
  updateAllMetadata,
  updateFilterDocument,
})(DocumentsPage)
