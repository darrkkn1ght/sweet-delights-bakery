import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Users, Clock, Heart } from 'lucide-react';
import './About.css';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [imageRef, imageInView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

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

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const achievements = [
    {
      icon: Award,
      title: "Best Local Bakery",
      subtitle: "2020, 2021, 2022",
      description: "Recognized by the community for excellence in baking"
    },
    {
      icon: Users,
      title: "500+ Happy Couples",
      subtitle: "Wedding Cakes",
      description: "Made dreams come true with custom wedding cakes"
    },
    {
      icon: Clock,
      title: "8 Years Experience",
      subtitle: "Est. 2015",
      description: "Serving the community with passion and dedication"
    },
    {
      icon: Heart,
      title: "10,000+ Smiles",
      subtitle: "Daily Fresh Bakes",
      description: "Bringing joy to families every single day"
    }
  ];

  const values = [
    {
      title: "Quality Ingredients",
      description: "We source only the finest, freshest ingredients from local suppliers and premium brands to ensure every bite is exceptional."
    },
    {
      title: "Artisan Craftsmanship",
      description: "Every cake, pastry, and dessert is handcrafted with meticulous attention to detail by our skilled bakers."
    },
    {
      title: "Custom Creations",
      description: "We believe every celebration is unique, and we work closely with you to create personalized confections that tell your story."
    },
    {
      title: "Community Love",
      description: "As a local business, we're committed to giving back to our community and supporting local events and charities."
    }
  ];

  return (
    <section className="about" id="about">
      <div className="about__container">
        <motion.div
          className="about__header"
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="about__badge" variants={itemVariants}>
            <Heart className="about__badge-icon" />
            <span>Our Story</span>
          </motion.div>
          
          <motion.h2 className="about__title" variants={itemVariants}>
            Baking Dreams Into Reality
            <span className="about__title-accent">Since 2015</span>
          </motion.h2>
          
          <motion.p className="about__subtitle" variants={itemVariants}>
            What started as a small family dream has grown into a beloved community staple, 
            where tradition meets innovation in every delicious creation.
          </motion.p>
        </motion.div>

        <div className="about__content">
          <motion.div
            className="about__story"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div className="about__story-text" variants={itemVariants}>
              <h3 className="about__story-title">The Sweet Beginning</h3>
              <p className="about__story-description">
                Founded by Maria and Giuseppe Rodriguez in 2015, Sweet Delights Bakery began as a 
                small neighborhood shop with a big dream: to create extraordinary baked goods that 
                bring people together and make life's special moments even sweeter.
              </p>
              <p className="about__story-description">
                Drawing inspiration from Maria's grandmother's traditional recipes and Giuseppe's 
                innovative culinary techniques, we've created a unique blend of classic and 
                contemporary flavors that have made us a beloved part of the community.
              </p>
              <p className="about__story-description">
                Today, we're proud to serve not just delicious cakes and pastries, but also 
                memories, celebrations, and moments of pure joy. Every creation that leaves our 
                kitchen carries with it our commitment to excellence and our love for the craft.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="about__visual"
            ref={imageRef}
            variants={imageVariants}
            initial="hidden"
            animate={imageInView ? "visible" : "hidden"}
          >
            <div className="about__image-grid">
              <div className="about__image-item about__image-item--large">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Maria and Giuseppe Rodriguez, founders of Sweet Delights Bakery"
                  className="about__image"
                />
                <div className="about__image-overlay">
                  <div className="about__image-text">
                    <h4>Maria & Giuseppe</h4>
                    <p>Founders & Head Bakers</p>
                  </div>
                </div>
              </div>
              
              <div className="about__image-item about__image-item--small">
                <img 
                  src="https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1087&q=80"
                  alt="Fresh pastries being prepared"
                  className="about__image"
                />
              </div>
              
              <div className="about__image-item about__image-item--small">
                <img 
                  src="https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1099&q=80"
                  alt="Bakery kitchen with traditional equipment"
                  className="about__image"
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="about__achievements"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3 className="about__achievements-title" variants={itemVariants}>
            Our Achievements
          </motion.h3>
          
          <div className="about__achievements-grid">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="about__achievement-card"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  transition: { duration: 0.3 } 
                }}
              >
                <div className="about__achievement-icon">
                  <achievement.icon />
                </div>
                <div className="about__achievement-content">
                  <h4 className="about__achievement-title">{achievement.title}</h4>
                  <p className="about__achievement-subtitle">{achievement.subtitle}</p>
                  <p className="about__achievement-description">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="about__values"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3 className="about__values-title" variants={itemVariants}>
            What We Stand For
          </motion.h3>
          
          <div className="about__values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="about__value-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3 } 
                }}
              >
                <h4 className="about__value-title">{value.title}</h4>
                <p className="about__value-description">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;