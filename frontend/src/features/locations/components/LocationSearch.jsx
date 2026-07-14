import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LocationSearch = ({ searchTerm, onSearchChange }) => {
    return (
        <form className="locations__search">
            <input
            
                type="text"
                className="locations__search-input"
                placeholder="Search a city..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </form>
    );
};

export default LocationSearch;