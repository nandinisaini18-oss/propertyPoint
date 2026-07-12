import React from 'react';

const PropertyCard = ({ property }) => {
  return (
    <div className="property-card">
      <div className="property-card__image-wrapper">
        <img 
          src={property.propertyImages?.[0]}
          alt={property.title}
          className="property-card__image"
        />
        <div className="property-card__badges">
          <span className="property-card__badge">{property.status}</span>
          <span className="property-card__badge">{property.category}</span>
        </div>
      </div>
      
      <div className="property-card__content">
        <div className="property-card__price">{property.price}</div>
        <h3 className="property-card__title">{property.title}</h3>
        <div className="property-card__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {property.city}
        </div>
        
        <div className="property-card__details">
          {property.bedrooms > 0 && (
            <div className="property-card__detail-item">
              <span>🛏</span> {property.bedrooms} Bed
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="property-card__detail-item">
              <span>🛁</span> {property.bathrooms} Bath
            </div>
          )}
          {property.area > 0 && (
            <div className="property-card__detail-item">
              <span>📐</span> {property.area} sqft
            </div>
          )}
        </div>
        
        <div className="property-card__amenities">
          {property.amenities.slice(0, 3).join(' • ')}
          {property.amenities.length > 3 && ' • ...'}
        </div>
        
        <div className="property-card__footer">
          <button className="property-card__btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
