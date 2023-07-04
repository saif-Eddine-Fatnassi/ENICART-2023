/* eslint-disable camelcase */
import React from "react"
import { Table, Button, Row, Col } from "antd"
import { CheckOutlined, EyeOutlined } from "@ant-design/icons"
import { getColumnSearchProps, getColumnFilterProps } from "../utils/tableUtils"
import StatusIcon from "./StatusIcon"

export default function ListContracts({ contracts, loading, size, isButton, onClickButton, isPreview }) {
  const columnsData = []
  if (isPreview) {
    columnsData.push({
      title: "Titre",
      dataIndex: "title",
      key: "title",
      sorter: {
        compare: (a, b) => a.title.trim().localeCompare(b.title.trim()),
      },
      ...getColumnSearchProps("title", "titre"),
      width: "40%",
    })
  } else {
    columnsData.push({
      title: "Titre",
      dataIndex: "title",
      key: "title",
      sorter: {
        compare: (a, b) => a.title.trim().localeCompare(b.title.trim()),
      },
      ...getColumnSearchProps("title", "titre", null, {
        path: "/contracts/",
        var: ["contract_id"],
      }),
      width: "40%",
    })
  }

  columnsData.push(
    ...[
      {
        title: "Client",
        dataIndex: "customer_name",
        key: "customer_name",
        sorter: {
          compare: (a, b) => a.customer_name.trim().localeCompare(b.customer_name.trim()),
        },
        ...getColumnSearchProps("customer_name", "client"),
        width: "40%",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        sorter: {
          compare: (a, b) => a.status.localeCompare(b.status),
        },
        ...getColumnFilterProps("status", [
          { label: "Opportunity", value: "Opportunity" },
          { label: "In-progress", value: "In-progress" },
          { label: "Closed", value: "Closed" },
          { label: "Canceled", value: "Canceled" },
        ]),

        width: "20%",
        render: (status) => (
          <span>
            <StatusIcon status={status} />
            &nbsp;&nbsp; {status}
          </span>
        ),
      },
    ]
  )
  if (isButton || isPreview) {
    columnsData.push({
      dataIndex: "contract_id",
      key: "contract_id",
      width: "5%",
      render: (contract_id, payload) => (
        <>
          {isPreview && (
            <Button
              key={Math.random()
                .toString(36)
                .replace(/[^a-z]+/g, "")
                .substr(0, 5)}
              onClick={() => window.open(`/contracts/${contract_id}`, "_blank").focus}
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
    <Row>
      <Col span={24}>
        <Table
          rowKey="contract_id"
          columns={columnsData}
          dataSource={contracts}
          pagination={{
            showSizeChanger: false,
            showQuickJumper: true,
            pageSize: size || 10,
            hideOnSinglePage: true,
          }}
          loading={loading}
        />
      </Col>
    </Row>
  )
}
