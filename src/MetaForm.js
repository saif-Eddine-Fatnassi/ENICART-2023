import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button,Tag } from "antd";

const { Option } = Select;

const MetaForm = () => {
    const [keyword, setKeyword] = useState("");
    const [keywords, setKeywords] = useState([]);
  
    const addKeyword = () => {
      if (keyword.trim() !== "") {
        setKeywords([...keywords, keyword]);
        setKeyword("");
      }
    };
  const [formData, setFormData] = useState({
    createur: "",
    url: "",
    baseDeDonne: "",
    outilsDeReporting: "",
    progiciel: "",
    typeDuProjet: "",
    dateDeCreation: null,
    domainesFonctionnels: "",
    outilsETL: "",
    technologies: "",
    resume: "",
    motsCles: "",
  });

  const onFinish = (values) => {
    console.log("Form values:", values);
    setFormData(values);
  };

  return (
    <div>
      <h2>Étape 4 : Métadonnées associées</h2>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        initialValues={formData}
        onFinish={onFinish}
      >
        <Form.Item label="Créateur" name="createur" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="URL" name="url" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Base de données" name="baseDeDonne">
          <Input />
        </Form.Item>

        <Form.Item label="Outils de reporting" name="outilsDeReporting">
          <Input />
        </Form.Item>

        <Form.Item label="Progiciel" name="progiciel">
          <Input />
        </Form.Item>

        <Form.Item label="Type du projet" name="typeDuProjet">
          <Input />
        </Form.Item>

        <Form.Item label="Date de création" name="dateDeCreation">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item label="Domaines fonctionnels" name="domainesFonctionnels">
          <Input />
        </Form.Item>

        <Form.Item label="Outils ETL" name="outilsETL">
          <Input />
        </Form.Item>

        <Form.Item label="Technologies" name="technologies">
          <Input />
        </Form.Item>

        <Form.Item label="Résumé" name="resume">
          <Input.TextArea />
        </Form.Item>

        <Form.Item label="Mots clés" name="motsCles">
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
          <Button type="primary" htmlType="submit">
            Sauvegarder
          </Button>
          <Button style={{ marginLeft: 10 }} htmlType="button">
            Annuler
          </Button>
        </Form.Item>
      </Form>
      <Form.Item label="Mots clés" wrapperCol={{ offset: 6, span: 14 }}>
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onPressEnter={addKeyword}
            style={{ width: "60%" }}
          />
          <Button onClick={addKeyword}>Ajouter</Button>
        </Form.Item>

        <Form.Item label="Mots clés" name="motsCles">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {keywords.map((kw, index) => (
              <Tag key={index}>{kw}</Tag>
            ))}
          </div>
        </Form.Item>
    </div>
  );
};

export default MetaForm;