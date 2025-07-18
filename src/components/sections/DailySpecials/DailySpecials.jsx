import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Clock, Star, ChefHat } from 'lucide-react';
import { dailySpecials } from '../../../data/dailySpecials';
import Button from '../../common/Button/Button';
import './DailySpecials.css';

const DailySpecials = ({ onOrderNow, onViewDetails }) => {
  const [selectedDay, setSelectedDay] = useState('today');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const getCurrentSpecials = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    return dailySpecials.find(day => day.day === today) || dailySpecials[0];
  };

  const currentSpecials = getCurrentSpecials();

  return (
    <section className="daily-specials" ref={ref}>
      <div className="container">
        <motion.div
          className="daily-specials__header"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="daily-specials__badge">
            <ChefHat className="daily-specials__badge-icon" />
            <span>Fresh Daily</span>
          </div>
          <h2 className="daily-specials__title">Today's Special Delights</h2>
          <p className="daily-specials__subtitle">
            Handcrafted with love every morning, featuring seasonal ingredients and traditional recipes
          </p>
        </motion.div>

        <motion.div
          className="daily-specials__day-selector"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="daily-specials__day-title">
            {currentSpecials.day} Specials
          </h3>
          <div className="daily-specials__time-badge">
            <Clock className="daily-specials__time-icon" />
            <span>Available until sold out</span>
          </div>
        </motion.div>

        <motion.div
          className="daily-specials__grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            key={currentSpecials.id}
            className="daily-specials__card"
            variants={itemVariants}
            whileHover={{ 
              y: -10,
              transition: { duration: 0.3 }
            }}
          >
            <div className="daily-specials__card-header">
              <img 
                src={currentSpecials.image} 
                alt={currentSpecials.name}
                className="daily-specials__card-image"
              />
              {currentSpecials.limitedQuantity && (
                <div className="daily-specials__limited-badge">
                  <Star className="daily-specials__limited-icon" />
                  <span>Limited Time</span>
                </div>
              )}
            </div>
            
            <div className="daily-specials__card-content">
              <h4 className="daily-specials__card-title">{currentSpecials.name}</h4>
              <p className="daily-specials__card-description">{currentSpecials.description}</p>
              
              <div className="daily-specials__card-details">
                <div className="daily-specials__price-section">
                  <span className="daily-specials__price">${currentSpecials.price}</span>
                  {currentSpecials.originalPrice && (
                    <span className="daily-specials__original-price">${currentSpecials.originalPrice}</span>
                  )}
                </div>
                
                <div className="daily-specials__quantity">
                  <span className="daily-specials__quantity-label">Available:</span>
                  <span className="daily-specials__quantity-value">{currentSpecials.maxQuantity || 'Unlimited'}</span>
                </div>
              </div>

              <div className="daily-specials__card-actions">
                <Button 
                  variant="primary" 
                  size="small"
                  className="daily-specials__order-btn"
                  onClick={onOrderNow}
                >
                  Order Now
                </Button>
                <Button 
                  variant="outline" 
                  size="small"
                  className="daily-specials__details-btn"
                  onClick={onViewDetails}
                >
                  View Details
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="daily-specials__cta"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h3 className="daily-specials__cta-title">Want to see our full menu?</h3>
          <p className="daily-specials__cta-text">
            Explore our complete selection of cakes, pastries, and custom creations
          </p>
          <Button 
            variant="secondary" 
            size="large"
            onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Browse All Products
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default DailySpecials;