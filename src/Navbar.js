import React, { useState } from "react";
import { FaHome, FaBriefcase, FaFile,FaDatabase, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const Logo = "https://images.teamtailor-cdn.com/images/s3/teamtailor-production/logotype-v3/image_uploads/904adb06-3523-49ce-840d-0d00e568e700/original.png";

 
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <header>
      <nav id="tete">
        <div className="langue">
          <img src={Logo}  className="logo" />
        </div>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul>

          <li><NavLink to="/gestiongocumentaire" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaHome /> GestionDocumentaire
          </NavLink>
          </li>

             <li><NavLink to="/affaire" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaBriefcase/> Affaires 
          </NavLink>
          </li>

           <li><NavLink to="/documents" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaFile /> Documents
          </NavLink>
          </li>

            <li><NavLink to="/database" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaDatabase/> Meta Data
          </NavLink>
          </li>

          <li>
              <NavLink to="/devis" // Replace with the actual route for the FrontEnd component
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "" } ><FaDatabase /> Devis
              </NavLink>
            </li>
            
          </ul>
        </div>
        <div id="icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>

      {/* Render the active page component */}
      
      
    </header>
  );
};

export default Navbar;