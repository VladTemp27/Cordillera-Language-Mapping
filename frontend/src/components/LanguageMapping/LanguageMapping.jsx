import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import Map from "../Map/Map";
import Language from "../Language/Language";
import Information from "../Information/Information";
import "../LanguageMapping/LanguageMapping.css";

const LanguageMapping = () => {
  const [activeTab, setActiveTab] = useState("Information");

  return (
    <div className="language-mapping">
      <div className="sidebar-container">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab}>
          {activeTab === "Information" && <Information />}
          {activeTab === "Language" && <Language />}
        </SideBar>
      </div>
      <div className="map-container">
        <Map />
      </div>
    </div>
  );
};

export default LanguageMapping;
