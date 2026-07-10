import { cities } from '../data/landingData';

const BrowseByCity = () => {
  return (
    <section className="lp-section lp-section--stone" id="cities">
      <div className="lp-container">
        <div className="lp-section-header lp-reveal">
          <span className="lp-section-eyebrow">Locations</span>
          <h2 className="lp-section-title">Explore by City</h2>
          <p className="lp-section-subtitle">
            Browse thousands of verified properties across India's most sought-after cities.
          </p>
        </div>

        <div className="lp-city-grid">
          {cities.map((city, i) => (
            <div
              key={city.name}
              className="lp-city-card lp-reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
              role="button"
              tabIndex={0}
              aria-label={`Explore properties in ${city.name}`}
            >
              <img
                src={city.image}
                alt={`${city.name} skyline`}
                className="lp-city-card__img"
                loading="lazy"
              />
              <div className="lp-city-card__overlay" />
              <div className="lp-city-card__content">
                <div className="lp-city-card__name">{city.name}</div>
                <div className="lp-city-card__count">{city.count} Properties</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCity;
