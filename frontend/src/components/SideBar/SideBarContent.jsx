import React from 'react'
import './SideBarContent.css'

const SideBarContent = ({ children }) => {
  return (
    <div className="content">
        {children} {/* <-- render active tab content here */}
    </div>
  )
}

export default SideBarContent
