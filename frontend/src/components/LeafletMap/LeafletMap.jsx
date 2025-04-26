import React, { useState, useRef, useEffect } from "react";
import L from "leaflet";
import "./LeafletMap.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, GeoJSON, Pane, useMap } from "react-leaflet";
import car_region_data from "../../assets/data/car_region.json";

const defaultStyle = {
  fillColor: "#1D5110",
  weight: 2,
  opacity: 1,
  color: "#0E2708",
  fillOpacity: 0.7,
};

const highlightStyle = {
  fillColor: "#deb71b",
  weight: 5,
  color: "#786310",
  fillOpacity: 0.7,
};

// Helper component to attach map click listener using hooks
const MapClickHandler = ({ onClick }) => {
  const map = useMap();
  useEffect(() => {
    map.on("click", onClick);
    return () => {
      map.off("click", onClick);
    };
  }, [map, onClick]);
  return null;
};

const LeafletMap = ({ onProvinceClick, selectedProvinceFromSearch }) => {
  console.log("GeoJSON Data:", car_region_data);
  const [selectedProvince, setSelectedProvince] = useState(null); // State to track the selected layer
  const geoJsonRef = useRef();

  useEffect(() => {
    if (selectedProvinceFromSearch) {
      setSelectedProvince(selectedProvinceFromSearch);
    }
  }, [selectedProvinceFromSearch]);  

  const getFeatureStyle = (feature) => {
    return feature.properties.adm2_en === selectedProvince
      ? highlightStyle
      : defaultStyle;
  };

  const handleProvinceClick = (provinceName, layer) => {
    setSelectedProvince(provinceName);

    layer.bringToFront();

    onProvinceClick(provinceName);
    console.log(provinceName);
  };

  const handleMapClick = () => {
    setSelectedProvince(null);
  };

  const onEachFeature = (feature, layer) => {
    layer.on("click", (e) => {
      L.DomEvent.stopPropagation(e);
      handleProvinceClick(feature.properties.adm2_en, layer);
    });
  };

  useEffect(() => {
    if (geoJsonRef.current) {
      geoJsonRef.current.setStyle(getFeatureStyle);
    }
  }, [selectedProvince]);

  return (
    <MapContainer
      center={[16.4023, 120.596]}
      zoom={9}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "100%" }}
    >
      <Pane name="labels" style={{ zIndex: 650 }} />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
      />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
        pane="labels"
      />

      <MapClickHandler onClick={handleMapClick} />

      <GeoJSON ref={geoJsonRef} data={car_region_data} style={defaultStyle} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default LeafletMap;
