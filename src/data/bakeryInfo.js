// Sweet Delights Bakery - Bakery Information Data
// Complete business information, contact details, and operational data

export const bakeryInfo = {
    name: 'Sweet Delights Bakery',
    tagline: 'Where Every Bite is a Sweet Delight',
    description: 'Family-owned artisan bakery specializing in custom cakes, fresh pastries, and memorable celebrations since 2018. We combine traditional baking techniques with modern flavors to create unforgettable treats for every occasion.',
    established: 2018,
    
    // Contact Information
    contact: {
      phone: {
        primary: '+1 (555) 123-CAKE',
        formatted: '(555) 123-2253',
        whatsapp: '+15551232253'
      },
      email: {
        general: 'hello@sweetdelightsbakery.com',
        orders: 'orders@sweetdelightsbakery.com',
        weddings: 'weddings@sweetdelightsbakery.com',
        classes: 'classes@sweetdelightsbakery.com'
      },
      website: 'www.sweetdelightsbakery.com',
      
      // Social Media
      social: {
        instagram: {
          handle: '@sweetdelightsbakery',
          url: 'https://instagram.com/sweetdelightsbakery',
          followers: '12.5K'
        },
        facebook: {
          handle: 'Sweet Delights Bakery',
          url: 'https://facebook.com/sweetdelightsbakery',
          followers: '8.2K'
        },
        pinterest: {
          handle: 'sweetdelightsbakery',
          url: 'https://pinterest.com/sweetdelightsbakery',
          followers: '15.8K'
        },
        youtube: {
          handle: 'Sweet Delights Bakery',
          url: 'https://youtube.com/sweetdelightsbakery',
          subscribers: '3.4K'
        },
        tiktok: {
          handle: '@sweetdelightsbakery',
          url: 'https://tiktok.com/@sweetdelightsbakery',
          followers: '25.1K'
        }
      }
    },
  
    // Location Information
    location: {
      address: {
        street: '123 Baker Street',
        city: 'Sweet Valley',
        state: 'CA',
        zipCode: '90210',
        country: 'United States',
        full: '123 Baker Street, Sweet Valley, CA 90210'
      },
      coordinates: {
        latitude: 34.0522,
        longitude: -118.2437
      },
      mapUrl: 'https://maps.google.com/?q=123+Baker+Street+Sweet+Valley+CA+90210',
      parking: {
        available: true,
        type: 'Free street parking and dedicated lot',
        spaces: 25,
        accessibility: true
      },
      publicTransport: {
        nearbyStops: [
          'Baker Street Bus Stop (50m)',
          'Sweet Valley Metro Station (0.3 miles)',
          'Downtown Transit Hub (0.7 miles)'
        ],
        busRoutes: ['Route 15', 'Route 23', 'Route 42']
      }
    },
  
    // Business Hours
    hours: {
      regular: {
        monday: { open: '07:00', close: '19:00', closed: false },
        tuesday: { open: '07:00', close: '19:00', closed: false },
        wednesday: { open: '07:00', close: '19:00', closed: false },
        thursday: { open: '07:00', close: '19:00', closed: false },
        friday: { open: '07:00', close: '20:00', closed: false },
        saturday: { open: '08:00', close: '20:00', closed: false },
        sunday: { open: '08:00', close: '18:00', closed: false }
      },
      holiday: {
        christmas: { date: '2024-12-25', closed: true },
        newYear: { date: '2025-01-01', closed: true },
        thanksgiving: { date: '2024-11-28', open: '08:00', close: '14:00' },
        easter: { date: '2025-04-20', open: '08:00', close: '16:00' },
        independence: { date: '2025-07-04', open: '08:00', close: '16:00' }
      },
      notes: [
        'Last orders accepted 30 minutes before closing',
        'Wedding consultations available by appointment only',
        'Baking classes held on weekends - check schedule',
        'Custom orders require 48-72 hours advance notice'
      ]
    },
  
    // Services Offered
    services: {
      primary: [
        {
          id: 'custom-cakes',
          name: 'Custom Cakes',
          description: 'Personalized cakes for any occasion - birthdays, weddings, corporate events',
          icon: '🎂',
          priceRange: '$45-$500+',
          leadTime: '48-72 hours',
          popular: true
        },
        {
          id: 'wedding-cakes',
          name: 'Wedding Cakes',
          description: 'Elegant multi-tier wedding cakes with complimentary tasting sessions',
          icon: '💒',
          priceRange: '$200-$800+',
          leadTime: '2-4 weeks',
          popular: true
        },
        {
          id: 'daily-pastries',
          name: 'Daily Fresh Pastries',
          description: 'Croissants, muffins, cookies, and seasonal treats baked fresh daily',
          icon: '🥐',
          priceRange: '$2-$25',
          leadTime: 'Same day',
          popular: true
        },
        {
          id: 'specialty-desserts',
          name: 'Specialty Desserts',
          description: 'Artisan desserts including tiramisu, trifles, and seasonal specialties',
          icon: '🍰',
          priceRange: '$8-$45',
          leadTime: '24 hours',
          popular: false
        }
      ],
      additional: [
        {
          id: 'catering',
          name: 'Event Catering',
          description: 'Full dessert catering for events up to 200 people',
          icon: '🍽️',
          priceRange: '$5-$15 per person',
          leadTime: '1-2 weeks'
        },
        {
          id: 'baking-classes',
          name: 'Baking Classes',
          description: 'Learn professional baking techniques in our hands-on classes',
          icon: '👨‍🍳',
          priceRange: '$65-$120 per class',
          leadTime: 'Book in advance'
        },
        {
          id: 'delivery',
          name: 'Local Delivery',
          description: 'Free delivery within 5 miles for orders over $50',
          icon: '🚚',
          priceRange: 'Free/$5-$15',
          leadTime: 'Same day'
        }
      ]
    },
  
    // Team Information
    team: {
      owner: {
        name: 'Maria Rodriguez',
        title: 'Head Baker & Owner',
        bio: 'Maria founded Sweet Delights Bakery after 15 years of experience in fine dining pastry kitchens. She trained at the Culinary Institute of America and specializes in European-style baking techniques.',
        image: 'https://images.unsplash.com/photo-1607631568010-9ae008b89d54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        specialties: ['Wedding Cakes', 'French Pastries', 'Chocolate Work']
      },
      headDecorator: {
        name: 'James Chen',
        title: 'Lead Cake Decorator',
        bio: 'James brings artistic flair to every creation with his background in fine arts and 8 years of cake decorating experience. He specializes in sugar flowers and intricate piping work.',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        specialties: ['Sugar Flowers', 'Fondant Work', 'Artistic Designs']
      },
      assistantBaker: {
        name: 'Sophie Williams',
        title: 'Assistant Baker',
        bio: 'Sophie handles our daily fresh pastries and brings creativity to our seasonal menu. She has a passion for incorporating local ingredients and sustainable practices.',
        image: 'https://images.unsplash.com/photo-1494790108755-2616c0763d96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
        specialties: ['Seasonal Treats', 'Healthy Options', 'Local Sourcing']
      }
    },
  
    // Policies and Information
    policies: {
      ordering: {
        customCakes: {
          minimumNotice: '48 hours',
          weddingCakes: '2-4 weeks',
          cancellation: '24 hours for full refund',
          changes: 'Modifications accepted up to 24 hours before pickup'
        },
        payment: {
          accepted: ['Cash', 'Credit Cards', 'Debit Cards', 'Apple Pay', 'Google Pay'],
          deposit: '50% deposit required for custom orders over $100',
          refunds: 'Full refund with 24+ hours notice'
        },
        pickup: {
          times: 'During business hours',
          notification: 'We will call/text when order is ready',
          storage: 'Orders held for 24 hours after pickup time'
        }
      },
      allergens: {
        common: ['Wheat', 'Eggs', 'Dairy', 'Nuts', 'Soy'],
        glutenFree: 'Available upon request with 48 hours notice',
        vegan: 'Vegan options available for most items',
        crossContamination: 'Facility processes nuts and gluten - please inform us of severe allergies'
      },
      special: {
        tasting: 'Complimentary wedding cake tastings by appointment',
        consultation: 'Free design consultation for orders over $150',
        classes: 'All materials included in baking class fees',
        events: 'Private events and parties can be accommodated after hours'
      }
    },
  
    // Awards and Recognition
    recognition: {
      awards: [
        {
          year: 2024,
          title: 'Best Wedding Cake',
          organization: 'Sweet Valley Wedding Awards',
          description: 'Recognized for excellence in wedding cake design and taste'
        },
        {
          year: 2023,
          title: 'Local Business of the Year',
          organization: 'Sweet Valley Chamber of Commerce',
          description: 'Honored for community involvement and business excellence'
        },
        {
          year: 2022,
          title: 'Artisan Baker Award',
          organization: 'California Baking Guild',
          description: 'Recognized for traditional baking techniques and innovation'
        }
      ],
      features: [
        {
          publication: 'Sweet Valley Magazine',
          title: 'Featured cover story - "The Art of Celebration Cakes"',
          date: '2024-03-15'
        },
        {
          publication: 'Local Foodie Blog',
          title: 'Top 10 Bakeries in California',
          date: '2023-12-01'
        },
        {
          publication: 'Wedding Wire',
          title: 'Couples Choice Award Winner',
          date: '2023-11-15'
        }
      ]
    },
  
    // Operational Details
    operations: {
      capacity: {
        dailyOrders: 150,
        customCakes: 25,
        weddingCakes: 5,
        classSize: 12
      },
      equipment: [
        'Professional convection ovens',
        'Stand mixers',
        'Blast chiller',
        'Decorating station',
        'Display cases'
      ],
      ingredients: {
        sourcing: 'Local when possible, organic options available',
        quality: 'Premium ingredients from trusted suppliers',
        seasonal: 'Menu changes seasonally to feature fresh, local produce'
      }
    },
  
    // Seasonal Information
    seasonalInfo: {
      spring: {
        specialties: ['Lemon treats', 'Fresh berry tarts', 'Easter specialties'],
        events: ['Easter catering', 'Spring wedding season', 'Mother\'s Day specials']
      },
      summer: {
        specialties: ['Fresh fruit desserts', 'Light mousses', 'Ice cream cakes'],
        events: ['Wedding peak season', 'Graduation parties', 'Summer festivals']
      },
      fall: {
        specialties: ['Pumpkin spice', 'Apple desserts', 'Warm spices'],
        events: ['Halloween treats', 'Thanksgiving pies', 'Holiday prep']
      },
      winter: {
        specialties: ['Holiday cookies', 'Festive cakes', 'Hot chocolate bombs'],
        events: ['Christmas orders', 'New Year celebrations', 'Valentine\'s Day']
      }
    }
  };
  
  // Utility functions
  export const getBusinessHours = (day) => {
    const dayLower = day.toLowerCase();
    return bakeryInfo.hours.regular[dayLower];
  };
  
  export const isOpenNow = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5);
    
    const todayHours = bakeryInfo.hours.regular[currentDay];
    if (todayHours.closed) return false;
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  };
  
  export const getContactInfo = (type) => {
    const contactMap = {
      phone: bakeryInfo.contact.phone.primary,
      email: bakeryInfo.contact.email.general,
      address: bakeryInfo.location.address.full,
      instagram: bakeryInfo.contact.social.instagram.url,
      facebook: bakeryInfo.contact.social.facebook.url
    };
    
    return contactMap[type] || bakeryInfo.contact.email.general;
  };
  
  export const getSeasonalSpecialties = () => {
    const currentMonth = new Date().getMonth() + 1;
    let season;
    
    if (currentMonth >= 3 && currentMonth <= 5) season = 'spring';
    else if (currentMonth >= 6 && currentMonth <= 8) season = 'summer';
    else if (currentMonth >= 9 && currentMonth <= 11) season = 'fall';
    else season = 'winter';
    
    return bakeryInfo.seasonalInfo[season];
  };
  
  export const getServiceById = (serviceId) => {
    const allServices = [...bakeryInfo.services.primary, ...bakeryInfo.services.additional];
    return allServices.find(service => service.id === serviceId);
  };
  
  export const getPopularServices = () => {
    return bakeryInfo.services.primary.filter(service => service.popular);
  };