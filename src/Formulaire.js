import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button,Tag } from "antd";
import MetaForm from "./MetaForm"; // Import the MetaForm component
import PDFDocument from "./PDFDocument";
import { PDFDownloadLink } from "@react-pdf/renderer";
const { Option } = Select;
const FormulaireCritere = () => {
  const [keywords, setKeywords] = useState([]); // State to manage keywords


  // const [formData, setFormData] = useState({
  //   titre: "",
  //   client: "",
  //   createur: "",
  //   statut: "",
  //   idAffaire: "",
  // });
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  
  const [generatedFilename, setGeneratedFilename] = useState("");
  const [showMetaForm, setShowMetaForm] = useState(false); // State to control the visibility of MetaForm

  const onFinish = () => {
    console.log("Form values:", formData);

    // Generate the filename here based on the form data (example: combining selected values)
    const filename = `${domaine}_${type}_${annee}_${date}_${nomProjet}`;
    setGeneratedFilename(filename);
  
    setShowMetaForm(false); // Reset showMetaForm to false to hide MetaForm after generating the filename
  };
  
  const handleSaveGeneratedFile = () => {
    // For this simulation, we'll just log the generated filename to the console
    console.log("Generated Filename:", generatedFilename);
    console.log("Generated Filename:", titre);
    console.log("Generated Filename:", type);

    setShowMetaForm(true);

  }
  const handleGenerateFilename = () => {

    onFinish(formData);
    setShowMetaForm(false); // Reset showMetaForm to false to hide MetaForm after generating the filename

  };
  const commonFormItemStyle = {
    marginBottom: "20px",

  };
  const commonLabelStyle = {
    flex: "0 0 30%",
    fontWeight: "bold",
  };

  const commonInputStyle = {
    flex: "1",
    marginLeft: "10px",
  };

  const containerStyle = {
    width: "60%",
    margin: "0 auto", // Center horizontally
    marginTop: "20px", // Add some space above each section
    flex: "1 0 20%",
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "20px",
    marginBottom: "20px",
  };
  const [titre, setTitre] = useState("");
  const [client, setClient] = useState("");
  const [createur, setCreateur] = useState("");
  const [statut, setStatut] = useState("");
  const [idAffaire, setIdAffaire] = useState("");
  const [domaine,setDomaine]=useState("");
  const [type,setType]=useState("");
  const [annee,setAnnee]=useState("");
  const [date,setDate]=useState();
  const [nomProjet,setNomProjet]=useState("");
  const [nouveaux,setNouveaux]=useState("");
  const [reference,setReference]=useState("");
  const [numeroVersion,setNumVersion]=useState("");
  const [keyword, setKeyword] = useState("");
  const [formData, setFormData] = useState({
    createur: "aze",
    url: "aze",
    baseDeDonne: "eza",
    outilsDeReporting: "azeez",
    progiciel: "",
    typeDuProjet: "",
    dateDeCreation: null,
    domainesFonctionnels: "",
    outilsETL: "",
    technologies: "",
    resume: "",
    motsCles: "",
  });
  //   const [keywords, setKeywords] = useState([]);
   
     const addKeyword = () => {
       if (keyword.trim() !== "") {
         setKeywords([...keywords, keyword]);
         setKeyword("");
       }
     };
  const handleDomaine = (event) => {
    setDomaine(event.target.value);
  };
  const handleType = (value) => {
    setType(value);
  };
  
  const handleAnne = (value) => {
    setAnnee(value);
  };
  const handleDate = (selectedDate) => {
    setDate(selectedDate);
  };
  const handleNomProjet = (event) => {
    setNomProjet(event.target.value);
  };
  const handleNouveaux = (value) => {
    setNouveaux(value);
  };
  const handleReference = (event) => {
    setReference(event.target.value);
  };
  const handleNumVersion = (event) => {
    setNumVersion(event.target.value);
  };
 
  const handleTitreChange = (event) => {
    setTitre(event.target.value);
  };
  const handleClientchange =(event) => {
    setClient(event.target.value);
  };
  const handleCreateurchange =(event) => {
    setCreateur(event.target.value);
  };
  const handleStatutchange =(event) => {
    setStatut(event.target.value);
  };
  const handleIdAffairechange =(event) => {
    setIdAffaire(event.target.value);
  };
 
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", width: "100vw" }}>
      {/* Cadre avec les petits titres en gras */}
      <div style={containerStyle}>
        <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <h3 style={{ fontWeight: "bold" }}>Etape 1 : Affaire sélectionnée </h3>
        </div>
        <Form.Item name="titre" style={commonFormItemStyle}>
          <label style={commonLabelStyle}>Titre:</label>
          <Input value={titre} onChange={handleTitreChange} style={commonInputStyle} />
        </Form.Item>
        <Form.Item name="client" style={commonFormItemStyle}>
          <label style={commonLabelStyle}>Client:</label>
          <Input value={client} onChange={handleClientchange} style={commonInputStyle} />
        </Form.Item>
        <Form.Item name="createur" style={commonFormItemStyle}>
          <label style={commonLabelStyle}>Créateur:</label>
          <Input value={createur} onChange={handleCreateurchange} style={commonInputStyle} />
        </Form.Item>
        <Form.Item name="statut" style={commonFormItemStyle}>
          <label style={commonLabelStyle}>Statut:</label>
          <Input  value={statut} onChange={handleStatutchange} style={commonInputStyle} />
        </Form.Item>
        <Form.Item
          style={commonFormItemStyle}

          name="idAffaire"
          rules={[{ required: true, message: "Veuillez saisir l'ID de l'affaire Fitnet." }]}
        >
          <label style={commonLabelStyle}>ID de l'affaire Fitnet:</label>
          <Input value={idAffaire} onChange={handleIdAffairechange} style={{ width: "100%" }} />
        </Form.Item>
      </div>
      {/* Cadre avec le formulaire */}
      <div style={containerStyle}>
        <h2 style={{ fontWeight: "bold" }}>Etape 2 : Autres critères</h2>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
         
          <Form.Item name="domaine" style={{ flex: 1, marginRight: "10px" }}>
            <label style={commonLabelStyle}>Domaine:</label>
          <Input value={domaine} onChange={handleDomaine}  style={commonInputStyle} />
          </Form.Item> 

          <Form.Item
  name="type"
  rules={[{ required: true, message: "Veuillez sélectionner un type." }]}
  style={{ flex: 1 }}
>
  <label style={commonLabelStyle}>Type:</label>
  <Select placeholder="Sélectionnez un type" value={type} onChange={handleType}>
    <Option value="Résultat Audit">Résultat Audit</Option>
    <Option value="Présentation Atelier">Présentation Atelier</Option>
    <Option value="Bon de commande">Bon de commande</Option>
    <Option value="Post-Mortem(bilan)">Post-Mortem(bilan)</Option>
    <Option value="Note de Cadrage">Note de Cadrage</Option>
    <Option value="COPIL">COPIL</Option>
    <Option value="CR Atelier">CR Atelier</Option>
    <Option value="Document d'architecture">Document d'architecture</Option>
    {/* Add other options here */}
  </Select>
</Form.Item>

        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
          <Form.Item name="annee" style={{ flex: 1, marginRight: "10px" }}>
            <label style={commonLabelStyle}>Année:</label>

            <Select onChange={handleAnne} placeholder="Sélectionnez une année">
              <Option value="2022" >2022</Option>
              <Option value="2023" >2023</Option>
              <Option value="2024" >2024</Option>
            </Select>
          </Form.Item>

          <Form.Item name="date" rules={[{ required: true, message: "Veuillez sélectionner une date." }]} style={{ flex: 1 }}>
            <label style={commonLabelStyle}>Date:</label>

            <DatePicker value={date} onChange={handleDate} format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>
          <Form.Item

            name="nomProjet"
            rules={[{ required: true, message: "Veuillez saisir le nom du projet." }]}
            style={{ flex: 1, marginRight: "10px", fontWeight: "bold" }}
          >
            <label style={commonLabelStyle}>Nom du projet:</label>

            <Input value={nomProjet} onChange={handleNomProjet}  style={commonInputStyle} />
          </Form.Item>

          <Form.Item name="nouveaux" style={{ flex: 1 }}>
            <label style={commonLabelStyle}>Nouveaux:</label>

            <Select onChange={handleNouveaux} placeholder="Sélectionnez un choix">
              <Option value="Créer un nouveau document" >Créer un nouveau document</Option>
              <Option value="Créer une nouvelle version" >Créer une nouvelle version</Option>
            </Select>
          </Form.Item>
        </div>

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: "20px" }}>

          <Form.Item name="reference" style={{ flex: 1, marginRight: "10px" }}>
            <label style={commonLabelStyle}>Référence:</label>

            <Input value={reference} onChange={handleReference} style={commonInputStyle} />
          </Form.Item>

          <Form.Item

            name="numeroVersion"
            rules={[{ required: true, message: "Veuillez saisir le numéro de version." }]}
            style={{ flex: 1, fontWeight: "bold" }}
          >
            <label style={commonLabelStyle}>Numéro de version:</label>

            <Input  value={numeroVersion} onChange={handleNumVersion} style={commonInputStyle} />
          </Form.Item>
        </div>

   
        {/* Add more rows and form items as needed */}

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
          <div style={containerStyle}>
            <h3 style={{ fontWeight: "bold" }}>Etape 3 : Nom du fichier généré:</h3>
            <p>{generatedFilename}</p>

            {/* "Enregistrer" Button */}
            <Button type="primary" onClick={handleSaveGeneratedFile}>
              Enregistrer
            </Button>
            {/* PDF DownloadLink */}
            <PDFDownloadLink document={<PDFDocument
              titre={titre}
              client={client}
              createur={createur}
              statut={statut}
              idAffaire={idAffaire}
              domaine={domaine}
              type={type}
              annee={annee}
              date={date}
              nomProjet={nomProjet}
              nouveaux={nouveaux}
              reference={reference}
              numeroVersion={numeroVersion}
              formData={formData}


              generatedFilename={generatedFilename}
              keywords={keywords}

            />} fileName="generated_file.pdf">
              {({ blob, url, loading, error }) => (loading ? "Chargement..." : "Télécharger le PDF")}
            </PDFDownloadLink>
          </div>
        )}

        {/* MetaForm */}
        {showMetaForm && (  <div  style={containerStyle}>
      <h2>Étape 4 : Métadonnées associées</h2>
      <Form
  labelCol={{ span: 6 }}
  wrapperCol={{ span: 14 }}
  initialValues={formData}
  onFinish={onFinish}
>
  <Form.Item name="createur" rules={[{ required: true }]}>
    <label style={commonLabelStyle}>Créateur:</label>
    <Input
      style={commonInputStyle}
      value={formData.createur}
      onChange={(e) => setFormData({ ...formData, createur: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="url" rules={[{ required: true }]}>
    <label style={commonLabelStyle}>URL:</label>
    <Input
      style={commonInputStyle}
      value={formData.url}
      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="baseDeDonne">
    <label style={commonLabelStyle}>Base de données:</label>
    <Input
      style={commonInputStyle}
      value={formData.baseDeDonne}
      onChange={(e) => setFormData({ ...formData, baseDeDonne: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="outilsDeReporting">
    <label style={commonLabelStyle}>Outils de reporting:</label>
    <Input
      style={commonInputStyle}
      value={formData.outilsDeReporting}
      onChange={(e) => setFormData({ ...formData, outilsDeReporting: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="progiciel">
    <label style={commonLabelStyle}>Progiciel:</label>
    <Input
      style={commonInputStyle}
      value={formData.progiciel}
      onChange={(e) => setFormData({ ...formData, progiciel: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="typeDuProjet">
    <label style={commonLabelStyle}>Type du projet:</label>
    <Input
      style={commonInputStyle}
      value={formData.typeDuProjet}
      onChange={(e) => setFormData({ ...formData, typeDuProjet: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="dateDeCreation">
    <label style={commonLabelStyle}>Date de création:</label>
    <br/>
    <DatePicker
      format="YYYY-MM-DD"
      value={formData.dateDeCreation}
      onChange={(date) => setFormData({ ...formData, dateDeCreation: date })}
    />
  </Form.Item>

  <Form.Item name="domainesFonctionnels">
    <label style={commonLabelStyle}>Domaines fonctionnels:</label>
    <Input
      style={commonInputStyle}
      value={formData.domainesFonctionnels}
      onChange={(e) => setFormData({ ...formData, domainesFonctionnels: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="outilsETL">
    <label style={commonLabelStyle}>Outils ETL:</label>
    <Input
      style={commonInputStyle}
      value={formData.outilsETL}
      onChange={(e) => setFormData({ ...formData, outilsETL: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="technologies">
    <label style={commonLabelStyle}>Technologies:</label>
    <Input
      style={commonInputStyle}
      value={formData.technologies}
      onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="resume">
    <label style={commonLabelStyle}>Résumé:</label>
    <Input.TextArea
      style={commonInputStyle}
      value={formData.resume}
      onChange={(e) => setFormData({ ...formData, resume: e.target.value })}
    />
  </Form.Item>

  <Form.Item name="motsCles">
    <label style={commonLabelStyle}>Mots clés:</label>
    <Input
      style={commonInputStyle}
      value={formData.motsCles}
      onChange={(e) => setFormData({ ...formData, motsCles: e.target.value })}
    />
  </Form.Item>

  <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
    <Button type="primary" htmlType="submit" onClick={onFinish}>
      Sauvegarder
    </Button>
    <Button style={{ marginLeft: 10 }} htmlType="button">
      Annuler
    </Button>
  </Form.Item>
</Form>

      <Form.Item label="Mots clés" wrapperCol={{ offset: 6, span: 14 }}>
          <Input
            style={commonInputStyle}            
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
    </div>)} {/* Pass the keywords and setKeywords to MetaForm */}
      </div>
    </div>
  );
};

export default FormulaireCritere;