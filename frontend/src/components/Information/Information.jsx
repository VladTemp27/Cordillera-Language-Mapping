import React, { useState, useEffect } from "react";
import "./Information.css";
import axios from "axios";

// Asset Imports
import baguio from "../../assets/Baguio.png";
import abra from "../../assets/Abra.png";
import apayao from "../../assets/Apayao.png";
import benguet from "../../assets/Benguet.png";
import ifugao from "../../assets/Ifugao.png";
import kalinga from "../../assets/Kalinga.png";
import mountain from "../../assets/MountainProvince.png";

const Information = ({ selectedProvince }) => {
  const [selectedData, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Reset error state when province changes
    setError(null);
    
    // If no province is selected, just clear data and return
    if (!selectedProvince) {
      setData(null);
      return;
    }
    
    console.log("Selected Province:", selectedProvince);
    setLoading(true);
  
    fetchData(selectedProvince)
      .then(data => {
        console.log("Fetched Data:", data);
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching province data:", error);
        setError("Failed to fetch province data.");
        setLoading(false);
      });
  }, [selectedProvince]);

  // Static images for each province
  const imageMap = {
    abra: abra,
    baguio: baguio,
    apayao: apayao,
    benguet: benguet,
    ifugao: ifugao,
    kalinga: kalinga,
    mountain: mountain,
  };

  // FIXME: There is a bug here such that when first loaded an error is shown instead of prompting the user to select a province
  return (
    <div className="information">
      {
      loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading province information...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : selectedData ? (
        <div className="province-card">
          <img
            src={imageMap[selectedData.name.toLowerCase()]}
            alt={selectedData.name}
            className="information-image"
          />
          <p>
            <strong>Short History:</strong> {selectedData.history}
          </p>
        </div>
      ) : (
        <div>Please select a province on the map to view its details.</div>
      )}
    </div>
  );
};

function fetchData(provinceName) {
  console.log("Fetching data for province:", provinceName);
  return axios.get('http://localhost/api/provinces/getAll')
    .then((response) => {
      return response.data;
    })
    .then(data => {
      for (let k in data.provinces) {
        console.log("Province:", data.provinces[k].name);
        if (data.provinces[k].name.toLowerCase() === provinceName.toLowerCase()) {
          return data.provinces[k];
        }
      }

      throw new Error("Province not found");
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export default Information;