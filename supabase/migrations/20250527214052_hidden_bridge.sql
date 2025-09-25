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

-- Update passwords for demo users only
UPDATE auth.users
SET 
  encrypted_password = crypt('P@ssw0rd123!@#', gen_salt('bf')),
  email_confirmed_at = COALESCE(email_confirmed_at, now()),
  raw_app_meta_data = jsonb_build_object(
    'provider', 'email',
    'providers', ARRAY['email']
  ),
  raw_user_meta_data = CASE
    WHEN email = 'superadmin@example.com' THEN 
      jsonb_build_object('name', 'Super Admin', 'role', 'admin')
    WHEN email = 'admin@example.com' THEN 
      jsonb_build_object('name', 'Admin User', 'role', 'admin')
    ELSE 
      jsonb_build_object('name', 'Regular User', 'role', 'user')
  END
WHERE email IN ('user@example.com', 'admin@example.com', 'superadmin@example.com');

-- Ensure profiles exist for demo users
INSERT INTO profiles (id, name, role)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'name', 'User'),
  COALESCE(raw_user_meta_data->>'role', 'user')
FROM auth.users
WHERE 
  email IN ('user@example.com', 'admin@example.com', 'superadmin@example.com')
  AND NOT EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = auth.users.id
  );