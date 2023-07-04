/* eslint-disable max-len */
import React from "react"
import Highlighter from "react-highlight-words"
import { Input, Button, Row, Col, Checkbox } from "antd"
import { Link } from "@reach/router"
import Icon, { FilterFilled, FilterOutlined, SearchOutlined } from "@ant-design/icons"
import searchFilled from "../assets/searchFilled.svg"

let searchText = ""
let searchedColumn = ""
let focus = null
let checkedList = []

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm()
  const [currentSearchText] = selectedKeys
  searchText = currentSearchText
  searchedColumn = dataIndex
}

const handleReset = (clearFilters) => {
  clearFilters()
  searchText = ""
}

const getColumnSearchProps = (dataIndex, dataSurname, arrayPath, linkData, isDate) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div className="list_utils">
      <Row>
        <Col span={24}>
          <Input
            ref={(node) => {
              focus = node
            }}
            placeholder={`Rechercher ${dataSurname}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          />
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />}>
            Rechercher
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              handleReset(clearFilters)
            }}
          >
            Réinitialiser
          </Button>
        </Col>
      </Row>
    </div>
  ),
  filterIcon: (filtered) =>
    filtered ? (
      <Icon
        style={{ color: "#5EC2D7" }}
        component={() => (
          <svg width="2em" height="2em" fill="#5EC2D7" viewBox="0 0 1024 1024">
            <image x="0" y="0" height="1000.7" width="100%" xlinkHref={searchFilled} />
          </svg>
        )}
      />
    ) : (
      <SearchOutlined style={{ color: undefined, fontSize: "1.9em" }} />
    ),
  onFilter: (value, record) => {
    if (Array.isArray(arrayPath)) {
      let obj = record
      arrayPath.map((child) => {
        obj = obj[child]
      })
      return obj ? obj.toString().toLowerCase().includes(value.toLowerCase()) : ""
    }
    return record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : ""
  },
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => focus.select(), 100)
    }
  },
  render: (textRaw, record) => {
    let text = textRaw
    if (isDate) {
      text = textRaw.substr(0, 10)
    }
    if (linkData) {
      let obj = record
      linkData.var.map((child) => {
        obj = obj[child]
      })
      if (searchedColumn === dataIndex) {
        return (
          <Link to={linkData.path + obj}>
            <Highlighter
              highlightStyle={{ backgroundColor: "#C2E8F0", padding: 0 }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ""}
            />
          </Link>
        )
      }
      return <Link to={linkData.path + obj}>{text}</Link>
    }
    if (searchedColumn === dataIndex) {
      return (
        <Highlighter
          highlightStyle={{ backgroundColor: "#C2E8F0", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      )
    }
    return text
  },
})

const getColumnFilterProps = (dataIndex, filterArray) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div className="list_utils">
      <Row>
        <Col span={24}>
          <Checkbox.Group
            options={filterArray}
            onChange={(e) => {
              setSelectedKeys(e)
              checkedList = e
            }}
            value={checkedList}
          />
        </Col>
        <Col span={12}>
          <Button type="primary" onClick={() => handleSearch(selectedKeys, confirm, dataIndex)} icon={<SearchOutlined />}>
            Filtrer
          </Button>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => {
              handleReset(clearFilters)
              checkedList = []
            }}
          >
            Réinitialiser
          </Button>
        </Col>
      </Row>
    </div>
  ),
  onFilter: (value, record) =>
    record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : "",
  filterIcon: (filtered) =>
    filtered ? (
      <FilterFilled style={{ color: "#5EC2D7", fontSize: "1.7em" }} />
    ) : (
      <FilterOutlined style={{ color: undefined, fontSize: "1.7em" }} />
    ),
})
export { getColumnSearchProps, getColumnFilterProps }
