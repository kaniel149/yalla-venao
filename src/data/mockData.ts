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
  vertical: 'food' | 'experience' | 'stay'
  image: string
  rating: number
  reviews: number
  deliveryTime: string
  deliveryFee: number
  minOrder: number
  tags: string[]
  description: string
  products: Product[]
  phone: string
  hours: { open: number; close: number }
  coordinates?: { lat: number; lng: number }
  // Experience fields
  duration?: string
  groupSize?: string
  // Stay fields
  priceUnit?: string
  checkInTime?: string
  checkOutTime?: string
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
  { id: 'hotel',   label: 'Stay',    emoji: '🏕️', color: '#3498DB', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80' },
  { id: 'surf',    label: 'Surf',    emoji: '🏄', color: '#27AE60', image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=600&q=80' },
]

export const businesses: Business[] = [

  // ─── FOOD ────────────────────────────────────────────────────────────────────

  {
    id: '1',
    name: 'La Quincha',
    category: 'food',
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    rating: 5.0,
    reviews: 21,
    deliveryTime: '25–35',
    deliveryFee: 2,
    minOrder: 8,
    tags: ['Panamanian', 'Seafood', 'Local Fav'],
    description: 'Traditional Panamanian dishes with a modern twist. Fresh seafood, vibrant atmosphere, community feel. The real deal in Venao.',
    phone: '50766123401',
    hours: { open: 11, close: 22 },
    coordinates: { lat: 7.4210, lng: -80.1501 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    rating: 4.7,
    reviews: 133,
    deliveryTime: '20–30',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Mediterranean', 'Asian Fusion', 'Vegetarian'],
    description: 'The surprise of Venao. Mediterranean-Asian fusion — hummus, pad Thai, kebabs, fresh local ingredients. Best coffee on the peninsula.',
    phone: '50766234512',
    hours: { open: 7, close: 21 },
    coordinates: { lat: 7.4213, lng: -80.1499 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    rating: 4.1,
    reviews: 177,
    deliveryTime: '15–25',
    deliveryFee: 0,
    minOrder: 8,
    tags: ['Seafood', 'Beach Bar', 'Surfer Spot'],
    description: 'Right on the sand at El Sitio Hotel. Ceviche, grilled fish, cold beer. The original post-surf spot. Laid back, no pretense.',
    phone: '50766345623',
    hours: { open: 10, close: 23 },
    coordinates: { lat: 7.4208, lng: -80.1510 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80',
    rating: 4.9,
    reviews: 35,
    deliveryTime: '20–30',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Middle Eastern', 'Vegan', 'Board Games'],
    description: 'Hummus, falafel, and Middle Eastern bowls in a chill spot with board games. Surprisingly great for Panama. Vegan and meat options.',
    phone: '50766456734',
    hours: { open: 12, close: 21 },
    coordinates: { lat: 7.4217, lng: -80.1505 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    rating: 4.3,
    reviews: 167,
    deliveryTime: '25–40',
    deliveryFee: 2,
    minOrder: 12,
    tags: ['Pizza', 'Italian', 'Beachfront'],
    description: 'Wood-fired pizza with a beachfront view. The most consistent pizza in Venao — good by any standard, great by Panama\'s.',
    phone: '50766567845',
    hours: { open: 17, close: 22 },
    coordinates: { lat: 7.4219, lng: -80.1498 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    rating: 5.0,
    reviews: 13,
    deliveryTime: '10–20',
    deliveryFee: 0,
    minOrder: 5,
    tags: ['Beach Bar', 'Cocktails', 'Sunset Views'],
    description: 'Beachfront bar with the best sunset view in Venao. Creative cocktails, cold beer, and a playlist that fits the vibe.',
    phone: '50766678956',
    hours: { open: 14, close: 0 },
    coordinates: { lat: 7.4206, lng: -80.1512 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=800&q=80',
    rating: 4.2,
    reviews: 44,
    deliveryTime: '15–25',
    deliveryFee: 1,
    minOrder: 5,
    tags: ['Grocery', 'Essentials', 'Local'],
    description: 'The town store. Beer, water, snacks, sunscreen, fresh fruit. Everything you need, nothing you don\'t.',
    phone: '50766789067',
    hours: { open: 7, close: 21 },
    coordinates: { lat: 7.4215, lng: -80.1503 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    rating: 4.8,
    reviews: 62,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 40,
    tags: ['Massage', 'Yoga', 'Beach Delivery'],
    description: 'Sports massage, Swedish relaxation, yoga sessions. Beach or bungalow delivery. Book in advance for sunset slots.',
    phone: '50766890178',
    hours: { open: 8, close: 20 },
    coordinates: { lat: 7.4222, lng: -80.1507 },
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
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&q=80',
    rating: 4.6,
    reviews: 89,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 20,
    tags: ['Surf Lessons', 'Board Rental', 'All Levels'],
    description: 'The original Venao surf school. Board rental, group lessons, private coaching. All levels welcome.',
    phone: '50766901289',
    hours: { open: 6, close: 18 },
    coordinates: { lat: 7.4207, lng: -80.1511 },
    products: [
      { id: 'surf1', name: 'Board Rental (half day)', price: 20, image: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=400&q=80', description: 'Foam or fiberglass, your size. Includes leash and wax.' },
      { id: 'surf2', name: 'Group Lesson (2 hrs)', price: 35, image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=80', description: 'Max 6 students. Theory + water time. Foam board included.' },
      { id: 'surf3', name: 'Private Session (1 hr)', price: 60, image: 'https://images.unsplash.com/photo-1520443240718-fce21901db79?w=400&q=80', description: '1:1 with an instructor. Fastest way to progress.' },
    ]
  },

  // ─── EXPERIENCES ──────────────────────────────────────────────────────────────

  {
    id: 'exp1',
    name: 'Playa Venao Surf School',
    category: 'Surf',
    vertical: 'experience',
    image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=800&q=80',
    rating: 4.8,
    reviews: 56,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 45,
    tags: ['Surf Lessons', 'All Levels', 'Beginner Friendly'],
    description: 'Professional surf lessons on one of Panama\'s best beginner waves. All equipment included. English and Spanish.',
    phone: '5076XXX0001',
    hours: { open: 7, close: 17 },
    coordinates: { lat: 7.421, lng: -80.151 },
    duration: '2 hours',
    groupSize: '1-6 people',
    products: [
      { id: 'exp1p1', name: 'Surf Lesson', price: 45, image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=80', description: 'Group surf lesson, 2 hours. All boards and equipment provided.' },
    ]
  },

  {
    id: 'exp2',
    name: 'Venao Yoga Retreat',
    category: 'Wellness',
    vertical: 'experience',
    image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=800&q=80',
    rating: 4.9,
    reviews: 34,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 15,
    tags: ['Yoga', 'Sunrise', 'Beach', 'All Levels'],
    description: 'Start your day with a sunrise yoga class on the beach. All levels welcome. Mats provided.',
    phone: '',
    hours: { open: 6, close: 10 },
    coordinates: { lat: 7.422, lng: -80.152 },
    duration: '1 hour',
    groupSize: '1-12 people',
    products: [
      { id: 'exp2p1', name: 'Yoga Class', price: 15, image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=400&q=80', description: 'Sunrise beach yoga session. Mat and block provided.' },
    ]
  },

  {
    id: 'exp3',
    name: 'ATV Jungle Tour',
    category: 'Adventure',
    vertical: 'experience',
    image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800&q=80',
    rating: 4.7,
    reviews: 41,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 65,
    tags: ['ATV', 'Jungle', 'Adventure', 'Scenic Views'],
    description: 'Explore the jungle trails and hilltops of Venao on all-terrain vehicles. Epic views, muddy fun.',
    phone: '5076XXX0003',
    hours: { open: 8, close: 16 },
    coordinates: { lat: 7.420, lng: -80.155 },
    duration: '3 hours',
    groupSize: '1-8 people',
    products: [
      { id: 'exp3p1', name: 'ATV Tour', price: 65, image: 'https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=400&q=80', description: '3-hour guided ATV tour through jungle and coastal trails.' },
    ]
  },

  {
    id: 'exp4',
    name: 'Fishing Trip Panama',
    category: 'Adventure',
    vertical: 'experience',
    image: 'https://images.unsplash.com/photo-1500539100099-e16bb0070fb7?w=800&q=80',
    rating: 4.6,
    reviews: 28,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 120,
    tags: ['Fishing', 'Ocean', 'Adventure', 'Small Groups'],
    description: 'Deep-sea and sport fishing off Playa Venao. Catch roosterfish, tuna, mahi-mahi. All tackle included.',
    phone: '5076XXX0004',
    hours: { open: 5, close: 12 },
    duration: 'Half day',
    groupSize: '1-4 people',
    products: [
      { id: 'exp4p1', name: 'Fishing Trip', price: 120, image: 'https://images.unsplash.com/photo-1500539100099-e16bb0070fb7?w=400&q=80', description: 'Half-day sport fishing trip. Tackle, bait, and guide included.' },
    ]
  },

  // ─── STAYS ────────────────────────────────────────────────────────────────────

  {
    id: 'stay1',
    name: 'La Playa Cabinas',
    category: 'Stay',
    vertical: 'stay',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    rating: 4.5,
    reviews: 73,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 55,
    tags: ['Beachfront', 'Private Cabina', 'AC'],
    description: 'Simple, clean beachfront cabinas right on Playa Venao. Wake up to the sound of waves. Best location in town.',
    phone: '5076XXX0010',
    hours: { open: 0, close: 24 },
    priceUnit: 'per night',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    products: [
      { id: 'stay1p1', name: 'Cabina (1 night)', price: 55, image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', description: 'Private cabina, beachfront. Sleeps 2. AC and fan.' },
    ]
  },

  {
    id: 'stay2',
    name: 'Venao Hostel',
    category: 'Stay',
    vertical: 'stay',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&q=80',
    rating: 4.3,
    reviews: 112,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 18,
    tags: ['Hostel', 'Dorm Beds', 'Social', 'Budget'],
    description: 'The social hub of Playa Venao. Dorm beds, great vibes, hammocks, shared kitchen. Surfers, backpackers, good people.',
    phone: '5076XXX0011',
    hours: { open: 0, close: 24 },
    priceUnit: 'per night',
    checkInTime: '15:00',
    checkOutTime: '10:00',
    products: [
      { id: 'stay2p1', name: 'Dorm Bed (1 night)', price: 18, image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', description: 'Dorm bed in shared room. Lockers, shared bathrooms, common area.' },
    ]
  },

  {
    id: 'stay3',
    name: 'Surf Camp Glamping',
    category: 'Stay',
    vertical: 'stay',
    image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=80',
    rating: 4.7,
    reviews: 47,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 85,
    tags: ['Glamping', 'Surf Camp', 'Eco', 'Unique'],
    description: 'Luxury safari tents steps from the break. Surf packages available. The coolest sleep in Venao.',
    phone: '5076XXX0012',
    hours: { open: 0, close: 24 },
    priceUnit: 'per night',
    checkInTime: '14:00',
    checkOutTime: '11:00',
    products: [
      { id: 'stay3p1', name: 'Glamping Tent (1 night)', price: 85, image: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=400&q=80', description: 'Safari tent with real beds, fans, private bathroom. Breakfast included.' },
    ]
  },

  // ─── NEW BUSINESSES ───────────────────────────────────────────────────────────

  {
    id: '10',
    name: 'Shaqui Venao Surf School',
    category: 'surf',
    vertical: 'experience',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    rating: 4.9,
    reviews: 78,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 40,
    tags: ['Surf Lessons', 'Board Rental', 'Beginner Friendly'],
    description: 'One of the most popular surf schools in Playa Venao. Shaqui and his team know every wave. Fun, relaxed vibe. All levels welcome.',
    phone: '50766910200',
    hours: { open: 6, close: 17 },
    coordinates: { lat: 7.4209, lng: -80.1513 },
    duration: '2 hours',
    groupSize: '1-8 people',
    products: [
      { id: 'shq1', name: 'Group Lesson (2 hrs)', price: 40, image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=80', description: 'Group surf lesson with Shaqui. Board + leash included. Max 8 students.' },
      { id: 'shq2', name: 'Private Lesson (1 hr)', price: 65, image: 'https://images.unsplash.com/photo-1520443240718-fce21901db79?w=400&q=80', description: '1-on-1 session. Fastest way to improve. Board included.' },
      { id: 'shq3', name: 'Board Rental (full day)', price: 25, image: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=400&q=80', description: 'Foam or shortboard, your choice. Wax and leash included.' },
    ]
  },

  {
    id: '11',
    name: 'El Balo Restaurant',
    category: 'food',
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    rating: 4.6,
    reviews: 94,
    deliveryTime: '20–35',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Local', 'Grilled', 'Seafood', 'Beachside'],
    description: 'El Balo is a Venao institution. Grilled meats, fresh seafood, cold beer. No frills, all flavor. The kind of place you go back to every day.',
    phone: '50766920300',
    hours: { open: 11, close: 23 },
    coordinates: { lat: 7.4214, lng: -80.1508 },
    products: [
      { id: 'bl1', name: 'Carne Asada', price: 15, image: 'https://images.unsplash.com/photo-1544025162-d76538823936?w=400&q=80', description: 'Grilled beef with chimichurri, white rice, patacones, and salad.' },
      { id: 'bl2', name: 'Grilled Shrimp Plate', price: 17, image: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&q=80', description: 'Jumbo shrimp, garlic butter, lime, rice and patacones.' },
      { id: 'bl3', name: 'Casado del Día', price: 10, image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', description: "Today's set meal — protein, rice, beans, salad, patacones. Best value in Venao." },
      { id: 'bl4', name: 'Ceviche de Camarones', price: 11, image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80', description: 'Shrimp ceviche with lime, ají chombo, red onion and tostadas.' },
    ]
  },

  {
    id: 'exp5',
    name: 'Surf Dogo',
    category: 'surf',
    vertical: 'experience',
    image: 'https://images.unsplash.com/photo-1517699418-0999eb78d0c0?w=800&q=80',
    rating: 4.8,
    reviews: 52,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 35,
    tags: ['Surf', 'Beginner', 'Fun', 'Local Crew'],
    description: 'Local crew, good vibes, no ego. Surf Dogo makes learning to surf actually fun. Small groups, personal attention, best waves.',
    phone: '50766930400',
    hours: { open: 6, close: 18 },
    coordinates: { lat: 7.4211, lng: -80.1509 },
    duration: '2 hours',
    groupSize: '1-6 people',
    products: [
      { id: 'sd1', name: 'Surf Lesson', price: 35, image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=80', description: 'Group lesson with local instructors. Board and equipment included.' },
      { id: 'sd2', name: 'Board + Wetsuit Rental', price: 30, image: 'https://images.unsplash.com/photo-1505459668311-8dfac7952bf0?w=400&q=80', description: 'Half day board and wetsuit rental. Multiple board sizes available.' },
      { id: 'sd3', name: 'Surf & Lunch Package', price: 55, image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&q=80', description: '2hr lesson + post-surf lunch. The full Venao experience.' },
    ]
  },

  {
    id: '12',
    name: 'Motek Ice Cream',
    category: 'food',
    vertical: 'food',
    image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&q=80',
    rating: 4.9,
    reviews: 38,
    deliveryTime: '10–20',
    deliveryFee: 1,
    minOrder: 4,
    tags: ['Ice Cream', 'Sweet', 'Tropical', 'Dessert'],
    description: 'Tropical ice cream and sorbets made fresh daily. Exotic local flavors — maracuyá, guanábana, coco, mamey. The sweetest stop in Venao.',
    phone: '50766940500',
    hours: { open: 11, close: 21 },
    coordinates: { lat: 7.4216, lng: -80.1506 },
    products: [
      { id: 'mt1', name: 'Scoop (1)', price: 4, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400&q=80', description: 'Choose from: maracuyá, guanábana, coco, mamey, mango, or chocolate.' },
      { id: 'mt2', name: 'Double Scoop', price: 7, image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&q=80', description: 'Two scoops, your choice. In a cone or cup.' },
      { id: 'mt3', name: 'Sundae Venao', price: 11, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80', description: 'Two scoops + local honey + toasted coconut + fresh fruit. Worth it.' },
      { id: 'mt4', name: 'Fresh Sorbet Cup', price: 5, image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?w=400&q=80', description: 'Dairy-free. Maracuyá or tamarindo. Refreshing after surf.' },
    ]
  },

]

// ─── ACTIVE ORDER (demo state for TrackOrderPage) ─────────────────────────────
export const activeOrder = {
  eta: '8 min',
  courier: { name: 'Miguel R.', rating: 4.9 },
  items: [
    { product: { id: 'lq1', name: 'Ceviche de Corvina', price: 12, image: '', description: '' }, qty: 2 },
    { product: { id: 'es3', name: 'Balboa 6-pack', price: 8, image: '', description: '' }, qty: 1 },
  ],
  total: 32,
  tip: 0,
  deliveryFee: 2,
}
