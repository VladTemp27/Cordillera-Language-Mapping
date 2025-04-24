import React from 'react'
import './SearchBar.css'

const SearchBar = () => {
  return (
    <div className="search">
        <input type="text" placeholder="search location" className="search-input" />
        <button className="search-button">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
    </div>
  )
}

export default SearchBar
