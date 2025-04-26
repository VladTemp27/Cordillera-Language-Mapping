import React from "react";
import { useNavigate, useLocation } from "react-router";
import "../LandingPage/LandingPage.css";
import baguioSeal from "../../assets/BaguioLogo.png";
import SearchBar from "./SearchBar.jsx";

const Header = ({ setActiveTab, handleSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
      <header className="lp-header">
        <div className="lp-header-content">
          <div className="lp-header-title-container" onClick={handleLogoClick}>
            <img
                src={baguioSeal}
                alt="Baguio Logo"
                className="lp-header-logo"
            />
            <div className="lp-header-text">
              <span className="lp-header-sub">Republic of the Philippines</span>
              <h1 className="lp-header-title">City Government of Baguio</h1>
            </div>
          </div>
          {location.pathname === "/language-mapping" && (
              <SearchBar onSearch={handleSearch} />
          )}
        </div>
      </header>
  );
};

export default Header;