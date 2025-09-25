/*
  # Create profiles table and demo data

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `role` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `profiles` table
    - Add policies for authenticated users
    
  3. Demo Data
    - Create demo users
    - Create demo profiles
    - Add demo balances
    - Add demo miners
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  name text NOT NULL,
  role text NOT NULL DEFAULT 'user',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can view their own profile'
  ) THEN
    CREATE POLICY "Users can view their own profile"
      ON profiles
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'profiles' 
    AND policyname = 'Users can update their own profile'
  ) THEN
    CREATE POLICY "Users can update their own profile"
      ON profiles
      FOR UPDATE
      TO authenticated
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;

-- Create demo users if they don't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '11111111-1111-1111-1111-111111111111') THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change
    ) VALUES (
      '11111111-1111-1111-1111-111111111111',
      '00000000-0000-0000-0000-000000000000',
      'user@example.com',
      crypt('password123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Demo User","role":"user"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = '22222222-2222-2222-2222-222222222222') THEN
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change
    ) VALUES (
      '22222222-2222-2222-2222-222222222222',
      '00000000-0000-0000-0000-000000000000',
      'admin@example.com',
      crypt('password123', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Demo Admin","role":"admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;

-- Create demo profiles if they don't exist
INSERT INTO profiles (id, name, role)
SELECT '11111111-1111-1111-1111-111111111111', 'Demo User', 'user'
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '11111111-1111-1111-1111-111111111111'
);

INSERT INTO profiles (id, name, role)
SELECT '22222222-2222-2222-2222-222222222222', 'Demo Admin', 'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE id = '22222222-2222-2222-2222-222222222222'
);

-- Add demo balances if they don't exist
INSERT INTO balances (user_id, amount, currency)
SELECT '11111111-1111-1111-1111-111111111111', 1000.00, 'USD'
WHERE NOT EXISTS (
  SELECT 1 FROM balances WHERE user_id = '11111111-1111-1111-1111-111111111111'
);

INSERT INTO balances (user_id, amount, currency)
SELECT '22222222-2222-2222-2222-222222222222', 5000.00, 'USD'
WHERE NOT EXISTS (
  SELECT 1 FROM balances WHERE user_id = '22222222-2222-2222-2222-222222222222'
);

-- Add demo miners if they don't exist
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
)
SELECT 
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
WHERE NOT EXISTS (
  SELECT 1 FROM miners 
  WHERE user_id = '11111111-1111-1111-1111-111111111111' 
  AND name = 'Miner 1'
);

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
)
SELECT 
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
WHERE NOT EXISTS (
  SELECT 1 FROM miners 
  WHERE user_id = '11111111-1111-1111-1111-111111111111' 
  AND name = 'Miner 2'
);