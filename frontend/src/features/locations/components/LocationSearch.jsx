import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const LocationSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?city=${searchTerm}`);
    }
  };

  return (
    <form className="locations__search" onSubmit={handleSearch}>
      <input 
        type="text" 
        className="locations__search-input"
        placeholder="Search a city..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="locations__search-btn">
        Explore
      </button>
    </form>
  );
};

export default LocationSearch;
