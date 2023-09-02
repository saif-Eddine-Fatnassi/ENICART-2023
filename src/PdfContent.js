import React from "react";
import {Document,Page,Text,View,StyleSheet,Image,} from "@react-pdf/renderer";
import axios from "axios";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    padding: 30,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
    textDecoration: "underline",
  },
  customerInfoContainer: {
    marginBottom: 20,
    textAlign: "right",
  },
  customerInfoLabel: {
    fontSize: 12,
    color: "#333",
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  defaultAddress: {
    fontSize: 12,
    color: "#333",
  },
  tableContainer: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 5,
    backgroundColor: "#f0f0f0",
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 14,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    backgroundColor: "#eaeaea",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 10,
    borderRightWidth: 1,
    borderRightColor: "#000",
    textAlign: "center",
    backgroundColor: "#f5f5f5",
  },
  remarqueContainer: {
    marginTop: 30,
    padding: 20,
    border: "1px solid #ccc",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  remarqueLabel: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
    textDecoration: "underline",
  },
  remarqueText: {
    fontSize: 14,
    color: "#333",
  },
  blueColumn: {
    backgroundColor: "blue",
  },
  whiteText: {
    color: "white",
  },
  greyBackground: {
    backgroundColor: "grey",
  },
  logoContainer: {
    marginBottom: 20,
    textAlign: "center",
  },
  logo: {
    width: 100, // Adjust the width and height as needed
    height: 50,
  },
  blueColumn: {
    backgroundColor: "#5EC2D7", // Mettez la couleur #5EC2D7 ici
  },
});

const PdfContent = ({
  data,
  customerName = "John Doe",
  defaultAddress = "123 Main Street",
  devisValue = "Default Devis Value",
  projetValue = "Default Projet ValueNous vous prions de bien vouloir trouver,ci-après, notre proposition: ",
  logoUrl="https://agd-web.bial-x.com/static/media/logo.05dba466.png",
  remarque, // Receive the remarque prop here
}) => {
  const [logoData, setLogoData] = useState(null);

  useEffect(() => {
    if (logoUrl) {
      // Fetch the logo image and convert it to base64
      axios.get(logoUrl, { responseType: "arraybuffer" }).then((response) => {
        const base64 = btoa(
          new Uint8Array(response.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setLogoData(`data:image/jpeg;base64,${base64}`);
      });
    }
  }, [logoUrl]);
  const getCurrentDate = () => {
    const currentDate = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return currentDate.toLocaleDateString(undefined, options);
  };

  const currentDay = getCurrentDate();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          {/* Display the logo if the base64 data is available */}
          {logoUrl && (
            <View style={{ width: 150, height: 100 }}>
              <Image src={logoUrl} style={{ width: "100%", height: "100%" }} />
            </View>
          )}
          <View style={{ marginLeft: "auto", marginRight: "auto" }}>
            <Text
              style={{ ...styles.title, color: "#000000", fontWeight: "bold" }}
            >
              Devis
            </Text>
          </View>
        </View>
        {/* Title and Customer Name and Default Address */}
        <View style={styles.customerInfoContainer}>
          <Text style={styles.customerInfoLabel}>Customer Name:</Text>
          <Text style={styles.customerName}>{customerName}</Text>
          <Text style={styles.customerInfoLabel}>Default Address:</Text>
          <Text style={styles.defaultAddress}>{defaultAddress}</Text>
        </View>
        {/* Devis and Projet */}
        <View>
          <Text style={{ fontSize: "12px" }}>
            Nous vous prions de bien vouloir trouver,ci-après, notre
            proposition:
          </Text>
        </View>
        <View style={{ marginBottom: 20 }} /> {/* This is the spacer */}
        <View style={styles.tableContainer}>
          <Text style={[styles.tableHeaderCell,styles.whiteColumn,styles.blackText,styles.whiteColumn,]}>
       
            Devis
          </Text>
          <Text style={[styles.tableCell, styles.whiteBackground]}>
            {devisValue}
          </Text>

          <Text style={[styles.tableHeaderCell,styles.whiteColumn,styles.blackText,styles.whiteColumn,]}>
            Date
          </Text>
          <Text style={[styles.tableCell, styles.whiteBackground]}>
            {getCurrentDate()}
          </Text>
        </View>
        <View style={styles.tableContainer}>
  <Text style={[styles.tableHeaderCell,styles.whiteColumn, styles.blackText, styles.whiteColumn, { fontWeight: 'bold', flex: 0.5 }]}>
    Projet
  </Text>
  <Text style={[styles.tableHeaderCell, styles.tableCell, styles.whiteBackground, { flex: 1.68 }]}>
    {projetValue}
  </Text>
</View>

        {/* Table */}
        <View style={{ marginBottom: 25 }} /> {/* This is the spacer */}
        <View style={styles.tableContainer}>
          <Text style={[styles.tableHeaderCell,styles.blueColumn,styles.blackText,styles.blueColumn, ]} >
            Description
          </Text>
          <Text style={[styles.tableHeaderCell,styles.blueColumn,styles.blackText,styles.blueColumn, ]}  >
            Quantité
          </Text>
          <Text style={[styles.tableHeaderCell,styles.blueColumn,styles.blackText,styles.blueColumn,  ]} >
            Montant
          </Text>
          <Text style={[styles.tableHeaderCell,styles.blueColumn,styles.blackText,styles.blueColumn, ]} >
            Total
          </Text>
        </View>
        {data.map((row, index) => (
          <View style={styles.tableContainer} key={index}>
            <Text style={[styles.tableCell, styles.whiteBackground]}>
              {row.description1}
            </Text>
            <Text style={[styles.tableCell, styles.whiteBackground]}>
              {row.quantity1}
            </Text>
            <Text style={[styles.tableCell, styles.whiteBackground]}>
              {row.unitPrice1}
            </Text>
            <Text style={[styles.tableCell, styles.whiteBackground]}>
              Qté x PU Devis
            </Text>
          </View>
        ))}
        {/* Remarque field */}
        <View style={styles.remarqueContainer}>
          <Text style={styles.remarqueLabel}>Remarque:</Text>
          <Text style={styles.remarqueText}>{remarque}</Text>{" "}
          {/* Display the remarque prop here */}
        </View>
        {/* Ajout des rectangles pour la signature */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <View style={{ width: "45%", height: 100, border: "1 solid black" }}>
            <Text
              style={
                (styles.signatureText, { fontSize: 12, textAlign: "center" })
              }
            >
              Signature et cachet commercial
            </Text>
          </View>
          <View style={{ width: "45%", height: 100, border: "1 solid black" }}>
            <Text
              style={
                (styles.signatureText, { fontSize: 12, textAlign: "center" })
              }
            >
              Bon pour accord
            </Text>
            <View
              style={{ width: "45%" , height: "100%",  }}>
              <Text
                style={[ styles.signatureText,{ fontSize: 12, textAlign: "center" },]}>
                le..........................
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PdfContent;
