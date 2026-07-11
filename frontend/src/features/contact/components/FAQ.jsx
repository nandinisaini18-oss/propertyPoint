import React, { useState } from 'react';
import { faqData } from '../data/contactData';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="contact-faq">
      <h2 className="contact-faq__title">Frequently Asked Questions</h2>
      
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div 
            key={faq.id} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div 
              className="faq-item__header" 
              onClick={() => toggleAccordion(index)}
            >
              <span className="faq-item__question">{faq.question}</span>
              <svg 
                className="faq-item__icon"
                width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
            
            <div className="faq-item__body">
              <div className="faq-item__answer">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
