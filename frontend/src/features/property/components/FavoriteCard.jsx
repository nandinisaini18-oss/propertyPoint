import React from 'react';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../../utils/formatPrice';

const FavoriteCard = ({ property, onRemove }) => {
  return (
    <div className="favorite-card">
      <div className="favorite-card__image-wrapper">
        <img 
          src={property.propertyImages?.[0]}
          alt={property.title} 
          className="favorite-card__image"
        />
        <div className="favorite-card__badges">
          <span className="favorite-card__badge">{property.category}</span>
        </div>
        <button 
          className="favorite-card__heart" 
          onClick={() => onRemove(property._id)}
          aria-label="Remove from favorites"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>
      
      <div className="favorite-card__content">
        <div className="favorite-card__price">{formatPrice(property.price)}</div>
        <h3 className="favorite-card__title">{property.title}</h3>
        
        <div className="favorite-card__location">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          `${property.city}, ${property.state}`
        </div>
        
        <div className="favorite-card__details">
          {property.bedrooms > 0 && (
            <div className="favorite-card__detail-item">
              <span>🛏</span> {property.bedrooms} Bed
            </div>
          )}
          {property.bathrooms > 0 && (
            <div className="favorite-card__detail-item">
              <span>🛁</span> {property.bathrooms} Bath
            </div>
          )}
          {property.area > 0 && (
            <div className="favorite-card__detail-item">
              <span>📐</span> {property.area} sqft
            </div>
          )}
        </div>
        
        <div className="favorite-card__amenities">
          {property.amenities.slice(0, 3).join(' • ')}
          {property.amenities.length > 3 && ' • ...'}
        </div>
        
        <div className="favorite-card__buttons">
          <Link to={`/properties/${property._id}`} className="favorite-card__btn favorite-card__btn--primary">
            View Details
          </Link>
          <button 
            className="favorite-card__btn favorite-card__btn--outline"
            onClick={() => onRemove(property._id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteCard;
