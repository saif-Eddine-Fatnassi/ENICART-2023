import React, { useState } from "react";
import {
  FaHome,
  FaBriefcase,
  FaFile,
  FaDatabase,
  FaBars,
} from "react-icons/fa";
import "./Navbar.css";
import Logo from "../assets/bail.png";
/
const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <header>
      <nav id="tete">
        <div className="langue">
          <img src={Logo} alt="Logo" className="logo" />
        </div>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <ul>
            <li className={activePage === "home" ? "active" : ""}>
              <a href="#" onClick={() => handlePageChange("home")}>
                <FaHome />
                Gestion documentaire
              </a>
            </li>
            <li className={activePage === "affaires" ? "active" : ""}>
              <a href="#" onClick={() => handlePageChange("affaires")}>
                <FaBriefcase />
                Affaires
              </a>
            </li>
            <li className={activePage === "Documents" ? "active" : ""}>
              <a href="#" onClick={() => handlePageChange("Documents")}>
                <FaFile />
                Documents
              </a>
            </li>
            <li className={activePage === "metadata" ? "active" : ""}>
              <a href="#" onClick={() => handlePageChange("metadata")}>
                <FaDatabase />
                Meta data
              </a>
            </li>
            
          </ul>
        </div>
        <div id="icon" onClick={toggleMenu}>
          <FaBars />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
