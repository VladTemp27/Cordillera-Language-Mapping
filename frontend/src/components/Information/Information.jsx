import React, { useState, useEffect } from "react";
import "./Information.css";

const Information = ({ selectedProvince }) => {
  const [data, setData] = useState(null);

  // Sample data for the provinces in CAR, including Baguio
  useEffect(() => {
    const sampleData = {
      provinces: [
        {
          name: "City of Baguio",
          history:
            "Baguio is known as the Summer Capital of the Philippines, famous for its cool climate, scenic views, and vibrant culture.",
          ethnicGroups: ["Igorot", "Ibaloi", "Kankanaey"],
          image:
            "https://upload.wikimedia.org/wikipedia/commons/2/2b/Baguio_City_Sunrise.jpg",
        },
      ],
    };

    setData(sampleData);
  }, []);

  // TODO: Check this code if it is correct.
  // Normalize the selected province name for matching
  const normalizeName = (name) => {
    if (!name) return ""; // Safeguard in case 'name' is null or undefined
    return name.replace(/^City of /i, "").trim(); // Remove "City of" prefix
  };

    // TODO: Check this code if it is correct.
  const selectedData = data?.provinces.find(
    (province) =>
      normalizeName(province.name).toLowerCase() === normalizeName(selectedProvince)?.toLowerCase() // Case-insensitive comparison with normalized names
  );

  return (
    <div className="information">
      {selectedData ? (
        <div className="province-card">
          <h3>{selectedData.name}</h3>
          <img
            src={selectedData.image}
            alt={selectedData.name}
            className="province-image"
          />
          <p>
            <strong>Short History:</strong> {selectedData.history}
          </p>
          <p>
            <strong>Ethnic Groups:</strong>{" "}
            {selectedData.ethnicGroups.length > 0
              ? selectedData.ethnicGroups.join(", ")
              : "No data available"}
          </p>
        </div>
      ) : (
        <div>Please select a province on the map to view its details.</div>
      )}
    </div>
  );
};

export default Information;