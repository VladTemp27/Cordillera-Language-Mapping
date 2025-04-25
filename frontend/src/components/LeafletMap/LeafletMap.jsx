import React from "react";
import "./LeafletMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import car_region_data from "../../assets/data/car_region.json"; // Example data

const LeafletMap = ({ onProvinceClick }) => {
  console.log("GeoJSON Data:", car_region_data); // Ensure the GeoJSON data is loaded

  const handleProvinceClick = (provinceName) => {
    onProvinceClick(provinceName);
    console.log(provinceName)
  };

  return (
    <MapContainer
      center={[16.4023, 120.596]}
      zoom={9}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        minZoom={0}
        maxZoom={20}
        maxNativeZoom={20}
        noWrap={false}
      />
      <GeoJSON
        data={car_region_data}
        onEachFeature={(feature, layer) => {
          layer.on("click", () => {
            handleProvinceClick(feature.properties.name);
          });
        }}
      />
    </MapContainer>
  );
};

export default LeafletMap;
