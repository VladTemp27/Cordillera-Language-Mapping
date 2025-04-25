import React from "react";
import "../LandingPage/LandingPage.css";
import baguioSeal from "../../assets/BaguioLogo.png";

const Header = ({ setActiveTab }) => {
  return (
      <header className="lp-header">
        <div className="lp-header-content">
          <div className="lp-header-title-container">
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
        </div>
      </header>
  );
};

export default Header;
