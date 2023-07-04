import React, { useEffect, useState } from "react"
import { Input, Divider, Button, Space, message, Card, Table, Empty, Row, Col } from "antd"
import { Helmet } from "react-helmet"
import { Link, navigate } from "@reach/router"
import { connect, useDispatch } from "react-redux"
import { addBreadcrumb, update, setLoading, setNavbar, setLoadingDatabase, initAll } from "../redux/actions"
import ListDocuments from "../components/ListDocuments"
import ListContracts from "../components/ListContracts"

function HomePage({ loading, documents, contracts, loadingDatabase, documentsTypes }) {
  const dispatch = useDispatch()
  const [searchResult, setSearchResult] = useState([])
  const [inResearch, setInResearch] = useState(false)
  const [errorSearch, setErrorSearch] = useState(undefined)

  useEffect(() => {
    dispatch(setNavbar(""))
    dispatch(
      addBreadcrumb({
        reset: true,
        data: [{ name: "Accueil", href: "/" }],
      })
    )
  }, [dispatch])

  function search(keywords) {
    return new Promise((resolve, reject) => {
      fetch(`${process.env.REACT_APP_API_PATH}search?keywords=${keywords}`)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Erreur lors de la récupération en base")
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

  function findDocuments(e) {
    search(e.target.value)
      .then((res) => {
        setSearchResult(res)
      })
      .catch((error) => {
        setErrorSearch(error.message)
      })
  }

  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Space style={{ paddingLeft: "10px" }}>
        <Button
          type="primary"
          onClick={() => {
            dispatch(setLoading(true))
            dispatch(initAll())
          }}
          className="classic-button"
          loading={loading}
        >
          Actualiser
        </Button>
        <Button
          type="primary"
          onClick={() => {
            navigate("/documents/create")
          }}
          className="classic-button"
          loading={loading}
        >
          Nouveau document
        </Button>
      </Space>

      <Space style={{ paddingRight: "10px", float: "right" }}>
        <Button
          type="ghost"
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

      <Row style={{ marginTop: "10px" }}>
        <Col span={24} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Card title="Rechercher document ou affaire">
            <Input
              placeholder="Exemple : Orsys"
              onChange={(e) => {
                setInResearch(e.target.value !== "")
                findDocuments(e)
              }}
            />

            {inResearch && (
              <div>
                <Divider />
                <Table
                  columns={[
                    {
                      title: "Type",
                      dataIndex: "name",
                      key: "name",
                      render: (_, record) => {
                        if (record.document_id) {
                          return "Document"
                        }
                        return "Affaire"
                      },
                    },
                    {
                      title: "Nom",
                      dataIndex: "contract_name",
                      key: "contract_name",
                      width: "75%",
                      render: (_, record) => {
                        if (record.document_id) {
                          return <Link to={`/documents/${record.document_id}`}>{record.name}</Link>
                        }
                        return <Link to={`/contracts/${record.contract_id}`}>{record.title}</Link>
                      },
                    },
                  ]}
                  dataSource={searchResult}
                  locale={{
                    emptyText: errorSearch ? (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={errorSearch} />
                    ) : (
                      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="la recherche n'a rien donné" />
                    ),
                  }}
                />
              </div>
            )}
          </Card>
        </Col>
      </Row>

      <Row style={{ marginTop: "20px" }}>
        <Col lg={{ span: 24 }} xl={{ span: 12 }} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Card title="Les 5 dernieres affaires dans Fitnet">
            <ListContracts
              contracts={contracts.data.sort((a, b) => parseInt(b.contract_id, 10) - parseInt(a.contract_id, 10)).slice(0, 5)}
              loading={loading}
              size={5}
            />
          </Card>
        </Col>
        <Col lg={{ span: 24 }} xl={{ span: 12 }} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Card title="Les 5 derniers documents créés">
            <ListDocuments
              documents={documents.data.sort((a, b) => b.date.trim().localeCompare(a.date.trim())).slice(0, 5)}
              loading={loading}
              size={5}
              documentsTypes={documentsTypes}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    documents: state.documents,
    contracts: state.contracts,
    loadingDatabase: state.loadingDatabase,
    documentsTypes: state.metadata.documentsTypes,
  }
}
export default connect(mapStateToProps, { addBreadcrumb, update, setLoading, setNavbar, setLoadingDatabase })(HomePage)
