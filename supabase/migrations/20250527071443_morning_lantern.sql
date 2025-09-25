/*
  # Create miners table and related schema

  1. New Tables
    - `miners`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `model` (text)
      - `status` (enum: online, offline, warning)
      - `hashrate` (text)
      - `power` (text)
      - `temperature` (text)
      - `pool` (text)
      - `earnings` (text)
      - `last_share` (text)
      - `ip_address` (text)
      - `location` (text)
      - `facility` (text)
      - `config` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `miners` table
    - Add policies for authenticated users to:
      - Read their own miners
      - Create new miners
      - Update their own miners

  3. Changes
    - Add `miner_id` to tickets table
*/

-- Create miner status enum
CREATE TYPE miner_status AS ENUM ('online', 'offline', 'warning');

-- Create miners table
CREATE TABLE IF NOT EXISTS miners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  name text NOT NULL,
  model text,
  status miner_status NOT NULL DEFAULT 'offline',
  hashrate text,
  power text,
  temperature text,
  pool text,
  earnings text,
  last_share text,
  ip_address text,
  location text,
  facility text,
  config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Add miner_id to tickets table
ALTER TABLE tickets ADD COLUMN miner_id uuid REFERENCES miners(id);

-- Enable Row Level Security
ALTER TABLE miners ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own miners"
  ON miners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create miners"
  ON miners
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own miners"
  ON miners
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX miners_user_id_idx ON miners(user_id);
CREATE INDEX miners_status_idx ON miners(status);
CREATE INDEX miners_name_idx ON miners(name);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_miner_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_miner_last_update
  BEFORE UPDATE ON miners
  FOR EACH ROW
  EXECUTE FUNCTION update_miner_timestamp();