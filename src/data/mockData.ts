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

// Categories with real photography
export const categories = [
  {
    id: 'food',
    label: 'Food',
    emoji: '🍽️',
    color: '#FF6B35',
    image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80', // ceviche
  },
  {
    id: 'drinks',
    label: 'Drinks',
    emoji: '🍹',
    color: '#E67E22',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80', // tropical bar
  },
  {
    id: 'grocery',
    label: 'Grocery',
    emoji: '🛒',
    color: '#1B4332',
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80', // tropical fruit market
  },
  {
    id: 'massage',
    label: 'Wellness',
    emoji: '💆',
    color: '#9B59B6',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', // massage
  },
  {
    id: 'hotel',
    label: 'Stay',
    emoji: '🏡',
    color: '#3498DB',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', // beach bungalow
  },
  {
    id: 'surf',
    label: 'Surf',
    emoji: '🏄',
    color: '#27AE60',
    image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=600&q=80', // surfing action
  },
]

export const businesses: Business[] = [

  // ─── FOOD ────────────────────────────────────────────────────────────────────

  {
    id: '1',
    name: 'La Lora',
    category: 'food',
    // Rustic beach palapa restaurant, ocean backdrop
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80',
    rating: 4.9,
    reviews: 347,
    deliveryTime: '20–35',
    deliveryFee: 2,
    minOrder: 8,
    tags: ['Beach Bar', 'Seafood', 'Panamanian'],
    description: 'The original Venao hangout. Palapa roof, sand floors, cold Balboa, and the best ceviche on the peninsula. Cash only, no regrets.',
    products: [
      {
        id: 'll1',
        name: 'Ceviche de Corvina',
        price: 12,
        image: 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=600&q=80',
        description: 'Fresh corvina marinated in limón mandarina, ají chombo, cilantro, red onion. Comes with patacones.',
      },
      {
        id: 'll2',
        name: 'Fish Tacos × 3',
        price: 11,
        image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&q=80',
        description: 'Grilled mahi-mahi, cabbage curtido, chipotle crema, pickled jalapeño. Corn tortillas.',
      },
      {
        id: 'll3',
        name: 'Patacones con Pollo',
        price: 9,
        image: 'https://images.unsplash.com/photo-1544025162-d76538891a96?w=600&q=80',
        description: 'Double-fried green plantains topped with shredded chicken, avocado, pico de gallo, crema.',
      },
      {
        id: 'll4',
        name: 'Arroz con Pollo',
        price: 10,
        image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?w=600&q=80',
        description: 'Slow-simmered chicken with yellow rice, veggies, and ensalada. The real Panama comfort plate.',
      },
    ],
  },

  {
    id: '2',
    name: 'Donde Viejo',
    category: 'food',
    // Rustic local food, traditional Panama plates
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    rating: 4.8,
    reviews: 214,
    deliveryTime: '25–40',
    deliveryFee: 2,
    minOrder: 7,
    tags: ['Local', 'Panamanian', 'Homestyle'],
    description: 'No menu, no Wi-Fi, no fuss. Viejo cooks what the day brings — sancocho, ropa vieja, carimañolas. Come hungry, leave full, pay $10.',
    products: [
      {
        id: 'dv1',
        name: 'Sancocho de Gallina',
        price: 9,
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80',
        description: 'Free-range hen simmered for hours with yuca, ñame, culantro. Panama\'s Sunday remedy. Cures everything.',
      },
      {
        id: 'dv2',
        name: 'Ropa Vieja',
        price: 11,
        image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
        description: 'Shredded beef braised in sofrito, tomatoes, peppers. Served with white rice, tajadas, and salad.',
      },
      {
        id: 'dv3',
        name: 'Carimañolas × 2',
        price: 5,
        image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=600&q=80',
        description: 'Hand-shaped yuca fritters, stuffed with seasoned ground beef, deep-fried to gold. Classic Panamanian street bite.',
      },
      {
        id: 'dv4',
        name: 'Bistec Picado',
        price: 12,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80',
        description: 'Sautéed beef with onions, peppers, tomato. Served with rice, lentils, and patacones.',
      },
    ],
  },

  {
    id: '3',
    name: 'Venao Burger Co',
    category: 'food',
    // Smash burger, moody lighting, beautiful plating
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80',
    rating: 4.7,
    reviews: 188,
    deliveryTime: '15–25',
    deliveryFee: 2,
    minOrder: 8,
    tags: ['Burgers', 'Comfort Food', 'Craft'],
    description: 'Grass-fed Azuero beef, double smash, aged cheddar. Started as a weekend pop-up, now open every night. Worth the wait.',
    products: [
      {
        id: 'vb1',
        name: 'The Venao Smash',
        price: 13,
        image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=80',
        description: 'Double smashed Azuero beef, American cheese, caramelized onion, house pickles, special sauce. Brioche bun.',
      },
      {
        id: 'vb2',
        name: 'Surf & Turf Burger',
        price: 17,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=80',
        description: 'Beef patty, grilled Pacific shrimp, avocado, sriracha mayo, pickled cucumber. The showstopper.',
      },
      {
        id: 'vb3',
        name: 'Thick-Cut Fries',
        price: 5,
        image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&q=80',
        description: 'Hand-cut local potatoes, sea salt, served with chipotle aioli.',
      },
      {
        id: 'vb4',
        name: 'Mango Shake',
        price: 6,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80',
        description: 'Fresh Panamanian mango, whole milk, vanilla. Thick enough to stand a spoon in it.',
      },
    ],
  },

  // ─── DRINKS ──────────────────────────────────────────────────────────────────

  {
    id: '4',
    name: 'Surf Shack Bar',
    category: 'drinks',
    // Tropical beach bar, string lights, ocean background
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    rating: 4.8,
    reviews: 302,
    deliveryTime: '15–20',
    deliveryFee: 1.5,
    minOrder: 6,
    tags: ['Bar', 'Beachfront', 'Cold Beer'],
    description: 'No shots. No neon signs. Just cold beer, reggae on the speaker, and a front-row seat to the break. Surfers\' bar of choice since forever.',
    products: [
      {
        id: 'ss1',
        name: 'Balboa 6-Pack (cold)',
        price: 9,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80',
        description: 'Panama\'s original lager. Still the best thing after a 3-hour surf session. Ice cold, delivered in 15 min.',
      },
      {
        id: 'ss2',
        name: 'Rum Punch Pitcher (1L)',
        price: 14,
        image: 'https://images.unsplash.com/photo-1570196922327-4b8044e1a637?w=600&q=80',
        description: 'House rum, passion fruit, pineapple, fresh lime, mint. Serves 3. Watch the sunset, lose track of time.',
      },
      {
        id: 'ss3',
        name: 'Michelada',
        price: 7,
        image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=600&q=80',
        description: 'Atlas beer, fresh lime, Worcestershire, Maggi, Tajín-rimmed glass. Panama-style, no tomato juice.',
      },
      {
        id: 'ss4',
        name: 'Pipa Fría (Coconut Water)',
        price: 4,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=600&q=80',
        description: 'Fresh green coconut, chilled and delivered with a straw. The original electrolyte drink.',
      },
    ],
  },

  {
    id: '5',
    name: 'El Coco Loco',
    category: 'drinks',
    // Beautiful tropical cocktail bar
    image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80',
    rating: 4.9,
    reviews: 156,
    deliveryTime: '20–30',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Cocktails', 'Tropical', 'Craft'],
    description: 'Proper cocktails on the Pacific. House-infused spirits, fresh tropical fruit, zero shortcuts. The bartenders have actually tended bar.',
    products: [
      {
        id: 'ec1',
        name: 'Coco Loco (signature)',
        price: 12,
        image: 'https://images.unsplash.com/photo-1560508180-03f285f67ded?w=600&q=80',
        description: 'Served inside a whole coconut: white rum, coconut cream, fresh pineapple, passion fruit, mint. Comes with the coconut.',
      },
      {
        id: 'ec2',
        name: 'Paloma de Venao',
        price: 9,
        image: 'https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=600&q=80',
        description: 'Reposado tequila, fresh pink grapefruit, lime, agave, pinch of sea salt. Simple, sharp, refreshing.',
      },
      {
        id: 'ec3',
        name: 'Natural Smoothie',
        price: 6,
        image: 'https://images.unsplash.com/photo-1517473573568-c93870f4e4c9?w=600&q=80',
        description: 'Your call: mango-ginger, green (spinach, apple, cucumber), or dragon fruit-coconut. All fruit, no powder.',
      },
    ],
  },

  // ─── GROCERY ─────────────────────────────────────────────────────────────────

  {
    id: '6',
    name: 'Minisuper Venao',
    category: 'grocery',
    // Local market, fresh produce, Panama vibe
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    rating: 4.5,
    reviews: 231,
    deliveryTime: '15–30',
    deliveryFee: 2,
    minOrder: 10,
    tags: ['Essentials', 'Fresh Produce', 'Local'],
    description: 'The one stop. Sunscreen, beer, fresh fruit, snacks, and anything you forgot to pack. If they don\'t have it, nobody in Venao does.',
    products: [
      {
        id: 'mv1',
        name: 'Tropical Fruit Box',
        price: 9,
        image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=600&q=80',
        description: 'Whatever\'s in season: mango, piña, papaya, sandía. Cut and ready. Locally sourced within 30km.',
      },
      {
        id: 'mv2',
        name: 'Cold Beer 6-pack',
        price: 8,
        image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=600&q=80',
        description: 'Balboa or Atlas. Your call. Panama\'s two finest, both are correct.',
      },
      {
        id: 'mv3',
        name: 'Sunscreen SPF50 + Aloe Gel',
        price: 14,
        image: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=600&q=80',
        description: 'Water-resistant, reef-safe. After-sun aloe vera included. You will need both.',
      },
      {
        id: 'mv4',
        name: 'Snack Bundle',
        price: 10,
        image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&q=80',
        description: 'Chips, nuts, granola, dark chocolate. Enough fuel for a long session.',
      },
      {
        id: 'mv5',
        name: 'Bag of Ice (5kg)',
        price: 4,
        image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&q=80',
        description: 'For the cooler. Essential for beach days and boat trips.',
      },
    ],
  },

  // ─── WELLNESS ────────────────────────────────────────────────────────────────

  {
    id: '7',
    name: 'Venao Wellness',
    category: 'massage',
    // Beachside spa, peaceful, lush
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    rating: 5.0,
    reviews: 112,
    deliveryTime: '30–60',
    deliveryFee: 0,
    minOrder: 0,
    tags: ['Massage', 'Wellness', 'Mobile'],
    description: 'We come to you. Beach, bungalow, or hammock. Certified therapists, quality oils, no upsell. Book 1h ahead — slots go fast on weekends.',
    products: [
      {
        id: 'vw1',
        name: 'Swedish Relaxation (60 min)',
        price: 55,
        image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
        description: 'Full-body effleurage and petrissage. Great for first-timers. Aromatherapy oils included.',
      },
      {
        id: 'vw2',
        name: 'Deep Tissue (90 min)',
        price: 75,
        image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
        description: 'Slow, firm pressure targeting chronic tension. Highly recommended after two days of overhead surf.',
      },
      {
        id: 'vw3',
        name: 'Couples Massage (60 min)',
        price: 100,
        image: 'https://images.unsplash.com/photo-1610289982320-3d77778b0c56?w=600&q=80',
        description: 'Two therapists, side by side. On the beach at sunset if you want. Book the 5pm slot before someone else does.',
      },
      {
        id: 'vw4',
        name: 'Hot Stone Therapy (75 min)',
        price: 80,
        image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
        description: 'Basalt stones, lavender oil, the whole ritual. Your most expensive nap ever. Worth it.',
      },
    ],
  },

  // ─── SURF ────────────────────────────────────────────────────────────────────

  {
    id: '8',
    name: 'Venao Surf School',
    category: 'surf',
    // Surf lesson, turquoise water, instructor in frame
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80',
    rating: 4.9,
    reviews: 478,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 0,
    tags: ['Lessons', 'Rentals', 'All Levels'],
    description: 'On the break since 2009. ISA-certified instructors. Small groups, no circus lineups. Boards delivered to your spot.',
    products: [
      {
        id: 'vs1',
        name: 'Beginner Lesson (2h)',
        price: 45,
        image: 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=600&q=80',
        description: 'Foam board, rash guard, wax, ISA instructor. Safety briefing, then straight in the water. Max 4 students.',
      },
      {
        id: 'vs2',
        name: 'Intermediate Clinic (1.5h)',
        price: 55,
        image: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=600&q=80',
        description: 'Focus on pop-up, wave selection, and positioning. Video analysis available. Max 3 students.',
      },
      {
        id: 'vs3',
        name: 'Longboard Rental (full day)',
        price: 25,
        image: 'https://images.unsplash.com/photo-1531722569936-825d4eea9972?w=600&q=80',
        description: '9\'0 foam or fibreglass. Leash, wax included. Delivered to the beach. Back by 5pm.',
      },
      {
        id: 'vs4',
        name: 'Shortboard Rental (full day)',
        price: 20,
        image: 'https://images.unsplash.com/photo-1503178845447-bc913b5de0e4?w=600&q=80',
        description: '5\'10–6\'4 range. Thruster or quad. For surfers who know what they\'re doing.',
      },
    ],
  },

  // ─── STAY ────────────────────────────────────────────────────────────────────

  {
    id: '9',
    name: 'Playa Venao Hotel',
    category: 'hotel',
    // Beachfront hotel pool, lush jungle, Pacific
    image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80',
    rating: 4.8,
    reviews: 589,
    deliveryTime: 'On request',
    deliveryFee: 0,
    minOrder: 0,
    tags: ['Beachfront', 'Pool', 'In-room Service'],
    description: 'The resort at the end of the road. Thatched bungalows, infinity pool, and direct access to the break. Request anything from your room.',
    products: [
      {
        id: 'pv1',
        name: 'In-Room Breakfast',
        price: 18,
        image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80',
        description: 'Eggs your way, fresh tropical fruit, toast, Panamanian coffee. Delivered before 10am.',
      },
      {
        id: 'pv2',
        name: 'Laundry Service',
        price: 12,
        image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600&q=80',
        description: 'Drop off by 9am, back by 5pm. Wash, dry, fold. Includes the rash guard you\'ve been ignoring.',
      },
      {
        id: 'pv3',
        name: 'Sunset Boat Tour (2h)',
        price: 65,
        image: 'https://images.unsplash.com/photo-1559519529-0936e4058364?w=600&q=80',
        description: 'Private panga along the Venao coastline, snorkeling, cold drinks. Leaves at 4:30pm. Book by noon.',
      },
      {
        id: 'pv4',
        name: 'Airport Transfer (David)',
        price: 120,
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&q=80',
        description: 'A/C SUV, David Chiriquí Airport. 3.5h drive, up to 4 passengers, luggage included. Driver speaks English.',
      },
    ],
  },
]

export const couriers = [
  { id: 'c1', name: 'Carlos M.', vehicle: 'Moto', rating: 4.9, deliveries: 234, online: true },
  { id: 'c2', name: 'Ana R.', vehicle: 'Bici', rating: 4.8, deliveries: 156, online: true },
  { id: 'c3', name: 'Pedro V.', vehicle: 'Moto', rating: 4.7, deliveries: 89, online: false },
]

export const activeOrder = {
  id: 'ord-001',
  business: businesses[0],
  status: 'picked_up' as const,
  items: [
    { product: businesses[0].products[0], qty: 2 },
    { product: businesses[0].products[1], qty: 1 },
  ],
  subtotal: 35,
  deliveryFee: 2,
  tip: 3,
  total: 40,
  courier: couriers[0],
  eta: '8 min',
  placedAt: '19:42',
}

export const sampleOrders = [
  { id: 'ord-001', business: businesses[0], status: 'delivered', total: 40, date: 'Today', items: 3 },
  { id: 'ord-002', business: businesses[2], status: 'delivered', total: 26, date: 'Yesterday', items: 2 },
  { id: 'ord-003', business: businesses[6], status: 'delivered', total: 55, date: 'Feb 17', items: 1 },
]
