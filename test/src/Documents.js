import React, { useState, useRef } from "react";
import { Button, Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from 'react-highlight-words';
import Documents2 from './Documents2';
import  "./App.css";

const Documents = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
 

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
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
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Nom',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Date',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...getColumnSearchProps('age'),
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Type',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
      sorter: (a, b) => a.address.localeCompare(b.address),
    },
  ];
  const titleStyle = {
    color: "#000000",
    fontSize: "15px",
  
    marginTop: "0px",
    marginBottom: "0px",}
    
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
  const currentDate = new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const generateData = () => {
    const newData = [];
    for (let i = 0; i < 120; i++) {
      newData.push({
        key: i.toString(),
        name: `John Doe ${i}`,
        age: 25 + i,
        address: `Address ${i}`,
      });
    }
    return newData;
  };

  const data = generateData();

  return (
    <div>
      <div>
      
    </div>
      
       <div style={{ background: "#f1f1f1", minHeight: "100vh" }}>
      <div style={{ margin: "0 50px" ,}}>
      <div style={{ margin: "0 auto" }}>
    <div style={{color:'black',fontSize:"25px"}}>Documents</div>    
    <div style={titleContainerStyle}>
        <h1 style={titleStyle}>MàJ:</h1>
        <span style={dateStyle}>{currentDate}</span>
      </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          onChange={(pagination, filters, sorter) => {
            console.log('Pagination:', pagination);
            console.log('Filters:', filters);
            console.log('Sorter:', sorter);
          }}
        />
         </div>
    </div>
  
    </div>
  
    </div>
  
  );
};
const App = () => {
  const [showOtherPage, setShowOtherPage] = useState(false);

  const toggleOtherPage = () => {
    setShowOtherPage((prevShowOtherPage) => !prevShowOtherPage);
  };
  

  return (
    <div>
      <div className="button-container">
        <button className={`button nouveau ${showOtherPage ? "annuler" : ""}`} onClick={toggleOtherPage}>
          {showOtherPage ? "Annuler" : "Nouveau"}
        </button>
        {showOtherPage ? null : (
          <>
            <button className="button button-1">Exporter les Documents</button>
            <button className="button button-2">Actualiser les Documents</button>
            <button className="button button-3">Actualiser les metadata</button>
            <button className="button button-4">Actualiser les données</button>
          </>
        )}
      </div>
      {showOtherPage ? <Documents2 /> : <Documents />}
    </div>
  );
};

export default App;

