import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Calendar, 
  Users, 
  Upload, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowLeft, 
  ArrowRight,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format, addDays } from 'date-fns';
import Button from '../../common/Button/Button';
import './CustomOrderForm.css';

// Validation schema
const validationSchema = yup.object({
  // Step 1: Basic Information
  customerName: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone: yup.string().required('Phone number is required').matches(/^[\d\s\-\(\)\+]+$/, 'Invalid phone number'),
  
  // Step 2: Cake Details
  cakeType: yup.string().required('Please select a cake type'),
  cakeSize: yup.string().required('Please select a cake size'),
  servings: yup.number().required('Number of servings is required').min(1, 'Must serve at least 1 person'),
  flavors: yup.array().min(1, 'Please select at least one flavor'),
  
  // Step 3: Customization
  decorationStyle: yup.string().required('Please select a decoration style'),
  colorScheme: yup.string().required('Please select a color scheme'),
  specialRequests: yup.string().max(500, 'Special requests must be less than 500 characters'),
  
  // Step 4: Delivery/Pickup
  deliveryMethod: yup.string().required('Please select delivery or pickup'),
  deliveryDate: yup.date().required('Please select a date').min(addDays(new Date(), 2), 'Orders require at least 2 days notice'),
  deliveryTime: yup.string().required('Please select a time'),
  deliveryAddress: yup.string().when('deliveryMethod', {
    is: 'delivery',
    then: (schema) => schema.required('Delivery address is required'),
    otherwise: (schema) => schema.notRequired()
  })
});

const CustomOrderForm = ({ onSubmit, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isSubmitting },
    trigger
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
    defaultValues: {
      customerName: '',
      email: '',
      phone: '',
      cakeType: '',
      cakeSize: '',
      servings: '',
      flavors: [],
      decorationStyle: '',
      colorScheme: '',
      specialRequests: '',
      deliveryMethod: '',
      deliveryDate: '',
      deliveryTime: '',
      deliveryAddress: ''
    }
  });

  const watchedValues = watch();

  // Price calculation logic
  React.useEffect(() => {
    const calculatePrice = () => {
      let basePrice = 0;
      const { cakeSize, cakeType, decorationStyle, deliveryMethod, servings } = watchedValues;
      
      // Base price by size
      const sizePrices = {
        'small': 45,
        'medium': 75,
        'large': 120,
        'extra-large': 180
      };
      
      // Type multipliers
      const typeMultipliers = {
        'birthday': 1.0,
        'wedding': 1.8,
        'anniversary': 1.3,
        'graduation': 1.1,
        'corporate': 1.4,
        'custom': 1.5
      };
      
      // Decoration multipliers
      const decorationMultipliers = {
        'simple': 1.0,
        'elegant': 1.3,
        'elaborate': 1.8,
        'themed': 2.0
      };
      
      if (cakeSize && sizePrices[cakeSize]) {
        basePrice = sizePrices[cakeSize];
      }
      
      if (cakeType && typeMultipliers[cakeType]) {
        basePrice *= typeMultipliers[cakeType];
      }
      
      if (decorationStyle && decorationMultipliers[decorationStyle]) {
        basePrice *= decorationMultipliers[decorationStyle];
      }
      
      // Delivery fee
      if (deliveryMethod === 'delivery') {
        basePrice += 15;
      }
      
      // Per serving adjustment
      if (servings && servings > 20) {
        basePrice += (servings - 20) * 2;
      }
      
      setEstimatedPrice(Math.round(basePrice));
    };
    
    calculatePrice();
  }, [watchedValues]);

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isStepValid = await trigger(fieldsToValidate);
    
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ['customerName', 'email', 'phone'];
      case 2:
        return ['cakeType', 'cakeSize', 'servings', 'flavors'];
      case 3:
        return ['decorationStyle', 'colorScheme'];
      case 4:
        return ['deliveryMethod', 'deliveryDate', 'deliveryTime', 'deliveryAddress'];
      default:
        return [];
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );
    
    if (validFiles.length !== files.length) {
      toast.error('Some files were rejected. Please upload images under 5MB.');
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleFormSubmit = async (data) => {
    try {
      const formData = {
        ...data,
        referenceImages: uploadedFiles,
        estimatedPrice,
        submittedAt: new Date().toISOString()
      };
      
      await onSubmit(formData);
      toast.success('Order submitted successfully!');
    } catch (error) {
      toast.error('Failed to submit order. Please try again.');
    }
  };

  const toggleFlavor = (flavor) => {
    const currentFlavors = watchedValues.flavors || [];
    const updatedFlavors = currentFlavors.includes(flavor)
      ? currentFlavors.filter(f => f !== flavor)
      : [...currentFlavors, flavor];
    setValue('flavors', updatedFlavors);
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="custom-order-form">
      <div className="form-header">
        <h2>Custom Cake Order</h2>
        <p>Let's create something special together</p>
        
        {/* Progress Bar */}
        <div className="progress-bar">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''}`}
            >
              <div className="step-number">{step}</div>
              <div className="step-label">
                {step === 1 && 'Contact'}
                {step === 2 && 'Cake Details'}
                {step === 3 && 'Customization'}
                {step === 4 && 'Delivery'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="order-form">
        <AnimatePresence mode="wait">
          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="form-step"
            >
              <div className="step-icon">
                <Phone />
              </div>
              <h3>Contact Information</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="customerName">Full Name *</label>
                  <input
                    id="customerName"
                    type="text"
                    {...register('customerName')}
                    className={errors.customerName ? 'error' : ''}
                  />
                  {errors.customerName && (
                    <span className="error-message">{errors.customerName.message}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email.message}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    className={errors.phone ? 'error' : ''}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone.message}</span>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Cake Details */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="form-step"
            >
              <div className="step-icon">
                <ChefHat />
              </div>
              <h3>Cake Details</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="cakeType">Cake Type *</label>
                  <select
                    id="cakeType"
                    {...register('cakeType')}
                    className={errors.cakeType ? 'error' : ''}
                  >
                    <option value="">Select cake type</option>
                    <option value="birthday">Birthday Cake</option>
                    <option value="wedding">Wedding Cake</option>
                    <option value="anniversary">Anniversary Cake</option>
                    <option value="graduation">Graduation Cake</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="custom">Custom Design</option>
                  </select>
                  {errors.cakeType && (
                    <span className="error-message">{errors.cakeType.message}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="cakeSize">Cake Size *</label>
                  <select
                    id="cakeSize"
                    {...register('cakeSize')}
                    className={errors.cakeSize ? 'error' : ''}
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (6" - serves 8-10)</option>
                    <option value="medium">Medium (8" - serves 12-15)</option>
                    <option value="large">Large (10" - serves 20-25)</option>
                    <option value="extra-large">Extra Large (12" - serves 30+)</option>
                  </select>
                  {errors.cakeSize && (
                    <span className="error-message">{errors.cakeSize.message}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="servings">Number of Servings *</label>
                  <input
                    id="servings"
                    type="number"
                    min="1"
                    {...register('servings')}
                    className={errors.servings ? 'error' : ''}
                  />
                  {errors.servings && (
                    <span className="error-message">{errors.servings.message}</span>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label>Flavors * (Select all that apply)</label>
                <div className="flavor-grid">
                  {['Vanilla', 'Chocolate', 'Strawberry', 'Red Velvet', 'Lemon', 'Carrot', 'Funfetti', 'Coconut'].map((flavor) => (
                    <div
                      key={flavor}
                      className={`flavor-option ${watchedValues.flavors?.includes(flavor) ? 'selected' : ''}`}
                      onClick={() => toggleFlavor(flavor)}
                    >
                      {flavor}
                    </div>
                  ))}
                </div>
                {errors.flavors && (
                  <span className="error-message">{errors.flavors.message}</span>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 3: Customization */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="form-step"
            >
              <div className="step-icon">
                <Upload />
              </div>
              <h3>Customization</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="decorationStyle">Decoration Style *</label>
                  <select
                    id="decorationStyle"
                    {...register('decorationStyle')}
                    className={errors.decorationStyle ? 'error' : ''}
                  >
                    <option value="">Select style</option>
                    <option value="simple">Simple & Clean</option>
                    <option value="elegant">Elegant & Classic</option>
                    <option value="elaborate">Elaborate & Detailed</option>
                    <option value="themed">Themed Design</option>
                  </select>
                  {errors.decorationStyle && (
                    <span className="error-message">{errors.decorationStyle.message}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="colorScheme">Color Scheme *</label>
                  <select
                    id="colorScheme"
                    {...register('colorScheme')}
                    className={errors.colorScheme ? 'error' : ''}
                  >
                    <option value="">Select colors</option>
                    <option value="pastels">Soft Pastels</option>
                    <option value="vibrant">Vibrant & Bold</option>
                    <option value="monochrome">Monochrome</option>
                    <option value="gold-accent">Gold Accents</option>
                    <option value="natural">Natural Tones</option>
                    <option value="custom">Custom Colors</option>
                  </select>
                  {errors.colorScheme && (
                    <span className="error-message">{errors.colorScheme.message}</span>
                  )}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="specialRequests">Special Requests</label>
                <textarea
                  id="specialRequests"
                  rows="4"
                  {...register('specialRequests')}
                  placeholder="Any specific details, themes, or requirements..."
                  className={errors.specialRequests ? 'error' : ''}
                />
                {errors.specialRequests && (
                  <span className="error-message">{errors.specialRequests.message}</span>
                )}
              </div>
              
              <div className="form-group">
                <label>Reference Images (Optional)</label>
                <div className="file-upload">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="file-input"
                  />
                  <div className="upload-area">
                    <Upload />
                    <p>Drop images here or click to browse</p>
                    <small>Maximum 5MB per image</small>
                  </div>
                </div>
                
                {uploadedFiles.length > 0 && (
                  <div className="uploaded-files">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="uploaded-file">
                        <span>{file.name}</span>
                        <button type="button" onClick={() => removeFile(index)}>×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Step 4: Delivery/Pickup */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="form-step"
            >
              <div className="step-icon">
                <MapPin />
              </div>
              <h3>Delivery & Pickup</h3>
              
              <div className="form-group">
                <label>Delivery Method *</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="pickup"
                      value="pickup"
                      {...register('deliveryMethod')}
                    />
                    <label htmlFor="pickup">Pickup at Bakery (Free)</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="delivery"
                      value="delivery"
                      {...register('deliveryMethod')}
                    />
                    <label htmlFor="delivery">Delivery (+$15)</label>
                  </div>
                </div>
                {errors.deliveryMethod && (
                  <span className="error-message">{errors.deliveryMethod.message}</span>
                )}
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="deliveryDate">Date *</label>
                  <input
                    id="deliveryDate"
                    type="date"
                    min={format(addDays(new Date(), 2), 'yyyy-MM-dd')}
                    {...register('deliveryDate')}
                    className={errors.deliveryDate ? 'error' : ''}
                  />
                  {errors.deliveryDate && (
                    <span className="error-message">{errors.deliveryDate.message}</span>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="deliveryTime">Time *</label>
                  <select
                    id="deliveryTime"
                    {...register('deliveryTime')}
                    className={errors.deliveryTime ? 'error' : ''}
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                    <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                  </select>
                  {errors.deliveryTime && (
                    <span className="error-message">{errors.deliveryTime.message}</span>
                  )}
                </div>
              </div>
              
              {watchedValues.deliveryMethod === 'delivery' && (
                <div className="form-group">
                  <label htmlFor="deliveryAddress">Delivery Address *</label>
                  <textarea
                    id="deliveryAddress"
                    rows="3"
                    {...register('deliveryAddress')}
                    placeholder="Enter complete delivery address..."
                    className={errors.deliveryAddress ? 'error' : ''}
                  />
                  {errors.deliveryAddress && (
                    <span className="error-message">{errors.deliveryAddress.message}</span>
                  )}
                </div>
              )}
              
              {/* Price Estimate */}
              <div className="price-estimate">
                <div className="price-header">
                  <DollarSign />
                  <h4>Estimated Price</h4>
                </div>
                <div className="price-value">${estimatedPrice}</div>
                <p className="price-note">
                  *Final price will be confirmed after consultation
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="form-navigation">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              icon={ArrowLeft}
            >
              Previous
            </Button>
          )}
          
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              icon={ArrowRight}
              iconPosition="right"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              icon={CheckCircle}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Order'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CustomOrderForm;