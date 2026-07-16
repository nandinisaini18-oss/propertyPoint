import React from 'react';

const SearchBar = ({
  searchParams = {
    city: "",
    category: "",
    budget: "",
  },
  onSearchChange = () => {},
  onSearchSubmit = () => {},
}) => {
  return (
    <form className="search-bar" onSubmit={(e) => { e.preventDefault(); onSearchSubmit(); }}>
      <div className="search-bar__group">
        <label className="search-bar__label">Location</label>
        <input 
          type="text" 
          placeholder="Search by city..." 
          className="search-bar__input"
          value={searchParams.city}
          onChange={(e) => onSearchChange('city', e.target.value)}
        />
      </div>
      
      <div className="search-bar__group">
        <label className="search-bar__label">Property Type</label>
        <select 
          className="search-bar__select"
          value={searchParams.category}
          onChange={(e) => onSearchChange('category', e.target.value)}
        >
          <option value="">Any Type</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa</option>
          <option value="Flat">Flat</option>
          <option value="Independent House">Independent House</option>
          <option value="Residential Plot">Residential Plot</option>
          <option value="Commercial Plot">Commercial Plot</option>
          <option value="Agricultural Land">Agricultural Land</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Farmhouse">Farmhouse</option>
          <option value="Office">Office</option>
          <option value="Shop">Shop</option>
          <option value="Commercial Building">Commercial Building</option>
        </select>
      </div>

      <div className="search-bar__group">
        <label className="search-bar__label">Max Budget</label>
        <select 
          className="search-bar__select"
          value={searchParams.budget}
          onChange={(e) => onSearchChange('budget', e.target.value)}
        >
          <option value="">Any Budget</option>
          <option value="5000000">Up to ₹50 Lakh</option>
          <option value="10000000">Up to ₹1 Cr</option>
          <option value="50000000">Up to ₹5 Cr</option>
          <option value="200000000">Up to ₹20 Cr</option>
        </select>
      </div>
      
      <button type="submit" className="search-bar__button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
