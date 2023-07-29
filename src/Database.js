import React, { useState, useRef } from "react";
import { Button, Card, Input, Table, Modal, Form, Space } from "antd";
import { SearchOutlined,EditOutlined,DeleteOutlined,} from "@ant-design/icons";
import { Helmet } from "react-helmet";
import Highlighter from "react-highlight-words";
import "./App.css" ;



const { Column } = Table;
const Database = () => {
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

  const [dataSource1, setDataSource1] = useState([
    { key: 1, recherche: "Recherche 1", col2: "Donnée A", col3: "Donnée X" },
    { key: 2, recherche: "Recherche 2", col2: "Donnée B", col3: "Donnée Y" },
    { key: 3, recherche: "Recherche 3", col2: "Donnée C", col3: "Donnée Z" },
    { key: 4, recherche: "Recherche 4", col2: "Donnée D", col3: "Donnée W" },
    { key: 5, recherche: "Recherche 5", col2: "Donnée E", col3: "Donnée V" },
  ]);

  const [dataSource2, setDataSource2] = useState([
    { key: 1, recherche: "Recherche A", col2: "Donnée X", col3: "Donnée M" },
    { key: 2, recherche: "Recherche B", col2: "Donnée Y", col3: "Donnée N" },
    { key: 3, recherche: "Recherche C", col2: "Donnée Z", col3: "Donnée O" },
    { key: 4, recherche: "Recherche D", col2: "Donnée W", col3: "Donnée P" },
    { key: 6, recherche: "Recherche E", col2: "Donnée V", col3: "Donnée Q" },
  ]);

  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const columns1 = [
    {
      title: (
        <div>
          <h3>
            Titre
          </h3>
        </div>
      ),
      dataIndex: "recherche",
      key: "recherche",
      ...getColumnSearchProps("recherche"), // Enable search for this column
    },
    {
      title: (
        <div>
           <h3>
            Client
          </h3>
        </div>
      ),
      dataIndex: "col2",
      key: "col2",
      ...getColumnSearchProps("col2"), // Enable search for this column
    },
    {
      title: (
        <div>
         <h3>
            Status
          </h3>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
      ...getColumnSearchProps("col3"), // Enable search for this column
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  //newsearchoption

  const columns2 = [
    {
      title: (
        <div>
          <h3>
            Nom
          </h3>
        </div>
      ),
      dataIndex: "recherche",
      key: "recherche",
      ...getColumnSearchProps("recherche"), // Enable search for this column
    },
    {
      title: (
        <div>
         <h3>
            Date
          </h3>
        </div>
      ),
      dataIndex: "col2",
      key: "col2",
      ...getColumnSearchProps("col2"), // Enable search for this column
    },
    {
      title: (
        <div>
          <h3>
            Type
          </h3>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
      ...getColumnSearchProps("col3"), // Enable search for this column
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const columns3 = [
    {
      title: (
        <div>
          <h3>
          
          </h3>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
      ...getColumnSearchProps("col3"), // Enable search for this column
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const columns4 = [
    {
      title: (
        <div>
          <h3>
          
          </h3>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
      ...getColumnSearchProps("col3"), // Enable search for this column
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const columns5= [
    {
      title: (
        <div>
          <h3>
          
          </h3>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
      ...getColumnSearchProps("col3"), // Enable search for this column
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  const handleEdit = (record) => {
    setEditingRow(record.key);
    form.setFieldsValue(record);
  };
  const handleDelete = (record) => {
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Are you sure you want to delete this item?",
      onOk: () => {
        const newData1 = dataSource1.filter((item) => item.key !== record.key);
        setDataSource1(newData1);

        const newData2 = dataSource2.filter((item) => item.key !== record.key);
        setDataSource2(newData2);

        setDeleteModalVisible(false); // Close the delete confirmation modal
        setEditingRow(null); // Reset the editing row
        form.resetFields(); // Clear the form fields
      },
    });
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      const newData = dataSource1.map((item) => {
        if (item.key === editingRow) {
          return { ...item, ...values };
        }
        return item;
      });
      setDataSource1(newData);
      setEditingRow(null);
      form.resetFields();
    });
  };

  const handleCancel = () => {
    setEditingRow(null);
    form.resetFields();
  };
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
  return (
   <div style={{ background: '#f1f1f1', minHeight: '100vh' }}>
  <div style={{ margin: '0 50px' }}>
    <div style={{ margin: '0 auto' }}>
      <div style={{ color: 'black', fontSize: '25px' }}>Metadata</div>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>Aujourd'hui :</h1>
        <span style={dateStyle}>{currentDate}</span>
      </div>
    </div>
  </div>
  <div className="App">
    <div className="button-container">
      {/* Button on the left */}
      <Button>Ajouter un nouveau type</Button>
      {/* Button in the middle */}
      <Button>Actualiser les metadata</Button>
      {/* Button on the right */}
      <Button>Actualiser les données en base</Button>
    </div>
    {/* All tables wrapped in a single container */}
    <div className="table-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '10px' }}>
      {/* First row, first column */}
      <div className="table-card-container" style={{ flex: '1 1 300px' }}>
        <Card title="Type de documents" className="table-card">
          <Table dataSource={dataSource1} pagination={false}>
            {columns1.map((column) => (
              <Table.Column {...column} key={column.key} />
            ))}
          </Table>
        </Card>
      </div>

      {/* First row, second column */}
      <div className="table-card-container" style={{ flex: '1 1 300px' }}>
        <Card title="Bases de données" className="table-card">
          <Table dataSource={dataSource2} pagination={false}>
            {columns2.map((column) => (
              <Table.Column {...column} key={column.key} />
            ))}
          </Table>
        </Card>
      </div>

      {/* Second row, first column */}
      <div className="table-card-container" style={{ flex: '1 1 300px' }}>
        <Card title="Domaines fonctionnels" className="table-card">
          <Table dataSource={dataSource1} pagination={false}>
            {columns3.map((column) => (
              <Table.Column {...column} key={column.key} />
            ))}
          </Table>
        </Card>
      </div>

      {/* Second row, second column */}
      <div className="table-card-container" style={{ flex: '1 1 300px' }}>
        <Card title="Bases de données" className="table-card">
          <Table dataSource={dataSource2} pagination={false}>
            {columns4.map((column) => (
              <Table.Column {...column} key={column.key} />
            ))}
          </Table>
        </Card>
      </div>

      {/* Third row, first column */}
      <div className="table-card-container" style={{ flex: '1 1 300px' }}>
        <Card title="Progiciel" className="table-card">
          <Table dataSource={dataSource1} pagination={false}>
            {columns5.map((column) => (
              <Table.Column {...column} key={column.key} />
            ))}
          </Table>
        </Card>
      </div>

      {/* Third row, second column */}
      <div className="table-card-container" style={{ flex: '1 1 300px' }}>
        <Card title="Outils ETL" className="table-card">
          <Table dataSource={dataSource2} pagination={false}>
            {columns5.map((column) => (
              <Table.Column {...column} key={column.key} />
            ))}
          </Table>
        </Card>
      </div>
    </div>
  </div>
</div>

  );
};

export default Database;