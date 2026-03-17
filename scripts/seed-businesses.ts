/**
 * Seed businesses + menu items from mockData into Supabase.
 * Run: npx tsx scripts/seed-businesses.ts
 */

// We can't import the TS mockData directly in a Node script easily,
// so we'll use the Supabase REST API with service_role key.

const SUPABASE_URL = 'https://zwoqwuegweccmayfxrvj.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3b3F3dWVnd2VjY21heWZ4cnZqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzcyOTQ1MywiZXhwIjoyMDg5MzA1NDUzfQ.CTMmbbdnshfyBIFVuD6gZaRxhrAhAuD_YHs_SGQ1b3g'

const headers = {
  'apikey': SERVICE_ROLE_KEY,
  'Authorization': `Bearer ${SERVICE_ROLE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'resolution=merge-duplicates',
}

// Import businesses from mockData at build time
import { businesses } from '../src/data/mockData.js'

async function seed() {
  console.log(`Seeding ${businesses.length} businesses...`)

  // Insert businesses
  const bizRows = businesses.map(b => ({
    id: b.id,
    name: b.name,
    category: b.category,
    vertical: b.vertical,
    image: b.image,
    rating: b.rating,
    description: b.description,
    phone: b.phone || '',
    whatsapp: b.phone || '',
    delivery_time: b.deliveryTime,
    delivery_fee: b.deliveryFee,
    min_order: b.minOrder,
    open_time: b.hours.open,
    close_time: b.hours.close,
    lat: b.coordinates?.lat ?? null,
    lng: b.coordinates?.lng ?? null,
    is_active: true,
  }))

  const bizRes = await fetch(`${SUPABASE_URL}/rest/v1/businesses`, {
    method: 'POST',
    headers,
    body: JSON.stringify(bizRows),
  })

  if (!bizRes.ok) {
    const err = await bizRes.text()
    console.error('Failed to insert businesses:', err)
    return
  }
  console.log(`✓ ${bizRows.length} businesses inserted`)

  // Insert menu items
  const menuRows: any[] = []
  for (const b of businesses) {
    for (let i = 0; i < b.products.length; i++) {
      const p = b.products[i]
      menuRows.push({
        id: p.id,
        business_id: b.id,
        name: p.name,
        description: p.description,
        price: p.price,
        image: p.image,
        is_available: true,
        sort_order: i,
      })
    }
  }

  // Insert in batches of 100
  for (let i = 0; i < menuRows.length; i += 100) {
    const batch = menuRows.slice(i, i + 100)
    const menuRes = await fetch(`${SUPABASE_URL}/rest/v1/menu_items`, {
      method: 'POST',
      headers,
      body: JSON.stringify(batch),
    })
    if (!menuRes.ok) {
      const err = await menuRes.text()
      console.error(`Failed to insert menu items batch ${i}:`, err)
      return
    }
    console.log(`✓ Menu items batch ${i}-${i + batch.length} inserted`)
  }

  console.log(`\n✓ Done! ${bizRows.length} businesses, ${menuRows.length} menu items seeded.`)
}

seed().catch(console.error)
