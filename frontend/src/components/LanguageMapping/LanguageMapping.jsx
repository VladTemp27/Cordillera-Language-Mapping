import React, { useState } from 'react';
import Sidebar from '../SideBar/SideBar';
import Map from '../Map/Map';
import Language from '../Language/Language';
import Information from '../Information/Information';
import '../LanguageMapping/LanguageMapping.css';

const LanguageMapping = () => {
  const [activeTab, setActiveTab] = useState('Information');

  return (
    <div className="language-mapping">
      <div className="content">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="main-content">
          {activeTab === 'Information' && <Information />}
          {activeTab === 'Language' && <Language />}
          <Map />
        </div>
      </div>
    </div>
  );
};

export default LanguageMapping;