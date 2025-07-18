// Sweet Delights Bakery - Cakes Data
// Rich data structure for cake categories, products, and customization options

export const cakeCategories = [
    {
      id: 'wedding',
      name: 'Wedding Cakes',
      description: 'Elegant multi-tiered cakes perfect for your special day',
      icon: '💒',
      featured: true
    },
    {
      id: 'birthday',
      name: 'Birthday Cakes',
      description: 'Fun and festive cakes to celebrate another year',
      icon: '🎂',
      featured: true
    },
    {
      id: 'custom',
      name: 'Custom Cakes',
      description: 'Personalized creations tailored to your vision',
      icon: '🎨',
      featured: true
    },
    {
      id: 'cupcakes',
      name: 'Cupcakes',
      description: 'Individual treats perfect for any occasion',
      icon: '🧁',
      featured: false
    },
    {
      id: 'seasonal',
      name: 'Seasonal Specialties',
      description: 'Limited-time offerings celebrating the season',
      icon: '🍂',
      featured: false
    },
    {
      id: 'classic',
      name: 'Classic Cakes',
      description: 'Traditional favorites that never go out of style',
      icon: '🍰',
      featured: false
    }
  ];
  
  export const cakes = [
    // Wedding Cakes
    {
      id: 'wedding-001',
      name: 'Romantic Rose Garden',
      category: 'wedding',
      price: 450,
      priceRange: '$450-$850',
      description: 'A three-tier masterpiece adorned with hand-crafted sugar roses in blush pink and ivory. Features vanilla bean cake with raspberry filling and silky vanilla buttercream.',
      flavors: ['Vanilla Bean', 'Raspberry Filling', 'Vanilla Buttercream'],
      servings: '75-100',
      preparationTime: '5-7 days',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Hand-crafted sugar flowers', 'Multiple tier options', 'Custom color matching'],
      popular: true,
      tags: ['elegant', 'romantic', 'traditional']
    },
    {
      id: 'wedding-002',
      name: 'Modern Minimalist',
      category: 'wedding',
      price: 380,
      priceRange: '$380-$650',
      description: 'Clean lines and sophisticated simplicity define this contemporary wedding cake. Smooth white fondant with geometric gold leaf accents and fresh eucalyptus.',
      flavors: ['Lemon Cake', 'Blueberry Compote', 'Cream Cheese Frosting'],
      servings: '50-75',
      preparationTime: '3-5 days',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Geometric design', 'Metallic accents', 'Fresh greenery'],
      popular: false,
      tags: ['modern', 'minimalist', 'geometric']
    },
    {
      id: 'wedding-003',
      name: 'Rustic Naked Cake',
      category: 'wedding',
      price: 280,
      priceRange: '$280-$420',
      description: 'Embrace the rustic charm with this semi-naked cake featuring exposed layers, fresh berries, and wildflowers. Perfect for outdoor and barn weddings.',
      flavors: ['Chocolate Cake', 'Salted Caramel', 'Vanilla Buttercream'],
      servings: '40-60',
      preparationTime: '2-3 days',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Semi-naked style', 'Fresh fruit decoration', 'Rustic aesthetic'],
      popular: true,
      tags: ['rustic', 'natural', 'casual']
    },
  
    // Birthday Cakes
    {
      id: 'birthday-001',
      name: 'Rainbow Celebration',
      category: 'birthday',
      price: 65,
      priceRange: '$65-$120',
      description: 'A vibrant six-layer rainbow cake that brings joy to any celebration. Each layer is a different color with vanilla bean cake and rainbow buttercream.',
      flavors: ['Vanilla Bean', 'Rainbow Buttercream', 'Colorful Layers'],
      servings: '12-16',
      preparationTime: '24 hours',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Six colorful layers', 'Custom age numbers', 'Festive decorations'],
      popular: true,
      tags: ['colorful', 'fun', 'kids']
    },
    {
      id: 'birthday-002',
      name: 'Chocolate Indulgence',
      category: 'birthday',
      price: 55,
      priceRange: '$55-$95',
      description: 'Rich triple chocolate cake with chocolate ganache drip and chocolate shavings. A chocolate lover\'s dream come true.',
      flavors: ['Triple Chocolate', 'Chocolate Ganache', 'Dark Chocolate Shavings'],
      servings: '10-14',
      preparationTime: '24 hours',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Triple chocolate layers', 'Ganache drip', 'Chocolate decorations'],
      popular: true,
      tags: ['chocolate', 'rich', 'decadent']
    },
    {
      id: 'birthday-003',
      name: 'Unicorn Dreams',
      category: 'birthday',
      price: 75,
      priceRange: '$75-$130',
      description: 'Magical unicorn cake with pastel buttercream rosettes, edible glitter, and a handcrafted fondant unicorn horn and ears.',
      flavors: ['Funfetti', 'Strawberry Buttercream', 'Vanilla Layers'],
      servings: '12-18',
      preparationTime: '2 days',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Fondant unicorn details', 'Pastel rosettes', 'Edible glitter'],
      popular: true,
      tags: ['magical', 'unicorn', 'kids', 'fantasy']
    },
  
    // Custom Cakes
    {
      id: 'custom-001',
      name: 'Corporate Logo Cake',
      category: 'custom',
      price: 150,
      priceRange: '$150-$300',
      description: 'Professional custom cakes featuring your company logo and branding. Perfect for corporate events, product launches, and business celebrations.',
      flavors: ['Customizable', 'Multiple Options', 'Client Choice'],
      servings: '20-40',
      preparationTime: '3-5 days',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Logo recreation', 'Brand color matching', 'Professional presentation'],
      popular: false,
      tags: ['corporate', 'professional', 'logo']
    },
    {
      id: 'custom-002',
      name: 'Photo Print Cake',
      category: 'custom',
      price: 85,
      priceRange: '$85-$150',
      description: 'Transform your favorite memories into edible art with our high-quality photo print cakes. Perfect for graduations, anniversaries, and special milestones.',
      flavors: ['Vanilla', 'Chocolate', 'Red Velvet'],
      servings: '15-25',
      preparationTime: '2-3 days',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['High-quality photo printing', 'Multiple sizes', 'Custom borders'],
      popular: false,
      tags: ['photo', 'memorial', 'custom']
    },
  
    // Cupcakes
    {
      id: 'cupcakes-001',
      name: 'Gourmet Cupcake Dozen',
      category: 'cupcakes',
      price: 48,
      priceRange: '$48-$72',
      description: 'An assortment of twelve gourmet cupcakes featuring rotating seasonal flavors. Each cupcake is individually decorated with premium ingredients.',
      flavors: ['Variety Pack', 'Seasonal Rotation', 'Premium Ingredients'],
      servings: '12',
      preparationTime: 'Same day',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dcc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1550617931-e17a7b70dcc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Variety pack', 'Individual decoration', 'Premium ingredients'],
      popular: true,
      tags: ['cupcakes', 'variety', 'gourmet']
    },
  
    // Seasonal Specialties
    {
      id: 'seasonal-001',
      name: 'Autumn Spice Cake',
      category: 'seasonal',
      price: 70,
      priceRange: '$70-$120',
      description: 'Warm spices meet fall flavors in this seasonal masterpiece. Featuring pumpkin spice cake with cinnamon buttercream and candied pecans.',
      flavors: ['Pumpkin Spice', 'Cinnamon Buttercream', 'Candied Pecans'],
      servings: '12-16',
      preparationTime: '24 hours',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Seasonal spices', 'Fall decorations', 'Limited availability'],
      popular: true,
      tags: ['seasonal', 'fall', 'spice']
    },
  
    // Classic Cakes
    {
      id: 'classic-001',
      name: 'Red Velvet Classic',
      category: 'classic',
      price: 60,
      priceRange: '$60-$100',
      description: 'The timeless red velvet cake with its signature deep red color and subtle cocoa flavor, paired with traditional cream cheese frosting.',
      flavors: ['Red Velvet', 'Cream Cheese Frosting', 'Cocoa'],
      servings: '10-14',
      preparationTime: '24 hours',
      customizable: true,
      image: 'https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1586985289906-406988974504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
      ],
      features: ['Traditional recipe', 'Cream cheese frosting', 'Classic presentation'],
      popular: true,
      tags: ['classic', 'traditional', 'red velvet']
    }
  ];
  
  export const cakeCustomizationOptions = {
    sizes: [
      { id: 'small', name: '6 inch', servings: '6-8', priceMultiplier: 0.7 },
      { id: 'medium', name: '8 inch', servings: '10-12', priceMultiplier: 1.0 },
      { id: 'large', name: '10 inch', servings: '15-20', priceMultiplier: 1.4 },
      { id: 'xlarge', name: '12 inch', servings: '25-30', priceMultiplier: 1.8 }
    ],
    flavors: [
      { id: 'vanilla', name: 'Vanilla Bean', popular: true },
      { id: 'chocolate', name: 'Rich Chocolate', popular: true },
      { id: 'strawberry', name: 'Fresh Strawberry', popular: true },
      { id: 'red-velvet', name: 'Red Velvet', popular: true },
      { id: 'lemon', name: 'Lemon Zest', popular: false },
      { id: 'carrot', name: 'Carrot Spice', popular: false },
      { id: 'funfetti', name: 'Birthday Funfetti', popular: false },
      { id: 'coconut', name: 'Coconut Dream', popular: false }
    ],
    fillings: [
      { id: 'buttercream', name: 'Classic Buttercream', popular: true },
      { id: 'cream-cheese', name: 'Cream Cheese', popular: true },
      { id: 'chocolate-ganache', name: 'Chocolate Ganache', popular: true },
      { id: 'raspberry', name: 'Raspberry Filling', popular: false },
      { id: 'strawberry', name: 'Strawberry Compote', popular: false },
      { id: 'caramel', name: 'Salted Caramel', popular: false }
    ],
    decorations: [
      { id: 'fresh-flowers', name: 'Fresh Flowers', priceAdd: 25 },
      { id: 'sugar-flowers', name: 'Sugar Flowers', priceAdd: 45 },
      { id: 'chocolate-drip', name: 'Chocolate Drip', priceAdd: 15 },
      { id: 'gold-leaf', name: 'Gold Leaf Accent', priceAdd: 35 },
      { id: 'custom-message', name: 'Custom Message', priceAdd: 10 },
      { id: 'photo-print', name: 'Edible Photo Print', priceAdd: 20 }
    ]
  };
  
  export const featuredCakes = cakes.filter(cake => cake.popular);
  
  export const getCakesByCategory = (categoryId) => {
    return cakes.filter(cake => cake.category === categoryId);
  };
  
  export const getCakeById = (id) => {
    return cakes.find(cake => cake.id === id);
  };
  
  export const searchCakes = (query) => {
    const lowercaseQuery = query.toLowerCase();
    return cakes.filter(cake => 
      cake.name.toLowerCase().includes(lowercaseQuery) ||
      cake.description.toLowerCase().includes(lowercaseQuery) ||
      cake.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };