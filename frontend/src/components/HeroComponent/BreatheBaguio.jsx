import React from "react";
import "./BreatheBaguio.css";
import { useNavigate } from "react-router";
import breatheBaguioTitle from "../../assets/BreatheBaguioLogo.png";
import baguioBackground from "../../assets/BaguioMountains.png"; // import your background image

const BreatheBaguio = () => {
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate("/language-mapping");
  };

  return (
    <section className="breathe-baguio-section">
      {/* Background image inserted as <img> */}
      <img
        src={baguioBackground}
        alt="Baguio Mountains"
        className="breathe-background-img"
      />

      <div className="breathe-container">
        <img
          src={breatheBaguioTitle}
          alt="Breathe Baguio"
          className="breathe-title"
        />

        <p className="breathe-description">
          This web application allows users to search, discover, and learn about
          the diverse languages and dialects spoken in Baguio and the greater
          Cordillera region. From Ilocano to Kankanaey, Ibaloi, and beyond—
          each language tells a story of heritage, identity, and connection.
        </p>

        <button className="try-now-button" onClick={handleTryNowClick}>
          TRY NOW
        </button>
      </div>
    </section>
  );
};

export default BreatheBaguio;
