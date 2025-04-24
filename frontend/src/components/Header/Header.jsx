import React from 'react';
import './Header.css';
import SearchBar from './SearchBar';

const Header = ({ setActiveTab }) => {
  return (
    <div className="header">
      <h1>Cordillera Administrative Region (CAR)</h1>
      <SearchBar />
    </div>
  );
};

export default Header;
