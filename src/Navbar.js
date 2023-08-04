import React, { useState } from "react";
import { FaHome, FaBriefcase, FaFile,FaDatabase, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Navbar.css";


const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const Logo ="https://agd-web.bial-x.com/static/media/logo.05dba466.png";
 
  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <header>
      <nav id="tete">
        <div className="langue">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul>

          <li><NavLink to="/GestionDocumentaire" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaHome /> Gestion Documentaire
          </NavLink>
          </li>

             <li><NavLink to="/Affaire" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaBriefcase/> Affaires 
          </NavLink>
          </li>

           <li><NavLink to="/Documents" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaFile /> Documents
          </NavLink>
          </li>

            <li><NavLink to="/Database" className={({ isActive, isPending }) => 
          isPending ? "pending" : isActive ? "active" : ""} >  <FaDatabase/> Meta Data
          </NavLink>
          </li>

          <li>
              <NavLink to="/Devis" // Replace with the actual route for the FrontEnd component
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "" } ><FaDatabase /> Devis
              </NavLink>
            </li>
            <li>
              <NavLink to="/test_api_call" // Replace with the actual route for the FrontEnd component
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : "" } ><FaDatabase /> MyComponent
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