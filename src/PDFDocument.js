import React from "react";
import { PDFViewer, PDFDownloadLink, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const PDFDocument = ({ 
  client,
  createur,
  statut,
  idAffaire,
  titre,
  formData,
   generatedFilename,
    keywords,
    domaine,
    type,
    annee,
    date,
    nomProjet,
    nouveaux,
    reference,
    numeroVersion
   }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Etape 1 : Affaire sélectionnée</Text>
          <Text>Titre: {titre} </Text>
          <Text>Client: {client}</Text>
          <Text>Créateur: {createur}</Text>
          <Text>Statut: {statut}</Text>
          <Text>ID de l'affaire Fitnet: {idAffaire}</Text>

          <Text style={styles.header}>Etape 2 : Autres critères</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Champ</Text>
              <Text style={styles.tableHeaderCell}>Valeur</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Domaine</Text>
              <Text style={styles.tableCell}>{domaine}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Type</Text>
              <Text style={styles.tableCell}>{type}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Année</Text>
              <Text style={styles.tableCell}>{annee}</Text>
            </View>
            {formData.date && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Date</Text>
                <Text style={styles.tableCell}>{date.format("YYYY-MM-DD")}</Text>
              </View>
            )}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Nom du projet</Text>
              <Text style={styles.tableCell}>{nomProjet}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Nouveaux</Text>
              <Text style={styles.tableCell}>{nouveaux}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Référence</Text>
              <Text style={styles.tableCell}>{reference}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Numéro de version</Text>
              <Text style={styles.tableCell}>{numeroVersion}</Text>
            </View>
            {/* Add more fields from Step 2 here if needed */}
          </View>

          <Text style={styles.header}>Etape 3 : Nom du fichier généré:</Text>
          <Text>{generatedFilename}</Text>

          {/* MetaForm */}
          <Text style={styles.header}>Etape 4 : Métadonnées associées</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeaderCell}>Champ</Text>
              <Text style={styles.tableHeaderCell}>Valeur</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Créateur</Text>
              <Text style={styles.tableCell}>{createur}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>URL</Text>
              <Text style={styles.tableCell}>{formData.url}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Base de données</Text>
              <Text style={styles.tableCell}>{formData.baseDeDonne}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Outils de reporting</Text>
              <Text style={styles.tableCell}>{formData.outilsDeReporting}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Progiciel</Text>
              <Text style={styles.tableCell}>{formData.progiciel}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Type du projet</Text>
              <Text style={styles.tableCell}>{formData.typeDuProjet}</Text>
            </View>
            {formData.dateDeCreation && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCell}>Date de création</Text>
                <Text style={styles.tableCell}>{formData.dateDeCreation.format("YYYY-MM-DD")}</Text>
              </View>
            )}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Domaines fonctionnels</Text>
              <Text style={styles.tableCell}>{formData.domainesFonctionnels}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Outils ETL</Text>
              <Text style={styles.tableCell}>{formData.outilsETL}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Technologies</Text>
              <Text style={styles.tableCell}>{formData.technologies}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Résumé</Text>
              <Text style={styles.tableCell}>{formData.resume}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Mots clés</Text>
              <Text style={styles.tableCell}>{formData.motsCles}</Text>
            </View>
            {/* Keywords from MetaForm */}
            {keywords.map((keyword, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.tableCell}>Mot clé</Text>
                <Text style={styles.tableCell}>{keyword}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

// Rest of the styles remain the same



const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1", // Light gray background color for the entire page
    padding: 20,
  },
  section: {
    flexGrow: 1,
  },
  header: {
    fontSize: 24, // Larger font size for headers
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5EC2D7", // Bright orange color for headers
    textTransform: "uppercase", // Convert text to uppercase
  },
  table: {
    display: "table",
    width: "100%",
    marginBottom: 10,
    borderWidth: 2, // Thicker border
    borderStyle: "solid",
    borderColor: "#5EC2D7", // Bright orange border color
    borderRadius: 8, // Rounded corners for the table
    backgroundColor: "#f1f1f1", // Light yellow background color for the table
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderColor: "#5EC2D7",
    flexGrow: 1,
  },
  tableHeaderCell: {
    flex: 1,
    padding: 8, // More padding for table headers
    textAlign: "center",
    borderRightWidth: 1,
    borderStyle: "solid",
    borderColor: "#5EC2D7",
    backgroundColor: "#000000", // Light salmon background color for table headers
    fontWeight: "bold",
    color: "#fff", // White text color for table headers
    textTransform: "uppercase", // Convert text to uppercase
  },
  tableCell: {
    flex: 1,
    padding: 8, // More padding for table cells
    textAlign: "center",
    borderRightWidth: 1,
    borderStyle: "solid",
    borderColor: "#5EC2D7",
    backgroundColor: "#f1f1f1", // Khaki background color for table cells
  },
});
  

export default PDFDocument;