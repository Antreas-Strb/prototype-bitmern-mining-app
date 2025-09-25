/*
  # Create tickets table

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `subject` (text)
      - `description` (text)
      - `status` (enum: open, in-progress, resolved)
      - `priority` (enum: high, medium, low)
      - `category` (text)
      - `created_at` (timestamptz)
      - `last_update` (timestamptz)
      - `messages` (jsonb array)
      - `user_id` (uuid, foreign key to auth.users)

  2. Security
    - Enable RLS on `tickets` table
    - Add policies for authenticated users to:
      - Read their own tickets
      - Create new tickets
      - Update their own tickets
*/

-- Create enum types
CREATE TYPE ticket_status AS ENUM ('open', 'in-progress', 'resolved');
CREATE TYPE ticket_priority AS ENUM ('high', 'medium', 'low');

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  description text NOT NULL,
  status ticket_status NOT NULL DEFAULT 'open',
  priority ticket_priority NOT NULL DEFAULT 'medium',
  category text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  last_update timestamptz NOT NULL DEFAULT now(),
  messages jsonb[] DEFAULT ARRAY[]::jsonb[],
  user_id uuid NOT NULL REFERENCES auth.users(id),
  CONSTRAINT messages_check CHECK (
    array_length(messages, 1) IS NULL OR
    array_length(messages, 1) >= 0
  )
);

-- Enable Row Level Security
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tickets"
  ON tickets
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create tickets"
  ON tickets
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tickets"
  ON tickets
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX tickets_user_id_idx ON tickets(user_id);
CREATE INDEX tickets_status_idx ON tickets(status);
CREATE INDEX tickets_created_at_idx ON tickets(created_at);

-- Function to update last_update timestamp
CREATE OR REPLACE FUNCTION update_ticket_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_update = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update last_update
CREATE TRIGGER update_ticket_last_update
  BEFORE UPDATE ON tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_ticket_timestamp();