/*
  # Add analytics events table
  
  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key)
      - `event_name` (text)
      - `properties` (jsonb)
      - `user_agent` (text)
      - `url` (text)
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)
  
  2. Security
    - Enable RLS
    - Add policy for authenticated users to insert events
*/

-- Create analytics events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  properties jsonb DEFAULT '{}'::jsonb,
  user_agent text,
  url text,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
  ON analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users only"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (true);