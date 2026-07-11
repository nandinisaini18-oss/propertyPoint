import React from 'react';
import { Link } from 'react-router';

const EmptyFavorites = () => {
  return (
    <div className="favorites__empty">
      <div className="favorites__empty-illustration">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="2"></line>
        </svg>
      </div>
      <h2 className="favorites__empty-title">No Favorites Yet</h2>
      <p className="favorites__empty-subtitle">
        Start exploring properties and save your favorites by clicking the heart icon. Keep track of your dream homes here.
      </p>
      
      <div className="favorites__empty-buttons">
        <Link to="/properties" className="favorite-card__btn favorite-card__btn--primary" style={{ padding: '16px 32px', maxWidth: '250px' }}>
          Browse Properties
        </Link>
      </div>
    </div>
  );
};

export default EmptyFavorites;
