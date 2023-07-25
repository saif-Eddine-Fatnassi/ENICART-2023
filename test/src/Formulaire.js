import React from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";

const { Option } = Select;

const FormulaireCritere = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", height: "100vh", width: "100vw" }}>
  {/* Cadre avec les petits titres en gras */}
  <div style={{ flex: 1, border: "1px solid #ccc", borderRadius: "4px", padding: "20px", marginRight: "20px" }}>
    <div style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
      <h3 style={{ fontWeight: "bold" }}>Etape 1 : Affaire séléctionnée </h3>
    </div>
    <p style={{ fontWeight: "bold" }}>Titre:</p>
    <p style={{ fontWeight: "bold" }}>Client:</p>
    <p style={{ fontWeight: "bold" }}>Créateur:</p>
    <p style={{ fontWeight: "bold" }}>Statut:</p>
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
      <div style={{ flex: 3, border: "1px solid #ccc", borderRadius: "4px", padding: "20px" }}>
      <h2 style={{ fontWeight: "bold" }}>Etape 2 : Autres critères</h2>
        
        <Form onFinish={onFinish} labelCol={{ span: 6 }} wrapperCol={{ span: 14 }} layout="horizontal">
          <Form.Item label="Domaine" name="domaine">
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type" rules={[{ required: true, message: "Veuillez sélectionner un type." }]}>
            <Select placeholder="Sélectionnez un type">
              <Option value="type1">Type 1</Option>
              <Option value="type2">Type 2</Option>
              <Option value="type3">Type 3</Option>
              {/* Ajoutez les autres options ici */}
            </Select>
          </Form.Item>

          <Form.Item label="Année" name="annee">
            <Select placeholder="Sélectionnez une année">
              <Option value="2022">2022</Option>
              <Option value="2023">2023</Option>
              <Option value="2024">2024</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Veuillez sélectionner une date." }]}
          >
            <DatePicker format="YYYY-MM-DD" />
          </Form.Item>

          <Form.Item
            label="Nom du projet : "
            name="nomProjet"
            rules={[{ required: true, message: "Veuillez saisir le nom du projet." }]}
            labelCol={{ span: 9}} // Ajoutez cette ligne pour ajuster la largeur de l'étiquette
            wrapperCol={{ span: 16 }} // Ajoutez cette ligne pour ajuster la largeur de l'élément de formulaire
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Nouveaux" name="nouveaux">
            <Select placeholder="Sélectionnez un choix">
              <Option value="X">X</Option>
              <Option value="Y">Y</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Référence" name="reference">
            <Input />
          </Form.Item>

          <Form.Item
            label="Numéro de version"
            name="numeroVersion"
            rules={[{ required: true, message: "Veuillez saisir le nom du projet." }]}
            labelCol={{ span: 10 }} // Ajoutez cette ligne pour ajuster la largeur de l'étiquette
            wrapperCol={{ span: 16 }} // Ajoutez cette ligne pour ajuster la largeur de l'élément de formulaire
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Extension"
            name="extension"
            rules={[{ required: true, message: "Veuillez sélectionner une extension." }]}
          >
            <Select placeholder="Sélectionnez une extension">
              <Option value="docx">docx</Option>
              <Option value="pdf">pdf</Option>
              {/* Ajoutez les autres options ici */}
            </Select>
          </Form.Item>

          <Form.Item label="Créateur" name="createur">
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
            <Button type="primary" htmlType="submit">
              Générer le nom du fichier
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormulaireCritere;
