import React from 'react';

const SortDropdown = ({ value, onChange }) => {
  return (
    <div className="sort-dropdown">
      <span className="sort-dropdown__label">Sort By:</span>
      <select 
        className="sort-dropdown__select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-asc">Price Low to High</option>
        <option value="price-desc">Price High to Low</option>
        <option value="area">Area</option>
        <option value="popular">Most Popular</option>
      </select>
    </div>
  );
};

export default SortDropdown;
