import React, { useState, useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import FavoriteCard from '../components/FavoriteCard';
import EmptyFavorites from '../components/EmptyFavorites';
import RecommendedProperties from '../components/RecommendedProperties';
import { favoriteProperties, recommendedProperties } from '../data/favoritesData';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState(favoriteProperties);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemove = (id) => {
    setFavorites(prev => prev.filter(property => property.id !== id));
  };

  return (
    <div className="favorites">
      <Navbar />

      <header className="favorites__header">
        <h1 className="favorites__title">
          Your Favorite Properties
          <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </h1>
        <p className="favorites__subtitle">
          Keep track of your dream homes and compare them before making your decision.
        </p>
      </header>

      <main className="favorites__content">
        {favorites.length > 0 ? (
          <>
            <div className="favorites__count">{favorites.length} Saved Properties</div>
            <div className="favorites__grid">
              {favorites.map(property => (
                <FavoriteCard 
                  key={property.id} 
                  property={property} 
                  onRemove={handleRemove}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <EmptyFavorites />
            <RecommendedProperties properties={recommendedProperties} />
          </>
        )}
      </main>
    </div>
  );
};

export default Favorites;
