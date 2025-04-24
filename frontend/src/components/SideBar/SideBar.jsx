import React from 'react';
import './SideBar.css';
import SideBarTab from './SideBarTab';

const SideBar = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h1>CORDILLERA ADMINISTRATIVE REGION (CAR)</h1>
      </div>

      <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="content">
        {children} {/* <-- render active tab content here */}
      </div>
    </div>
  );
};

export default SideBar;
