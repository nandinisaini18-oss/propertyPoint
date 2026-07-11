import React from 'react';

const OfficeCard = () => {
  return (
    <div className="office-card">
      <img 
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
        alt="360Views Headquarters" 
        className="office-card__image" 
      />
      
      <div className="office-card__content">
        <h3 className="office-card__title">Headquarters</h3>
        
        <div className="office-card__details">
          <div className="office-card__detail">
            <svg className="office-card__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>360Views Tower, MP Nagar<br/>Bhopal, Madhya Pradesh 462011</span>
          </div>
          
          <div className="office-card__detail">
            <svg className="office-card__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <span>+91 98765 43210</span>
          </div>
          
          <div className="office-card__detail">
            <svg className="office-card__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            <span>support@360views.com</span>
          </div>
        </div>
        
        <div className="office-card__buttons">
          <a href="tel:+919876543210" className="office-card__btn office-card__btn--primary">Call Us</a>
          <a href="mailto:support@360views.com" className="office-card__btn office-card__btn--outline">Email Us</a>
        </div>
      </div>
    </div>
  );
};

export default OfficeCard;
