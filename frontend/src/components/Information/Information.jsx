import React, { useState, useEffect } from "react";
import "./Information.css";
import axios from "axios";

// Correctly access environment variables in Vite
const apiUrl = "https://cordielleramap-benny-gils-projects.vercel.app/";

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
    "mountain province": mountain,
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
      ) : error && selectedData ? (
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
  console.log("API URL:", apiUrl);
  
  // Use a more efficient endpoint if available
  // Option 1: If there's a direct endpoint for a specific province
  const endpoint = `${apiUrl}api/provinces/name/${provinceName}`;
  
  return axios.get(endpoint)
    .then((response) => response.data)
    .catch((specificError) => {
      console.log("Specific province endpoint failed, trying general endpoint");
      
      // Option 2: Fallback to getting all provinces and filtering
      const allProvincesUrl = `${apiUrl}api/provinces/getAll`;
      return axios.get(allProvincesUrl)
        .then((response) => {
          const data = response.data;
          for (let k in data.provinces) {
            if (data.provinces[k].name.toLowerCase() === provinceName.toLowerCase()) {
              return data.provinces[k];
            }
          }
          throw new Error("Province not found");
        });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}

export default Information;