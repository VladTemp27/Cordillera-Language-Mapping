import React from "react";
import "./LeafletMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import car_region_data from "../../assets/data/car_region.json"; // Example data

function onEachFeature(feature, layer) {
  layer.on({
    click: highlightFeature,
    mouseout: resetHighlight,
  });
}

function highlightFeature(e) {
    var layer = e.target;
    const { risques7, libelle} = e.target.feature.properties;
    setOnselect({
        risques:risques7,
        libelle:libelle,
    });
    layer.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
    });
  }
  function resetHighlight(e) {
    setOnselect({});
    e.target.setStyle(style(e.target.feature));
  }

const LeafletMap = ({ onProvinceClick }) => {
  console.log("GeoJSON Data:", car_region_data); // Ensure the GeoJSON data is loaded

  const handleProvinceClick = (provinceName) => {
    onProvinceClick(provinceName);
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
      {car_region_data && (
        <GeoJSON
          data={car_region_data}
          onEachFeature={onEachFeature}
        />
      )}
    </MapContainer>
  );
};

export default LeafletMap;
