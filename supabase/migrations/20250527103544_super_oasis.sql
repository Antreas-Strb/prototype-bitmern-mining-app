/*
  # Add demo users

  1. Create demo users
    - Regular user
    - Admin user
*/

-- Create demo users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'user@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Demo User","role":"user"}',
  now(),
  now()
), (
  '22222222-2222-2222-2222-222222222222',
  'admin@example.com',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Demo Admin","role":"admin"}',
  now(),
  now()
);

-- Add demo balances
INSERT INTO balances (
  user_id,
  amount,
  currency
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  1000.00,
  'USD'
), (
  '22222222-2222-2222-2222-222222222222',
  5000.00,
  'USD'
);

-- Add demo miners
INSERT INTO miners (
  user_id,
  name,
  model,
  status,
  hashrate,
  power,
  temperature,
  pool,
  earnings,
  last_share,
  ip_address,
  location,
  facility
) VALUES (
  '11111111-1111-1111-1111-111111111111',
  'Miner 1',
  'Antminer S19 XP',
  'online',
  '140 TH/s',
  '3010W',
  '62°C',
  'F2Pool',
  '0.00042 BTC/day',
  '2 min ago',
  '192.168.1.100',
  'Rack A4, Shelf 2',
  'Texas Mega Facility'
), (
  '11111111-1111-1111-1111-111111111111',
  'Miner 2',
  'Whatsminer M50S',
  'warning',
  '126 TH/s',
  '3276W',
  '68°C',
  'AntPool',
  '0.00038 BTC/day',
  '1 min ago',
  '192.168.1.101',
  'Rack B2, Shelf 1',
  'Nordic Green Hub'
);