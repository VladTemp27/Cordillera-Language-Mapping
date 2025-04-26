import React, { useState, useEffect } from 'react';
import './SearchBar.css';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const [provinceResponse, languageResponse] = await Promise.all([
          axios.get(`http://localhost/api/provinces/search/province?name=${query}`),
          axios.get(`http://localhost/api/provinces/search/language?name=${query}`)
        ]);

        const provinceData = provinceResponse.data.provinces || [];
        const languageData = languageResponse.data.provinces || [];

        // Merge and remove duplicates based on province ID
        const merged = [...provinceData, ...languageData];
        const uniqueProvinces = Array.from(new Map(merged.map(item => [item.id, item])).values());

        setSuggestions(uniqueProvinces);
        setShowDropdown(uniqueProvinces.length > 0);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
        setShowDropdown(false);
      }
    };

    fetchSuggestions();
  }, [query]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.name);
    setShowDropdown(false);
    onSearch({ 
      name: suggestion.name,
      type: 'suggestion'
    });
  };

  const handleSearch = () => {
    onSearch({ 
      name: query, 
      type: 'manual' 
    });
  };

  return (
    <div className="search">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search Provinces or Languages..."
          className="search-input"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
        />
        <button className="search-button" onClick={handleSearch}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        {Array.isArray(suggestions) && suggestions.length > 0 && (
          <ul className="search-dropdown">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                className="search-dropdown-item"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
