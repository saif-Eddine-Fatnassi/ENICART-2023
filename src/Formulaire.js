import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import MetaForm from "./MetaForm";
import PDFDocument from "./PDFDocument";
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const { Option } = Select;
const FormulaireCritere = () => {
  const [keywords, setKeywords] = useState([]); // State to manage keywords

  
  const [formData, setFormData] = useState(null);
  const [generatedFilename, setGeneratedFilename] = useState(null);
  const [showMetaForm, setShowMetaForm] = useState(false); // State to control the visibility of MetaForm

  const onFinish = (values) => {
    console.log("Form values:", values);
    setFormData(values);


    // Generate the filename here based on the form data (example: combining selected values)
    const { domaine, type, annee, date, nomProjet, extension } = values;
    const filename = `${domaine}_${type}_${annee}_${date}_${nomProjet}.${extension}`;
    setGeneratedFilename(filename);
    
  };

  const handleSaveGeneratedFile = () => {
    // For this simulation, we'll just log the generated filename to the console
    console.log("Generated Filename:", generatedFilename);
    setShowMetaForm(true);

  }
  const handleGenerateFilename = () => {
    
    onFinish(formData);
    setShowMetaForm(false); // Reset showMetaForm to false to hide MetaForm after generating the filename

  };
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      {/* Cadre avec les petits titres en gras */}
      <div style={{ width: "100%", height: "70%", border: "1px solid #ccc", borderRadius: "4px", padding: "20px", marginBottom: "20px" }}>
        <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <h3 style={{ fontWeight: "bold" }}>Etape 1 : Affaire sélectionnée </h3>
        </div>
        <Form.Item label="Titre:" name="titre">
          <Input />
        </Form.Item>
        <Form.Item label="Client:" name="client">
          <Input />
        </Form.Item>
        <Form.Item label="Créateur:" name="createur">
          <Input />
        </Form.Item>
        <Form.Item label="Statut:" name="statut">
          <Input />
        </Form.Item>
        <div style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
          <Form.Item
            label="ID de l'affaire Fitnet:"
            name="idAffaire"
            rules={[{ required: true, message: "Veuillez saisir l'ID de l'affaire Fitnet." }]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
        </div>
      </div>
      {/* Cadre avec le formulaire */}
      <div style={{ width: "100%", height: "70%", fontWeight: "10%", border: "1px solid #ccc", borderRadius: "4px", padding: "20px" }}>
        <h2 style={{ fontWeight: "bold" }}>Etape 2 : Autres critères</h2>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
          <Form.Item label="Domaine" name="domaine" style={{ flex: 1, marginRight: "10px" }}>
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Veuillez sélectionner un type." }]} style={{ flex: 1 }}>
            <Select placeholder="Sélectionnez un type">
              <Option value="type1">Résultat Audit</Option>
              <Option value="type2">Présentation Atelier</Option>
              <Option value="type3">Bon de commande</Option>
              <Option value="type1">Post-Mortem(bilan)</Option>
              <Option value="type1">Note de Cadrage</Option>
              <Option value="type1">COPIL</Option>
              <Option value="type1">CR Atelier</Option>
              <Option value="type1">Document d'architecture</Option>
              {/* Ajoutez les autres options ici */}
            </Select>
          </Form.Item>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
          <Form.Item label="Année" name="annee" style={{ flex: 1, marginRight: "10px" }}>
            <Select placeholder="Sélectionnez une année">
              <Option value="2022">2022</Option>
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Date" name="date" rules={[{ required: true, message: "Veuillez sélectionner une date." }]} style={{ flex: 1 }}>
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
          <Form.Item
            label="Nom du projet : "
            name="nomProjet"
            rules={[{ required: true, message: "Veuillez saisir le nom du projet." }]}
            style={{ flex: 1, marginRight: "10px", fontWeight: "bold" }}
          >
            <Input style={{ width: "100%" }} />
            </Form.Item>

<Form.Item label="Nouveaux" name="nouveaux" style={{ flex: 1 }}>
  <Select placeholder="Sélectionnez un choix">
    <Option value="X">Créer un nouveau document</Option>
    <Option value="Y">Créer une nouvelle version</Option>
  </Select>
</Form.Item>
</div>

<div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
<Form.Item label="Référence" name="reference" style={{ flex: 1, marginRight: "10px" }}>
  <Input />
</Form.Item>

<Form.Item
  label="Numéro de version"
  name="numeroVersion"
  rules={[{ required: true, message: "Veuillez saisir le numéro de version." }]}
  style={{ flex: 1, fontWeight: "bold" }}
>
  <Input style={{ width: "100%" }} />
</Form.Item>
</div>

<div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
<Form.Item
  label="Extension"
  name="extension"
  rules={[{ required: true, message: "Veuillez sélectionner une extension." }]}
  style={{ flex: 1, marginRight: "10px" }}
>
  <Select placeholder="Sélectionnez une extension">
    <Option value="docx">docx</Option>
    <Option value="xlsx">xlsx</Option>
    <Option value="pptx">pptx</Option>
    <Option value="pdf">pdf</Option>
    {/* Ajoutez les autres options ici */}
  </Select>
</Form.Item>

<Form.Item label="Créateur" name="createur" style={{ flex: 1 }}>
  <Input />
</Form.Item>
</div>

{/* Add more rows and form items as needed */}
{/* ... (Additional form items) */}

<Form.Item wrapperCol={{ offset: 6, span: 14 }}>
<Button type="primary" htmlType="submit" onClick={onFinish}>
  Générer le nom du fichier
</Button>
</Form.Item>

       
      </div>

      {/* Step 3 and MetaForm */}
      <div style={{ display: "flex", flexDirection: "column" }}>
  {/* Step 3 */}
  {generatedFilename && ( // Remove the condition to always show Step 3
          <div style={{ marginTop: "20px", width: "100%", border: "1px solid #ccc", borderRadius: "4px", padding: "8px" }}>
            <h3 style={{ fontWeight: "bold" }}>Etape 3 : Nom du fichier généré:</h3>
            <p>{generatedFilename}</p>

            {/* "Enregistrer" Button */}
            <Button type="primary" onClick={handleSaveGeneratedFile}>
              Enregistrer
            </Button>
              {/* PDF DownloadLink */}
            <PDFDownloadLink document={<PDFDocument formData={formData} generatedFilename={generatedFilename} keywords={keywords} />} fileName="generated_file.pdf">
      {({ blob, url, loading, error }) => (loading ? "Chargement..." : "Télécharger le PDF")}
    </PDFDownloadLink>
          </div>
        )}

        {/* MetaForm */}
        {showMetaForm && <MetaForm keywords={keywords} setKeywords={setKeywords} />} {/* Pass the keywords and setKeywords to MetaForm */}
      </div>
    </div>
  );
};

export default FormulaireCritere;