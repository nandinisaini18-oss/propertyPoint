import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

// SVG icons
const IconHome = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
);

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change / resize
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  const navLinks = [
    { label: 'Home',    href: '/' },
    { label: 'Buy',     href: '#featured' },
    { label: 'Rent',    href: '#latest' },
    { label: 'Explore', href: '#cities' },
    { label: 'Contact', href: '#footer' },
  ];

  return (
    <>
      <nav className={`lp-navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="lp-navbar__inner">
          {/* Logo */}
          <Link to="/" className="lp-navbar__logo">
            <div className="lp-navbar__logo-icon">
              <IconHome />
            </div>
            <span className="lp-navbar__logo-text">Property Point</span>
          </Link>

          {/* Center Links */}
          <ul className="lp-navbar__links">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="lp-navbar__actions">
            <Link to="/login" className="lp-btn lp-btn--outline">Login</Link>
            <Link to="/register" className="lp-btn lp-btn--primary">Register</Link>
          </div>

          {/* Hamburger */}
          <button
            className={`lp-hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`lp-nav-drawer${menuOpen ? ' open' : ''}`}>
        {navLinks.map((l) => (
          <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <div className="lp-nav-drawer__actions">
          <Link to="/login"    className="lp-btn lp-btn--outline" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/register" className="lp-btn lp-btn--primary" onClick={() => setMenuOpen(false)}>Register</Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
