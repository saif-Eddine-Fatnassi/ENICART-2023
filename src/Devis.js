import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfContent from './PdfContent';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

// Import font data for pdfmake
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const apiUrl = 'http://universities.hipolabs.com/search?country=canada';


const Devis = () => {
  // Options for the select fields
  const logoUrl = require('./assets/bail.png'); // Adjust the path based on your project structure

  const options = [
    { value: 'choix1', label: 'Choix 1' },
    { value: 'choix2', label: 'Choix 2' },
    { value: 'choix3', label: 'Choix 3' },
    // Add more choices as needed
  ];

  // State variables for dynamic values
  const [remarque, setRemarque] = useState('');

  const [customerName, setCustomerName] = useState('John Doe');
  const [defaultAddress, setDefaultAddress] = useState('123 Main Street');
  const [devisValue, setDevisValue] = useState('valeur lue devis');
  const [projetValue, setProjetValue] = useState('valeur lue projet');
  const [tableData, setTableData] = useState([]);

  const handleRemarqueChange = (event) => {
    setRemarque(event.target.value);
  };
  useEffect(() => {
    // Fetch data from the API
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.status);
        const data = response.data.slice(0, 5).map((item) => ({
          description: item.name,
          quantity: item.domains,
          unitPrice: 'Prix unitaire du Devis', // You can set this value based on your requirement
        }));
        setTableData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          text: 'Table Data', // Section title
          style: 'header', // Style for the section title
        },
        {
          table: {
            // Populate the tableData in the PDF
            body: [
              // Table header
              [
                { text: 'Description', style: 'tableHeader' },
                { text: 'Quantité', style: 'tableHeader' },
                { text: 'Montant', style: 'tableHeader' },
                { text: 'Total', style: 'tableHeader' },
              ],
              // Table data rows
              ...tableData.map((row) => [
                { text: row.description },
                { text: row.quantity },
                { text: row.unitPrice },
                { text: 'Qté x PU Devis' }, // Replace this with actual calculation if needed.
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
    pdfDocGenerator.download('devis.pdf');
  };

  return (
    <div>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 20px' }}>
          {/* Champs d'adresse */}
          {/* Champs de recherche avec plusieurs choix */}
          <div>
            <label style={{ color: '#5EC2D7' }}>Recherche 1:</label>
            <Select options={options} />
          </div>
          <div>
            <label style={{ color: '#5EC2D7' }}>Recherche 2:</label>
            <Select options={options} />
          </div>
          <div>
            <label style={{ color: '#5EC2D7' }}>Recherche 3:</label>
            <Select options={options} />
          </div>
        </div>
        {/* Title and Customer Name and Default Address */}
        <div style={{ display: 'flex', justifyContent: 'space-between', margin: '0 20px' }}>
          <div>
            <p style={{ fontSize: '18px' }}>DEVIS: {devisValue}</p>
            <p style={{ fontSize: '18px' }}>Projet: {projetValue}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p>Customer Name: {customerName}</p>
            <p>Default Address: {defaultAddress}</p>
          </div>
        </div>

        {/* Other fields and Table */}
        <div style={{ margin: '0 10px', border: '5px solid #ffffff', padding: '5px' }}>
          <table id="my-table" style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', color: '#5EC2D7', padding: '5px' }}>Description</th>
                <th style={{ border: '1px solid black', padding: '5px', color: '#5EC2D7' }}>Quantité</th>
                <th style={{ border: '1px solid black', padding: '5px', color: '#5EC2D7' }}>Montant</th>
                <th style={{ border: '1px solid black', padding: '5px', color: '#5EC2D7' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{row.description}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{row.quantity}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>{row.unitPrice}</td>
                  <td style={{ border: '1px solid black', padding: '5px' }}>Qté x PU Devis</td>
                </tr>
              ))}
            </tbody>
            {/* Add more rows as needed */}
          </table>

          {/* Champ de remarque */}
          <div style={{ border: '1px solid black', marginTop: '10px', padding: '5px' }}>
            <textarea placeholder="Remarque" style={{ width: '100%', height: '100px' }}     onChange={handleRemarqueChange}
     value={remarque}
      />
            {/* Champ de remarque ici */}
          </div>
          {/* Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
            {/* Button to download PDF */}
            <PDFDownloadLink
  document={<PdfContent data={tableData} logoUrl={logoUrl} remarque={remarque} />} // Pass the remarque prop here
  fileName="devis.pdf"
>
  {({ blob, url, loading, error }) => (loading ? 'Téléchargement...' : 'Télécharger')}
</PDFDownloadLink>
            <button>Imprimer</button>
            <button onClick={handleEnregistrerClick}>Enregistrer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devis;