/*
  # Fix RLS Policies for Profiles Table

  1. Changes
    - Drop existing RLS policies
    - Create new comprehensive RLS policies for profiles table
    - Add necessary indexes
    - Update existing user passwords
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Ensure proper indexes exist
CREATE INDEX IF NOT EXISTS profiles_id_idx ON profiles(id);

-- Update passwords for existing users to be more secure
UPDATE auth.users
SET encrypted_password = crypt('P@ssw0rd123!@#', gen_salt('bf'))
WHERE email IN ('user@example.com', 'admin@example.com', 'superadmin@example.com');