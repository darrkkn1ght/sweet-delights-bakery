import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter, Grid, List } from 'lucide-react';
import CakeCard from './CakeCard';
import { cakes } from '../../../data/cakes';
import './CakeGallery.css';

const CakeGallery = () => {
  const [filteredCakes, setFilteredCakes] = useState(cakes);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('name');
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const categories = ['all', 'wedding', 'birthday', 'custom', 'seasonal', 'cupcakes'];

  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      let filtered = cakes;

      // Filter by category
      if (activeCategory !== 'all') {
        filtered = filtered.filter(cake => cake.category === activeCategory);
      }

      // Filter by search term
      if (searchTerm) {
        filtered = filtered.filter(cake =>
          cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cake.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cake.flavor.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Sort results
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return a.name.localeCompare(b.name);
          case 'price':
            return a.price - b.price;
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          default:
            return 0;
        }
      });

      setFilteredCakes(filtered);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory, searchTerm, sortBy]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="cake-gallery" id="gallery">
      <div className="cake-gallery__container">
        <motion.div
          ref={ref}
          className="cake-gallery__header"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <div className="cake-gallery__title-section">
            <h2 className="cake-gallery__title">Our Cake Gallery</h2>
            <p className="cake-gallery__subtitle">
              Discover our collection of handcrafted cakes, each made with love and the finest ingredients
            </p>
          </div>

          <div className="cake-gallery__controls">
            <div className="cake-gallery__search">
              <Search className="cake-gallery__search-icon" size={20} />
              <input
                type="text"
                placeholder="Search cakes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="cake-gallery__search-input"
              />
            </div>

            <div className="cake-gallery__filters">
              <div className="cake-gallery__filter-group">
                <label className="cake-gallery__filter-label">
                  <Filter size={16} />
                  Sort by:
                </label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="cake-gallery__sort-select"
                >
                  <option value="name">Name</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
              </div>

              <div className="cake-gallery__view-toggle">
                <button
                  className={`cake-gallery__view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid size={18} />
                </button>
                <button
                  className={`cake-gallery__view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="cake-gallery__categories"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`cake-gallery__category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </motion.div>

        <div className="cake-gallery__content">
          {isLoading ? (
            <div className="cake-gallery__loading">
              <div className="cake-gallery__spinner"></div>
              <p>Loading delicious cakes...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeCategory}-${searchTerm}-${sortBy}`}
                className={`cake-gallery__grid ${viewMode === 'list' ? 'list-view' : ''}`}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={containerVariants}
              >
                {filteredCakes.length > 0 ? (
                  filteredCakes.map((cake, index) => (
                    <motion.div
                      key={cake.id}
                      variants={itemVariants}
                      custom={index}
                      layout
                    >
                      <CakeCard cake={cake} viewMode={viewMode} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    className="cake-gallery__no-results"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3>No cakes found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                    <button
                      className="cake-gallery__reset-btn"
                      onClick={() => {
                        setActiveCategory('all');
                        setSearchTerm('');
                        setSortBy('name');
                      }}
                    >
                      Reset Filters
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        <motion.div
          className="cake-gallery__cta"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <h3>Don't see what you're looking for?</h3>
          <p>We create custom cakes for any occasion. Let us bring your vision to life!</p>
          <button className="cake-gallery__custom-btn">
            Order Custom Cake
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default CakeGallery;