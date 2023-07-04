import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect, useDispatch } from "react-redux"
import {
  Alert,
  Col,
  Row,
  Card,
  Button,
  Space,
  Form,
  Input,
  DatePicker,
  Select,
  Divider,
  ConfigProvider,
  message,
  Modal,
} from "antd"
import moment from "moment"
import locale from "antd/lib/locale/fr_FR"
import "moment/locale/fr"
import { SyncOutlined } from "@ant-design/icons"
import { Link, navigate } from "@reach/router"
import StatusIcon from "../components/StatusIcon"
import TagList from "../components/TagList"
import ListDocuments from "../components/ListDocuments"
import { addBreadcrumb, setLoading, update, setNavbar, updateDocument, deleteDocument } from "../redux/actions"
import {
  getContract,
  getDocument,
  getDocumentsAssociated,
  updateDocumentInBase,
  deleteDocumentInBase,
} from "../utils/currentRequest"
import { isInVersion, getLibeleByKey, getMetadataByID } from "../utils/metadata"
import { getDate } from "../utils/formatUtils"
import EditableTagList from "../components/EditableTagList"

moment.locale("fr")

function DocumentReadPage({ id, loading, documentsTypes, metadata }) {
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(true)
  const [contract, setContract] = useState(null)
  const [document, setDocument] = useState(null)
  const [deleteModal, setdeleteModal] = useState(null)
  const [error, setError] = useState("")
  const [errorUpdate, setErrorUpdate] = useState("")
  const [documentAssociated, setDocumentAssociated] = useState([])
  const [isModify, setIsModify] = useState(false)
  const [form] = Form.useForm()
  const [tags, setTags] = useState([])
  const { Option } = Select
  const { TextArea } = Input
  const metadataMapped = getMetadataByID(document ? document.metadata : [], metadata)

  const handleOk = () => {
    deleteDocumentInBase(document.document_id)
      .then(() => {
        dispatch(deleteDocument(document.document_id))
        navigate("/documents")
      })
      .catch((err) => {
        setErrorUpdate(err.message)
      })
    setdeleteModal(null)
  }

  const handleCancel = () => {
    setdeleteModal(null)
  }

  const onFinish = (values) => {
    const metadataListStr = []
    Object.keys(values.document.metadata).map(
      (key) => values.document.metadata[key] && metadataListStr.push(...values.document.metadata[key])
    )

    const doc = { ...document, ...values.document, keywords: tags, metadata: metadataListStr }
    updateDocumentInBase(doc)
      .then(() => {
        dispatch(updateDocument(doc))
        message.success("Modification réussie")
        navigate(`/documents/${document.document_id}`)
      })
      .catch((err) => {
        setErrorUpdate(err.message)
      })
  }

  useEffect(() => {
    dispatch(setNavbar("documents"))
    dispatch(
      addBreadcrumb({
        reset: true,
        data: [
          { name: "Documents", href: "/documents" },
          {
            name: "creation",
            href: "/documents/create",
          },
        ],
      })
    )

    if (window.location.pathname.split("/")[2] === "modify") {
      setIsModify(true)
    }

    dispatch(setLoading(true))
    getDocumentsAssociated(id)
      .then((response) => {
        setDocumentAssociated(response)
        return getDocument(id)
      })
      .then((response) => {
        setDocument(response)
        setTags(response.keywords)
        dispatch(
          addBreadcrumb({
            reset: true,
            data: [
              { name: "Documents", href: "/documents" },
              {
                name: response.name,
                href: `/documents/${response.document_id}`,
              },
            ],
          })
        )
        return getContract(response.contract_id)
      })
      .then((response) => {
        setContract(response)
        setWaiting(false)
        dispatch(setLoading(false))
      })
      .catch((err) => {
        setError(err.message)
        setWaiting(false)
        dispatch(setLoading(false))
      })
  }, [dispatch, id])

  if (loading === true || waiting === true) {
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

  if (error !== "" || !document || !contract) {
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
              <span>Impossible de récuperer le document.</span>
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
        <title>{document.name}</title>
      </Helmet>
      <div className="document-detail">
        <Space style={{ paddingLeft: 10 }}>
          {isModify ? (
            <Button
              type="primary"
              onClick={() => {
                navigate(`/documents/${document.document_id}`)
              }}
              className="classic-button"
              loading={loading}
            >
              Annuler
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() => {
                  navigate("/documents")
                }}
                className="classic-button"
                loading={loading}
              >
                Retour
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  navigate(`/documents/modify/${document.document_id}`)
                }}
                className="classic-button"
                loading={loading}
              >
                Modifier
              </Button>
              
            </>
          )}
          <Button
            type="primary"
            onClick={() => {
              setdeleteModal(true)
            }}
            className="classic-button"
            loading={loading}
          >
            Supprimer
          </Button>
          <Button
                type="primary"
                onClick={() => {
                  navigate(`/documents/create-for-contract/${document.contract_id}`)
                }}
                className="classic-button"
                loading={loading}
              >
                Nouveau document pour ce contrat
          </Button>
        </Space>
        <Row>
          <Col md={{ span: 24 }} lg={{ span: 8 }} style={{ padding: 10 }}>
            <Card title="Etape 1 : affaire séléctionnée ">
              <Row>
                <Col xs={{ span: 12 }} lg={{ span: 24 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <p>
                    <b>Titre </b>: <Link to={`/contracts/${contract.contract_id}`}>{contract.title}</Link>
                  </p>
                  <p>
                    <b>Client </b>: {contract.customer_name}
                  </p>
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 24 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <p>
                    <b>Créateur</b> : {contract.creator}
                  </p>
                  <p>
                    <b> Statut </b>: {contract.status} <StatusIcon status={contract.status} />
                  </p>
                </Col>
              </Row>
            </Card>
          </Col>
          <>
            <Col md={{ span: 24 }} lg={{ span: 16 }} style={{ padding: 10 }}>
              <Card title="Etape 2 : autres critères ">
                <Row>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>
                      <b>Domaine</b> : {document.domain}
                    </p>
                    <p>
                      <b>Type de document</b> : {getLibeleByKey(documentsTypes, document.type)}
                    </p>

                    <p>
                      <b>Année</b> : {document.year}
                    </p>

                    <p>
                      <b>Date</b> : {getDate(document.date)}
                    </p>
                    <p>
                      <b>URL</b> : {document.url}
                    </p>
                  </Col>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                    <p>
                      <b>Nom du projet </b> : {document.projectName}
                    </p>
                    <p>{document.isNew ? "Premiere version d'un document" : "Nouvelle version d'un document"}</p>

                    <p>
                      <b>{isInVersion(documentsTypes, document.type) ? "Numéro séquentiel : " : "Numéro de version : "}</b>
                      {isInVersion(documentsTypes, document.type) ? document.sequentialNumber : document.version}
                    </p>
                    <p>
                      <b>Extension du document</b> : {document.extension}
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </>
          <Col span={24} style={{ padding: 10 }}>
            <Card title="Etape 3 : nom généré ">
              <h3>{document.name}</h3>
            </Card>
          </Col>
          <Modal
            title="Suppression"
            visible={deleteModal}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Suppression"
            cancelText="Annuler"
          >
            <p>Êtes vous sûr de vouloir supprimer ?</p>
          </Modal>
          {!isModify ? (
            <>
              <Col span={24} style={{ padding: 10 }}>
                <Card title="Etape 4 : métadonnées associées ">
                  <Row>
                  <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p>
                        <b>URL </b>: {document.url}
                      </p>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p>
                        <b>Créateur </b>: {document.creator}
                      </p>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <p>
                        <b>Date de création </b>: {getDate(document.creationDate)}
                      </p>
                    </Col>
                    {metadataMapped &&
                      Object.keys(metadataMapped).map((key) => (
                        <Col xs={{ span: 24 }} md={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                          <p>
                            <b>{key} </b>: <TagList data={metadataMapped[key].list} />
                          </p>
                        </Col>
                      ))}
                    <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <span>
                        <b> Mot Clé :</b>
                        <p>
                          <TagList data={document.keywords} />
                        </p>
                      </span>
                    </Col>
                    <Col xs={{ span: 24 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <b> Résumé :</b>
                      <p style={{ whiteSpace: "pre-wrap" }}>{document.summary || <i>Aucun résumé pour le moment</i>}</p>
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col span={24} style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
                <ListDocuments
                  documents={documentAssociated}
                  title="Documents équivalents"
                  size={12}
                  documentsTypes={documentsTypes}
                />
              </Col>
            </>
          ) : (
            <div className="step4">
              <Col span={24} style={{ padding: 10 }}>
                <Card title="Etape 4 : métadonnées associées " style={{ width: "100%" }}>
                  <ConfigProvider locale={locale}>
                    <Form
                      labelCol={{ xs: { span: 10 }, md: { span: 12 }, lg: { span: 8 }, xl: { span: 7 } }}
                      wrapperCol={{ xs: { span: 14 }, md: { span: 12 }, lg: { span: 16 }, xl: { span: 17 } }}
                      form={form}
                      onFinish={onFinish}
                    >
                      <Row>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                          
                        
                          <Form.Item
                            label="Createur"
                            name={["document", "creator"]}
                            rules={[
                              {
                                required: true,
                                message: "Ne peut pas être vide",
                              },
                              () => ({
                                validator(_, value) {
                                  if (value.match(/^[A-Z]{3}$/)) {
                                    return Promise.resolve()
                                  }
                                  return Promise.reject(new Error("Un trigramme est requis"))
                                },
                              }),
                            ]}
                            initialValue={document.creator}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            label="URL"
                            name={["document", "url"]}
                            rules={[
                              {
                                required: true,
                                message: "Ne peut pas être vide",
                              }
                            ]}
                            initialValue={document.url}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                          <Form.Item
                            label="Date de création"
                            name={["document", "creationDate"]}
                            initialValue={moment(document.creationDate)}
                          >
                            <DatePicker style={{ width: "100%" }} format={(value) => moment(value).format("dddd DD MMMM YYYY")} />
                          </Form.Item>
                        </Col>

                        {metadata &&
                          Object.keys(metadata).map((key) => (
                            <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                              <Form.Item
                                label={key}
                                name={["document", "metadata", key]}
                                initialValue={metadataMapped && metadataMapped[key] ? metadataMapped[key].idList : undefined}
                              >
                                <Select mode="multiple" id={key}>
                                  {metadata[key].map((obj) => (
                                    <Option value={obj.metadata_id}>{obj.value}</Option>
                                  ))}
                                </Select>
                              </Form.Item>
                            </Col>
                          ))}

                        <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                          <Divider />

                          <div className="left-form">
                            <Form.Item
                              label="Mots Clé"
                              name={["document", "keywords"]}
                              labelCol={24}
                              wrapperCol={24}
                              initialValue={document.keywords}
                            >
                              <EditableTagList
                                data={tags}
                                onUpdateData={(e) => {
                                  setTags(e)
                                }}
                              />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col span={24} style={{ paddingLeft: 10, paddingRight: 10 }}>
                          <div className="left-form">
                            <Form.Item
                              label="Résumé :"
                              name={["document", "summary"]}
                              labelCol={24}
                              wrapperCol={24}
                              initialValue={document.summary}
                            >
                              <TextArea />
                            </Form.Item>
                          </div>
                        </Col>
                        <Space style={{ margin: "auto" }}>
                          <Button
                            onClick={() => {
                              navigate(`/documents/${document.document_id}`)
                            }}
                            className="classic-button"
                            loading={loading}
                          >
                            Annuler
                          </Button>
                          <Button type="primary" className="classic-button" onClick={() => form.submit()}>
                            Sauvegarder
                          </Button>
                        </Space>
                      </Row>
                    </Form>
                  </ConfigProvider>
                </Card>
              </Col>
              {errorUpdate !== "" && (
                <Col span={24} style={{ padding: 10 }}>
                  <Alert
                    style={{ marginTop: "10px" }}
                    message="Erreur de modification"
                    description={
                      <div>
                        <span>Impossible de modifier le document.</span>
                        <br />
                        <span>
                          <b>Message d&apos;erreur : </b>
                          {errorUpdate}
                        </span>
                      </div>
                    }
                    type="error"
                  />
                </Col>
              )}
            </div>
          )}
        </Row>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    documentsTypes: state.metadata.documentsTypes,
    metadata: state.metadata.others,
  }
}

export default connect(mapStateToProps, { addBreadcrumb, setLoading, update, setNavbar, updateDocument })(DocumentReadPage)
