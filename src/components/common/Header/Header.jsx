import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import Button from '../Button/Button';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
          {/* Logo */}
          <div className="header__logo">
            <h1 className="logo">Sweet Delights</h1>
            <span className="logo__subtitle">Bakery</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="header__nav">
            <ul className="nav__list">
              <li className="nav__item">
                <button 
                  className="nav__link"
                  onClick={() => scrollToSection('hero')}
                >
                  Home
                </button>
              </li>
              <li className="nav__item">
                <button 
                  className="nav__link"
                  onClick={() => scrollToSection('about')}
                >
                  About
                </button>
              </li>
              <li className="nav__item">
                <button 
                  className="nav__link"
                  onClick={() => scrollToSection('specials')}
                >
                  Daily Specials
                </button>
              </li>
              <li className="nav__item">
                <button 
                  className="nav__link"
                  onClick={() => scrollToSection('gallery')}
                >
                  Gallery
                </button>
              </li>
              <li className="nav__item">
                <button 
                  className="nav__link"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header__actions">
            <div className="header__contact">
              <div className="contact__item">
                <Phone className="contact__icon" size={16} />
                <span className="contact__text">(555) 123-4567</span>
              </div>
              <div className="contact__item">
                <MapPin className="contact__icon" size={16} />
                <span className="contact__text">123 Baker St</span>
              </div>
            </div>
            
            <Button 
              variant="primary"
              size="medium"
              onClick={() => scrollToSection('order')}
              className="header__cta"
            >
              Order Now
            </Button>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'mobile-menu--open' : ''}`}>
        <nav className="mobile-menu__nav">
          <ul className="mobile-menu__list">
            <li className="mobile-menu__item">
              <button 
                className="mobile-menu__link"
                onClick={() => scrollToSection('hero')}
              >
                Home
              </button>
            </li>
            <li className="mobile-menu__item">
              <button 
                className="mobile-menu__link"
                onClick={() => scrollToSection('about')}
              >
                About
              </button>
            </li>
            <li className="mobile-menu__item">
              <button 
                className="mobile-menu__link"
                onClick={() => scrollToSection('specials')}
              >
                Daily Specials
              </button>
            </li>
            <li className="mobile-menu__item">
              <button 
                className="mobile-menu__link"
                onClick={() => scrollToSection('gallery')}
              >
                Gallery
              </button>
            </li>
            <li className="mobile-menu__item">
              <button 
                className="mobile-menu__link"
                onClick={() => scrollToSection('contact')}
              >
                Contact
              </button>
            </li>
          </ul>
          
          <div className="mobile-menu__actions">
            <div className="mobile-menu__contact">
              <div className="contact__item">
                <Phone className="contact__icon" size={16} />
                <span className="contact__text">(555) 123-4567</span>
              </div>
              <div className="contact__item">
                <MapPin className="contact__icon" size={16} />
                <span className="contact__text">123 Baker St</span>
              </div>
            </div>
            
            <Button 
              variant="primary"
              size="large"
              onClick={() => scrollToSection('order')}
              className="mobile-menu__cta"
            >
              Order Now
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu__overlay ${isMenuOpen ? 'mobile-menu__overlay--visible' : ''}`}
        onClick={closeMenu}
      />
    </header>
  );
};

export default Header;