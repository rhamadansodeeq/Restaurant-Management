/*
# Restaurant Management System — Core Schema

Creates the complete database schema for the Savory Bites restaurant management
and online food ordering system. All tables use the anon-key pattern (no Supabase
auth) because the app manages its own simple login flow on top of a `customers`
table. RLS is enabled on every table with `TO anon, authenticated` policies so
the anon-key frontend can read/write all data.

## New Tables
1. categories — food categories
2. foods — menu items
3. food_reviews — reviews linked to foods
4. chefs — chef profiles
5. blog_posts — blog articles
6. testimonials — customer testimonials
7. services — services offered
8. gallery_images — gallery photos
9. faqs — frequently asked questions
10. customers — registered users (app-level, not Supabase auth)
11. orders — customer orders
12. reservations — table reservation requests
13. wishlist_items — foods saved by customers

## Security
- RLS enabled on every table.
- All policies use `TO anon, authenticated` with `USING (true)` / `WITH CHECK (true)`
  because this is a single-tenant demo app with its own login layer.
*/

-- CATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  icon text,
  description text,
  image text
);
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_read_categories" ON categories;
CREATE POLICY "anon_read_categories" ON categories FOR SELECT TO anon, authenticated USING (true);

-- FOODS
CREATE TABLE IF NOT EXISTS foods (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  description text,
  category text,
  category_id bigint REFERENCES categories(id),
  ingredients jsonb DEFAULT '[]',
  prep_time text,
  price numeric(10,2) NOT NULL,
  old_price numeric(10,2),
  rating numeric(3,1) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  popularity integer DEFAULT 0,
  availability boolean DEFAULT true,
  image text,
  gallery jsonb DEFAULT '[]',
  nutrition jsonb DEFAULT '{}',
  featured boolean DEFAULT false,
  popular boolean DEFAULT false,
  special_offer boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE foods ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_foods" ON foods;
CREATE POLICY "anon_select_foods" ON foods FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_foods" ON foods;
CREATE POLICY "anon_insert_foods" ON foods FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_foods" ON foods;
CREATE POLICY "anon_update_foods" ON foods FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_foods" ON foods;
CREATE POLICY "anon_delete_foods" ON foods FOR DELETE TO anon, authenticated USING (true);

-- FOOD REVIEWS
CREATE TABLE IF NOT EXISTS food_reviews (
  id bigint PRIMARY KEY,
  food_id bigint REFERENCES foods(id) ON DELETE CASCADE,
  user_name text,
  rating integer,
  comment text,
  review_date date,
  avatar text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE food_reviews ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_food_reviews" ON food_reviews;
CREATE POLICY "anon_select_food_reviews" ON food_reviews FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_food_reviews" ON food_reviews;
CREATE POLICY "anon_insert_food_reviews" ON food_reviews FOR INSERT TO anon, authenticated WITH CHECK (true);

-- CHEFS
CREATE TABLE IF NOT EXISTS chefs (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  role text,
  specialty text,
  bio text,
  image text,
  social jsonb DEFAULT '{}'
);
ALTER TABLE chefs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_chefs" ON chefs;
CREATE POLICY "anon_select_chefs" ON chefs FOR SELECT TO anon, authenticated USING (true);

-- BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id bigint PRIMARY KEY,
  title text NOT NULL,
  excerpt text,
  content text,
  author text,
  author_image text,
  post_date date,
  category text,
  image text,
  tags jsonb DEFAULT '[]',
  read_time text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_blog_posts" ON blog_posts;
CREATE POLICY "anon_select_blog_posts" ON blog_posts FOR SELECT TO anon, authenticated USING (true);

-- TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  role text,
  rating integer,
  comment text,
  image text,
  post_date date,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_testimonials" ON testimonials;
CREATE POLICY "anon_select_testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (true);

-- SERVICES
CREATE TABLE IF NOT EXISTS services (
  id bigint PRIMARY KEY,
  icon text,
  title text NOT NULL,
  description text
);
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_services" ON services;
CREATE POLICY "anon_select_services" ON services FOR SELECT TO anon, authenticated USING (true);

-- GALLERY IMAGES
CREATE TABLE IF NOT EXISTS gallery_images (
  id bigint PRIMARY KEY,
  image text NOT NULL,
  title text,
  category text
);
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_gallery_images" ON gallery_images;
CREATE POLICY "anon_select_gallery_images" ON gallery_images FOR SELECT TO anon, authenticated USING (true);

-- FAQS
CREATE TABLE IF NOT EXISTS faqs (
  id bigint PRIMARY KEY,
  question text NOT NULL,
  answer text
);
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_faqs" ON faqs;
CREATE POLICY "anon_select_faqs" ON faqs FOR SELECT TO anon, authenticated USING (true);

-- CUSTOMERS
CREATE TABLE IF NOT EXISTS customers (
  id bigint PRIMARY KEY,
  name text NOT NULL,
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  phone text,
  gender text,
  address text,
  password text NOT NULL,
  role text DEFAULT 'customer',
  orders integer DEFAULT 0,
  joined date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_customers" ON customers;
CREATE POLICY "anon_select_customers" ON customers FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_customers" ON customers;
CREATE POLICY "anon_insert_customers" ON customers FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_customers" ON customers;
CREATE POLICY "anon_update_customers" ON customers FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_customers" ON customers;
CREATE POLICY "anon_delete_customers" ON customers FOR DELETE TO anon, authenticated USING (true);

-- ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  customer_id bigint REFERENCES customers(id) ON DELETE CASCADE,
  customer_name text NOT NULL,
  phone text,
  address text,
  items jsonb DEFAULT '[]',
  subtotal numeric(10,2) DEFAULT 0,
  service_charge numeric(10,2) DEFAULT 0,
  delivery_fee numeric(10,2) DEFAULT 0,
  total numeric(10,2) DEFAULT 0,
  method text,
  payment text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_orders" ON orders;
CREATE POLICY "anon_select_orders" ON orders FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_orders" ON orders;
CREATE POLICY "anon_update_orders" ON orders FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_orders" ON orders;
CREATE POLICY "anon_delete_orders" ON orders FOR DELETE TO anon, authenticated USING (true);

-- RESERVATIONS
CREATE TABLE IF NOT EXISTS reservations (
  id text PRIMARY KEY,
  customer_name text NOT NULL,
  phone text,
  email text,
  reservation_date date,
  reservation_time text,
  guests integer DEFAULT 1,
  preference text,
  requests text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_reservations" ON reservations;
CREATE POLICY "anon_select_reservations" ON reservations FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_reservations" ON reservations;
CREATE POLICY "anon_insert_reservations" ON reservations FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_reservations" ON reservations;
CREATE POLICY "anon_update_reservations" ON reservations FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_reservations" ON reservations;
CREATE POLICY "anon_delete_reservations" ON reservations FOR DELETE TO anon, authenticated USING (true);

-- WISHLIST ITEMS (id auto-generated as bigint via sequence)
CREATE SEQUENCE IF NOT EXISTS wishlist_items_id_seq;
CREATE TABLE IF NOT EXISTS wishlist_items (
  id bigint PRIMARY KEY DEFAULT nextval('wishlist_items_id_seq'),
  customer_id bigint REFERENCES customers(id) ON DELETE CASCADE,
  food_id bigint REFERENCES foods(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_wishlist_items" ON wishlist_items;
CREATE POLICY "anon_select_wishlist_items" ON wishlist_items FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_wishlist_items" ON wishlist_items;
CREATE POLICY "anon_insert_wishlist_items" ON wishlist_items FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_wishlist_items" ON wishlist_items;
CREATE POLICY "anon_delete_wishlist_items" ON wishlist_items FOR DELETE TO anon, authenticated USING (true);
