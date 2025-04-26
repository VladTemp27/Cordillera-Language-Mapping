import React, { useState } from "react";
import SideBar from "../SideBar/SideBar";
import LeafletMap from "../LeafletMap/LeafletMap";
import Language from "../Language/Language";
import Information from "../Information/Information";
import "../LanguageMapping/LanguageMapping.css";
import HelpButton from "../buttons/HelpButton";
import Help from "../modals/Help";

const LanguageMapping = () => {
  const [activeTab, setActiveTab] = useState("Information");
  const [selectedProvince, setSelectedProvince] = useState("Select a province");
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const handleProvinceClick = (provinceName) => {
    setSelectedProvince(provinceName || "Select a province");
  };

  const handleHelpClick = () => {
    console.log("Help button clicked!");
    setIsHelpModalOpen(true); 
  }

  const handleCloseHelpModal = () => {
    setIsHelpModalOpen(false);
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
      </div>
      <HelpButton onClick={handleHelpClick}/>
      {isHelpModalOpen && <Help onClose={handleCloseHelpModal} />}
    </div>
  );
};

export default LanguageMapping;
