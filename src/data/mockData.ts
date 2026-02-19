export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export interface Business {
  id: string
  name: string
  category: string
  image: string
  rating: number
  reviews: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  tags: string[]
  description: string
  products: Product[]
}

export interface CartItem {
  product: Product
  qty: number
  businessId: string
}

export const categories = [
  { id: 'food',    label: 'Food',    emoji: '🍽️', color: '#FF6B35', image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80' },
  { id: 'drinks',  label: 'Drinks',  emoji: '🍹', color: '#E67E22', image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80' },
  { id: 'grocery', label: 'Grocery', emoji: '🛒', color: '#1B4332', image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80' },
  { id: 'massage', label: 'Wellness',emoji: '💆', color: '#9B59B6', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80' },
  { id: 'hotel',   label: 'Stay',    emoji: '🏡', color: '#3498DB', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
  { id: 'surf',    label: 'Surf',    emoji: '🏄', color: '#27AE60', image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=600&q=80' },
]

export const businesses: Business[] = [

  // ─── FOOD ────────────────────────────────────────────────────────────────────

  {
    id: '1',
    name: 'La Quincha',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    rating: 5.0,
    reviews: 21,
    deliveryTime: '25–35',
    deliveryFee: 2,
    minOrder: 8,
    tags: ['Panamanian', 'Seafood', 'Local Fav'],
    description: 'Traditional Panamanian dishes with a modern twist. Fresh seafood, vibrant atmosphere, community feel. The real deal in Venao.',
    products: [
      { id: 'lq1', name: 'Ceviche de Corvina', price: 12, image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80', description: 'Fresh corvina in limón mandarina, ají chombo, cilantro, red onion. With patacones.' },
      { id: 'lq2', name: 'Grilled Pargo', price: 18, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80', description: 'Whole red snapper, grilled over wood, served with arroz con coco and patacones.' },
      { id: 'lq3', name: 'Ropa Vieja', price: 14, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', description: 'Slow-braised shredded beef, sofrito, peppers. Classic Panama comfort food.' },
      { id: 'lq4', name: 'Sancocho', price: 11, image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?w=400&q=80', description: "Panama's national soup. Chicken, yuca, culantro, corn. The hangover cure that actually works." },
    ]
  },

  {
    id: '2',
    name: 'Coleos Cafe',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    rating: 4.7,
    reviews: 133,
    deliveryTime: '20–30',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Mediterranean', 'Asian Fusion', 'Vegetarian'],
    description: 'The surprise of Venao. Mediterranean-Asian fusion — hummus, pad Thai, kebabs, fresh local ingredients. Best coffee on the peninsula.',
    products: [
      { id: 'col1', name: 'Hummus Plate', price: 9, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80', description: 'House hummus, roasted garlic, olive oil, fresh pita. Simple and perfect.' },
      { id: 'col2', name: 'Pad Thai', price: 13, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80', description: 'Wok rice noodles, tofu or shrimp, tamarind, peanuts, lime. Vegetarian available.' },
      { id: 'col3', name: 'Lamb Kebab Plate', price: 15, image: 'https://images.unsplash.com/photo-1544025162-d76538823936?w=400&q=80', description: 'Grilled lamb and chicken kebabs, tzatziki, pita, fattoush salad.' },
      { id: 'col4', name: 'Cold Brew', price: 4, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', description: 'Local Chiriquí beans, 18-hour cold brew. Worth waking up for.' },
    ]
  },

  {
    id: '3',
    name: 'El Sitio Restaurant',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    rating: 4.1,
    reviews: 177,
    deliveryTime: '15–25',
    deliveryFee: 0,
    minOrder: 8,
    tags: ['Seafood', 'Beach Bar', 'Surfer Spot'],
    description: 'Right on the sand at El Sitio Hotel. Ceviche, grilled fish, cold beer. The original post-surf spot. Laid back, no pretense.',
    products: [
      { id: 'es1', name: 'Ceviche Mixto', price: 10, image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80', description: 'Shrimp, octopus, corvina. With tostadas and hot sauce.' },
      { id: 'es2', name: 'Grilled Fish of the Day', price: 16, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80', description: 'Whatever they caught this morning. Ask your courier.' },
      { id: 'es3', name: 'Balboa 6-pack', price: 8, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80', description: "Panama's national beer. Ice cold. Enough said." },
    ]
  },

  {
    id: '4',
    name: 'La Hummuseria',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    rating: 4.9,
    reviews: 35,
    deliveryTime: '20–30',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Middle Eastern', 'Vegan', 'Board Games'],
    description: 'Hummus, falafel, and Middle Eastern bowls in a chill spot with board games. Surprisingly great for Panama. Vegan and meat options.',
    products: [
      { id: 'hum1', name: 'Classic Hummus Bowl', price: 11, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&q=80', description: "Creamy hummus, olive oil, za'atar, pickled vegetables, pita." },
      { id: 'hum2', name: 'Falafel Wrap', price: 10, image: 'https://images.unsplash.com/photo-1561043433-aaf687c4cf04?w=400&q=80', description: 'Crispy falafel, tahini, greens, pickled cabbage. 100% vegan.' },
      { id: 'hum3', name: 'Shakshuka', price: 12, image: 'https://images.unsplash.com/photo-1530469912745-a215c6b256ea?w=400&q=80', description: 'Eggs poached in spiced tomato sauce, served with pita. Good for any meal.' },
    ]
  },

  {
    id: '5',
    name: 'Pizza Gavilan',
    category: 'food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    rating: 4.3,
    reviews: 167,
    deliveryTime: '25–40',
    deliveryFee: 2,
    minOrder: 12,
    tags: ['Pizza', 'Italian', 'Beachfront'],
    description: 'Wood-fired pizza with a beachfront view. The most consistent pizza in Venao — good by any standard, great by Panama\'s.',
    products: [
      { id: 'pg1', name: 'Margherita', price: 14, image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80', description: 'San Marzano tomato, fior di latte, basil. The benchmark.' },
      { id: 'pg2', name: 'Venao Special', price: 18, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80', description: "Shrimp, jalapeño, garlic oil, mozzarella, cilantro. Surfer's pizza." },
      { id: 'pg3', name: 'Tiramisu', price: 7, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80', description: 'Homemade. They do it right.' },
    ]
  },

  // ─── DRINKS ──────────────────────────────────────────────────────────────────

  {
    id: '6',
    name: 'Wao Beach Bar',
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    rating: 5.0,
    reviews: 13,
    deliveryTime: '10–20',
    deliveryFee: 0,
    minOrder: 5,
    tags: ['Beach Bar', 'Cocktails', 'Sunset Views'],
    description: 'Beachfront bar with the best sunset view in Venao. Creative cocktails, cold beer, and a playlist that fits the vibe.',
    products: [
      { id: 'wao1', name: 'Venao Sunset', price: 9, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80', description: 'Dark rum, passion fruit, ginger beer, lime. Order two.' },
      { id: 'wao2', name: 'Coconut Mojito', price: 8, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', description: 'White rum, coconut water, fresh mint, lime. Beach standard.' },
      { id: 'wao3', name: 'Balboa Draft', price: 4, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80', description: "Panama's national beer. Ice cold, straight from the tap." },
      { id: 'wao4', name: 'Agua de Pipa', price: 3, image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&q=80', description: 'Fresh coconut water. Served in the coconut.' },
    ]
  },

  // ─── GROCERY ─────────────────────────────────────────────────────────────────

  {
    id: '7',
    name: 'Minisuper Venao',
    category: 'grocery',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=80',
    rating: 4.2,
    reviews: 44,
    deliveryTime: '15–25',
    deliveryFee: 1,
    minOrder: 5,
    tags: ['Grocery', 'Essentials', 'Local'],
    description: 'The town store. Beer, water, snacks, sunscreen, fresh fruit. Everything you need, nothing you don\'t.',
    products: [
      { id: 'ms1', name: 'Tropical Fruit Box', price: 8, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80', description: 'Papaya, mango, pineapple, watermelon. Seasonal and fresh-cut.' },
      { id: 'ms2', name: 'Balboa 12-pack', price: 14, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&q=80', description: 'Cold and ready.' },
      { id: 'ms3', name: 'Sunscreen Kit', price: 18, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80', description: 'SPF 50, aloe vera gel, reef-safe formula.' },
      { id: 'ms4', name: 'Water (6-pack 1.5L)', price: 5, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&q=80', description: 'Stay hydrated. Panama sun is no joke.' },
    ]
  },

  // ─── WELLNESS ────────────────────────────────────────────────────────────────

  {
    id: '8',
    name: 'Venao Wellness',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    rating: 4.8,
    reviews: 62,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 40,
    tags: ['Massage', 'Yoga', 'Beach Delivery'],
    description: 'Sports massage, Swedish relaxation, yoga sessions. Beach or bungalow delivery. Book in advance for sunset slots.',
    products: [
      { id: 'vw1', name: 'Swedish (60 min)', price: 55, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80', description: 'Full body Swedish massage. Beach or bungalow, your choice.' },
      { id: 'vw2', name: 'Sports Recovery (45 min)', price: 45, image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=400&q=80', description: 'Deep tissue — back, legs, shoulders. For surfers.' },
      { id: 'vw3', name: 'Sunrise Yoga (1 hr)', price: 20, image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&q=80', description: 'Sunrise session on the beach. All levels welcome.' },
    ]
  },

  // ─── SURF ─────────────────────────────────────────────────────────────────────

  {
    id: '9',
    name: 'El Sitio Surf School',
    category: 'surf',
    image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&q=80',
    rating: 4.6,
    reviews: 89,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 20,
    tags: ['Surf Lessons', 'Board Rental', 'All Levels'],
    description: 'The original Venao surf school. Board rental, group lessons, private coaching. All levels welcome.',
    products: [
      { id: 'surf1', name: 'Board Rental (half day)', price: 20, image: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=400&q=80', description: 'Foam or fiberglass, your size. Includes leash and wax.' },
      { id: 'surf2', name: 'Group Lesson (2 hrs)', price: 35, image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=80', description: 'Max 6 students. Theory + water time. Foam board included.' },
      { id: 'surf3', name: 'Private Session (1 hr)', price: 60, image: 'https://images.unsplash.com/photo-1520443240718-fce21901db79?w=400&q=80', description: '1:1 with an instructor. Fastest way to progress.' },
    ]
  },

]

// ─── ACTIVE ORDER (demo state for TrackOrderPage) ─────────────────────────────
export const activeOrder = {
  eta: '8 min',
  courier: { name: 'Carlos M.', rating: 4.9 },
  items: [
    { product: { id: 'lq1', name: 'Ceviche de Corvina', price: 12, image: '', description: '' }, qty: 2 },
    { product: { id: 'es3', name: 'Balboa 6-pack', price: 8, image: '', description: '' }, qty: 1 },
  ],
  total: 32,
  tip: 0,
  deliveryFee: 2,
}
