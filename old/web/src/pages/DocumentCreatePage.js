/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect, useDispatch } from "react-redux"
import { Alert, Col, Row, Card, Button, Space, Form, Modal, Input, Select, DatePicker, Divider, message, InputNumber } from "antd"
import { SyncOutlined, PlusOutlined, EditOutlined, FolderOpenOutlined } from "@ant-design/icons"
import { Link, navigate } from "@reach/router"
import moment from "moment"
import StatusIcon from "../components/StatusIcon"
import ListDocuments from "../components/ListDocuments"
import { addBreadcrumb, setLoading, addDocument, update, setNavbar } from "../redux/actions"
import { getContract, addDocumentInBase } from "../utils/currentRequest"
import { isInVersion, getKeyById } from "../utils/metadata"
import { getYear, generateName, getEmptyDoc, dateFormat, getIdByContract } from "../utils/formatUtils"
import ListContracts from "../components/ListContracts"

function DocumentCreatePage({ id, loading, documents, documentsTypes, contracts }) {
  const { Option } = Select
  const dispatch = useDispatch()
  const [waiting, setWaiting] = useState(true)
  const [contract, setContract] = useState(null)
  const [document, setDocument] = useState(null)
  const [error, setError] = useState("")
  const [stepOne, setStepOne] = useState(false)
  const [stepTwo, setStepTwo] = useState(false)
  const [step, setStep] = useState(1)
  const [form] = Form.useForm()
  const [isNew, setIsNew] = useState("new")
  const [isVersion, setIsVersion] = useState(true)
  const [generatedName, setgeneratedName] = useState(null)
  const [errorSave, setErrorSave] = useState(null)
  const [generatedId, setGeneratedId] = useState(null)

  const handleOk = (contractHandle) => {
    setContract(contractHandle)
    const generatedIdTmp = getIdByContract(contractHandle.title, null)
    setGeneratedId(generatedIdTmp)
    form.setFieldsValue({
      document: {
        ...form.getFieldValue.document,
        projectName: contractHandle.title.split("-").slice(2).join("-") || contractHandle.title.split("-").slice(1).join("-"),
      },
      generatedId: generatedIdTmp,
    })
    if (step === 1) {
      setStep(2)
    }
    setStepOne(false)
  }

  const handleCancel = () => {
    setStepOne(false)
  }

  const handleChangeType = (e) => {
    setIsVersion(isInVersion(documentsTypes, e))
  }

  const handleOkStepTwo = (documentHandle) => {
    const documentName = documentHandle.name
    let sequentialNumber = 1
    if (documentHandle.sequentialNumber != null) {
      sequentialNumber = documentHandle.sequentialNumber + 1
    }
    let version = "1.0"
    if (documentHandle.version !== null) {
      const versionSplit = documentHandle.version.split(".")
      version = `${versionSplit[0]}.${(parseInt(versionSplit[1], 10) || 0) + 1}`
    }

    form.setFieldsValue({
      document: {
        ...form.getFieldValue.document,
        newDocument: documentName,
        sequentialNumber,
        version,
      },
    })
    setStepTwo(false)
  }

  const handleCancelStepTwo = () => {
    setStepTwo(false)
  }

  const onFinish = (values) => {
    setgeneratedName(
      generateName(
        contract,
        values.document,
        isInVersion(documentsTypes, values.document.type),
        getKeyById(documentsTypes, values.document.type),
        generatedId.trim()
      )
    )
    setDocument({ ...values.document, customer: contract.customer_name })
    setStep(3)
  }

  const handleSaveStep3 = () => {
    const doc = {
      ...getEmptyDoc(),
      name: generatedName,
      ...document,
      contract_id: contract.contract_id,
      contract_name: contract.title,
      date: `${document.date.format("YYYY-MM-DD")}T00:00:00.000000+00:00`,
      creationDate: moment().format("YYYY-MM-DDTHH:mm:ss.000000+00:00"),
      year: parseInt(document.year, 10),
    }

    addDocumentInBase(JSON.stringify(doc))
      .then((response) => {
        dispatch(addDocument(response))
        message.success("Ajout réussie")
        navigate(`/documents/modify/${response.document_id}`)
      })
      .catch((err) => {
        setErrorSave(err.message)
      })
  }

  useEffect(() => {
    dispatch(setNavbar("documents"))
    if (window.location.pathname.split("/")[2] === "create") {
      setStep(1)
      setWaiting(false)
    } else if (window.location.pathname.split("/")[2] === "create-for-contract") {
      setStep(2)
      getContract(id)
        .then((response) => {
          setContract(response)

          const generatedIdTmp = getIdByContract(response.title, null)

          setGeneratedId(generatedIdTmp)
          form.setFieldsValue({
            document: {
              ...form.getFieldValue.document,
              projectName: response.title.split("-").slice(2).join("-") || response.title.split("-").slice(1).join("-"),
            },
            generatedId: generatedIdTmp,
          })

          setWaiting(false)
          dispatch(setLoading(false))
        })
        .catch((err) => {
          setError(err.message)
          setWaiting(false)
          dispatch(setLoading(false))
        })

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
    }
  }, [dispatch, form, id])

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

  if (error !== "") {
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
        <title>creation</title>
      </Helmet>
      <div className="document-detail">
        <Space style={{ paddingLeft: 10 }}>
          <Button
            type="primary"
            onClick={() => {
              navigate(-1)
            }}
            className="classic-button"
            loading={loading}
          >
            Annuler
          </Button>
        </Space>
        <Form
          labelCol={{ xs: { span: 10 }, md: { span: 12 }, lg: { span: 10 } }}
          wrapperCol={{ xs: { span: 14 }, md: { span: 12 }, lg: { span: 14 } }}
          form={form}
          onFinish={onFinish}
        >
          <Row>
            <Col md={{ span: 24 }} lg={{ span: 8 }} style={{ padding: 10 }}>
              <Card
                title="Etape 1 : affaire séléctionnée "
                extra={
                  <Button
                    type="primary"
                    className="classic-round-button"
                    onClick={() => {
                      setStepOne(true)
                    }}
                    shape="circle"
                    loading={loading}
                  >
                    {contract === null ? <PlusOutlined /> : <EditOutlined />}
                  </Button>
                }
              >
                {contract === null ? (
                  <span>Selectionner une affaire</span>
                ) : (
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
                      <p>
                        <b>ID de l&#39;affaire Fitnet</b>:
                        <Form.Item
                          name="generatedId"
                          labelCol={{ span: 0 }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: "Un numéro d'ID Fitnet est requis",
                            },
                            () => ({
                              validator(_, value) {
                                if (value.trim().match(/^\d+$/) || value.trim() === "???") {
                                  return Promise.resolve()
                                }
                                return Promise.reject(
                                  new Error("L'ID peut seulement être un numéro, remplacer par ??? si vous ne l'avez pas")
                                )
                              },
                            }),
                          ]}
                        >
                          <Input onChange={(value) => setGeneratedId(value.target.value)} />
                        </Form.Item>
                      </p>
                    </Col>
                  </Row>
                )}
              </Card>
              <Modal title="Selection d'une affaire" visible={stepOne} onCancel={handleCancel} footer={[]} width={1000}>
                <ListContracts
                  contracts={contracts.data}
                  loading={loading}
                  size={3}
                  isButton
                  isPreview
                  onClickButton={(e) => handleOk(e)}
                />
              </Modal>
            </Col>
            {step >= 2 && (
              <>
                <Col md={{ span: 24 }} lg={{ span: 16 }} style={{ padding: 10 }}>
                  <Card title="Etape 2 : autres critères ">
                    <Row>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Form.Item label="Domaine" name={["document", "domain"]} initialValue="C">
                          <Select>
                            <Option value="C">Client</Option>
                            <Option value="F">Fournisseur</Option>
                            <Option value="P">Partenaire</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Type"
                          name={["document", "type"]}
                          rules={[
                            {
                              required: true,
                              message: "Un type de document est requis",
                            },
                          ]}
                        >
                          <Select onChange={(e) => handleChangeType(e)}>
                            {documentsTypes.map((type) => (
                              <Option value={type.document_type_id}>{type.value}</Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item label="Année" name={["document", "year"]} initialValue={getYear(moment())}>
                          <Select>
                            <Option value={getYear(moment().add(1, "years"))}>{getYear(moment().add(1, "years"))}</Option>
                            <Option value={getYear(moment())}>{getYear(moment())}</Option>
                            <Option value={getYear(moment().subtract(1, "years"))}>
                              {getYear(moment().subtract(1, "years"))}
                            </Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Date"
                          name={["document", "date"]}
                          initialValue={moment()}
                          rules={[
                            {
                              required: true,
                              message: "Une date est requise",
                            },
                          ]}
                        >
                          <DatePicker format={dateFormat} style={{ width: "100%" }} />
                        </Form.Item>
                        <Form.Item
                          label="Nom du projet"
                          name={["document", "projectName"]}
                          rules={[
                            {
                              required: true,
                              message: "Un nom de projet est requis",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                        
                      </Col>
                      <Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                        <Form.Item label="New" name={["document", "isNew"]} initialValue="new">
                          <Select onChange={(e) => setIsNew(e)}>
                            <Option value="new">Créer un nouveau document</Option>
                            <Option value="old">Créer une nouvelle version</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item label="Reference" name={["document", "newDocument"]}>
                          <Input
                            disabled={isNew === "new"}
                            onClick={() => setStepTwo(true)}
                            style={{ width: "100%" }}
                            suffix={
                              <FolderOpenOutlined
                                onClick={() => {
                                  if (isNew === "old") {
                                    setStepTwo(true)
                                  }
                                }}
                              />
                            }
                          />
                        </Form.Item>
                        <Modal
                          title="Selection d'un document de réference"
                          visible={stepTwo}
                          onCancel={handleCancelStepTwo}
                          footer={[]}
                          width={1000}
                        >
                          <ListDocuments
                            documents={documents.data}
                            loading={loading}
                            size={3}
                            isButton
                            onClickButton={(e) => handleOkStepTwo(e)}
                            isPreview
                            documentsTypes={documentsTypes}
                          />
                        </Modal>
                        {isVersion ? (
                          <Form.Item
                            label="Numéro de version"
                            name={["document", "version"]}
                            rules={[
                              {
                                required: true,
                                message: "Un numéro de version est requis",
                              },
                              () => ({
                                validator(_, value) {
                                  if (value && value.match(/^(\d+\.)(\d+)$/)) {
                                    return Promise.resolve()
                                  }
                                  return Promise.reject(new Error("Un Numéro de version X.X est requis"))
                                },
                              }),
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        ) : (
                          <Form.Item
                            label="Numéro séquentiel"
                            name={["document", "sequentialNumber"]}
                            rules={[
                              {
                                required: true,
                                message: "Un numéro séquentiel est requis",
                              },
                            ]}
                          >
                            <InputNumber />
                          </Form.Item>
                        )}
                        <Form.Item
                          label="Extension"
                          name={["document", "extension"]}
                          rules={[
                            {
                              required: true,
                              message: "Une extension est requise",
                            },
                          ]}
                        >
                          <Select>
                            <Option value="docx">docx</Option>
                            <Option value="xlsx">xlsx</Option>
                            <Option value="pptx">pptx</Option>
                            <Option value="pdf">pdf</Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Createur"
                          name={["document", "creator"]}
                          rules={[
                            () => ({
                              validator(_, value) {
                                if (value && value.match(/^[A-Z]{3}$/)) {
                                  return Promise.resolve()
                                }
                                return Promise.reject(new Error("Un trigramme est requis"))
                              },
                            }),
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <>
                        <Divider />
                        <Button
                          type="primary"
                          className="classic-button-form "
                          style={{ margin: "0 auto", display: "block" }}
                          onClick={() => form.submit()}
                        >
                          Generer le nom du fichier
                        </Button>
                      </>
                    </Row>
                  </Card>
                </Col>
              </>
            )}
            {step >= 3 && (
              <Col span={24} style={{ padding: 10 }}>
                <Card
                  title="Etape 3 : nom généré "
                  extra={
                    <Button
                      type="primary"
                      className="classic-button"
                      onClick={() => {
                        handleSaveStep3()
                      }}
                      loading={loading}
                    >
                      Enregistrer
                    </Button>
                  }
                >
                  <h3>{generatedName}</h3>
                </Card>
              </Col>
            )}
            {errorSave !== null && (
              <Col span={24} style={{ padding: 10 }}>
                <Alert style={{ marginTop: "10px" }} message="Erreur de sauvegarde" description={errorSave} type="error" />
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    loading: state.loading,
    documents: state.documents,
    documentsTypes: state.metadata.documentsTypes,
    contracts: state.contracts,
  }
}

export default connect(mapStateToProps, { addBreadcrumb, setLoading, addDocument, update, setNavbar })(DocumentCreatePage)
