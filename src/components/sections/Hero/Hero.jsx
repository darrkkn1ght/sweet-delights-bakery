import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChefHat, Heart, Star } from 'lucide-react';
import Button from '../../common/Button/Button';
import './Hero.css';

const Hero = ({ onCustomOrder }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero" ref={ref}>
      <div className="hero__background" style={{ transform: `translateY(${scrollY * 0.5}px)` }}>
        <div className="hero__gradient-overlay"></div>
        <div className="hero__pattern-overlay"></div>
      </div>

      <div className="hero__container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="hero__badge" variants={itemVariants}>
            <ChefHat className="hero__badge-icon" />
            <span>Est. 2015 • Handcrafted with Love</span>
          </motion.div>

          <motion.h1 className="hero__title" variants={itemVariants}>
            Sweet Delights
            <span className="hero__title-accent">Bakery</span>
          </motion.h1>

          <motion.p className="hero__subtitle" variants={itemVariants}>
            Where every bite is a moment of pure joy. From artisanal wedding cakes to 
            daily fresh pastries, we craft memories that last a lifetime.
          </motion.p>

          <motion.div className="hero__stats" variants={itemVariants}>
            <div className="hero__stat">
              <div className="hero__stat-number">500+</div>
              <div className="hero__stat-label">Happy Couples</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">10k+</div>
              <div className="hero__stat-label">Cakes Baked</div>
            </div>
            <div className="hero__stat">
              <div className="hero__stat-number">8</div>
              <div className="hero__stat-label">Years of Excellence</div>
            </div>
          </motion.div>

          <motion.div className="hero__actions" variants={itemVariants}>
            <Button 
              variant="primary" 
              size="large"
              onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Cakes
            </Button>
            <Button 
              variant="outline" 
              size="large"
              onClick={onCustomOrder}
            >
              Order Custom Cake
            </Button>
          </motion.div>

          <motion.div className="hero__features" variants={itemVariants}>
            <div className="hero__feature">
              <Heart className="hero__feature-icon" />
              <span>Made with Love</span>
            </div>
            <div className="hero__feature">
              <Star className="hero__feature-icon" />
              <span>Premium Ingredients</span>
            </div>
            <div className="hero__feature">
              <ChefHat className="hero__feature-icon" />
              <span>Expert Craftsmanship</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="hero__visual"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            className="hero__image-container"
            variants={floatingVariants}
            animate="animate"
          >
            <img 
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1089&q=80"
              alt="Beautiful wedding cake with flowers"
              className="hero__image"
            />
            <div className="hero__image-glow"></div>
          </motion.div>

          <motion.div 
            className="hero__floating-element hero__floating-element--1"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '0.5s' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt="Delicious cupcakes"
              className="hero__floating-image"
            />
          </motion.div>

          <motion.div 
            className="hero__floating-element hero__floating-element--2"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: '1s' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80"
              alt="Fresh pastries"
              className="hero__floating-image"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="hero__scroll-indicator">
        <div className="hero__scroll-line"></div>
        <div className="hero__scroll-text">Scroll to explore</div>
      </div>
    </section>
  );
};

export default Hero;