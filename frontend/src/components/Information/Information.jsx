import React, { useState, useEffect } from "react";
import "./Information.css";

const Information = ({ selectedProvince }) => {
  const [data, setData] = useState(null);

  // Sample data for the provinces in CAR, including Baguio
  useEffect(() => {
    const sampleData = {
      provinces: [
        {
          name: "Baguio",
          history:
            "Baguio is known as the Summer Capital of the Philippines, famous for its cool climate, scenic views, and vibrant culture.",
          image:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Session_Road_top_view_%28Baguio_City%3B_02-25-2024%29.jpg/2560px-Session_Road_top_view_%28Baguio_City%3B_02-25-2024%29.jpg"
        },
      ],
    };

    setData(sampleData);
  }, []);

  const selectedData = data?.provinces.find(
    (province) =>
      province.name.toLowerCase() === selectedProvince?.toLowerCase()
  );

  return (
    <div className="information">
      {selectedData ? (
        <div className="province-card">
          <img
            src={selectedData.image}
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