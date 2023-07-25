import React, { useState } from "react";
import { Button, Card, Input, Table, Modal, Form } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";

const { Column } = Table;

const GestionDocumentaire = () => {
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
    { key: 5, recherche: "Recherche E", col2: "Donnée V", col3: "Donnée Q" },
  ]);

  const [form] = Form.useForm();
  const [editingRow, setEditingRow] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

 
  const columns1 = [
    {
      title: (
        <div>
          <Button> Titre </Button>
        </div>
      ),
      dataIndex: "recherche",
      key: "recherche",
      sorter: (a, b) => a.recherche.localeCompare(b.recherche),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Titre"
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
      onFilter: (value, record) => record.recherche.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    
    },
    {
      title: (
        <div>
          <Button> Client </Button>
        </div>
      ),
      dataIndex: "col2",
      key: "col2",
      sorter: (a, b) => a.col2.localeCompare(b.col2),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Titre"
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
      onFilter: (value, record) => record.recherche.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    
    },

    {
      title: (
        <div><Button>Statuts</Button>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
      sorter: (a, b) => a.col3.localeCompare(b.col3),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Titre"
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
      onFilter: (value, record) => record.recherche.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Modifier</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Supprimer</Button>
        </div>
      ),
    },
  ];

    const columns2 = [
      {
        title: (
          <div> <Button> Nom </Button>
          </div>
        ),
        dataIndex: "recherche",
        key: "recherche",
        sorter: (a, b) => a.recherche.localeCompare(b.recherche),
        sortDirections: ["ascend", "descend"],
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search Titre"
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
        onFilter: (value, record) => record.recherche.toLowerCase().includes(value.toLowerCase()),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
      
      },
      {
        title: (
          <div>
            <Button> Date </Button>
          </div>
        ),
        dataIndex: "col2",
        key: "col2",
        sorter: (a, b) => a.col2.localeCompare(b.col2),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Titre"
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
      onFilter: (value, record) => record.recherche.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    
      },
      {
        title: (
          <div>
            <Button> Type</Button>
          </div>
        ),
        dataIndex: "col3",
        key: "col3",
        sorter: (a, b) => a.col3.localeCompare(b.col3),
      sortDirections: ["ascend", "descend"],
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Titre"
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
      onFilter: (value, record) => record.recherche.toLowerCase().includes(value.toLowerCase()),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (_, record) => (
          <div>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Modifier</Button>
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Supprimer</Button>
          </div>
        ),
      },
    ];

  const handleEdit = (record) => {
    setEditingRow(record.key);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    // Show the delete confirmation modal
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Êtes-vous sûr de bien vouloir supprimer cet élément?",
      onOk: () => {
        // Proceed with delete operation
        const newData = dataSource1.filter((item) => item.key !== record.key);
        setDataSource1(newData);
        // Close the delete confirmation modal (not necessary, but good for UI)
        setDeleteModalVisible(false);
        // Reset the editing row and form fields
        setEditingRow(null);
        form.resetFields();
      },
    });
  }

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
      <div style={{ margin: '1 50px' }}>
        <div style={{ margin: '0 auto' }}>
          <div style={{ color: 'black', fontSize: '25px' }}>Gestion Documentaire</div>
          <div style={titleContainerStyle}>
            <h1 style={titleStyle}>Aujourd'hui :</h1>
            <span style={dateStyle}>{currentDate}</span>
          </div>
        </div>
      </div>
      <div className="App">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Bial-Engine </title>
        </Helmet>
        <div className="table-container">
          <Card
            title="Rechercher document ou affaire"
            className="search-card"
            style={{ width: '300px', height: '1000px' }}
          >
            <Input prefix={<SearchOutlined />} placeholder="Rechercher des documents" />
            <div className="search-buttons">
              <Button type="primary" className="blue-button">
                Nouveau document
              </Button>
            </div>
          </Card>
          <div className="table-wrapper">
            <Card title="Les 5 dernieres affaires dans Fitnet" className="table-card"   >
              <Table dataSource={dataSource1} pagination={false}>
                {columns1.map((column) => (
                  <Table.Column {...column} key={column.key} />
                ))}
              </Table>
            </Card>
            <Card title="Les 5 derniers documents créés" className="table-card">
              <Table dataSource={dataSource2} pagination={false}>
                {columns2.map((column) => (
                  <Table.Column {...column} key={column.key} />
                ))}
              </Table>
            </Card>
          </div>
        </div>

        <Modal
          title="Delete Confirmation"
          visible={deleteModalVisible}
          onCancel={() => setDeleteModalVisible(false)}
          onOk={() => {
            setDeleteModalVisible(false);
            // Handle delete logic here
          }}
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>

        <Modal
          title="Edit Row"
          visible={editingRow !== null}
          onCancel={handleCancel}
          onOk={handleSave}
        >
          <Form form={form}>
            <Form.Item label="Recherche" name="recherche">
              <Input />
            </Form.Item>
            <Form.Item label="Col2" name="col2">
              <Input />
            </Form.Item>
            <Form.Item label="Col3" name="col3">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </div>
 
      
    </div>
  );
};

export default GestionDocumentaire;
