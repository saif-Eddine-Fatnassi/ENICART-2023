import React, { useState } from "react";
import { Button, Table, Modal, Input,Space } from "antd";
import { SearchOutlined, EditOutlined, EyeOutlined,DeleteOutlined } from "@ant-design/icons";
import "./App.css" ;
import FormulaireRemplir from "./Formulaire";


const Documents2 = () => {
  //save data table
  const [selectedRowData, setSelectedRowData] = useState(null);
    //formulaire
    const [showFormulaire, setShowFormulaire] = useState(false);
    const [showSection, setShowSection] = useState(true);
  const handleNouveauDocument = () => {
        setIsModalVisible(false); // Hide the modal when the "Modifier" button is clicked
    setShowSection(false); // Hide the section when the "Modifier" button is clicked
    setShowFormulaire(true); // Show the FormulaireRemplir component
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showForm, setShowForm] = useState(false); // New state to determine whether to show the form
  
  const handleEditClick = () => {
    setShowSection(true); // Show the section when the "Modifier" button is clicked
    setShowFormulaire(false);
        setIsModalVisible(true);
  };

  const dataSource = [
    { key: "1", name: "John Doe", age: 30, address: "New York" },
    { key: "2", name: "Jane Smith", age: 25, address: "Los Angeles" },
    // Add more data if needed
  ];

  const columns = [
    {
      title: "Titre",
      dataIndex: "name",
      key: "name",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search name"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
      sorter: (a, b) => a.age - b.age, // Sorting function for 'Age' column
    },    
    
    {
      title: "Client",
      dataIndex: "age",
      key: "age",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search age"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
      sorter: (a, b) => a.age - b.age,    
    },
    {
      title: "Status",
      dataIndex: "address",
      key: "address",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search address"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            type="primary"
            onClick={() => confirm()}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
      sorter: (a, b) => a.address.localeCompare(b.address), // Sorting function for 'Address' column
    },
  
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: (_, record) => (
      <Space>
        <Button icon={<EditOutlined />} onClick={handleModalOk} onClick={() => handleEdit(record)} onClick={handleNouveauDocument}>
          Modifier
        </Button>
        <Button icon={<EyeOutlined />} onClick={() => handleViewDocument(record)}>
          Afficher Document
        </Button>
      </Space>
    ),
  },
];
  const handleModalOk = () => {
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const handleEdit = (record) => {
    // Implement the logic for editing the row here
    console.log("Edit clicked for record:", record);
    setSelectedRowData(record);
    setIsModalVisible(false);
  };

  const handleViewDocument = (record) => {
    // Implement the logic for viewing the document associated with the row here
    console.log("View Document clicked for record:", record);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    {/* The frame with a single line */}
    {showSection && (
      <div style={{ border: "2px solid black", padding: "20px", borderRadius: "10px", marginBottom: "500px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Etape 1 : Affaire séléctionnée</p>
          <Button className="edit-button" icon={<EditOutlined />} onClick={handleEditClick}>
            Modifier
          </Button>
        </div>
      </div>
    )}

    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      {showFormulaire && <FormulaireRemplir />}
    </div>     
      <Modal
        title="Selection d'une affaire"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        width={800}
      >
        {/* Insert the table here */}
        <Table dataSource={dataSource} columns={columns} />
      </Modal>
    </div>
  );
};

export default Documents2;