import React from 'react'
import './SideBarTab.css'

const SideBarTab = ({ activeTab, setActiveTab}) => {
  return (
    <div className="tabs">
      <button 
          className={`tab-button ${activeTab === 'Information' ? 'active' : ''}`}
          onClick={() => setActiveTab('Information')}
        >
          Information
        </button>
        <button 
          className={`tab-button ${activeTab === 'Language' ? 'active' : ''}`}
          onClick={() => setActiveTab('Language')}
        >
          Language
        </button>
    </div>
  )
}

export default SideBarTab
