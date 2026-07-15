import React from 'react';

const CATEGORIES = ["Apartment",
    "Flat",
    "Independent House",
    "Villa",
    "Farmhouse",
    "Residential Plot",
    "Agricultural Land",
    "Commercial Plot",
    "Office",
    "Shop",
    "Commercial Building",
    "Warehouse"];
const AMENITIES = ['Parking', 'Lift', 'Garden', 'Gym', 'Swimming Pool', 'Security', 'Power Backup', 'WiFi'];

const PropertyFilters = ({ filters, onChange, onApply, onReset }) => {

  const handleCategoryChange = (category) => {
    const updated = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onChange('categories', updated);
  };

  const handleAmenityChange = (amenity) => {
    const updated = filters.amenities.includes(amenity)
      ? filters.amenities.filter(a => a !== amenity)
      : [...filters.amenities, amenity];
    onChange('amenities', updated);
  };

  return (
    <div className="property-filters">
      <div className="property-filters__header">
        <h2 className="property-filters__title">Filters</h2>
        <button className="property-filters__reset" onClick={onReset}>Reset</button>
      </div>

      <div className="property-filters__section">
        <h3 className="property-filters__section-title">Category</h3>
        <div className="property-filters__checkbox-group">
          {CATEGORIES.map(category => (
            <label key={category} className="property-filters__checkbox-label">
              <input 
                type="checkbox" 
                className="property-filters__checkbox"
                checked={filters.categories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      <div className="property-filters__section">
        <h3 className="property-filters__section-title">Price Range (₹)</h3>
        <div className="property-filters__input-group">
          <input 
            type="number" 
            placeholder="Min" 
            className="property-filters__input"
            value={filters.minPrice}
            onChange={(e) => onChange('minPrice', e.target.value)}
          />
          <input 
            type="number" 
            placeholder="Max" 
            className="property-filters__input"
            value={filters.maxPrice}
            onChange={(e) => onChange('maxPrice', e.target.value)}
          />
        </div>
      </div>

      <div className="property-filters__section">
        <h3 className="property-filters__section-title">Area (sqft)</h3>
        <div className="property-filters__input-group">
          <input 
            type="number" 
            placeholder="Min Area" 
            className="property-filters__input"
            value={filters.minArea}
            onChange={(e) => onChange('minArea', e.target.value)}
          />
        </div>
      </div>

      <div className="property-filters__section">
        <h3 className="property-filters__section-title">Rooms</h3>
        <div className="property-filters__input-group" style={{ marginBottom: '10px' }}>
          <input 
            type="number" 
            placeholder="Bedrooms" 
            className="property-filters__input"
            value={filters.bedrooms}
            onChange={(e) => onChange('bedrooms', e.target.value)}
          />
        </div>
        <div className="property-filters__input-group">
          <input 
            type="number" 
            placeholder="Bathrooms" 
            className="property-filters__input"
            value={filters.bathrooms}
            onChange={(e) => onChange('bathrooms', e.target.value)}
          />
        </div>
      </div>

      <div className="property-filters__section">
        <h3 className="property-filters__section-title">Amenities</h3>
        <div className="property-filters__checkbox-group">
          {AMENITIES.map(amenity => (
            <label key={amenity} className="property-filters__checkbox-label">
              <input 
                type="checkbox" 
                className="property-filters__checkbox"
                checked={filters.amenities.includes(amenity)}
                onChange={() => handleAmenityChange(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>

      <button className="property-filters__apply" onClick={onApply}>
        Apply Filters
      </button>
    </div>
  );
};

export default PropertyFilters;
