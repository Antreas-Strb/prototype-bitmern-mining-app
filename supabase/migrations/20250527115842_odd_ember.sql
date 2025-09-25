-- Update passwords for existing admin users
UPDATE auth.users
SET encrypted_password = crypt('P@ssw0rd123!@#', gen_salt('bf'))
WHERE email IN ('admin@example.com', 'superadmin@example.com');

-- Ensure RLS policies are properly set
DO $$
BEGIN
  -- Drop existing policies if they exist
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
END $$;