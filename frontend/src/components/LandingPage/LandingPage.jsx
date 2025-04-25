import React from "react";
import "./LandingPage.css";

// ---- asset imports
import baguioSeal from "../../assets/BaguioLogo.png"; // Baguio logo
import QuickLinks from "../QuickLinks/QuickLinks";
import Culture from "../Culture/Culture";
import Hero from "../HeroComponent/BreatheBaguio";
import MayorsCorner from "../MayorsCorner/MayorsCorner";
// ------------------------

const LandingPage = () => (
  <main className="lp-wrapper">
    {/* Header */}
    <header className="lp-header">
      <div className="lp-header-content">
        <div className="lp-header-title-container">
          <img src={baguioSeal} alt="Baguio Logo" className="lp-header-logo" />
          <div className="lp-header-text">
            <span className="lp-header-sub">Republic of the Philippines</span>
            <h1 className="lp-header-title">City Government of Baguio</h1>
          </div>
        </div>
      </div>
    </header>

    {/* Hero Section */}
    <Hero />
    {/* Feature cards */}
    <Culture />
    {/* Quick links */}
    <QuickLinks />
    {/* Mayor's Corner */}
    <MayorsCorner />
  </main>
);

export default LandingPage;
