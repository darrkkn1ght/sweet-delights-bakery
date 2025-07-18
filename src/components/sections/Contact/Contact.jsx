import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Facebook, 
  Instagram, 
  Twitter,
  Send,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import clsx from 'clsx';

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^[\+]?[1-9][\d]{0,15}$/, 'Invalid phone number'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
  preferredContact: yup.string().oneOf(['email', 'phone', 'either'], 'Please select a contact preference')
});

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('contact');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const storeHours = [
    { day: 'Monday', hours: '7:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '7:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '7:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '7:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '7:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 7:00 PM' },
    { day: 'Sunday', hours: '9:00 AM - 5:00 PM' }
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        <motion.div
          ref={ref}
          className="contact__content"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div className="contact__header" variants={itemVariants}>
            <h2 className="contact__title">Get in Touch</h2>
            <p className="contact__subtitle">
              Have a question or ready to place an order? We'd love to hear from you!
            </p>
          </motion.div>

          <div className="contact__tabs">
            <button
              className={clsx('contact__tab', {
                'contact__tab--active': activeTab === 'contact'
              })}
              onClick={() => setActiveTab('contact')}
            >
              <MessageCircle className="contact__tab-icon" />
              Contact Us
            </button>
            <button
              className={clsx('contact__tab', {
                'contact__tab--active': activeTab === 'hours'
              })}
              onClick={() => setActiveTab('hours')}
            >
              <Clock className="contact__tab-icon" />
              Hours & Location
            </button>
          </div>

          <div className="contact__main">
            {activeTab === 'contact' && (
              <motion.div
                className="contact__form-section"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="contact__form-container">
                  <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="contact__form-group">
                      <div className="contact__form-row">
                        <div className="contact__form-field">
                          <label className="contact__label">Name *</label>
                          <input
                            type="text"
                            className={clsx('contact__input', {
                              'contact__input--error': errors.name
                            })}
                            {...register('name')}
                            placeholder="Your full name"
                          />
                          {errors.name && (
                            <span className="contact__error">{errors.name.message}</span>
                          )}
                        </div>

                        <div className="contact__form-field">
                          <label className="contact__label">Email *</label>
                          <input
                            type="email"
                            className={clsx('contact__input', {
                              'contact__input--error': errors.email
                            })}
                            {...register('email')}
                            placeholder="your.email@example.com"
                          />
                          {errors.email && (
                            <span className="contact__error">{errors.email.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="contact__form-row">
                        <div className="contact__form-field">
                          <label className="contact__label">Phone</label>
                          <input
                            type="tel"
                            className={clsx('contact__input', {
                              'contact__input--error': errors.phone
                            })}
                            {...register('phone')}
                            placeholder="(555) 123-4567"
                          />
                          {errors.phone && (
                            <span className="contact__error">{errors.phone.message}</span>
                          )}
                        </div>

                        <div className="contact__form-field">
                          <label className="contact__label">Subject *</label>
                          <select
                            className={clsx('contact__input', {
                              'contact__input--error': errors.subject
                            })}
                            {...register('subject')}
                          >
                            <option value="">Select a subject</option>
                            <option value="custom-order">Custom Order</option>
                            <option value="wedding-cake">Wedding Cake</option>
                            <option value="birthday-cake">Birthday Cake</option>
                            <option value="catering">Catering</option>
                            <option value="general">General Inquiry</option>
                            <option value="feedback">Feedback</option>
                          </select>
                          {errors.subject && (
                            <span className="contact__error">{errors.subject.message}</span>
                          )}
                        </div>
                      </div>

                      <div className="contact__form-field">
                        <label className="contact__label">Preferred Contact Method</label>
                        <div className="contact__radio-group">
                          <label className="contact__radio-label">
                            <input
                              type="radio"
                              value="email"
                              {...register('preferredContact')}
                              className="contact__radio"
                            />
                            <span className="contact__radio-text">Email</span>
                          </label>
                          <label className="contact__radio-label">
                            <input
                              type="radio"
                              value="phone"
                              {...register('preferredContact')}
                              className="contact__radio"
                            />
                            <span className="contact__radio-text">Phone</span>
                          </label>
                          <label className="contact__radio-label">
                            <input
                              type="radio"
                              value="either"
                              {...register('preferredContact')}
                              className="contact__radio"
                            />
                            <span className="contact__radio-text">Either</span>
                          </label>
                        </div>
                      </div>

                      <div className="contact__form-field">
                        <label className="contact__label">Message *</label>
                        <textarea
                          className={clsx('contact__textarea', {
                            'contact__textarea--error': errors.message
                          })}
                          {...register('message')}
                          placeholder="Tell us about your order or inquiry..."
                          rows="5"
                        />
                        {errors.message && (
                          <span className="contact__error">{errors.message.message}</span>
                        )}
                      </div>

                      <motion.button
                        type="submit"
                        className="contact__submit-btn"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <div className="contact__loading">
                            <div className="contact__spinner"></div>
                            Sending...
                          </div>
                        ) : (
                          <>
                            <Send className="contact__submit-icon" />
                            Send Message
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            )}

            {activeTab === 'hours' && (
              <motion.div
                className="contact__info-section"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="contact__info-grid">
                  <div className="contact__info-card">
                    <div className="contact__info-header">
                      <MapPin className="contact__info-icon" />
                      <h3 className="contact__info-title">Visit Our Bakery</h3>
                    </div>
                    <div className="contact__info-content">
                      <p className="contact__address">
                        123 Sweet Street<br />
                        Bakery District<br />
                        New York, NY 10001
                      </p>
                      <div className="contact__map-placeholder">
                        <div className="contact__map-overlay">
                          <MapPin className="contact__map-icon" />
                          <span>Interactive Map</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="contact__info-card">
                    <div className="contact__info-header">
                      <Clock className="contact__info-icon" />
                      <h3 className="contact__info-title">Store Hours</h3>
                    </div>
                    <div className="contact__info-content">
                      <div className="contact__hours">
                        {storeHours.map((item, index) => (
                          <div key={index} className="contact__hours-item">
                            <span className="contact__hours-day">{item.day}</span>
                            <span className="contact__hours-time">{item.hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="contact__info-card">
                    <div className="contact__info-header">
                      <Phone className="contact__info-icon" />
                      <h3 className="contact__info-title">Contact Information</h3>
                    </div>
                    <div className="contact__info-content">
                      <div className="contact__contact-item">
                        <Phone className="contact__contact-icon" />
                        <span>(555) 123-CAKE</span>
                      </div>
                      <div className="contact__contact-item">
                        <Mail className="contact__contact-icon" />
                        <span>hello@sweetdelights.com</span>
                      </div>
                      <div className="contact__contact-item">
                        <Calendar className="contact__contact-icon" />
                        <span>Orders: 48 hours advance notice</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <motion.div className="contact__social" variants={itemVariants}>
            <h3 className="contact__social-title">Follow Us</h3>
            <div className="contact__social-links">
              <motion.a
                href="#"
                className="contact__social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Facebook className="contact__social-icon" />
              </motion.a>
              <motion.a
                href="#"
                className="contact__social-link"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Instagram className="contact__social-icon" />
              </motion.a>
              <motion.a
                href="#"
                className="contact__social-link"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Twitter className="contact__social-icon" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;