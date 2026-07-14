import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/>
    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);

const SearchBar = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    location: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });


  const handleChange = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSearch = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (form.location)
        params.append("city", form.location);

    if (form.category)
        params.append("category", form.category);

    if (form.minPrice)
        params.append("minPrice", form.minPrice);

    if (form.maxPrice)
        params.append("maxPrice", form.maxPrice);

    navigate(`/properties?${params.toString()}`);
};

  return (
    <div className="lp-search-wrapper">
      <form className="lp-search-card" onSubmit={handleSearch}>
        {/* Location */}
        <div className="lp-search-group">
          <label className="lp-search-label">Location</label>
          <input
            className="lp-search-input"
            type="text"
            placeholder="City, area or project…"
            value={form.location}
            onChange={handleChange('location')}
          />
        </div>

        {/* Category */}
        <div className="lp-search-group">
          <label className="lp-search-label">Property Type</label>
          <select
            className="lp-search-input"
            value={form.category}
            onChange={handleChange('category')}
          >
            <option value="">All Types</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Independent House</option>
            <option>Commercial</option>
            <option>Office</option>
            <option>Plot</option>
          </select>
        </div>

        {/* Min Price */}
        <div className="lp-search-group">
          <label className="lp-search-label">Min Price</label>
          <select
            className="lp-search-input"
            value={form.minPrice}
            onChange={handleChange('minPrice')}
          >
            <option value="">No Minimum</option>
            <option value="1000000">₹10 L</option>
            <option value="2500000">₹25 L</option>
            <option value="5000000">₹50 L</option>
            <option value="10000000">₹1 Cr</option>
            <option value="20000000">₹2 Cr</option>
          </select>
        </div>

        {/* Max Price */}
        <div className="lp-search-group">
          <label className="lp-search-label">Max Price</label>
          <select
            className="lp-search-input"
            value={form.maxPrice}
            onChange={handleChange('maxPrice')}
          >
            <option value="">No Maximum</option>
            <option value="2500000">₹25 L</option>
            <option value="5000000">₹50 L</option>
            <option value="10000000">₹1 Cr</option>
            <option value="20000000">₹2 Cr</option>
            <option value="50000000">₹5 Cr+</option>
          </select>
        </div>

        {/* Search Button */}
        <button type="submit" className="lp-search-btn">
          <SearchIcon />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
