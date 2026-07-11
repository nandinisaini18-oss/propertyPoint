import React, { useEffect } from 'react';
import Navbar from '../../home/components/Navbar';
import ContactInfo from '../components/ContactInfo';
import ContactForm from '../components/ContactForm';
import FAQ from '../components/FAQ';
import OfficeCard from '../components/OfficeCard';
import './Contact.css';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="contact">
      <Navbar />

      {/* Hero Section */}
      <section className="contact__hero">
        <img 
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Modern Office" 
          className="contact__hero-bg"
        />
        <div className="contact__hero-overlay"></div>
        
        <div className="contact__hero-content">
          <h1 className="contact__hero-title">Get in Touch</h1>
          <p className="contact__hero-subtitle">
            We'd love to hear from you. Whether you have a question, feedback, or need help finding the perfect property, our team is here to assist.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="contact__main">
        <ContactInfo />
        
        <div className="contact__grid">
          <ContactForm />
          <FAQ />
        </div>
        
        {/* Office & Map */}
        <div className="contact__bottom">
          <OfficeCard />
          
          {/* <div className="contact__map">
            <div className="contact__map-inner">
              <svg className="contact__map-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div className="contact__map-text">Our Office Location</div>
              <p style={{ marginTop: '8px', fontSize: '0.9rem' }}>Interactive map will load here.</p>
            </div>
          </div> */}
        </div>
      </main>
      
      {/* Footer component would go here */}
    </div>
  );
};

export default Contact;
