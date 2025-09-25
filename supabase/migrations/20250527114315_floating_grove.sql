/*
  # Fix authentication setup

  1. Changes
    - Update auth.users table with correct schema
    - Add profiles for demo users
    - Add proper RLS policies
*/

-- Create profiles table if it doesn't exist
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

-- Function to safely create demo users
CREATE OR REPLACE FUNCTION create_demo_user(
  user_id uuid,
  user_email text,
  user_password text,
  user_name text,
  user_role text
) RETURNS void AS $$
BEGIN
  -- Only create user if they don't exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = user_id) THEN
    -- Insert into auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change
    ) VALUES (
      user_id,
      '00000000-0000-0000-0000-000000000000',
      user_email,
      crypt(user_password, gen_salt('bf')),
      now(),
      jsonb_build_object(
        'provider', 'email',
        'providers', ARRAY['email']
      ),
      jsonb_build_object(
        'name', user_name,
        'role', user_role
      ),
      'authenticated',
      'authenticated',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );

    -- Create profile
    INSERT INTO profiles (id, name, role)
    VALUES (user_id, user_name, user_role);

    -- Create initial balance
    INSERT INTO balances (user_id, amount, currency)
    VALUES (
      user_id,
      CASE WHEN user_role = 'admin' THEN 5000.00 ELSE 1000.00 END,
      'USD'
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Create demo users
SELECT create_demo_user(
  '11111111-1111-1111-1111-111111111111',
  'user@example.com',
  'password123',
  'Demo User',
  'user'
);

SELECT create_demo_user(
  '22222222-2222-2222-2222-222222222222',
  'admin@example.com',
  'password123',
  'Demo Admin',
  'admin'
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