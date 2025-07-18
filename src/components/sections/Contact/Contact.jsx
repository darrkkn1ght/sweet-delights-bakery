import React from 'react';
import './Contact.css';
import { Mail, Clock, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section className="contact-section homepage__contact">
      <h2 className="contact-title">Get in Touch</h2>
      <p className="contact-description">
        Have a question or ready to place an order? We'd love to hear from you!
      </p>
      <form className="contact-form">
        <div>
          <label htmlFor="name">Name *</label>
          <input id="name" name="name" type="text" placeholder="Your full name" required />
        </div>
        <div>
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" placeholder="your.email@example.com" required />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="(555) 123-4567" />
        </div>
        <div>
          <label htmlFor="subject">Subject *</label>
          <select id="subject" name="subject" required>
            <option value="">Select a subject</option>
            <option value="order">Order Inquiry</option>
            <option value="custom">Custom Cake Request</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="message">Message *</label>
          <textarea id="message" name="message" rows={4} placeholder="Tell us about your order or inquiry..." required />
        </div>
        <button type="submit">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
            <Mail size={18} /> Send Message
          </span>
        </button>
      </form>
      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <h3 className="contact-title" style={{ fontSize: '1.3rem', marginBottom: '0.7rem', color: '#A0522D' }}>Follow Us</h3>
        <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', fontSize: '1.7rem', color: '#D2691E' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fa-brands fa-facebook"></i></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter"><i className="fa-brands fa-twitter"></i></a>
        </div>
      </div>
    </section>
  );
};

export default Contact;