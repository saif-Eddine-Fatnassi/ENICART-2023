import React, { useState, useEffect } from "react";
import Select from "react-select";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfContent from "./PdfContent";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFilePdf, faFileWord } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

library.add(faFilePdf);

// Import font data for pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const apiUrl = "http://universities.hipolabs.com/search?country=canada";
const apiUrl2 = "https://restcountries.com/v3.1/all?fields=name,flags";

const CustomTable = styled(Table)(({ theme }) => ({
  // Customize table styles here
  minWidth: 700,
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16, // Adjust font size if needed
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  // Add custom styles for the TableContainer
  marginBottom: theme.spacing(2),
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  // Add custom styles for the TableCell
  backgroundColor: "#f1f1f1", // Change the background color to black
  color: "#5EC2D7", // Change the font color to blue
  fontSize: 16,
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  // Add custom styles for the TableRow
  "&:nth-of-type(odd)": {
    backgroundColor: "#f1f1f1", // Change the background color to black
  },
}));

const Devis = () => {
  // Options for the select field
  const currentDate = new Date().toLocaleDateString();
  const logoUrl = require("./assets/bail.png"); // Adjust the path based on your project structure

  // State variables for dynamic values
  const [remarque, setRemarque] = useState("");
  const [customerName, setCustomerName] = useState("John Doe");
  const [defaultAddress, setDefaultAddress] = useState("123 Main Street");
  const [devisValue, setDevisValue] = useState("valeur lue devis");
  const [projetValue, setProjetValue] = useState("valeur lue projet");
  const [tableData, setTableData] = useState([]);
 
  const [selectedOption, setSelectedOption] = useState(null); // Change selectedOptions to selectedOption
  const [selectedOption2, setSelectedOption2] = useState(null); // Change selectedOptions to selectedOption
  const [options, setOptions] = useState([]); // State variable to hold the options fetched from the API
  const [options2, setOptions2] = useState([]); // State variable to hold the options fetched from the API
  const [options3, setOptions3] = useState([]); // State variable to hold the options fetched from the API


  useEffect(() => {
    // Fetch data from the API to populate "Choix 1" options
    const fetchOptions = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        // Map the data into the format expected by react-select library
        const mappedOptions = data.map((item) => ({
          value: item.name,
          label: item.name,
        }));
        // Add a special option that contains all the values
        // const allOptions = { value: "all", label: "" };
        setOptions([ ...mappedOptions]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      
      
    };
    fetchOptions();
    const fetchOptions2 = async () => {
      try {
        const response2 = await axios.get(apiUrl2);
        const data2 = response2.data; // Use response2.data instead of response2.data2
  
        // Map the data into the format expected by react-select library
        const mappedOptions2 = data2.map((item) => ({
          value: item.name.common,
          label: item.name.common,
        }));
  
        // Add a special option that contains all the values
        // const allOptions2 = { value: "all", label: "All" };
  
        setOptions2([ ...mappedOptions2]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchOptions2();
  

  }, []);

  // Function to handle "Recherche" button click
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const mappedOptions = data.map((item) => ({
          value: item.name,
          label: item.name,
        }));
        // const allOptions = { value: "all", label: "" };
        setOptions([ ...mappedOptions]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const fetchOptions2 = async () => {
      try {
        const response2 = await axios.get(apiUrl2);
        const data2 = response2.data;
        const mappedOptions2 = data2.map((item) => ({
          value: item.name.common,
          label: item.name.common,
        }));
        // const allOptions2 = { value: "all", label: "All" };
        setOptions2([ ...mappedOptions2]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchOptions();
    fetchOptions2();
  }, []);
  
  const handleCombinedRechercheClick = async () => {
    try {
      // Fetch data from the first API based on selectedOption
      let updatedTableData = [];
      if (selectedOption && selectedOption.value === "all") {
        updatedTableData = options.filter((option) => option.value !== "all");
      } else {
        const response = await axios.get(apiUrl);
        const data = response.data;
        const filteredData = data.filter((item) =>
          selectedOption && item.name.includes(selectedOption.label)
        );
  
        if (filteredData.length > 0) {
          // Modify the first item in updatedTableData
          updatedTableData = [
            {
              description1: selectedOption2
                ? selectedOption2.label
                : '', // Use selectedOption2 if available
              quantity1: filteredData[0].domains,
              unitPrice1: filteredData[0].web_pages,
            },
          ];
        }
      }
  
      // Fetch data from the second API based on selectedOption2
      if (selectedOption2 && selectedOption2.value === "all") {
        setTableData(updatedTableData);
        return;
      }
  
      const response2 = await axios.get(apiUrl2);
      const data2 = response2.data;
  
      // Merge data from both APIs and set the table data
      const mergedData = updatedTableData.map((item) => ({
        ...item,
        description1: selectedOption2
          ? data2.find((entry) => entry.name.common === selectedOption2.label)?.name.official || ''
          : '',
        alpha_two_code: data2.find((entry) => entry.name.common === selectedOption2.label)?.alpha_two_code || "",
      }));
  
      setTableData(mergedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  
  
    
  
   
  // Utiliser handleRechercheClick pour la recherche combinée
 
  

  const handleRemarqueChange = (event) => {
    setRemarque(event.target.value);
  };

  // Function to handle "Enregistrer" button click
  const handleEnregistrerClick = () => {
    // Call the function to generate and download the PDF
    generateAndDownloadPDF();
  };

  // Function to generate and download the PDF
  const generateAndDownloadPDF = () => {
    // Define the content for the PDF using pdfMake (or any other PDF generation library)
    const docDefinition = {
      content: [
        // Add other sections of the PDF as needed.
        {
          text: "Table Data", // Section title
          style: "header", // Style for the section title
        },
        {
          table: {
            // Populate the tableData in the PDF
            body: [
              // Table header
              [
                { text: "Description", style: "tableHeader" },
                { text: "Quantité", style: "tableHeader" },
                { text: "Montant", style: "tableHeader" },
                { text: "Total", style: "tableHeader" },
              ],
              // Table data rows
              ...tableData.map((row) => [
                { text: row.description },
                { text: row.quantity },
                { text: row.unitPrice },
                { text: "Qté x PU Devis" }, // Replace this with actual calculation if needed.
              ]),
            ],
          },
        },
        // Add other sections of the PDF as needed.
      ],
      // Define styles for the PDF content
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10],
        },
        tableHeader: {
          bold: true,
        },
      },
    };

    // Generate the PDF
    const pdfDocGenerator = pdfMake.createPdf(docDefinition);

    // Download the PDF
    pdfDocGenerator.download("devis.pdf");
  };

  return (
    <div>
     <div style={{ display: "flex", justifyContent: "center" }}>
  <div style={{ width: "350px", margin: "0 10px" }}>
    <div style={{ width: "100%", textAlign: "center" }}>
      <label style={{ color: "#000000" }}>Choix :</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
        }}
      />
     
    </div>
  </div>

  <div style={{ width: "350px", margin: "0 10px" }}>
    <div style={{ width: "100%", textAlign: "center" }}>
      <label style={{ color: "#000000" }}>Choix2 :</label>
      <Select
        options={options2}
        value={selectedOption2}
        onChange={(selectedOption2) => {
          setSelectedOption2(selectedOption2);
        }}
      />
      
    </div>
  </div>
  <button onClick={handleCombinedRechercheClick}style={{ width: "100px",}}>Recherche </button>

  {/* <div style={{ width: "266px", margin: "0 10px" }}>
    <div style={{ width: "100%", textAlign: "center" }}>
      <label style={{ color: "#000000" }}>Choix :</label>
      <Select
        options={options}
        value={selectedOption}
        onChange={(selectedOption) => {
          setSelectedOption(selectedOption);
        }}
      />
      <button onClick={handleRechercheClick}>Recherche</button>
    </div>
  </div> */}
</div>

      {/* Other fields and Table */}
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        {/* Single Select Field */}

        {/* Title and Customer Name and Default Address */}
        <div align="right">
          <p>Customer Name: {customerName}</p>
          <p>Default Address: {defaultAddress}</p>
        </div>
        <div>
          <CustomTableContainer component={Paper}>
            <CustomTable aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Devis</StyledTableCell>
                  <StyledTableCell align="center">Projet</StyledTableCell>
                  <StyledTableCell align="center">Date</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center">{devisValue}</StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {projetValue}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {" "}
                    {currentDate}{" "}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </CustomTable>
          </CustomTableContainer>
        </div>
        <CustomTableContainer component={Paper}>
          <CustomTable aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right">Description</StyledTableCell>
                <StyledTableCell align="right">Quantité</StyledTableCell>
                <StyledTableCell align="right">Montant</StyledTableCell>
                <StyledTableCell align="right">Total</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                  
                    {row.description1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.quantity1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.unitPrice1}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {/* Use the API data here based on alpha_two_code */}
                    {row.alpha_two_code}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </CustomTable>
        </CustomTableContainer>

        {/* Champ de remarque */}
        <div
          style={{
            border: "1px solid black",
            marginTop: "10px",
            padding: "5px",
          }}
        >
          <textarea
            placeholder="Remarque"
            style={{ width: "100%", height: "100px" }}
            onChange={handleRemarqueChange}
            value={remarque}
          />
        </div>
        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "10px",
          }}
        >
          {/* Button to download PDF */}
          <PDFDownloadLink
            document={
              <PdfContent
                data={tableData}
                logoUrl={logoUrl}
                remarque={remarque}
              />
            } // Pass the remarque prop here
            fileName="devis.pdf"
          >
            {({ loading }) => (
              <div
                style={{ display: "flex", alignItems: "center", color: "red" }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  style={{ marginRight: "8px", color: "red" }}
                />
                {loading ? "Téléchargement..." : "Télécharger PDF"}
              </div>
            )}
          </PDFDownloadLink>
          
          <button>Enregistrer</button>
        </div>
      </div>
    </div>
  );
};

export default Devis;
