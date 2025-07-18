import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Calendar, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  DollarSign,
  Share2,
  Home,
  Download,
  Star,
  Gift,
  Heart,
  Sparkles
} from 'lucide-react';
import { format } from 'date-fns';
import Button from '../../components/common/Button/Button';
import './ThankYouPage.css';

const ThankYouPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [confettiActive, setConfettiActive] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    // Get order data from navigation state or localStorage
    const data = location.state?.orderData || 
                 JSON.parse(localStorage.getItem('lastOrder') || '{}');
    
    if (data && data.customerName) {
      setOrderData(data);
    } else {
      // If no order data, redirect to home
      navigate('/');
    }

    // Disable confetti after 3 seconds
    const timer = setTimeout(() => {
      setConfettiActive(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [location.state, navigate]);

  const handleShare = async () => {
    setIsSharing(true);
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Sweet Delights Bakery Order',
          text: `I just placed a custom cake order at Sweet Delights Bakery! 🎂`,
          url: window.location.origin
        });
      } else {
        // Fallback to copying to clipboard
        const shareText = `I just placed a custom cake order at Sweet Delights Bakery! 🎂\n${window.location.origin}`;
        await navigator.clipboard.writeText(shareText);
        alert('Share text copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    } finally {
      setIsSharing(false);
    }
  };

  const downloadOrderSummary = () => {
    if (!orderData) return;
    
    const summaryText = `
SWEET DELIGHTS BAKERY - ORDER CONFIRMATION
==========================================

Order Details:
- Customer: ${orderData.customerName}
- Email: ${orderData.email}
- Phone: ${orderData.phone}
- Order Date: ${format(new Date(orderData.submittedAt), 'PPP')}

Cake Information:
- Type: ${orderData.cakeType}
- Size: ${orderData.cakeSize}
- Servings: ${orderData.servings}
- Flavors: ${orderData.flavors?.join(', ')}
- Decoration: ${orderData.decorationStyle}
- Colors: ${orderData.colorScheme}

Delivery/Pickup:
- Method: ${orderData.deliveryMethod}
- Date: ${format(new Date(orderData.deliveryDate), 'PPP')}
- Time: ${orderData.deliveryTime}
${orderData.deliveryAddress ? `- Address: ${orderData.deliveryAddress}` : ''}

Special Requests:
${orderData.specialRequests || 'None'}

Estimated Price: $${orderData.estimatedPrice}

Thank you for choosing Sweet Delights Bakery!
We'll contact you within 24 hours to confirm your order.
    `;
    
    const blob = new Blob([summaryText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sweet-delights-order-${orderData.customerName.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    }
  };

  if (!orderData) {
    return (
      <div className="thank-you-page loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="thank-you-page">
      {/* Confetti Animation */}
      {confettiActive && (
        <div className="confetti-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: ['#D2691E', '#CD853F', '#A0522D', '#FFF8DC'][Math.floor(Math.random() * 4)]
              }}
            />
          ))}
        </div>
      )}

      <motion.div
        className="thank-you-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Success Header */}
        <motion.div className="success-header" variants={itemVariants}>
          <motion.div
            className="success-icon"
            variants={iconVariants}
            initial="initial"
            animate="animate"
          >
            <CheckCircle />
          </motion.div>
          <h1>Order Submitted Successfully!</h1>
          <p className="success-message">
            Thank you, <span className="customer-name">{orderData.customerName}</span>! 
            Your custom cake order has been received and we're excited to create something special for you.
          </p>
        </motion.div>

        {/* Order Summary */}
        <motion.div className="order-summary" variants={itemVariants}>
          <h2>Order Summary</h2>
          
          <div className="summary-grid">
            <div className="summary-section">
              <h3>
                <Gift />
                Cake Details
              </h3>
              <div className="detail-item">
                <span className="label">Type:</span>
                <span className="value">{orderData.cakeType}</span>
              </div>
              <div className="detail-item">
                <span className="label">Size:</span>
                <span className="value">{orderData.cakeSize}</span>
              </div>
              <div className="detail-item">
                <span className="label">Servings:</span>
                <span className="value">{orderData.servings}</span>
              </div>
              <div className="detail-item">
                <span className="label">Flavors:</span>
                <span className="value">{orderData.flavors?.join(', ')}</span>
              </div>
              <div className="detail-item">
                <span className="label">Decoration:</span>
                <span className="value">{orderData.decorationStyle}</span>
              </div>
              <div className="detail-item">
                <span className="label">Colors:</span>
                <span className="value">{orderData.colorScheme}</span>
              </div>
            </div>

            <div className="summary-section">
              <h3>
                <Calendar />
                Delivery Details
              </h3>
              <div className="detail-item">
                <span className="label">Method:</span>
                <span className="value">{orderData.deliveryMethod}</span>
              </div>
              <div className="detail-item">
                <span className="label">Date:</span>
                <span className="value">
                  {format(new Date(orderData.deliveryDate), 'PPP')}
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Time:</span>
                <span className="value">{orderData.deliveryTime}</span>
              </div>
              {orderData.deliveryAddress && (
                <div className="detail-item">
                  <span className="label">Address:</span>
                  <span className="value">{orderData.deliveryAddress}</span>
                </div>
              )}
            </div>

            <div className="summary-section">
              <h3>
                <DollarSign />
                Pricing
              </h3>
              <div className="detail-item price-item">
                <span className="label">Estimated Total:</span>
                <span className="value price">${orderData.estimatedPrice}</span>
              </div>
              <p className="price-note">
                *Final pricing will be confirmed during our consultation call
              </p>
            </div>
          </div>

          {orderData.specialRequests && (
            <div className="special-requests">
              <h3>
                <Sparkles />
                Special Requests
              </h3>
              <p>{orderData.specialRequests}</p>
            </div>
          )}
        </motion.div>

        {/* Next Steps */}
        <motion.div className="next-steps" variants={itemVariants}>
          <h2>What Happens Next?</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Confirmation Call</h4>
                <p>We'll contact you within 24 hours to confirm details and finalize pricing.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Design Consultation</h4>
                <p>Our bakers will work with you to perfect your cake design and specifications.</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Creation & Delivery</h4>
                <p>We'll craft your custom cake and deliver it fresh on your scheduled date.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div className="contact-info" variants={itemVariants}>
          <h2>Need to Make Changes?</h2>
          <p>Contact us if you need to modify your order or have any questions:</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <Phone />
              <div>
                <strong>Phone</strong>
                <p>(555) 123-4567</p>
              </div>
            </div>
            <div className="contact-method">
              <Mail />
              <div>
                <strong>Email</strong>
                <p>orders@sweetdelightsbakery.com</p>
              </div>
            </div>
            <div className="contact-method">
              <MapPin />
              <div>
                <strong>Visit Us</strong>
                <p>123 Baker Street, Sweet City, SC 12345</p>
              </div>
            </div>
            <div className="contact-method">
              <Clock />
              <div>
                <strong>Hours</strong>
                <p>Mon-Sat: 7AM-7PM, Sun: 8AM-5PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="action-buttons" variants={itemVariants}>
          <Button
            onClick={downloadOrderSummary}
            variant="outline"
            icon={Download}
          >
            Download Summary
          </Button>
          
          <Button
            onClick={handleShare}
            variant="outline"
            icon={Share2}
            disabled={isSharing}
          >
            {isSharing ? 'Sharing...' : 'Share Order'}
          </Button>
          
          <Button
            onClick={() => navigate('/')}
            icon={Home}
          >
            Return to Home
          </Button>
        </motion.div>

        {/* Review Invitation */}
        <motion.div className="review-invitation" variants={itemVariants}>
          <div className="review-content">
            <div className="review-icon">
              <Heart />
            </div>
            <h3>Love Sweet Delights?</h3>
            <p>
              We'd love to hear about your experience! Consider leaving us a review 
              after you receive your custom cake.
            </p>
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="star" />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div className="footer-message" variants={itemVariants}>
          <p>
            Thank you for choosing Sweet Delights Bakery for your special occasion. 
            We can't wait to create something amazing for you!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ThankYouPage;