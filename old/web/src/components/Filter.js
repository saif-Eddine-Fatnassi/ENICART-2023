import React, { useState, useEffect } from "react"
import { Card, Divider, Button, Space, Form, Input, Col, Row, DatePicker, Select } from "antd"
import { FilterFilled, FilterOutlined, UndoOutlined } from "@ant-design/icons"
import { stringSimplfier } from "../utils/fitler"
import { dateFormat } from "../utils/formatUtils"

// eslint-disable-next-line no-unused-vars
export default function Filter({ isDocument, OnFilter, loading, metadata, style, dataFilter, filter, OnReset, keywords }) {
  const [hide, setHide] = useState(true)
  const [isFiltered, setIsFiltered] = useState(filter !== undefined)
  const [tags, setTags] = useState([])
  const [form] = Form.useForm()
  const [metadataList, setMetadataList] = useState([])
  const { Option } = Select
  const { RangePicker } = DatePicker
  const safeFilter = filter || {}

  const onFinish = (values) => {
    OnFilter({ ...values, tags })
  }

  useEffect(() => {
    if (metadata) {
      const list = []
      Object.keys(metadata).map((category) => {
        if (category !== "documentsTypes") {
          metadata[category].map((item) => list.push(item))
        }
      })
      setMetadataList(list.sort((a, b) => a.value.trim().localeCompare(b.value.trim())))
    }
  }, [metadata])

  return (
    <div style={style}>
      <Space>
        <Button
          type="primary"
          className="classic-button"
          ghost={hide}
          icon={hide ? <FilterOutlined /> : <FilterFilled />}
          onClick={() => {
            setHide(!hide)
          }}
          style={{ width: "180px" }}
        >
          {hide ? " Montrer les filtres" : "Cacher les filtres"}
        </Button>
        <Button
          type="primary"
          className="classic-button"
          icon={<UndoOutlined />}
          onClick={() => {
            OnReset()
            setTags([])
            setIsFiltered(false)
            OnFilter(undefined)
            setTimeout(() => {
              form.resetFields()
            }, 5)
          }}
          disabled={!isFiltered}
        >
          Réinitialiser les filtres
        </Button>
      </Space>
      {!hide && (
        <>
          <Card title={<span style={{ color: "var(--dia-blue)", paddingLeft: 10 }}>Filtres</span>}>
            <Form
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              labelAlign="left"
              form={form}
              onFinish={onFinish}
              onValuesChange={() => setIsFiltered(true)}
              initialValues={undefined}
            >
              {isDocument ? (
                <>
                  <Row>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="contract_name" label="Par nom d'affaire" initialValue={safeFilter.contract_name}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="name" label="Par nom de document" initialValue={safeFilter.name}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="domain" label="Par domaine" initialValue={safeFilter.domain}>
                        <Select showSearch allowClear>
                          <Option value="C">Client</Option>
                          <Option value="F">Fournisseur</Option>
                          <Option value="P">Partenaire</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="type" label="Par type de document" initialValue={safeFilter.type}>
                        <Select
                          showSearch
                          allowClear
                          filterOption={(inputValue, option) =>
                            stringSimplfier(
                              metadata.documentsTypes.find((obj) => obj.document_type_id === option.value).value
                            ).includes(stringSimplfier(inputValue))
                          }
                        >
                          {metadata &&
                            metadata.documentsTypes &&
                            metadata.documentsTypes.map((obj) => <Option value={obj.document_type_id}>{obj.value}</Option>)}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="date" label="Par date du document" initialValue={safeFilter.date}>
                        <RangePicker format={dateFormat} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="creationDate" label="Par date de création" initialValue={safeFilter.creationDate}>
                        <RangePicker format={dateFormat} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="customer" label="Par client" initialValue={safeFilter.customer}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="extension" label="Par extension" initialValue={safeFilter.extension}>
                        <Select showSearch allowClear>
                          <Option value="docx">docx</Option>
                          <Option value="xlsx">xlsx</Option>
                          <Option value="pptx">pptx</Option>
                          <Option value="pdf">pdf</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="metadata" label="Par metadata" initialValue={safeFilter.metadata}>
                        <Select
                          mode="multiple"
                          filterOption={(inputValue, option) =>
                            stringSimplfier(metadataList.find((obj) => obj.metadata_id === option.value).value).includes(
                              stringSimplfier(inputValue)
                            )
                          }
                        >
                          {metadataList.map((obj) => (
                            <Option value={obj.metadata_id}>{obj.value}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="keywords" label="Par mot clé" initialValue={safeFilter.keywords}>
                        <Select mode="mutliple" showSearch allowClear>
                          {keywords.map((word) => (
                            <Option value={[word]}>{word}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="contract_id" label="Par ID d'affaire" initialValue={safeFilter.contract_id}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="company" label="Par entreprise" initialValue={safeFilter.company}>
                        <Select showSearch allowClear>
                          {dataFilter.company.map((obj) => (
                            <Option value={obj}>{obj}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="date" label="Par date" initialValue={safeFilter.date}>
                        <RangePicker format={dateFormat} style={{ width: "100%" }} />
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item
                        name="affected_commercials"
                        label="Par commerciaux affectés"
                        initialValue={safeFilter.affected_commercials}
                      >
                        <Select
                          mode="multiple"
                          filterOption={(inputValue, option) =>
                            stringSimplfier(
                              dataFilter.commercials.find((obj) => obj.employeeId === option.value).fullName
                            ).includes(stringSimplfier(inputValue))
                          }
                        >
                          {dataFilter.commercials.map((obj) => (
                            <Option value={obj.employeeId}>{obj.fullName}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item
                        name="affected_project_managers"
                        label="Par chefs de projet affectés"
                        initialValue={safeFilter.affected_project_managers}
                      >
                        <Select
                          mode="multiple"
                          filterOption={(inputValue, option) =>
                            stringSimplfier(option.value).includes(stringSimplfier(inputValue))
                          }
                        >
                          {dataFilter.projectManagers.map((obj) => (
                            <Option value={obj.fullName}>{obj.fullName}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} style={{ paddingLeft: 10, paddingRight: 10 }}>
                      <Form.Item name="creator" label="Par créateur" initialValue={safeFilter.creator}>
                        <Select showSearch allowClear>
                          {dataFilter.creator.map((obj) => (
                            <Option value={obj}>{obj}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </Form>
            <Button
              style={{ marginLeft: "10px" }}
              loading={loading}
              type="primary"
              icon={<FilterFilled />}
              onClick={() => {
                form.submit()
              }}
              disabled={!isFiltered}
            >
              Filtrer
            </Button>
          </Card>
          <Divider />
        </>
      )}
    </div>
  )
}
