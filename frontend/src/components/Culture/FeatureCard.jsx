import React from "react";
import "../LandingPage/LandingPage.css";

const FeatureCard = ({ img, title, text, reverse, className }) => {
  const cardClasses = `lp-card ${reverse ? 'reverse' : ''} ${className || ''}`; // Combine base, reverse, and passed classes

  return (
    <article className={cardClasses.trim()}>
      <img src={img} alt={title} />
      <div className="lp-card-body">
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </article>
  );
};

export default FeatureCard;
