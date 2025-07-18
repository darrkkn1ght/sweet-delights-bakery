import React from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section footer-brand">
            <h3 className="footer-logo">Sweet Delights Bakery</h3>
            <p className="footer-tagline">
              Crafting memories one sweet bite at a time since 1985
            </p>
            <div className="footer-social">
              <a href="#" className="social-link" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <Phone size={16} />
                <span>(555) 123-CAKE</span>
              </div>
              <div className="contact-item">
                <Mail size={16} />
                <span>hello@sweetdelights.com</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Bakery Street, Sweet City, SC 12345</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h4 className="footer-heading">Hours</h4>
            <div className="footer-hours">
              <div className="hours-item">
                <Clock size={16} />
                <div className="hours-text">
                  <div className="hours-days">Mon - Fri</div>
                  <div className="hours-time">6:00 AM - 8:00 PM</div>
                </div>
              </div>
              <div className="hours-item">
                <Clock size={16} />
                <div className="hours-text">
                  <div className="hours-days">Sat - Sun</div>
                  <div className="hours-time">7:00 AM - 9:00 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <a href="#home" className="footer-link">Home</a>
              <a href="#about" className="footer-link">About</a>
              <a href="#gallery" className="footer-link">Gallery</a>
              <a href="#specials" className="footer-link">Daily Specials</a>
              <a href="#contact" className="footer-link">Contact</a>
              <a href="#order" className="footer-link">Custom Orders</a>
            </nav>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              &copy; {currentYear} Sweet Delights Bakery. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy" className="legal-link">Privacy Policy</a>
              <a href="#terms" className="legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;