import React from 'react';
import { locationStats } from '../data/locationsData';

const LocationStats = () => {
  return (
    <section className="stats">
      <div className="stats__container">
        {locationStats.map((stat) => (
          <div key={stat.id} className="stats__item">
            <div className="stats__value">{stat.value}</div>
            <div className="stats__label">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LocationStats;
