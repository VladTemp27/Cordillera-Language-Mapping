import React from "react";
import "./SideBar.css";
import SideBarTab from "./SideBarTab";
import SideBarContent from "./SideBarContent";

const SideBar = ({ children, activeTab, setActiveTab, provinceName }) => {
  return (
    <div>
      <div className="sidebar-title">
        <h1>{provinceName}</h1>
      </div>
      <SideBarTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <SideBarContent>{children}</SideBarContent>
    </div>
  );
};

export default SideBar;
