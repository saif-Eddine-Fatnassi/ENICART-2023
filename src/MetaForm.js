import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button,Tag } from "antd";
import Invoice from "./PDFDocument";
import { saveAs } from "file-saver";
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
    const generateAndDownloadInvoice = async (values) => {
        // Generate the PDF invoice
        const pdfBlob = await generateInvoicePDF(values);
    
        // Save the PDF as a file
        saveAs(pdfBlob, "invoice.pdf");
      };
    
      const generateInvoicePDF = async (formData) => {
        return new Promise((resolve) => {
          // Call the Invoice component to generate the PDF
          const pdfData = <Invoice formData={formData} />;
    
          // Convert the PDF data to a Blob
          const pdfAsBlob = new Blob([pdfData], { type: "application/pdf" });
    
          resolve(pdfAsBlob);
        });
      };
    
      const onFinish = async (values) => {
        console.log("Form values:", values);
        setFormData(values);
    
        // Generate and download the PDF invoice
        await generateAndDownloadInvoice(values);
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