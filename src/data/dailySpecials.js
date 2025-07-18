// Sweet Delights Bakery - Daily Specials Data
// Dynamic daily offerings with seasonal rotation and limited-time features

import { format, addDays, startOfWeek, addWeeks } from 'date-fns';

export const dailySpecials = [
  {
    id: 'monday-special',
    day: 'Monday',
    name: 'Manic Monday Muffins',
    shortName: 'Muffin Monday',
    description: 'Start your week right with our baker\'s dozen of assorted gourmet muffins. Features blueberry burst, chocolate chip, and seasonal fruit varieties.',
    price: 28,
    originalPrice: 36,
    discount: 22,
    category: 'Pastries',
    image: 'https://images.unsplash.com/photo-1426869981800-95ebf51ce900?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '13 muffins',
    availableUntil: '2:00 PM',
    features: ['Baker\'s dozen', 'Assorted flavors', 'Fresh baked morning'],
    tags: ['muffins', 'breakfast', 'variety'],
    popular: true,
    limitedQuantity: true,
    maxQuantity: 50
  },
  {
    id: 'tuesday-special',
    day: 'Tuesday',
    name: 'Tiramisu Tuesday',
    shortName: 'Tiramisu Day',
    description: 'Indulge in our authentic Italian tiramisu made with espresso-soaked ladyfingers and mascarpone cream. A coffee lover\'s dream dessert.',
    price: 45,
    originalPrice: 55,
    discount: 18,
    category: 'Specialty Desserts',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '8-10 portions',
    availableUntil: '6:00 PM',
    features: ['Authentic Italian recipe', 'Fresh mascarpone', 'Espresso soaked'],
    tags: ['tiramisu', 'italian', 'coffee'],
    popular: true,
    limitedQuantity: true,
    maxQuantity: 15
  },
  {
    id: 'wednesday-special',
    day: 'Wednesday',
    name: 'Wonderful Wednesday Cookies',
    shortName: 'Cookie Wednesday',
    description: 'Mix and match from our selection of 12 gourmet cookie varieties. Perfect for sharing at the office or treating yourself mid-week.',
    price: 24,
    originalPrice: 30,
    discount: 20,
    category: 'Cookies',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '24 cookies',
    availableUntil: '5:00 PM',
    features: ['12 varieties', 'Mix and match', 'Bulk pricing'],
    tags: ['cookies', 'variety', 'office'],
    popular: true,
    limitedQuantity: false,
    maxQuantity: null
  },
  {
    id: 'thursday-special',
    day: 'Thursday',
    name: 'Throwback Thursday Pies',
    shortName: 'Pie Thursday',
    description: 'Classic American pies made from grandma\'s recipes. Choose from apple, cherry, pumpkin, or pecan. Each pie serves 8 generous portions.',
    price: 32,
    originalPrice: 42,
    discount: 24,
    category: 'Pies',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '8 slices',
    availableUntil: '7:00 PM',
    features: ['Traditional recipes', 'Multiple flavors', 'Homestyle baking'],
    tags: ['pies', 'traditional', 'homestyle'],
    popular: true,
    limitedQuantity: true,
    maxQuantity: 20
  },
  {
    id: 'friday-special',
    day: 'Friday',
    name: 'TGIF Celebration Cake',
    shortName: 'Friday Cake',
    description: 'End your week with our signature celebration cake. A three-layer vanilla and chocolate marble cake with rainbow sprinkles and buttercream.',
    price: 38,
    originalPrice: 48,
    discount: 21,
    category: 'Cakes',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '10-12 slices',
    availableUntil: '8:00 PM',
    features: ['Three-layer cake', 'Marble design', 'Celebration ready'],
    tags: ['cake', 'celebration', 'weekend'],
    popular: true,
    limitedQuantity: true,
    maxQuantity: 12
  },
  {
    id: 'saturday-special',
    day: 'Saturday',
    name: 'Saturday Brunch Box',
    shortName: 'Brunch Box',
    description: 'Perfect for weekend gatherings! Includes assorted pastries, mini quiches, fruit tarts, and coffee cake. Feeds 6-8 people.',
    price: 52,
    originalPrice: 68,
    discount: 24,
    category: 'Brunch',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '6-8 people',
    availableUntil: '3:00 PM',
    features: ['Variety box', 'Brunch favorites', 'Group serving'],
    tags: ['brunch', 'variety', 'gathering'],
    popular: true,
    limitedQuantity: true,
    maxQuantity: 25
  },
  {
    id: 'sunday-special',
    day: 'Sunday',
    name: 'Sunday Family Dessert',
    shortName: 'Family Dessert',
    description: 'A large trifle perfect for family dinners. Layers of sponge cake, fresh berries, vanilla custard, and whipped cream in a beautiful glass bowl.',
    price: 35,
    originalPrice: 45,
    discount: 22,
    category: 'Desserts',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '8-10 portions',
    availableUntil: '6:00 PM',
    features: ['Family size', 'Layered dessert', 'Beautiful presentation'],
    tags: ['trifle', 'family', 'sunday'],
    popular: true,
    limitedQuantity: true,
    maxQuantity: 18
  }
];

export const weeklySpecials = [
  {
    id: 'weekly-001',
    name: 'Wedding Cake Tasting',
    description: 'Book a complimentary wedding cake tasting session this week. Sample our most popular flavors and discuss your dream wedding cake.',
    startDate: '2025-07-21',
    endDate: '2025-07-27',
    price: 0,
    originalPrice: 50,
    discount: 100,
    category: 'Services',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Complimentary tasting', 'Consultation included', 'No obligation'],
    tags: ['wedding', 'tasting', 'consultation'],
    requiresBooking: true,
    popular: true
  },
  {
    id: 'weekly-002',
    name: 'Baking Class Bundle',
    description: 'Learn to bake like a pro! Three-class package covering basic cakes, decorating techniques, and advanced pastries. All materials included.',
    startDate: '2025-07-21',
    endDate: '2025-07-27',
    price: 180,
    originalPrice: 240,
    discount: 25,
    category: 'Classes',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    features: ['Three classes', 'All materials included', 'Small group setting'],
    tags: ['classes', 'learning', 'baking'],
    requiresBooking: true,
    popular: false
  }
];

export const seasonalSpecials = [
  {
    id: 'seasonal-summer-001',
    name: 'Summer Berry Parfait',
    description: 'Fresh seasonal berries layered with vanilla mascarpone and honey granola. A light and refreshing summer treat.',
    season: 'Summer',
    availableMonths: [6, 7, 8, 9], // June through September
    price: 12,
    originalPrice: 15,
    discount: 20,
    category: 'Seasonal Desserts',
    image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '1 individual',
    features: ['Fresh seasonal berries', 'Light and refreshing', 'Healthy option'],
    tags: ['summer', 'berries', 'healthy'],
    popular: true
  },
  {
    id: 'seasonal-fall-001',
    name: 'Pumpkin Spice Everything',
    description: 'Our fall collection featuring pumpkin spice cupcakes, cookies, and mini pies. Embrace the autumn flavors with this variety pack.',
    season: 'Fall',
    availableMonths: [9, 10, 11], // September through November
    price: 32,
    originalPrice: 40,
    discount: 20,
    category: 'Seasonal Collection',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    servings: '12 pieces',
    features: ['Variety pack', 'Authentic fall spices', 'Limited time'],
    tags: ['fall', 'pumpkin', 'spice'],
    popular: true
  }
];

export const limitedTimeOffers = [
  {
    id: 'lto-001',
    name: 'Flash Sale Friday',
    description: 'Every Friday from 4-6 PM, all remaining pastries are 50% off! Perfect for weekend treats or stocking up.',
    recurringDay: 'Friday',
    timeStart: '16:00',
    timeEnd: '18:00',
    discount: 50,
    category: 'Flash Sale',
    features: ['50% off', 'All pastries', 'While supplies last'],
    tags: ['flash sale', 'discount', 'pastries'],
    popular: true
  },
  {
    id: 'lto-002',
    name: 'Early Bird Special',
    description: 'First 20 customers each day get 15% off their entire order. The early bird catches the best deals!',
    dailyLimit: 20,
    discount: 15,
    category: 'Early Bird',
    features: ['15% off entire order', 'First 20 customers', 'Daily reset'],
    tags: ['early bird', 'discount', 'daily'],
    popular: true
  }
];

// Utility functions
export const getTodaysSpecial = () => {
  const today = new Date();
  const dayName = format(today, 'EEEE');
  return dailySpecials.find(special => special.day === dayName);
};

export const getWeeksSpecials = () => {
  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today);
  const endOfCurrentWeek = addDays(startOfCurrentWeek, 6);
  
  return weeklySpecials.filter(special => {
    const specialStart = new Date(special.startDate);
    const specialEnd = new Date(special.endDate);
    return specialStart <= endOfCurrentWeek && specialEnd >= startOfCurrentWeek;
  });
};

export const getSeasonalSpecials = () => {
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11
  return seasonalSpecials.filter(special => 
    special.availableMonths.includes(currentMonth)
  );
};

export const getAllActiveSpecials = () => {
  return {
    today: getTodaysSpecial(),
    weekly: getWeeksSpecials(),
    seasonal: getSeasonalSpecials(),
    limitedTime: limitedTimeOffers
  };
};

export const getSpecialById = (id) => {
  const allSpecials = [
    ...dailySpecials,
    ...weeklySpecials,
    ...seasonalSpecials,
    ...limitedTimeOffers
  ];
  return allSpecials.find(special => special.id === id);
};

export const getPopularSpecials = () => {
  const allSpecials = [
    ...dailySpecials,
    ...weeklySpecials,
    ...seasonalSpecials,
    ...limitedTimeOffers
  ];
  return allSpecials.filter(special => special.popular);
};

export const calculateSavings = (originalPrice, discountPrice) => {
  const savings = originalPrice - discountPrice;
  const percentage = Math.round((savings / originalPrice) * 100);
  return {
    dollarAmount: savings,
    percentage: percentage
  };
};