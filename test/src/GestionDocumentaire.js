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
          <Button>
            Titre
            <SearchOutlined />
          </Button>
        </div>
      ),
      dataIndex: "recherche",
      key: "recherche",
    },
    {
      title: (
        <div>
          <Button>
            Client
            <SearchOutlined />
          </Button>
        </div>
      ),
      dataIndex: "col2",
      key: "col2",
    },
    {
      title: (
        <div>
          <Button>
            Statuts
            <SearchOutlined />
          </Button>
        </div>
      ),
      dataIndex: "col3",
      key: "col3",
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (_, record) => (
        <div>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
          <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
        </div>
      ),
    },
  ];

    const columns2 = [
      {
        title: (
          <div>
            <Button>
              Nom
              <SearchOutlined />
            </Button>
          </div>
        ),
        dataIndex: "recherche",
        key: "recherche",
      },
      {
        title: (
          <div>
            <Button>
              Date
              <SearchOutlined />
            </Button>
          </div>
        ),
        dataIndex: "col2",
        key: "col2",
      },
      {
        title: (
          <div>
            <Button>
              Type
              <SearchOutlined />
            </Button>
          </div>
        ),
        dataIndex: "col3",
        key: "col3",
      },
      {
        title: 'Actions',
        dataIndex: 'actions',
        render: (_, record) => (
          <div>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>Edit</Button>
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record)}>Delete</Button>
          </div>
        ),
      },
    ];

  const handleEdit = (record) => {
    setEditingRow(record.key);
    form.setFieldsValue(record);
  };

  const handleDelete = (record) => {
    setDeleteModalVisible(true);
    const newData = dataSource1.filter((item) => item.key !== record.key);
    setDataSource1(newData);
    setDeleteModalVisible(false); // Close the delete confirmation modal
    setEditingRow(null); // Reset the editing row
    form.resetFields(); // Clear the form fields
    // Handle delete logic here
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

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Bial-Engine </title>
      </Helmet>
      <div className="table-container">
        <Card title="Rechercher document ou affaire" className="search-card">
          <Input prefix={<SearchOutlined />} placeholder="Rechercher des documents" />
          <div className="search-buttons">
            <Button type="primary" className="blue-button">
              Actualiser la page
            </Button>
            <Button type="primary" className="blue-button">
              Nouveau document
            </Button>
          </div>
        </Card>
        <div className="table-wrapper">
          <Card title="Les 5 dernieres affaires dans Fitnet" className="table-card">
            <Table dataSource={dataSource1} pagination={false}>
              {columns1.map((column) => (
                <Column {...column} key={column.key} />
              ))}
            </Table>
          </Card>
          <Card title="Les 5 derniers documents créés" className="table-card">
            <Table dataSource={dataSource2} pagination={false}>
              {columns2.map((column) => (
                <Column {...column} key={column.key} />
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
  );
};

export default GestionDocumentaire;
