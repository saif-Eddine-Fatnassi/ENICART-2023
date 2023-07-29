import "./App.css";
import React, { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar.js";
import GestionDocumentaire from './GestionDocumentaire';
import Documents from './Documents';
import Affaire from './Affaire';
import Database from './Database';
import { Header } from 'antd/es/layout/layout';
import FrontEnd from "./FrontEnd";
import { Button, Table, Input,Layout, Space, Card } from "antd";
const { Footer } = Layout;
function App() {
 
  return (
    <>
      <Navbar />
     <Routes>
     <Route exact path="/GestionDocumentaire" element={<GestionDocumentaire/>} />

          <Route exact path="/documents" element={<Documents/>} />
          <Route exact path="/affaire" element={<Affaire/>} />
          <Route exact path="/database" element={<Database/>} />
          <Route exact path="/FrontEnd" element={<FrontEnd/>} />



          </Routes>
          <Footer
       
      >
       Bial-X 2023
      </Footer>
     </> 
  );
}

export default App;
/* style={{
  textAlign: 'center',
  backgroundColor: '#f1f1f1',
  padding: '10px',
  textAlign: 'center',
  position: 'fixed',
  left: '0',
  bottom: '0',
  width: '100%',
}}*/