import React, { useEffect } from 'react';
import { Link } from 'react-router';
import Navbar from '../../home/components/Navbar';
import CityCard from '../components/CityCard';
import LocationSearch from '../components/LocationSearch';
import FeaturedLocalities from '../components/FeaturedLocalities';
import LocationStats from '../components/LocationStats';
import { popularCities, whyBuyFeatures } from '../data/locationsData';
import './Locations.css';

const Locations = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="locations">
      <Navbar />

      {/* Hero Section */}
      <section className="locations__hero">
        <img 
          src="https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Modern City Skyline" 
          className="locations__hero-bg"
        />
        <div className="locations__hero-overlay"></div>
        
        <div className="locations__hero-content">
          <h1 className="locations__hero-title">Explore Properties Across India</h1>
          <p className="locations__hero-subtitle">
            Browse verified apartments, villas, houses, plots, offices, and commercial properties in India's most popular cities.
          </p>
          <LocationSearch />
        </div>
      </section>

      {/* Popular Cities Grid */}
      <section className="locations__section">
        <div className="locations__section-header">
          <h2 className="locations__section-title">Popular Cities</h2>
          <p className="locations__section-subtitle">Choose your preferred city and discover thousands of verified properties.</p>
        </div>
        
        <div className="locations__grid">
          {popularCities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </div>
      </section>

      {/* Featured Localities */}
      <section className="locations__section" style={{ backgroundColor: '#FFFFFF', borderRadius: '32px', padding: '60px 40px', marginTop: '20px' }}>
        <div className="locations__section-header">
          <h2 className="locations__section-title">Popular Localities</h2>
          <p className="locations__section-subtitle">Explore top neighbourhoods in major metropolitan areas.</p>
        </div>
        <FeaturedLocalities />
      </section>

      {/* Why Search by Location */}
      <section className="locations__section">
        <div className="locations__section-header">
          <h2 className="locations__section-title">Why Buy by Location</h2>
          <p className="locations__section-subtitle">We make it easy to find your perfect home anywhere in India.</p>
        </div>
        
        <div className="features__grid">
          {whyBuyFeatures.map((feature) => (
            <div key={feature.id} className="feature-card">
              <div className="feature-card__icon">{feature.icon}</div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <LocationStats />

      {/* Call To Action */}
      <section className="locations__section">
        <div className="locations__cta">
          <h2 className="locations__cta-title">Can't Find Your Preferred Location?</h2>
          <p className="locations__cta-subtitle">
            Browse all available properties across India or list your own property today.
          </p>
          <div className="locations__cta-buttons">
            <Link to="/properties" className="locations__cta-btn locations__cta-btn--primary">
              Browse Properties
            </Link>
            <Link to="/sell-property" className="locations__cta-btn locations__cta-btn--outline">
              Sell Property
            </Link>
          </div>
        </div>
      </section>

      {/* Note: Footer component goes here if it exists globally */}
    </div>
  );
};

export default Locations;
