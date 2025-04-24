import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import LeafletMap from "../LeafletMap/LeafletMap";
import Language from "../Language/Language";
import Information from "../Information/Information";
import "../LanguageMapping/LanguageMapping.css";

const LanguageMapping = () => {
  const [activeTab, setActiveTab] = useState("Information");
  const [selectedProvince, setSelectedProvince] = useState(null);

  const handleProvinceClick = (provinceName) => {
    setSelectedProvince(provinceName);
  };

  return (
    <div className="language-mapping">
      <div className="sidebar-container">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === "Information" && (
            <Information selectedProvince={selectedProvince} />
          )}
          {activeTab === "Language" && <Language />}
        </SideBar>
      </div>
      <div className="map-container">
        <LeafletMap onProvinceClick={handleProvinceClick} />
      </div>
    </div>
  );
};

export default LanguageMapping;
