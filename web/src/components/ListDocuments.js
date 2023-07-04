import React from "react"
import { Col, Card, Table, Row, Button } from "antd"
import moment from "moment"
import { CheckOutlined, EyeOutlined } from "@ant-design/icons"
import { getColumnSearchProps } from "../utils/tableUtils"
import { dateFormat } from "../utils/formatUtils"
import { getLibeleByKey } from "../utils/metadata"

export default function ListDocuments({ documents, title, size, isButton, onClickButton, isPreview, loading, documentsTypes }) {
  const columnsData = []
  if (isPreview) {
    columnsData.push({
      title: "Nom",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.trim().localeCompare(b.name.trim()),
      ...getColumnSearchProps("name", "nom"),
      width: "50%",
    })
  } else {
    columnsData.push({
      title: "Nom",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.trim().localeCompare(b.name.trim()),
      ...getColumnSearchProps("name", "nom", null, {
        path: "/documents/",
        var: ["document_id"],
      }),
      width: "50%",
    })
  }

  columnsData.push(
    ...[
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        sorter: {
          compare: (a, b) => a.date.trim().localeCompare(b.date.trim()),
        },
        ...getColumnSearchProps("date", "date", null, null, true),
        width: "20%",
        render: (date) => moment(date).format(dateFormat),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        sorter: (a, b) => a.type.trim().localeCompare(b.type.trim()),
        ...getColumnSearchProps("type", "type"),
        width: "15%",
        render: (type) => getLibeleByKey(documentsTypes, type),
      },
    ]
  )

  if (isButton || isPreview) {
    columnsData.push({
      dataIndex: "document_id",
      key: "document_id",
      width: "5%",
      render: (id, payload) => (
        <>
          {isPreview && (
            <Button
              key={Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 5)}
              onClick={() => window.open(`/documents/${id}`, "_blank").focus}
            >
              <EyeOutlined />
            </Button>
          )}
          {isButton && (
            <Button
              key={Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 5)}
              onClick={() => onClickButton(payload)}
            >
              <CheckOutlined />
            </Button>
          )}
        </>
      ),
    })
  }
  return (
    <div className="list-documents">
      <Row>
        <Col span={24}>
          {title ? (
            <Card title={title}>
              <Table
                loading={loading}
                columns={columnsData}
                dataSource={documents}
                pagination={{
                  pageSize: size,
                }}
                rowKey="document_id"
              />
            </Card>
          ) : (
            <Table
              loading={loading}
              columns={columnsData}
              dataSource={documents}
              pagination={{
                pageSize: size || 10,
                hideOnSinglePage: true,
              }}
              rowKey="document_id"
            />
          )}
        </Col>
      </Row>
    </div>
  )
}
