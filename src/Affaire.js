import React, { useState, useRef } from "react";
import { Button, Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./App.css";
const Affaire = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Titre",
      dataIndex: "name",
      key: "name",
      width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "client",
      dataIndex: "age",
      key: "age",
      width: "20%",
      ...getColumnSearchProps("age"),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address"),
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
  ];
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const titleStyle = {
    color: "#000000",
    fontSize: "15px",

    marginTop: "0px",
    marginBottom: "0px",
  };

  const dateStyle = {
    fontSize: "16px",
    textAlign: "right",
    marginRight: "10px",
  };
  const titleContainerStyle = {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "10px",
  };

  const generateData = () => {
    const newData = [];
    for (let i = 0; i < 2200; i++) {
      newData.push({
        key: i.toString(),
        name: `John Doe ${i}`,
        age: 25 + i,
        address: `Adress ${i}`,
      });
    }
    return newData;
  };

  const data = generateData();

  return (
    <div>
      <div></div>
      <div className="button-container">
        <div className="column">
          <button className="left-button">Exporter les Affaires</button>
          <button className="left-button">Montrer les filtres </button>
          <button className="left-button">Réinitialiser les filtres </button>
        </div>
        <div className="column">
          <button className="right-button">Actualiser les Affaires</button>
          <button className="right-button">
            Actualiser les données en base{" "}
          </button>
        </div>
      </div>

      <div style={{ background: "#f1f1f1", minHeight: "100vh" }}>
        <div style={{ margin: "0 50px" }}>
          <div style={{ margin: "0 auto" }}>
            <div style={{ color: "black", fontSize: "25px" }}>Affaires</div>
            <div style={titleContainerStyle}>
              <h1 style={titleStyle}>Aujourd'hui :</h1>
              <span style={dateStyle}>{currentDate}</span>
            </div>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
              onChange={(pagination, filters, sorter) => {
                console.log("Pagination:", pagination);
                console.log("Filters:", filters);
                console.log("Sorter:", sorter);
              }}
            />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affaire;
