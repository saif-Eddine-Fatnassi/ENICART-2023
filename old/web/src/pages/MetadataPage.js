import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { connect, useDispatch } from "react-redux"
import { Button, Table, Row, Col, Card, Space, Form, Input, Select, Popover, Alert, message, Modal } from "antd"
import { PlusOutlined, CloseOutlined, EditOutlined, DeleteOutlined, CheckOutlined, SettingOutlined } from "@ant-design/icons"
import { getColumnSearchProps } from "../utils/tableUtils"
import {
  updateMetadata as updateMetadataInBase,
  addMetadata as addMetadataInBase,
  deleteMetadata as deleteMetadataInBase,
  updateDocumentType,
  addDocumentType,
  deleteDocumentType,
  updateMetadataGroup,
  deleteMetadataGroup,
} from "../utils/currentRequest"
import {
  addBreadcrumb,
  updateAllMetadata,
  setLoading,
  setNavbar,
  updateMetadata,
  deleteMetadata,
  addMetadata,
  setLoadingDatabase,
  update,
  deleteGroup,
  editGroup,
} from "../redux/actions"

function MetadataPage({ metadata, documentsTypes, error, loadingDatabase, loading }) {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(undefined)
  const [isDeleting, setIsDeleting] = useState(undefined)
  const [isAdding, setIsAdding] = useState(undefined)
  const [errorBase, setErrorBase] = useState(null)
  const [modal, setModal] = useState(undefined)
  const [modalAdd, setModalAdd] = useState(false)
  const [popoverDeleteGroup, setPopoverDeleteGroup] = useState(false)
  const [form] = Form.useForm()
  const [formModal] = Form.useForm()
  const [formModalAdd] = Form.useForm()
  const { Option } = Select

  const onAddGroup = (group) => {
    addMetadataInBase({ group, value: "nouveau" })
      .then((response) => {
        dispatch(addMetadata(response))
        setErrorBase(null)
        message.success("Ajout réussie")
        setModalAdd(false)
      })
      .catch((err) => {
        setErrorBase(err.message)
        setModalAdd(false)
      })
  }

  const onEditGroup = (newGroup) => {
    updateMetadataGroup(modal, newGroup)
      .then(() => {
        dispatch(editGroup({ group: modal, newGroup }))
        setErrorBase(null)
        message.success("Modification réussie")
        setModal(undefined)
      })
      .catch((err) => {
        setErrorBase(err.message)
        setModalAdd(false)
      })
  }

  const onDeleteGroup = (group) => {
    deleteMetadataGroup(group)
      .then(() => {
        dispatch(deleteGroup({ group }))
        setErrorBase(null)
        message.success("Suppression réussie")
        setModal(undefined)
      })
      .catch((err) => {
        setErrorBase(err.message)
        setModalAdd(false)
      })
  }

  const onFinish = (data) => {
    if (isAdding) {
      if (isAdding === "documentsTypes") {
        addDocumentType({ ...data, isInVersion: data.isInVersion === "Version" })
          .then((response) => {
            dispatch(addMetadata(response))
            setErrorBase(null)
            message.success("Ajout réussie")
          })
          .catch((err) => {
            setErrorBase(err.message)
          })
      } else {
        addMetadataInBase({ group: isAdding, ...data })
          .then((response) => {
            dispatch(addMetadata(response))
            setErrorBase(null)
            message.success("Ajout réussie")
          })
          .catch((err) => {
            setErrorBase(err.message)
          })
      }
    } else if (isEditing.group === "documentsTypes") {
      updateDocumentType(isEditing.document_type_id, { ...data, isInVersion: data.isInVersion === "Version" })
        .then((response) => {
          dispatch(updateMetadata(response))
          setErrorBase(null)
          message.success("Modification réussie")
        })
        .catch((err) => {
          setErrorBase(err.message)
        })
    } else {
      updateMetadataInBase(isEditing.metadata_id, {
        ...data,
        group: isEditing.group,
      })
        .then((response) => {
          dispatch(updateMetadata(response))
          setErrorBase(null)
          message.success("Modification réussie")
        })
        .catch((err) => {
          setErrorBase(err.message)
        })
    }
    setIsEditing(undefined)
    setIsAdding(undefined)
  }

  const onDelete = (id) => {
    if (isDeleting.group === "documentsTypes") {
      deleteDocumentType(id)
        .then(() => {
          dispatch(deleteMetadata({ id }))
          setErrorBase(null)
          message.success("Suppression réussie")
        })
        .catch((err) => {
          setErrorBase(err.message)
        })
    } else {
      deleteMetadataInBase(id)
        .then(() => {
          dispatch(deleteMetadata({ group: isDeleting.group, id }))
          setErrorBase(null)
          message.success("Suppression réussie")
        })
        .catch((err) => {
          setErrorBase(err.message)
        })
    }
    setIsDeleting(undefined)
  }

  useEffect(() => {
    dispatch(setNavbar("metadata"))
    dispatch(
      addBreadcrumb({
        reset: true,
        data: [{ name: "Metadata", href: "/metadata" }],
      })
    )
  }, [dispatch])

  const tableRender = (dataSource, name, title) => {
    return (
      <Card
        title={title}
        extra={
          <>
            <Button
              type="primary"
              className="classic-round-button"
              onClick={() => {
                setModal(title)
              }}
              shape="circle"
            >
              <SettingOutlined />
            </Button>
          </>
        }
      >
        {isAdding && isAdding === name && (
          <Row>
            <Col span={18}>
              <Form.Item name="value" rules={[{ required: true }]} initialValue="Nouveau" style={{ margin: "auto" }}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <div style={{ float: "right", paddingRight: "16px" }}>
                <Space size={30}>
                  <Button
                    type="primary"
                    onClick={() => {
                      form.submit()
                    }}
                    shape="circle"
                  >
                    <CheckOutlined />
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => {
                      setIsAdding(undefined)
                    }}
                    shape="circle"
                  >
                    <CloseOutlined />
                  </Button>
                </Space>
              </div>
            </Col>
          </Row>
        )}
        <Table
          loading={loading}
          rowKey="metadata_id"
          columns={[
            {
              dataIndex: "value",
              key: "value",
              sorter: {
                compare: (a, b) => a.value.localeCompare(b.value),
              },
              ...getColumnSearchProps("value", title),
              width: "100%",
              render: (value, record) => (
                <div>
                  {isEditing && isEditing.group === name && isEditing.metadata_id === record.metadata_id ? (
                    <Form.Item name="value" rules={[{ required: true }]} initialValue={value} style={{ margin: "auto" }}>
                      <Input />
                    </Form.Item>
                  ) : (
                    <span>{value}</span>
                  )}
                </div>
              ),
            },
            {
              width: "5%",
              dataIndex: "value",
              key: "value",
              render: (value, record) => (
                <div>
                  {isEditing && isEditing.group === name && isEditing.metadata_id === record.metadata_id ? (
                    <Button
                      type="primary"
                      onClick={() => {
                        form.submit()
                      }}
                      shape="circle"
                    >
                      <CheckOutlined />
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      onClick={() => {
                        form.setFieldsValue({
                          key: undefined,
                          value: record.value,
                          isInVersion: undefined,
                        })
                        setIsEditing(record)
                      }}
                      shape="circle"
                      disabled={isEditing || isAdding}
                    >
                      <EditOutlined />
                    </Button>
                  )}
                </div>
              ),
            },
            {
              title: (
                <Button
                  type="primary"
                  className="classic-round-button"
                  onClick={() => {
                    form.setFieldsValue({
                      key: undefined,
                      value: "Nouveau",
                      isInVersion: undefined,
                    })
                    setIsAdding(name)
                  }}
                  shape="circle"
                  disabled={isEditing || isAdding}
                >
                  <PlusOutlined />
                </Button>
              ),
              width: "5%",
              dataIndex: "value",
              key: "value",
              render: (value, record) => (
                <div>
                  {isEditing && isEditing.group === name && isEditing.metadata_id === record.metadata_id ? (
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsEditing(undefined)
                      }}
                      shape="circle"
                    >
                      <CloseOutlined />
                    </Button>
                  ) : (
                    <Popover
                      content={
                        <Space style={{ height: "100%", width: "100%", paddingBottom: "0px" }}>
                          <Button onClick={() => setIsDeleting(undefined)}>Annuler</Button>
                          <Button type="primary" onClick={() => onDelete(record.metadata_id)}>
                            Supprimer <DeleteOutlined />
                          </Button>
                        </Space>
                      }
                      title="Voulez-vous vraiment supprimer ?"
                      trigger="click"
                      visible={!!(isDeleting && isDeleting.group === name && isDeleting.metadata_id === record.metadata_id)}
                      onVisibleChange={(visible) => {
                        if (!visible) {
                          setIsDeleting(undefined)
                        }
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => {
                          setIsDeleting(record)
                        }}
                        shape="circle"
                        disabled={isEditing || isAdding}
                      >
                        <DeleteOutlined />
                      </Button>
                    </Popover>
                  )}
                </div>
              ),
            },
          ]}
          dataSource={dataSource}
        />
      </Card>
    )
  }

  return (
    <div className="metadata">
      <Helmet>
        <title>Metadata</title>
      </Helmet>
      <Modal
        title={`Paramètre de ${modal}`}
        visible={modal !== undefined}
        onCancel={() => setModal(undefined)}
        footer={[
          <Button key="back" onClick={() => setModal(undefined)}>
            Annuler
          </Button>,
          <Button key="save" type="primary" loading={loading} onClick={() => formModal.submit()}>
            Sauvegarder
          </Button>,
          <Popover
            content={
              <Space style={{ height: "100%", width: "100%", paddingBottom: "0px" }}>
                <Button onClick={() => setPopoverDeleteGroup(false)}>Annuler</Button>
                <Button
                  type="primary"
                  onClick={() => {
                    onDeleteGroup(modal)
                    setPopoverDeleteGroup(false)
                  }}
                >
                  Supprimer <DeleteOutlined />
                </Button>
              </Space>
            }
            title="Voulez-vous vraiment supprimer ?"
            trigger="click"
            visible={popoverDeleteGroup}
            onVisibleChange={(visible) => {
              if (!visible) {
                setPopoverDeleteGroup(false)
              }
            }}
          >
            <Button key="delete" type="primary" onClick={() => setPopoverDeleteGroup(true)}>
              Supprimer
            </Button>
          </Popover>,
        ]}
      >
        <Form
          onFinish={(values) => {
            onEditGroup(values.edit)
          }}
          form={formModal}
          labelAlign="left"
        >
          <Form.Item
            label="Nouveau nom"
            name="edit"
            initialValue={modal}
            rules={[{ required: true, message: "Ne peut etre vide" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Ajouter un nouveau type"
        visible={modalAdd}
        onCancel={() => setModalAdd(false)}
        footer={[
          <Button key="back" onClick={() => setModalAdd(false)}>
            Annuler
          </Button>,
          <Button key="save" type="primary" loading={loading} onClick={() => formModalAdd.submit()}>
            Sauvegarder
          </Button>,
        ]}
      >
        <Form
          onFinish={(values) => {
            onAddGroup(values.new)
          }}
          form={formModalAdd}
          labelAlign="left"
        >
          <Form.Item
            label="Nouveau nom"
            name="new"
            initialValue={modal}
            rules={[{ required: true, message: "Ne peut etre vide" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Row>
        <Col span={24} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setModalAdd(true)
              }}
              className="classic-button"
              loading={loading}
            >
              Ajouter un nouveau type
            </Button>
          </Space>
          <Space style={{ float: "right" }}>
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
        </Col>
        <Col span={24}>
          <Form form={form} onFinish={onFinish}>
            <Row>
              {error !== "" && (
                <Col span={24} style={{ padding: 10 }}>
                  <Alert
                    style={{ marginTop: "10px" }}
                    message="Erreur de récupération des métadata"
                    description={error}
                    type="error"
                  />
                </Col>
              )}
              {errorBase !== null && (
                <Col span={24} style={{ padding: 10 }}>
                  <Alert style={{ marginTop: "10px" }} message="Erreur" description={errorBase} type="error" />
                </Col>
              )}
              <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: 10 }}>
                <Card title="Type de documents">
                  {isAdding && isAdding === "documentsTypes" && (
                    <Row>
                      <Col span={18}>
                        <Form.Item
                          label="Clé"
                          name="key"
                          rules={[{ required: true }]}
                          initialValue="NEW"
                          style={{ margin: "auto" }}
                          labelCol={{ span: 4 }}
                          wrapperCol={{ span: 20 }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Valeur"
                          name="value"
                          rules={[{ required: true }]}
                          initialValue="Nouveau"
                          style={{ margin: "auto" }}
                          labelCol={{ span: 4 }}
                          wrapperCol={{ span: 20 }}
                        >
                          <Input />
                        </Form.Item>
                        <Form.Item
                          label="Type"
                          name="isInVersion"
                          rules={[{ required: true }]}
                          initialValue="Version"
                          style={{ margin: "auto" }}
                          labelCol={{ span: 4 }}
                          wrapperCol={{ span: 20 }}
                        >
                          <Select style={{ width: "100%" }}>
                            <Option value="Version">Version</Option>
                            <Option value="Séquentiel">Séquentiel</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div style={{ float: "right", paddingRight: "16px" }}>
                          <Space size={30}>
                            <Button
                              type="primary"
                              onClick={() => {
                                form.submit()
                              }}
                              shape="circle"
                            >
                              <CheckOutlined />
                            </Button>

                            <Button
                              type="primary"
                              onClick={() => {
                                setIsAdding(undefined)
                              }}
                              shape="circle"
                            >
                              <CloseOutlined />
                            </Button>
                          </Space>
                        </div>
                      </Col>
                    </Row>
                  )}
                  <Table
                    loading={loading}
                    rowKey="document_type_id"
                    columns={[
                      {
                        title: "Clé",
                        dataIndex: "key",
                        key: "key",
                        sorter: {
                          compare: (a, b) => a.key.localeCompare(b.key),
                        },
                        ...getColumnSearchProps("key", "clé"),
                        render: (key, record) => (
                          <div>
                            {isEditing &&
                            isEditing.group === "documentsTypes" &&
                            isEditing.document_type_id === record.document_type_id ? (
                              <Form.Item name="key" rules={[{ required: true }]} initialValue={key} style={{ margin: "auto" }}>
                                <Input />
                              </Form.Item>
                            ) : (
                              <span>{key}</span>
                            )}
                          </div>
                        ),
                      },
                      {
                        title: "Valeur",
                        dataIndex: "value",
                        key: "value",
                        sorter: {
                          compare: (a, b) => a.value.localeCompare(b.value),
                        },
                        ...getColumnSearchProps("value", "Valeur"),
                        render: (value, record) => (
                          <div>
                            {isEditing &&
                            isEditing.group === "documentsTypes" &&
                            isEditing.document_type_id === record.document_type_id ? (
                              <Form.Item
                                name="value"
                                rules={[{ required: true }]}
                                initialValue={value}
                                style={{ margin: "auto" }}
                              >
                                <Input />
                              </Form.Item>
                            ) : (
                              <span>{value}</span>
                            )}
                          </div>
                        ),
                      },
                      {
                        title: "Type",
                        dataIndex: "isInVersion",
                        key: "isInVersion",
                        sorter: {
                          compare: (a, b) => a.isInVersion.localeCompare(b.isInVersion),
                        },
                        render: (isInVersion, record) => (
                          <div>
                            {isEditing &&
                            isEditing.group === "documentsTypes" &&
                            isEditing.document_type_id === record.document_type_id ? (
                              <Form.Item
                                name="isInVersion"
                                rules={[{ required: true }]}
                                initialValue={isInVersion}
                                style={{ margin: "auto" }}
                              >
                                <Select style={{ width: 120 }}>
                                  <Option value="Version">Version</Option>
                                  <Option value="Séquentiel">Séquentiel</Option>
                                </Select>
                              </Form.Item>
                            ) : (
                              <span>{isInVersion ? "Version" : "Séquentiel"}</span>
                            )}
                          </div>
                        ),
                      },
                      {
                        width: "5%",
                        dataIndex: "key",
                        key: "key",
                        render: (key, record) => (
                          <div>
                            {isEditing &&
                            isEditing.group === "documentsTypes" &&
                            isEditing.document_type_id === record.document_type_id ? (
                              <Button
                                type="primary"
                                onClick={() => {
                                  form.submit()
                                }}
                                shape="circle"
                              >
                                <CheckOutlined />
                              </Button>
                            ) : (
                              <Button
                                type="primary"
                                onClick={() => {
                                  form.setFieldsValue({
                                    key: record.key,
                                    value: record.value,
                                    isInVersion: record.isInVersion ? "Version" : "Séquentiel",
                                  })
                                  setIsEditing(record)
                                }}
                                shape="circle"
                                disabled={isEditing || isAdding}
                              >
                                <EditOutlined />
                              </Button>
                            )}
                          </div>
                        ),
                      },
                      {
                        title: (
                          <Button
                            type="primary"
                            className="classic-round-button"
                            onClick={() => {
                              form.setFieldsValue({
                                key: "New",
                                value: "Nouveau",
                                isInVersion: "Version",
                              })
                              setIsAdding("documentsTypes")
                            }}
                            shape="circle"
                            disabled={isEditing || isAdding}
                          >
                            <PlusOutlined />
                          </Button>
                        ),
                        width: "5%",
                        dataIndex: "key",
                        key: "key",
                        render: (key, record) => (
                          <div>
                            {isEditing &&
                            isEditing.group === "documentsTypes" &&
                            isEditing.document_type_id === record.document_type_id ? (
                              <Button
                                type="primary"
                                onClick={() => {
                                  setIsEditing(undefined)
                                }}
                                shape="circle"
                              >
                                <CloseOutlined />
                              </Button>
                            ) : (
                              <Popover
                                content={
                                  <Space style={{ height: "100%", width: "100%", paddingBottom: "0px" }}>
                                    <Button onClick={() => setIsDeleting(undefined)}>Annuler</Button>
                                    <Button type="primary" onClick={() => onDelete(record.document_type_id)}>
                                      Supprimer <DeleteOutlined />
                                    </Button>
                                  </Space>
                                }
                                title="Voulez-vous vraiment supprimer ?"
                                trigger="click"
                                visible={
                                  !!(
                                    isDeleting &&
                                    isDeleting.group === "documentsTypes" &&
                                    isDeleting.document_type_id === record.document_type_id
                                  )
                                }
                                onVisibleChange={(visible) => {
                                  if (!visible) {
                                    setIsDeleting(undefined)
                                  }
                                }}
                              >
                                <Button
                                  type="primary"
                                  onClick={() => {
                                    setIsDeleting(record)
                                  }}
                                  shape="circle"
                                  disabled={isEditing || isAdding}
                                >
                                  <DeleteOutlined />
                                </Button>
                              </Popover>
                            )}
                          </div>
                        ),
                      },
                    ]}
                    dataSource={documentsTypes}
                  />
                </Card>
              </Col>
              {Object.keys(metadata).map((key) => (
                <Col xs={{ span: 24 }} xl={{ span: 12 }} style={{ padding: 10 }}>
                  {tableRender(metadata[key], key, key)}
                </Col>
              ))}
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    metadata: state.metadata.others,
    documentsTypes: state.metadata.documentsTypes,
    error: state.metadata.error || "",
    loadingDatabase: state.loadingDatabase,
    loading: state.loading,
  }
}

export default connect(mapStateToProps, {
  addBreadcrumb,
  setLoading,
  updateAllMetadata,
  setNavbar,
  updateMetadata,
  deleteMetadata,
  addMetadata,
  setLoadingDatabase,
  update,
})(MetadataPage)
