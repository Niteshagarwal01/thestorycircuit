-- Extended schema for admin panel
-- Run this in Supabase SQL Editor

-- Agency Info (single row)
CREATE TABLE IF NOT EXISTS agency_info (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'The Story Circuit',
  tagline TEXT,
  description TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  instagram TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Stats
CREATE TABLE IF NOT EXISTS stats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  number TEXT NOT NULL,
  label TEXT NOT NULL,
  order_index INTEGER DEFAULT 0
);

-- Founders
CREATE TABLE IF NOT EXISTS founders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  initials TEXT,
  instagram TEXT,
  linkedin TEXT,
  order_index INTEGER DEFAULT 0
);

-- Portfolio (update existing or create)
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  category_label TEXT,
  media_type TEXT DEFAULT 'video',
  drive_file_id TEXT,
  thumbnail_drive_id TEXT,
  description TEXT,
  client TEXT,
  year TEXT,
  grid_size TEXT DEFAULT 'std',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials (update existing or create)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_role TEXT NOT NULL,
  client_company TEXT,
  initials TEXT,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS policies
ALTER TABLE agency_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE founders ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "public_read_agency_info" ON agency_info FOR SELECT USING (true);
CREATE POLICY "public_read_stats" ON stats FOR SELECT USING (true);
CREATE POLICY "public_read_founders" ON founders FOR SELECT USING (true);
CREATE POLICY "public_read_portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "public_read_testimonials" ON testimonials FOR SELECT USING (true);

-- Auth write
CREATE POLICY "auth_all_agency_info" ON agency_info USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_stats" ON stats USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_founders" ON founders USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_portfolio" ON portfolio USING (auth.role() = 'authenticated');
CREATE POLICY "auth_all_testimonials" ON testimonials USING (auth.role() = 'authenticated');

-- Seed initial data
INSERT INTO agency_info (name, tagline, description, email, phone, address, instagram) VALUES (
  'The Story Circuit',
  'We craft stories that sell.',
  'A creative media agency specialising in premium video production, brand storytelling, and vertical content creation.',
  'thestorycircuit26@gmail.com',
  '+91 98765 43210',
  'Mumbai, India',
  'thestorycircuit_'
) ON CONFLICT DO NOTHING;

INSERT INTO stats (number, label, order_index) VALUES
  ('30+', 'Projects Delivered', 0),
  ('20+', 'Happy Clients', 1),
  ('3', 'Years in Production', 2),
  ('5★', 'Client Satisfaction', 3)
ON CONFLICT DO NOTHING;

INSERT INTO founders (name, role, bio, initials, instagram, linkedin, order_index) VALUES (
  'Hemang Maheshwari',
  'Creative Director & Co-Founder',
  'With a background in cinematography and brand strategy, Hemang leads the creative vision at The Story Circuit.',
  'HM', 'thestorycircuit', '#', 0
) ON CONFLICT DO NOTHING;

INSERT INTO testimonials (client_name, client_role, client_company, initials, quote, rating, order_index) VALUES
  ('Priya Sharma', 'Marketing Director', 'Cure Wellness', 'PS', 'The Story Circuit completely transformed how our brand is perceived online. We saw a 3× increase in engagement within the first week.', 5, 0),
  ('Arjun Mehta', 'Founder', 'Ragi Nutra', 'AM', 'Working with TSC felt effortless. They understood our brand voice immediately and translated it into visuals we never thought possible.', 5, 1),
  ('Sneha Kulkarni', 'Brand Manager', 'Urban Threads', 'SK', 'The attention to detail is unreal. Our Instagram reach doubled the month we started running their content.', 5, 2)
ON CONFLICT DO NOTHING;
