-- Yalla Venao - Initial Schema

-- ─── BUSINESSES ─────────────────────────────────────────────────────────────
create table businesses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  phone text,
  whatsapp text,
  lat double precision,
  lng double precision,
  image text,
  delivery_time text,
  delivery_fee numeric default 0,
  min_order numeric default 0,
  rating numeric default 0,
  open_time int,
  close_time int,
  is_active boolean default true,
  vertical text default 'delivery',
  created_at timestamptz default now()
);

-- ─── MENU ITEMS ─────────────────────────────────────────────────────────────
create table menu_items (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references businesses(id) on delete cascade,
  name text not null,
  description text,
  price numeric not null,
  image text,
  is_available boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- ─── USERS ──────────────────────────────────────────────────────────────────
create table users (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'vendor', 'courier', 'admin')),
  avatar_url text,
  created_at timestamptz default now()
);

-- ─── ORDERS ─────────────────────────────────────────────────────────────────
create table orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references users(id),
  business_id uuid not null references businesses(id),
  courier_id uuid references users(id),
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered', 'cancelled')),
  items jsonb not null default '[]',
  subtotal numeric not null default 0,
  delivery_fee numeric not null default 0,
  total numeric not null default 0,
  delivery_address text,
  delivery_lat double precision,
  delivery_lng double precision,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── COURIER LOCATIONS ──────────────────────────────────────────────────────
create table courier_locations (
  id uuid primary key default gen_random_uuid(),
  courier_id uuid not null references users(id),
  lat double precision not null,
  lng double precision not null,
  updated_at timestamptz default now()
);

-- ─── INDEXES ────────────────────────────────────────────────────────────────
create index idx_menu_items_business on menu_items(business_id);
create index idx_orders_customer on orders(customer_id);
create index idx_orders_business on orders(business_id);
create index idx_orders_courier on orders(courier_id);
create index idx_courier_locations_courier on courier_locations(courier_id);

-- ─── ENABLE RLS ─────────────────────────────────────────────────────────────
alter table businesses enable row level security;
alter table menu_items enable row level security;
alter table users enable row level security;
alter table orders enable row level security;
alter table courier_locations enable row level security;

-- ─── POLICIES: businesses ───────────────────────────────────────────────────
create policy "Anyone can read active businesses"
  on businesses for select using (is_active = true);

create policy "Vendors can update their own business"
  on businesses for update using (
    exists (select 1 from users where users.id = auth.uid() and users.role = 'vendor')
  );

-- ─── POLICIES: menu_items ───────────────────────────────────────────────────
create policy "Anyone can read menu items"
  on menu_items for select using (true);

create policy "Vendors can insert menu items for their business"
  on menu_items for insert with check (
    exists (select 1 from users where users.id = auth.uid() and users.role = 'vendor')
  );

create policy "Vendors can update their menu items"
  on menu_items for update using (
    exists (select 1 from users where users.id = auth.uid() and users.role = 'vendor')
  );

create policy "Vendors can delete their menu items"
  on menu_items for delete using (
    exists (select 1 from users where users.id = auth.uid() and users.role = 'vendor')
  );

-- ─── POLICIES: users ───────────────────────────────────────────────────────
create policy "Users can read their own profile"
  on users for select using (id = auth.uid());

create policy "Users can update their own profile"
  on users for update using (id = auth.uid());

create policy "Users can insert their own profile"
  on users for insert with check (id = auth.uid());

-- ─── POLICIES: orders ──────────────────────────────────────────────────────
create policy "Customers see their own orders"
  on orders for select using (customer_id = auth.uid());

create policy "Vendors see orders for their business"
  on orders for select using (
    exists (select 1 from users where users.id = auth.uid() and users.role = 'vendor')
  );

create policy "Couriers see assigned orders"
  on orders for select using (courier_id = auth.uid());

create policy "Admins see all orders"
  on orders for select using (
    exists (select 1 from users where users.id = auth.uid() and users.role = 'admin')
  );

create policy "Customers can create orders"
  on orders for insert with check (customer_id = auth.uid());

create policy "Order status updates"
  on orders for update using (
    customer_id = auth.uid()
    or courier_id = auth.uid()
    or exists (select 1 from users where users.id = auth.uid() and users.role in ('vendor', 'admin'))
  );

-- ─── POLICIES: courier_locations ────────────────────────────────────────────
create policy "Couriers update their own location"
  on courier_locations for all using (courier_id = auth.uid());

create policy "Customers can read courier location for their active order"
  on courier_locations for select using (
    exists (
      select 1 from orders
      where orders.courier_id = courier_locations.courier_id
        and orders.customer_id = auth.uid()
        and orders.status in ('picked_up', 'ready')
    )
  );

-- ─── REALTIME ───────────────────────────────────────────────────────────────
alter publication supabase_realtime add table orders;
alter publication supabase_realtime add table courier_locations;
