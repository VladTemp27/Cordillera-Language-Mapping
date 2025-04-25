import React, { useState, useEffect } from "react";
import "./Information.css";

// Asset Imports
import baguio from "../../assets/Baguio.png";
import abra from "../../assets/Abra.png";
import apayao from "../../assets/Apayao.png";
import benguet from "../../assets/Benguet.png";
import ifugao from "../../assets/Ifugao.png";
import kalinga from "../../assets/Kalinga.png";
import mountain from "../../assets/MountainProvince.png";

const Information = ({ selectedProvince }) => {
  const [data, setData] = useState(null);

  // Sample data with other provinces
  useEffect(() => {
    const sampleData = {
      provinces: [
        {
          name: "Baguio",
          history:
            "Baguio is known as the Summer Capital of the Philippines, famous for its cool climate, scenic views, and vibrant culture.",
        },
      ],
    };

    setData(sampleData);
  }, []);

  const selectedData = data?.provinces.find(
    (province) =>
      province.name.toLowerCase() === selectedProvince?.toLowerCase()
  );

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

  return (
    <div className="information">
      {selectedData ? (
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

export default Information;