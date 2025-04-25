import React from "react";
import "../LandingPage/LandingPage.css";

const FeatureCard = ({ img, title, text, reverse }) => {
  return (
    <article className={`lp-card ${reverse ? "reverse" : ""}`}>
      <img src={img} alt={title} />
      <div className="lp-card-body">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default FeatureCard;
