import React from 'react';
import './SideBar.css';

const SideBar = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h1>CORDILLERA</h1>
        <h1>ADMINISTRATIVE</h1>
        <h1>REGION (CAR)</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab-button ${activeTab === 'Information' ? 'active' : ''}`}
          onClick={() => setActiveTab('Information')}
        >
          Information
        </button>
        <div className="divider"></div>
        <button 
          className={`tab-button ${activeTab === 'Language' ? 'active' : ''}`}
          onClick={() => setActiveTab('Language')}
        >
          Language
        </button>
      </div>

      <div className="content">
        <div className="main-content">
          {children} {/* <-- render active tab content here */}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
