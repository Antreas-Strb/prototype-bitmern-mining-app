/*
  # Create balances table

  1. New Tables
    - `balances`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `amount` (numeric)
      - `currency` (text)
      - `last_updated` (timestamptz)

  2. Security
    - Enable RLS on `balances` table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS balances (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  last_updated timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE balances ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own balance"
  ON balances
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own balance"
  ON balances
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create index
CREATE INDEX balances_user_id_idx ON balances(user_id);

-- Function to update last_updated timestamp
CREATE OR REPLACE FUNCTION update_balance_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update last_updated
CREATE TRIGGER update_balance_last_update
  BEFORE UPDATE ON balances
  FOR EACH ROW
  EXECUTE FUNCTION update_balance_timestamp();