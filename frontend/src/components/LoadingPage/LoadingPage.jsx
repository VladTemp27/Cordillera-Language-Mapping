import React from "react";
import "./LoadingPage.css";

import loadingImg from "../../assets/Loading.gif";

const LoadingPage = ({ onLoaded }) => {
  const handleImageLoad = () => {
    if (onLoaded) {
      onLoaded(); // Notify parent component that the GIF has fully loaded
    }
  };

  return (
    <div className="loading-page">
      <img src={loadingImg} alt="Loading..." onLoad={handleImageLoad} />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingPage;