# Auth + Businesses in DB + PWA Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make Yalla Venao a production-ready pilot — admin PIN gate, businesses seeded in Supabase, PWA installable on phone.

**Architecture:** Admin uses a simple PIN gate (env var `VITE_ADMIN_PIN`). Vendor keeps existing localStorage onboarding (picks businessId). Businesses + menu items seeded into Supabase via Management API — the existing `dataAdapter.ts` auto-switches when Supabase is configured. PWA via vite-plugin-pwa for manifest + service worker.

**Tech Stack:** React + TypeScript + Supabase + vite-plugin-pwa

---

## Constants

```
ADMIN_PIN = venao2026
SUPABASE_REF = zwoqwuegweccmayfxrvj
SUPABASE_MGMT_TOKEN = sbp_f75f0fc87c63c25cc873ec1831ddd6912a0b2b93
```

---

### Task 1: Admin PIN Gate

**Files:**
- Create: `src/portals/admin/AdminLogin.tsx`
- Modify: `src/portals/admin/AdminApp.tsx`

**Step 1: Create AdminLogin component**

```typescript
// src/portals/admin/AdminLogin.tsx
import { useState } from 'react'

interface Props {
  onAuth: () => void
}

export default function AdminLogin({ onAuth }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === import.meta.env.VITE_ADMIN_PIN) {
      localStorage.setItem('yv_admin_auth', 'true')
      onAuth()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen bg-[#1B4332] flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#FF6B35] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">Y</span>
          </div>
          <h1 className="text-xl font-bold text-gray-900">Admin Portal</h1>
          <p className="text-sm text-gray-400 mt-1">Enter PIN to continue</p>
        </div>
        <input
          type="password"
          value={pin}
          onChange={e => setPin(e.target.value)}
          placeholder="Enter PIN"
          autoFocus
          className={`w-full border-2 rounded-xl px-4 py-3.5 text-center text-lg font-mono tracking-[0.3em] outline-none transition-colors ${
            error ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-[#1B4332]'
          }`}
        />
        {error && <p className="text-red-500 text-xs text-center mt-2 font-medium">Wrong PIN</p>}
        <button
          type="submit"
          className="w-full mt-4 py-3.5 bg-[#1B4332] text-white rounded-xl font-bold hover:bg-[#152E24] transition-colors"
        >
          Enter
        </button>
      </form>
    </div>
  )
}
```

**Step 2: Wrap AdminApp with auth gate**

In `AdminApp.tsx`, add state for auth and show login if not authenticated:

```typescript
// Add at top of AdminApp.tsx:
import AdminLogin from './AdminLogin'

// Inside AdminApp component, before the return:
const [authed, setAuthed] = useState(() => localStorage.getItem('yv_admin_auth') === 'true')

if (!authed) {
  return <AdminLogin onAuth={() => setAuthed(true)} />
}
```

Also add a logout button to the admin header (the existing user icon area).

**Step 3: Add VITE_ADMIN_PIN to .env and Vercel**

```
# .env
VITE_ADMIN_PIN=venao2026
```

```bash
echo "venao2026" | vercel env add VITE_ADMIN_PIN production
```

**Step 4: Build check**

Run: `npx tsc --noEmit`
Expected: PASS

**Step 5: Commit**

```bash
git add src/portals/admin/AdminLogin.tsx src/portals/admin/AdminApp.tsx .env
git commit -m "feat: admin PIN gate for portal access"
```

---

### Task 2: Seed Businesses + Menu Items to Supabase

**Files:**
- Create: `scripts/seed-businesses.ts` (Node script, run once)
- Modify: nothing in app code — dataAdapter already handles the switch

**Step 1: Create businesses and menu_items tables**

Run via Supabase Management API:

```sql
CREATE TABLE IF NOT EXISTS public.businesses (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL DEFAULT '',
  vertical text NOT NULL DEFAULT 'food',
  image text NOT NULL DEFAULT '',
  rating numeric(3,1) NOT NULL DEFAULT 0,
  description text NOT NULL DEFAULT '',
  phone text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  delivery_time text NOT NULL DEFAULT '',
  delivery_fee numeric(10,2) NOT NULL DEFAULT 5,
  min_order numeric(10,2) NOT NULL DEFAULT 0,
  open_time int NOT NULL DEFAULT 0,
  close_time int NOT NULL DEFAULT 24,
  lat numeric(10,6),
  lng numeric(10,6),
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.menu_items (
  id text PRIMARY KEY,
  business_id text NOT NULL REFERENCES public.businesses(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text NOT NULL DEFAULT '',
  price numeric(10,2) NOT NULL DEFAULT 0,
  image text NOT NULL DEFAULT '',
  is_available boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_menu_items_business ON public.menu_items(business_id);

-- RLS — public read, no write from anon
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY businesses_select_anon ON public.businesses FOR SELECT TO anon USING (true);
CREATE POLICY menu_items_select_anon ON public.menu_items FOR SELECT TO anon USING (true);
CREATE POLICY businesses_all_service ON public.businesses FOR ALL TO service_role USING (true) WITH CHECK (true);
CREATE POLICY menu_items_all_service ON public.menu_items FOR ALL TO service_role USING (true) WITH CHECK (true);
```

**Step 2: Create seed script**

`scripts/seed-businesses.ts` — reads mockData, inserts into Supabase via REST API using service_role key. Run with `npx tsx scripts/seed-businesses.ts`.

**Step 3: Run the seed script**

Expected: 22 businesses + all menu items inserted.

**Step 4: Verify via REST**

```bash
curl -s "https://zwoqwuegweccmayfxrvj.supabase.co/rest/v1/businesses?select=id,name&limit=5" \
  -H "apikey: <anon_key>"
```

Expected: JSON array of businesses.

**Step 5: Commit**

```bash
git add scripts/seed-businesses.ts
git commit -m "feat: seed businesses + menu items to Supabase"
```

---

### Task 3: PWA — Installable on Phone

**Files:**
- Create: `public/icon-192.png` (generated)
- Create: `public/icon-512.png` (generated)
- Modify: `vite.config.ts` — add vite-plugin-pwa
- Modify: `index.html` — add PWA meta tags

**Step 1: Install vite-plugin-pwa**

```bash
npm install -D vite-plugin-pwa
```

**Step 2: Update vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Yalla Venao',
        short_name: 'Yalla',
        description: 'Delivery in Playa Venao',
        theme_color: '#1B4332',
        background_color: '#F5F3EE',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
})
```

**Step 3: Add PWA meta tags to index.html**

```html
<meta name="theme-color" content="#1B4332" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="apple-mobile-web-app-title" content="Yalla Venao" />
<link rel="apple-touch-icon" href="/icon-192.png" />
```

**Step 4: Generate PWA icons**

Create simple Y logo icons using canvas (or placeholder SVG → PNG conversion).

**Step 5: Build check**

Run: `npm run build`
Expected: PASS + `dist/manifest.webmanifest` generated + `dist/sw.js` generated

**Step 6: Commit**

```bash
git add vite.config.ts index.html public/icon-192.png public/icon-512.png
git commit -m "feat: PWA manifest + icons — installable on phone"
```

---

### Task 4: Build + Deploy

**Step 1: Full build**

```bash
npm run build
```

Expected: Build succeeds

**Step 2: Push to deploy**

```bash
git push origin main
```

Vercel auto-deploys → live at https://yalla-venao.vercel.app

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | Admin PIN gate | AdminLogin.tsx + AdminApp.tsx |
| 2 | Businesses in Supabase | DB tables + seed script |
| 3 | PWA installable | vite-plugin-pwa + icons + meta tags |
| 4 | Build + Deploy | Push to Vercel |

## Result

- `/admin` requires PIN (venao2026)
- Businesses load from Supabase (fallback to mockData)
- App installable on phone via "Add to Home Screen"
- Orders persist in Supabase
- Zero backend to maintain
