import React from "react";
import "./LeafletMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import car_region_data from "../../assets/data/car_region.json";

const LeafletMap = () => {
  console.log("GeoJSON Data:", car_region_data);

  return (
    <MapContainer
      center={[17.243776364474886, 120.92880861902745]}
      zoom={9}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        minZoom={0}
        maxZoom={20}
        maxNativeZoom={20}
        noWrap={false}
      />
      <GeoJSON data={car_region_data} />
      </MapContainer>
  );
};

export default LeafletMap;