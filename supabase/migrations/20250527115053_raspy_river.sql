/*
  # Add new admin user

  1. Changes
    - Create new admin user with proper auth setup
    - Add corresponding profile
    - Add initial balance
*/

-- Create new admin user if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'superadmin@example.com') THEN
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
      '33333333-3333-3333-3333-333333333333',
      '00000000-0000-0000-0000-000000000000',
      'superadmin@example.com',
      crypt('admin123', gen_salt('bf')),
      now(),
      jsonb_build_object(
        'provider', 'email',
        'providers', ARRAY['email']
      ),
      jsonb_build_object(
        'name', 'Super Admin',
        'role', 'admin'
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
    VALUES ('33333333-3333-3333-3333-333333333333', 'Super Admin', 'admin');

    -- Create initial balance
    INSERT INTO balances (user_id, amount, currency)
    VALUES ('33333333-3333-3333-3333-333333333333', 10000.00, 'USD');
  END IF;
END $$;