import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye, Star } from 'lucide-react';
import clsx from 'clsx';

const CakeCard = ({ cake, onViewDetails, className }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onViewDetails(cake);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className={clsx('cake-card', className)}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      layout
    >
      <div className="cake-card__image-container">
        <motion.img
          src={cake.image}
          alt={cake.name}
          className={clsx('cake-card__image', {
            'cake-card__image--loaded': imageLoaded
          })}
          variants={imageVariants}
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="cake-card__image-placeholder">
            <div className="cake-card__image-skeleton"></div>
          </div>
        )}

        <motion.div
          className="cake-card__overlay"
          variants={overlayVariants}
          initial="hidden"
          whileHover="visible"
        >
          <div className="cake-card__actions">
            <motion.button
              className={clsx('cake-card__action-btn', {
                'cake-card__action-btn--liked': isLiked
              })}
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart className="cake-card__action-icon" />
            </motion.button>
            
            <motion.button
              className="cake-card__action-btn"
              onClick={handleViewDetails}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye className="cake-card__action-icon" />
            </motion.button>
          </div>
        </motion.div>

        {cake.featured && (
          <div className="cake-card__badge">
            <Star className="cake-card__badge-icon" />
            <span>Featured</span>
          </div>
        )}

        {cake.category && (
          <div className="cake-card__category">
            {cake.category}
          </div>
        )}
      </div>

      <div className="cake-card__content">
        <h3 className="cake-card__title">{cake.name}</h3>
        <p className="cake-card__description">{cake.description}</p>
        
        <div className="cake-card__details">
          <div className="cake-card__price">
            {cake.priceRange ? (
              <span className="cake-card__price-range">
                ${cake.priceRange.min} - ${cake.priceRange.max}
              </span>
            ) : (
              <span className="cake-card__price-single">
                ${cake.price}
              </span>
            )}
          </div>
          
          {cake.rating && (
            <div className="cake-card__rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={clsx('cake-card__star', {
                    'cake-card__star--filled': i < Math.floor(cake.rating),
                    'cake-card__star--half': i === Math.floor(cake.rating) && cake.rating % 1 !== 0
                  })}
                />
              ))}
              <span className="cake-card__rating-text">({cake.reviewCount})</span>
            </div>
          )}
        </div>

        {cake.servings && (
          <div className="cake-card__servings">
            Serves {cake.servings} people
          </div>
        )}

        <div className="cake-card__footer">
          <motion.button
            className="cake-card__order-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewDetails(cake)}
          >
            Order Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default CakeCard;