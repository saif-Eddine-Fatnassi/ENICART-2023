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
import { Button, Table, Input,Layout, Space, Card } from "antd";
import FrontEnd from "./Devis";
import Devis from "./Devis";
import MyComponent from "./test_api_call" ;
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
          <Route exact path="/Devis" element={<Devis/>} />
          <Route exact path="/MyComponent" element={<MyComponent/>} />
          
           </Routes>
     <Footer>
       Bial-X 2023
     </Footer>
     </> 
  );
}

export default App;
