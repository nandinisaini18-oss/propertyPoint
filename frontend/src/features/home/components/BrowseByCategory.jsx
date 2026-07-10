import { categories } from '../data/landingData';

// Category SVG Icons
const icons = {
  apartment: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <path d="M3 9h18M9 21V9M15 9v12"/>
    </svg>
  ),
  villa: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  house: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 22V9.75L12 3l10 6.75V22H2z"/>
      <rect x="8" y="15" width="8" height="7" rx="1"/>
    </svg>
  ),
  commercial: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2"/>
      <path d="M7 10h10M7 14h10M7 6h10"/>
    </svg>
  ),
  office: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
    </svg>
  ),
  plot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 21 21 21 21 3 3 3"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="12" y1="3" x2="12" y2="21"/>
    </svg>
  ),
};

const BrowseByCategory = () => {
  return (
    <section className="lp-section">
      <div className="lp-container">
        <div className="lp-section-header lp-reveal">
          <span className="lp-section-eyebrow">Browse by Type</span>
          <h2 className="lp-section-title">Property Categories</h2>
          <p className="lp-section-subtitle">
            From cozy apartments to sprawling commercial spaces — find exactly what you're looking for.
          </p>
        </div>

        <div className="lp-cat-grid">
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className="lp-cat-card lp-reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
              role="button"
              tabIndex={0}
              aria-label={`Browse ${cat.name} listings`}
            >
              <div className="lp-cat-card__icon">
                {icons[cat.icon]}
              </div>
              <div className="lp-cat-card__name">{cat.name}</div>
              <div className="lp-cat-card__count">{cat.count} listings</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrowseByCategory;
