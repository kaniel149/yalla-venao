-- More businesses discovered from TripAdvisor, Booking, research

-- ─── RESTAURANTS & BARS ─────────────────────────────────────────────────────

INSERT INTO businesses (id, name, category, description, phone, whatsapp, lat, lng, image, delivery_time, delivery_fee, min_order, rating, open_time, close_time, is_active, vertical) VALUES
('00000000-0000-0000-0000-000000000014', 'Cantina Venao', 'food', 'French-seafood fusion bar. Good cocktails, chill atmosphere. A newer spot that''s quickly becoming a local favorite.', '', '', 7.4212, -80.1502, 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80', '20-30', 2, 10, 4.0, 12, 23, true, 'food'),
('00000000-0000-0000-0000-000000000015', 'Eco Venao Restaurant', 'food', 'Farm-to-table dining at the eco lodge. Fresh juices, local ingredients, cocktails with bare feet on sand. The OG Venao spot.', '', '', 7.4225, -80.1520, 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80', '25-40', 3, 12, 4.5, 7, 22, true, 'food'),
('00000000-0000-0000-0000-000000000016', 'Gatto Blanco Beach', 'food', 'Italian restaurant right on the beach. Wood-fired pizza, fresh pasta, seafood. 5-star rated newcomer.', '', '', 7.4205, -80.1514, 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?w=800&q=80', '25-40', 2, 14, 5.0, 12, 22, true, 'food'),
('00000000-0000-0000-0000-000000000017', 'Oleajes de Sabores', 'food', 'Authentic Panamanian seafood. Pescado frito con patacones done right. The real local food experience in Venao.', '', '', 7.4218, -80.1496, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', '20-35', 2, 8, 4.6, 10, 21, true, 'food'),
('00000000-0000-0000-0000-000000000018', 'Pan Ar Panaderia', 'food', 'Argentine artisan bakery. Fresh bread, empanadas, pastries, coffee. 5-star rated. Best breakfast in Venao.', '', '', 7.4220, -80.1500, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80', '15-25', 1, 5, 5.0, 6, 14, true, 'food'),
('00000000-0000-0000-0000-000000000019', 'Donde Ruben', 'food', 'Local Panamanian joint. Burgers, seafood, cold beer. No frills, big portions, great prices. Where the locals eat.', '', '', 7.4213, -80.1497, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&q=80', '15-25', 1, 6, 4.4, 10, 22, true, 'food'),
('00000000-0000-0000-0000-000000000020', 'Fama Sushi', 'food', 'Sushi in the jungle. Fresh fish rolls, poke bowls, Japanese-Latin fusion. A welcome change from the usual Venao menu.', '', '', 7.4216, -80.1504, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80', '25-40', 3, 15, 3.8, 12, 22, true, 'food'),
('00000000-0000-0000-0000-000000000021', 'Sol Cafe', 'food', 'Chill coffee shop and brunch spot. Acai bowls, smoothies, sandwiches. Good WiFi for remote work.', '', '', 7.4214, -80.1501, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80', '10-20', 1, 5, 4.7, 7, 16, true, 'food'),
('00000000-0000-0000-0000-000000000022', 'Smart Delivery Venao', 'grocery', 'Local delivery service. Groceries, drinks, essentials delivered to your door. The convenience store that comes to you.', '', '', 7.4215, -80.1503, 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=800&q=80', '20-40', 2, 10, 4.3, 8, 20, true, 'food');

-- ─── EXPERIENCES & TOURS ────────────────────────────────────────────────────

INSERT INTO businesses (id, name, category, description, phone, whatsapp, lat, lng, image, delivery_time, delivery_fee, min_order, rating, open_time, close_time, is_active, vertical) VALUES
('00000000-0000-0000-0000-0000000000e5', 'Safari Surf School', 'Surf', 'The most established surf school in Venao. Professional instructors, all levels. Horseback riding tours too. $30-52 per session.', '', '', 7.4208, -80.1510, 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800&q=80', 'On request', 0, 30, 4.9, 6, 17, true, 'experience'),
('00000000-0000-0000-0000-0000000000e6', 'Kahuna Venao', 'Surf', 'Surf school + wellness. Surf lessons, ice baths, sunset parties, community events. The vibe spot of Venao.', '', '', 7.4210, -80.1508, 'https://images.unsplash.com/photo-1520443240718-fce21901db79?w=800&q=80', 'On request', 0, 40, 4.8, 7, 18, true, 'experience'),
('00000000-0000-0000-0000-0000000000e7', 'ICT Tours - Isla Iguana', 'Tour', 'Day trip to Isla Iguana — snorkeling on Panama''s largest coral reef, wildlife, beach. All equipment included. $63-95 per person.', '50767180032', '50767180032', 7.4200, -80.1500, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80', 'On request', 0, 63, 4.7, 8, 16, true, 'experience'),
('00000000-0000-0000-0000-0000000000e8', 'Horseback Riding Venao', 'Adventure', 'Beach and hillside horseback tours. Sunset rides along the coast. Photo package available. $30 per person.', '', '', 7.4222, -80.1515, 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80', 'On request', 0, 30, 4.6, 7, 17, true, 'experience'),
('00000000-0000-0000-0000-0000000000e9', 'Canas Jungle Zip Line', 'Adventure', '7km of canopy zip lines through the jungle. Valley views, hiking trails. The biggest adrenaline rush near Venao.', '', '', 7.4100, -80.1600, 'https://images.unsplash.com/photo-1530866495561-507c83dc6de4?w=800&q=80', 'On request', 0, 45, 4.5, 8, 16, true, 'experience'),
('00000000-0000-0000-0000-000000000ea0', 'Turtle Nesting Tour', 'Tour', 'Guided night tours to see sea turtles nesting and hatchling releases at Isla Canas. Seasonal: July-November.', '', '', 7.4000, -80.1700, 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=800&q=80', 'On request', 0, 35, 4.8, 20, 5, true, 'experience');

-- ─── STAYS ──────────────────────────────────────────────────────────────────

INSERT INTO businesses (id, name, category, description, phone, whatsapp, lat, lng, image, delivery_time, delivery_fee, min_order, rating, open_time, close_time, is_active, vertical) VALUES
('00000000-0000-0000-0000-00000000f001', 'Selina Playa Venao', 'Stay', '#1 rated specialty lodging. Hostel + hotel hybrid. Dorms, private rooms, glamping. Pool, surf shop, coworking, yoga. 802 reviews.', '', '', 7.4210, -80.1510, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', 'On request', 0, 18, 4.5, 0, 24, true, 'stay'),
('00000000-0000-0000-0000-00000000f002', 'El Sitio Hotel', 'Stay', '#1 best value resort. Beachfront rooms, suites, family houses. Pool, surf shop, restaurant, events. 289 reviews.', '', '', 7.4208, -80.1510, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80', 'On request', 0, 80, 4.3, 0, 24, true, 'stay'),
('00000000-0000-0000-0000-00000000f003', 'Eco Venao Lodge', 'Stay', 'Eco-luxury beachfront. Cabanas, cottages, guesthouse, hostel. Farm-to-table dining. The original Venao destination.', '', '', 7.4225, -80.1520, 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=800&q=80', 'On request', 0, 45, 4.6, 0, 24, true, 'stay'),
('00000000-0000-0000-0000-00000000f004', 'Beach Break Surf Camp', 'Stay', 'Boutique hotel steps from the break. Double to 5-person rooms, ocean-view apartments. AC, WiFi, surf shop.', '', '', 7.4209, -80.1509, 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', 'On request', 0, 40, 4.4, 0, 24, true, 'stay'),
('00000000-0000-0000-0000-00000000f005', 'Playa Venao Hotel Resort', 'Stay', '3.5-star resort. 45 rooms, infinity pool, spa, fitness, nightclub, rooftop terrace. Direct beach access.', '', '', 7.4204, -80.1512, 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', 'On request', 0, 90, 4.2, 0, 24, true, 'stay'),
('00000000-0000-0000-0000-00000000f006', 'Villa Marina Lodge', 'Stay', '2-bedroom condos for families. Quiet location, away from party areas. Top-rated at 4.5 stars, 75 reviews.', '', '', 7.4218, -80.1495, 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80', 'On request', 0, 120, 4.5, 0, 24, true, 'stay'),
('00000000-0000-0000-0000-00000000f007', 'Dos Mares Venao Village', 'Stay', 'Cozy bungalows and cabins. 5.0 rated. Breakfast delivery option. Comfortable beds, peaceful setting.', '', '', 7.4220, -80.1498, 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&q=80', 'On request', 0, 65, 5.0, 0, 24, true, 'stay');

-- ─── MENU ITEMS FOR NEW RESTAURANTS ─────────────────────────────────────────

INSERT INTO menu_items (id, business_id, name, description, price, image, is_available, sort_order) VALUES
-- Cantina Venao
('00000000-0000-0000-0014-000000000001', '00000000-0000-0000-0000-000000000014', 'Fish Tacos', 'Grilled fish, cabbage slaw, chipotle mayo, corn tortillas.', 12, 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&q=80', true, 1),
('00000000-0000-0000-0014-000000000002', '00000000-0000-0000-0000-000000000014', 'French Onion Soup', 'Classic gratinée with Gruyère croutons.', 10, 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&q=80', true, 2),
-- Gatto Blanco
('00000000-0000-0000-0016-000000000001', '00000000-0000-0000-0000-000000000016', 'Pasta Frutti di Mare', 'Fresh pasta with shrimp, clams, calamari in white wine sauce.', 18, 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&q=80', true, 1),
('00000000-0000-0000-0016-000000000002', '00000000-0000-0000-0000-000000000016', 'Margherita Napoletana', 'San Marzano, buffalo mozzarella, fresh basil. Wood-fired.', 14, 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80', true, 2),
-- Pan Ar
('00000000-0000-0000-0018-000000000001', '00000000-0000-0000-0000-000000000018', 'Empanadas (3)', 'Argentine beef empanadas, freshly baked.', 8, 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&q=80', true, 1),
('00000000-0000-0000-0018-000000000002', '00000000-0000-0000-0000-000000000018', 'Medialuna & Coffee', 'Argentine croissant with espresso. Perfect morning combo.', 5, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', true, 2),
-- Oleajes
('00000000-0000-0000-0017-000000000001', '00000000-0000-0000-0000-000000000017', 'Pescado Frito', 'Whole fried fish with patacones, rice, salad. The classic.', 12, 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80', true, 1),
-- Donde Ruben
('00000000-0000-0000-0019-000000000001', '00000000-0000-0000-0000-000000000019', 'Cheeseburger', 'Juicy beef burger, cheddar, lettuce, tomato, special sauce.', 9, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80', true, 1),
('00000000-0000-0000-0019-000000000002', '00000000-0000-0000-0000-000000000019', 'Ceviche', 'Fresh corvina ceviche with lime, onion, cilantro, tostadas.', 10, 'https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?w=400&q=80', true, 2),
-- Fama Sushi
('00000000-0000-0000-0020-000000000001', '00000000-0000-0000-0000-000000000020', 'Venao Roll', 'Shrimp tempura, avocado, mango, spicy mayo. 8 pieces.', 16, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80', true, 1),
('00000000-0000-0000-0020-000000000002', '00000000-0000-0000-0000-000000000020', 'Poke Bowl', 'Fresh tuna, rice, edamame, avocado, ponzu dressing.', 14, 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80', true, 2),
-- Sol Cafe
('00000000-0000-0000-0021-000000000001', '00000000-0000-0000-0000-000000000021', 'Acai Bowl', 'Acai, banana, granola, coconut, honey. Supercharged breakfast.', 10, 'https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80', true, 1),
('00000000-0000-0000-0021-000000000002', '00000000-0000-0000-0000-000000000021', 'Cold Brew', 'Local Chiriquí beans, 18-hour cold brew. Strong and smooth.', 4, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&q=80', true, 2),
-- Eco Venao
('00000000-0000-0000-0015-000000000001', '00000000-0000-0000-0000-000000000015', 'Farm Bowl', 'Quinoa, roasted vegetables, avocado, tahini. From the garden.', 14, 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80', true, 1),
('00000000-0000-0000-0015-000000000002', '00000000-0000-0000-0000-000000000015', 'Tropical Smoothie', 'Mango, passion fruit, banana, coconut milk. Pure energy.', 6, 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=400&q=80', true, 2),
-- ICT Tours menu items (tours as products)
('00000000-0000-0000-00e7-000000000001', '00000000-0000-0000-0000-0000000000e7', 'Isla Iguana Tour (2 pax)', 'Private all-inclusive. Snorkel gear, boat, transport, snacks.', 95, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', true, 1),
('00000000-0000-0000-00e7-000000000002', '00000000-0000-0000-0000-0000000000e7', 'Isla Iguana Group (5-6 pax)', 'Group rate. Same all-inclusive package.', 63, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', true, 2),
-- Safari Surf
('00000000-0000-0000-00e5-000000000001', '00000000-0000-0000-0000-0000000000e5', 'Surf Lesson (1hr)', 'Private surf lesson with pro instructor. Board included.', 52, 'https://images.unsplash.com/photo-1455729552865-3658a5d39692?w=400&q=80', true, 1),
('00000000-0000-0000-00e5-000000000002', '00000000-0000-0000-0000-0000000000e5', 'Horseback Beach Ride', 'Seaside horseback safari along the coast. Photos included.', 30, 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=400&q=80', true, 2),
-- Stays as products
('00000000-0000-0000-f001-000000000001', '00000000-0000-0000-0000-00000000f001', 'Dorm Bed', 'Shared dorm at Selina. Lockers, social area, pool access.', 18, 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&q=80', true, 1),
('00000000-0000-0000-f001-000000000002', '00000000-0000-0000-0000-00000000f001', 'Private Room', 'Private room for 2. AC, WiFi, pool and beach access.', 65, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80', true, 2),
('00000000-0000-0000-f002-000000000001', '00000000-0000-0000-0000-00000000f002', 'Standard Room', 'Beachfront room at El Sitio. Ocean view, AC, WiFi.', 80, 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80', true, 1),
('00000000-0000-0000-f003-000000000001', '00000000-0000-0000-0000-00000000f003', 'Eco Cabana', 'Beachfront cabana at Eco Venao. Nature immersion.', 45, 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?w=400&q=80', true, 1);
