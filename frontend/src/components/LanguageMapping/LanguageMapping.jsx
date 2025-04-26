import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import LeafletMap from "../LeafletMap/LeafletMap";
import Language from "../Language/Language";
import Information from "../Information/Information";
import "../LanguageMapping/LanguageMapping.css";
import SearchBar from "../Header/SearchBar";

const LanguageMapping = () => {
  const [activeTab, setActiveTab] = useState("Information");
  const [selectedProvince, setSelectedProvince] = useState("**Province**");

  // TODO: Double check this code
  const handleSearch = (searchResult) => {
    if (searchResult.type === 'province') {
      setSelectedProvince(searchResult.name);
    } else if (searchResult.type === 'language') {
      // Map the language to its corresponding province
      const province = provinces.find((p) =>
        p.languages.includes(searchResult.name)
      );
      setSelectedProvince(province ? province.name : "**Province**");
    }
  };

  const handleProvinceClick = (provinceName) => {
    setSelectedProvince(provinceName || "**Province**");
  };

  return (
    <div className="language-mapping">
      <div className="sidebar-container">
        <SideBar activeTab={activeTab} setActiveTab={setActiveTab} provinceName={selectedProvince}>
          {activeTab === "Information" && (
            <Information selectedProvince={selectedProvince} />
          )}
            {activeTab === "Language" && <Language provinceName={selectedProvince} />}
        </SideBar>
      </div>
      <div className="map-container">
        <LeafletMap onProvinceClick={handleProvinceClick} />
        <SearchBar onSearch={handleSearch} />
      </div>
    </div>
  );
};

export default LanguageMapping;
