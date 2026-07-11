import React from 'react';
import FavoriteCard from './FavoriteCard';

const RecommendedProperties = ({ properties }) => {
  return (
    <div className="recommended">
      <div className="recommended__header">
        <h2 className="recommended__title">You May Also Like</h2>
      </div>
      <div className="favorites__grid">
        {properties.map(property => (
          <FavoriteCard 
            key={property.id} 
            property={property} 
            onRemove={() => console.log('Cannot remove from recommendations')} 
          />
        ))}
      </div>
    </div>
  );
};

export default RecommendedProperties;
