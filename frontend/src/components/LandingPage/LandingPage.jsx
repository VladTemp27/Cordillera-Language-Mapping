import React from "react";
import "./LandingPage.css";

// ---- asset imports
import heroImg from "../../assets/BaguioMountains.png";
import cordilleraDance from "../../assets/Cordillerans.png";
import kalingaTattoo from "../../assets/ApoWandOd.png";
import baguioSeal from "../../assets/BaguioLogo.png";
import baguioPocket from "../../assets/BIMP.png";
import trafficMon from "../../assets/CGOB.png";
import mayorPic from "../../assets/Magalong.png";
import QuickLinks from "../QuickLinks/QuickLinks"; // Aaron - QuickLinks Component
import Culture from "../Culture/Culture";
// ------------------------

const LandingPage = () => (
  <main className="lp-wrapper">
    {/* Header */}
    <header className="lp-header">
      <span className="lp-header-sub">Republic of the Philippines</span>
      <h1 className="lp-header-title">City Government of Baguio</h1>
    </header>

    {/* Hero */}
    <section className="lp-hero">
      <img src={heroImg} alt="Baguio mountains" />
      <div className="lp-hero-overlay">
        <h2>
          breathe <span>BAGUIO</span>
        </h2>
        <p>
          This web application allows users to search, discover, and learn about
          the diverse languages and dialects spoken in Baguio City. You’ll get a
          glimpse from Ibaloi, Kankanaey, Inbal, and beyond—each tongue
          revealing roots of heritage, identity, and shared resilience.
        </p>
        <button>TRY NOW</button>
      </div>
    </section>

    {/* Feature cards */}
    <Culture />

    {/* Quick links
    <section className="lp-links">
      <h3>QUICK LINKS</h3>
      <p>Quick access to Baguio City websites</p>
      <div className="lp-links-grid">
        <LinkCard img={baguioSeal} label="Baguio City Official Website" />
        <LinkCard img={baguioPocket} label="Baguio in my Pocket" />
        <LinkCard img={trafficMon} label="Traffic Monitoring (CGOB)" />
      </div>
    </section> */}

    <QuickLinks />

    {/* Mayor */}
    <section className="lp-mayor">
      <div className="lp-mayor-text">
        <h3>MAYOR’S CORNER</h3>
        <h4>Mayor Benjamin Magalong</h4>
        <p>
          Baguio City is currently led by Mayor Benjamin Magalong, known for his
          focus on good governance, smart tourism, and innovative urban
          management. His administration spearheads traffic decongestion,
          environmental preservation, and digital innovation—echoing the city’s
          resilient, community-driven spirit.
        </p>
      </div>
      <img src={mayorPic} alt="Mayor Benjamin Magalong" />
    </section>
  </main>
);

const FeatureCard = ({ img, title, text, reverse }) => (
  <article className={`lp-card ${reverse ? "reverse" : ""}`}>
    <img src={img} alt={title} />
    <div className="lp-card-body">
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  </article>
);

const LinkCard = ({ img, label }) => (
  <a href="#!" className="lp-link-card">
    <img src={img} alt={label} />
    <span>{label}</span>
  </a>
);

export default LandingPage;
