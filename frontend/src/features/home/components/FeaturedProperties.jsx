import { useState, useEffect } from "react";
import useProperty from "../../property/hook/useProperty";
import PropertyCard from './PropertyCard';

const FeaturedProperties = () => {
  const { handleGetAllProperties } = useProperty();

 const [properties, setProperties] = useState([]);
 useEffect(() => {
    async function fetchProperties() {
        try {
            const data = await handleGetAllProperties();

            if (data.success) {
                setProperties(data.properties);
            }
        } catch (err) {
            console.log(err);
        }
    }

    fetchProperties();
}, []);
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
          {properties.slice(0, 6).map((property, i) => (
              <div
                  key={property._id}
                  className="lp-reveal"
                  style={{ transitionDelay: `${i * 80}ms` }}
              >
                  <PropertyCard property={property} />
              </div>
          ))}
          </div>

        <div style={{ textAlign: 'center', marginTop: '44px' }}>
          <a href="/properties" className="lp-btn lp-btn--outline lp-btn--lg">
            View All Properties
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
