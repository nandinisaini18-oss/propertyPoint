import React from 'react';
import { popularLocalities } from '../data/locationsData';

const FeaturedLocalities = () => {
  return (
    <div className="localities__grid">
      {popularLocalities.map((cityData, index) => (
        <div key={index} className="locality-card">
          <h3 className="locality-card__city">{cityData.city}</h3>
          <div className="locality-card__list">
            {cityData.localities.map((locality, idx) => (
              <div key={idx} className="locality-card__item">
                <span className="locality-card__name">{locality.name}</span>
                <span className="locality-card__count">{locality.count}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedLocalities;
