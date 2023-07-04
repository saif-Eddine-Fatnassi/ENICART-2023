import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect, useDispatch } from "react-redux"
import { List, Timeline, Alert, Row, Col, Card, Divider, Space, Button } from "antd"
import { ClockCircleOutlined, SyncOutlined, CheckCircleOutlined } from "@ant-design/icons"
import { navigate } from "@reach/router"
import { addBreadcrumb, setLoading, setNavbar, setMetadatasFromDocuments} from "../redux/actions"
import ListDocuments from "../components/ListDocuments"
import TagList from "../components/TagList"
import logoR from "../assets/Icon-Bial-R.png"
import logoX from "../assets/Icon-Bial-X_2019.png"
import StatusIcon from "../components/StatusIcon"
import { getDate } from "../utils/formatUtils"
import { getContract, getDocumentsByContract } from "../utils/currentRequest"
import { getMetadataByID } from "../utils/metadata"

function ContractDetailPage({ id, loading, documentsTypes, metadata}) {
  const dispatch = useDispatch()
  const [contract, setContract] = useState(null)
  const [error, setError] = useState("")
  const [documents, setDocuments] = useState([])

  const metadataMapped = getMetadataByID(contract ? contract.metadata : [], metadata)

  useEffect(() => {
    dispatch(setNavbar("contracts"))
    dispatch(setLoading(true))
    getDocumentsByContract(id)
      .then((response) => {
        setDocuments(response)
        return getContract(id)
      })
      .then((response) => {
        setContract(response)
        dispatch(
          addBreadcrumb({
            reset: true,
            data: [
              { name: "Affaires", href: "/contracts" },
              {
                name: response.title.split("-")[0].split("_")[0],
                href: `/contracts/${response.contract_id}`,
              },
            ],
          })
        )
        dispatch(setLoading(false))
      })
      .catch((err) => {
        setError(err.message)
        dispatch(setLoading(false))
      })
  }, [dispatch, id])

  if (loading) {
    return (
      <div>
        <Helmet>
          <title>loading...</title>
        </Helmet>
        <SyncOutlined
          spin
          style={{
            fontSize: "20px",
          }}
        />
      </div>
    )
  }
  if (error !== "" || !contract) {
    return (
      <div>
        <Helmet>
          <title>Erreur</title>
        </Helmet>
        <Alert
          style={{ marginTop: "10px" }}
          message="Erreur de chargement des données"
          description={
            <div>
              <span>Impossible de récuperer le contrat.</span>
              <br />
              <span>
                <b>Message d&apos;erreur : </b>
                {error}
              </span>
            </div>
          }
          type="error"
        />
      </div>
    )
  }
  return (
    <div>
      <Helmet>
        <title>{contract.title}</title>
      </Helmet>
      <div className="contract-detail">
        <Row>
          <Col xs={24}>
            <h1 className="titre">
              {contract.company === "BIAL-X" ? (
                <img className="logo-contract-detail" src={logoX} alt="logo-bial-r" />
              ) : (
                <img className="logo-contract-detail" src={logoR} alt="logo-bial-x" />
              )}
              {contract.title}
            </h1>
            <Divider />
          </Col>
          <Space style={{ paddingLeft: 10 }}>
            <Button
              type="primary"
              onClick={() => {
                navigate("/contracts")
              }}
              className="classic-button"
              loading={loading}
            >
              Retour
            </Button>
            <Button
              type="primary"
              onClick={() => {
                navigate(`/documents/create-for-contract/${contract.contract_id}`)
              }}
              className="classic-button"
              loading={loading}
            >
              Créer un document
            </Button>

            <Button
              type="primary"
              onClick={() => {
                dispatch(setMetadatasFromDocuments(contract.contract_id))
              }}
              className="classic-button"
              loading={loading}
            >
              Importer les métadatas
            </Button>
          </Space>
        </Row>

        <Row>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: 10 }}>
            <Card title="Informations générales">
              <p>
                <b>Client </b>: {contract.customer_name}
              </p>
              <p>
                <b>Createur </b>: {contract.creator}
              </p>
              <p>
                <b>Statut </b>: {contract.status} <StatusIcon status={contract.status} />
              </p>
              <p>
                <b>Jours effectués </b>: {contract.total_days ? contract.total_days : 0}
              </p>
              <p>
                <b>Vente totale </b>: {contract.total_charges ? contract.total_charges : 0}
              </p>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 12 }} style={{ padding: 10 }}>
            <Card title="Dates importantes">
              <Timeline>
                {contract.begin_date === null ? (
                  <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: "1.2em" }} />} color="red">
                    <b>Début inconnue</b>
                  </Timeline.Item>
                ) : (
                  <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: "1.2em" }} />}>
                    <b>Début</b> : {getDate(contract.begin_date)}
                  </Timeline.Item>
                )}
                {contract.end_date === null ? (
                  <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: "1.2em" }} />} color="red">
                    <b>Fin inconnue</b>
                  </Timeline.Item>
                ) : (
                  <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: "1.2em" }} />}>
                    <b>Fin</b> : {getDate(contract.end_date)}
                  </Timeline.Item>
                )}
                {contract.billing_date === null ? (
                  <Timeline.Item dot={<ClockCircleOutlined style={{ fontSize: "1.2em" }} />} color="red">
                    <b>Paiement inconnue</b>
                  </Timeline.Item>
                ) : (
                  <Timeline.Item dot={<CheckCircleOutlined style={{ fontSize: "1.2em" }} />}>
                    <b>Paiement</b> : {getDate(contract.billing_date)}
                  </Timeline.Item>
                )}
              </Timeline>
            </Card>
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 10 }}>
            <List
              header={<span>Commerciaux</span>}
              bordered
              dataSource={
                !contract.affected_commercials || contract.affected_commercials.length === 0
                  ? [{ fullName: "Aucun commerciaux affecté" }]
                  : contract.affected_commercials
              }
              renderItem={(item) => <List.Item>{item.fullName}</List.Item>}
            />
          </Col>
          <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: 10 }}>
            <List
              header={<span>Chefs de projet</span>}
              bordered
              dataSource={
                !contract.affected_project_managers || contract.affected_project_managers.length === 0
                  ? [{ fullName: "Aucun chef de projet affecté" }]
                  : contract.affected_project_managers
              }
              renderItem={(item) => <List.Item>{item.fullName}</List.Item>}
            />
          </Col>
          <Col span={24} style={{ padding: 10 }}>
                <Card title="Métadonnées associées ">
                  <Row>
                    {metadataMapped &&
                      Object.keys(metadataMapped).map((key) => (
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                          <p>
                            <b>{key} </b>: <TagList data={metadataMapped[key].list} />
                          </p>
                        </Col>
                      ))}
                  </Row>
                </Card>
              </Col>
          <Col span={24} style={{ padding: 10 }}>
            <ListDocuments
              documents={documents}
              title="Documents associés"
              size={12}
              loading={loading}
              documentsTypes={documentsTypes}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return { loading: state.loading, 
    documentsTypes: state.metadata.documentsTypes , 
    metadata: state.metadata.others,}
}

export default connect(mapStateToProps, { addBreadcrumb, setLoading, setNavbar, setMetadatasFromDocuments})(ContractDetailPage)
