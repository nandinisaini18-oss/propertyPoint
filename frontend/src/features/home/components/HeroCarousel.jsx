import { useState, useEffect, useRef } from 'react';
import { heroSlides } from '../data/landingData';

const ChevronLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const ChevronRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const HeroCarousel = () => {
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const timerRef              = useRef(null);
  const total                 = heroSlides.length;

  const goTo = (idx) => setActive((idx + total) % total);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // Auto-advance every 3s
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 3000);
    return () => clearInterval(timerRef.current);
  }, [active, paused]);

  const slide = heroSlides[active];

  return (
    <section
      className="lp-hero"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Property showcase carousel"
    >
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div key={s.id} className={`lp-hero__slide${i === active ? ' active' : ''}`}>
          <img
            src={s.image}
            alt={s.title}
            className="lp-hero__img"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          <div className="lp-hero__overlay" />
        </div>
      ))}

      {/* Info overlay */}
      <div className="lp-hero__info" aria-live="polite">
        <div className="lp-hero__label">{slide.label}</div>
        <h1 className="lp-hero__title">{slide.title}</h1>
        <div className="lp-hero__card">
          <div className="lp-hero__card-item">
            <span className="lp-hero__card-label">Price</span>
            <span className="lp-hero__card-value price">{slide.price}</span>
          </div>
          <div className="lp-hero__card-item">
            <span className="lp-hero__card-label">Category</span>
            <span className="lp-hero__card-value">{slide.category}</span>
          </div>
          <div className="lp-hero__card-item">
            <span className="lp-hero__card-label">Area</span>
            <span className="lp-hero__card-value">{slide.area}</span>
          </div>
          {slide.bedrooms > 0 && (
            <div className="lp-hero__card-item">
              <span className="lp-hero__card-label">Bedrooms</span>
              <span className="lp-hero__card-value">{slide.bedrooms} BHK</span>
            </div>
          )}
          <div className="lp-hero__card-item">
            <span className="lp-hero__card-label">Bathrooms</span>
            <span className="lp-hero__card-value">{slide.bathrooms}</span>
          </div>
          <div className="lp-hero__card-item">
            <span className="lp-hero__card-label">Location</span>
            <span className="lp-hero__card-value">{slide.city}, {slide.state}</span>
          </div>
          <div className="lp-hero__card-item">
            <span className="lp-hero__card-label">Status</span>
            <span className={`lp-hero__card-badge lp-hero__card-badge--available`}>
              ● {slide.availability}
            </span>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <div className="lp-hero__arrows">
        <button className="lp-hero__arrow" onClick={prev} aria-label="Previous slide">
          <ChevronLeft />
        </button>
        <button className="lp-hero__arrow" onClick={next} aria-label="Next slide">
          <ChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="lp-hero__dots" role="tablist" aria-label="Carousel indicators">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`lp-hero__dot${i === active ? ' active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            role="tab"
            aria-selected={i === active}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
