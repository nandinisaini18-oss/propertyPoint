import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate dummy API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-form">
      <h2 className="contact-form__title">Send a Message</h2>
      
      {isSuccess && (
        <div className="contact-form__success">
          Thank you! Your message has been sent successfully. We will get back to you soon.
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="contact-form__group">
          <label className="contact-form__label">Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="contact-form__input"
            required
            disabled={isSubmitting}
            placeholder="John Doe"
          />
        </div>
        
        <div className="contact-form__group">
          <label className="contact-form__label">Email Address</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="contact-form__input"
            required
            disabled={isSubmitting}
            placeholder="john@example.com"
          />
        </div>
        
        <div className="contact-form__group">
          <label className="contact-form__label">Phone Number</label>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="contact-form__input"
            disabled={isSubmitting}
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div className="contact-form__group">
          <label className="contact-form__label">Subject</label>
          <input 
            type="text" 
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="contact-form__input"
            required
            disabled={isSubmitting}
            placeholder="Property Inquiry"
          />
        </div>
        
        <div className="contact-form__group">
          <label className="contact-form__label">Message</label>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="contact-form__textarea"
            required
            disabled={isSubmitting}
            placeholder="How can we help you?"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="contact-form__btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
