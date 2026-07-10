import { useState } from 'react';
import { featuredProperties } from '../data/landingData';
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  return (
    <section className="lp-section" id="featured">
      <div className="lp-container">
        <div className="lp-section-header lp-reveal">
          <span className="lp-section-eyebrow">Handpicked for you</span>
          <h2 className="lp-section-title">Featured Properties</h2>
          <p className="lp-section-subtitle">
            Premium listings curated by our property experts — verified, accurate, and ready to view.
          </p>
        </div>

        <div className="lp-prop-grid">
          {featuredProperties.map((p, i) => (
              <div
                key={p.id}
                className="lp-reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <PropertyCard property={p} />
              </div>
            ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <a href="#" className="lp-btn lp-btn--outline lp-btn--lg">
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
