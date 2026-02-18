export const categories = [
  { id: 'food', label: 'Food', emoji: '🍔', color: '#FF6B35' },
  { id: 'grocery', label: 'Grocery', emoji: '🛒', color: '#1B4332' },
  { id: 'massage', label: 'Massage', emoji: '💆', color: '#9B59B6' },
  { id: 'hotel', label: 'Stay', emoji: '🏡', color: '#3498DB' },
  { id: 'surf', label: 'Surf', emoji: '🏄', color: '#27AE60' },
  { id: 'drinks', label: 'Drinks', emoji: '🍹', color: '#E67E22' },
]

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

export const businesses: Business[] = [
  {
    id: '1', name: "La Palapa Grill", category: 'food',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    rating: 4.8, reviews: 234, deliveryTime: '20-30', deliveryFee: 3,
    minOrder: 8, tags: ['Burgers', 'Grills', 'Bowls'],
    description: 'Best beachfront grill in Venao',
    products: [
      { id: 'p1', name: 'Venao Burger', price: 12, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', description: 'Double patty, local cheese, avocado' },
      { id: 'p2', name: 'Tuna Poke Bowl', price: 14, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', description: 'Fresh tuna, mango, sesame' },
      { id: 'p3', name: 'Pulled Pork Tacos', price: 10, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&q=80', description: '3 tacos with coleslaw & chipotle' },
    ]
  },
  {
    id: '2', name: "Surf & Sip Bar", category: 'drinks',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    rating: 4.9, reviews: 187, deliveryTime: '15-25', deliveryFee: 2,
    minOrder: 8, tags: ['Cocktails', 'Beer', 'Smoothies'],
    description: 'Tropical drinks delivered to your door',
    products: [
      { id: 'p4', name: 'Passion Fruit Margarita', price: 9, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80', description: 'Fresh passion fruit, lime, tequila' },
      { id: 'p5', name: 'Mango Smoothie', price: 6, image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&q=80', description: 'Fresh local mango, coconut milk' },
      { id: 'p6', name: 'Cold Brew Coffee', price: 5, image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', description: '24h cold brew, black or with milk' },
    ]
  },
  {
    id: '3', name: "Venao Market", category: 'grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    rating: 4.6, reviews: 312, deliveryTime: '25-40', deliveryFee: 3,
    minOrder: 10, tags: ['Fresh Produce', 'Snacks', 'Essentials'],
    description: 'Your local supermarket, delivered',
    products: [
      { id: 'p7', name: 'Tropical Fruit Box', price: 8, image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=400&q=80', description: 'Mango, pineapple, papaya, watermelon' },
      { id: 'p8', name: 'Local Eggs (12)', price: 4, image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?w=400&q=80', description: 'Farm fresh, free range' },
      { id: 'p9', name: 'Sunscreen SPF50', price: 12, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&q=80', description: 'Water resistant, 200ml' },
    ]
  },
  {
    id: '4', name: "Zen Massage Venao", category: 'massage',
    image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80',
    rating: 5.0, reviews: 89, deliveryTime: '45-60', deliveryFee: 0,
    minOrder: 0, tags: ['Thai', 'Deep Tissue', 'Beach'],
    description: 'Professional massage at your location',
    products: [
      { id: 'p10', name: '60min Thai Massage', price: 45, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80', description: 'Traditional Thai, at your place or beach' },
      { id: 'p11', name: '90min Deep Tissue', price: 65, image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400&q=80', description: 'Sports recovery, deep muscle work' },
    ]
  },
]

export const activeOrder = {
  id: 'ord-001', business: businesses[0],
  status: 'picked_up' as const,
  items: [{ product: businesses[0].products[0], qty: 2 }],
  total: 27, courier: { name: 'Carlos M.', phone: '+507 6789-0123', vehicle: '🏍️' },
  eta: '8 min'
}

export interface CartItem {
  product: Product
  qty: number
  businessId: string
}
