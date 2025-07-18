import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero from '../../components/sections/Hero/Hero';
import About from '../../components/sections/About/About';
import DailySpecials from '../../components/sections/DailySpecials/DailySpecials';
import CakeGallery from '../../components/sections/CakeGallery/CakeGallery';
import Contact from '../../components/sections/Contact/Contact';
import CustomOrderForm from '../../components/sections/CustomOrderForm/CustomOrderForm';
import Modal from '../../components/common/Modal/Modal';
import './HomePage.css';

const HomePage = () => {
  const [showCustomOrderForm, setShowCustomOrderForm] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCustomOrderSubmit = (formData) => {
    // Handle form submission - for now, just log and redirect to thank you page
    console.log('Custom order submitted:', formData);
    
    // Store order data in localStorage for thank you page
    localStorage.setItem('lastOrder', JSON.stringify(formData));
    
    // Redirect to thank you page
    window.location.href = '/thank-you';
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: {
        duration: 0.5,
        ease: [0.04, 0.62, 0.23, 0.98]
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="homepage"
        key="homepage"
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        {/* SEO meta tags are handled in index.html for now */}

        <main className="homepage__main">
          {/* Hero Section */}
          <section className="homepage__hero">
            <Hero onCustomOrder={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setShowCustomOrderForm(true);
            }} />
          </section>

          {/* About Section */}
          <section className="homepage__about">
            <About />
          </section>

          {/* Daily Specials Section */}
          <section className="homepage__specials">
            <DailySpecials 
              onOrderNow={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setShowCustomOrderForm(true);
              }}
              onViewDetails={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </section>

          {/* Cake Gallery Section */}
          <section id="gallery" className="homepage__gallery">
            <CakeGallery />
          </section>

          {/* Contact Section */}
          <section id="contact" className="homepage__contact">
            <Contact />
          </section>

          {/* Custom Order Form Modal */}
          <Modal isOpen={showCustomOrderForm} onClose={() => setShowCustomOrderForm(false)}>
            <div style={{ padding: '20px' }}>
              <h2 style={{ marginBottom: '20px', color: '#D2691E' }}>Custom Cake Order Form</h2>
              <CustomOrderForm 
                onSubmit={handleCustomOrderSubmit}
                onClose={() => setShowCustomOrderForm(false)}
              />
            </div>
          </Modal>

          {/* Coming Soon Sections Preview */}
          <section className="homepage__coming-soon">
            <div className="container">
              <motion.div
                className="homepage__coming-soon-content"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="homepage__coming-soon-title">More Delicious Features Coming Soon</h2>
                <div className="homepage__coming-soon-grid">
                  <div className="homepage__coming-soon-item">
                    <div className="homepage__coming-soon-icon">🎂</div>
                    <h3>Cake Gallery</h3>
                    <p>Browse our stunning collection of wedding cakes, birthday cakes, and custom creations</p>
                  </div>
                  <div className="homepage__coming-soon-item">
                    <div className="homepage__coming-soon-icon">📝</div>
                    <h3>Custom Orders</h3>
                    <p>Design your perfect cake with our intuitive custom order form and real-time pricing</p>
                  </div>
                  <div className="homepage__coming-soon-item">
                    <div className="homepage__coming-soon-icon">📍</div>
                    <h3>Visit Us</h3>
                    <p>Find our location, hours, and contact information to plan your visit</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </motion.div>
    </AnimatePresence>
  );
};

export default HomePage;