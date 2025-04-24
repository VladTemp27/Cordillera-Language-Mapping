import React from 'react';
import './SideBar.css';
import SideBarTab from './SideBarTab';
import SideBarContent from './SideBarContent';

const SideBar = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-title">
        <h1>CORDILLERA ADMINISTRATIVE REGION (CAR)</h1>
      </div>

      <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SideBarContent>{children}</SideBarContent>
    </div>
  );
};

export default SideBar;
