/*
  # Initial Schema Setup

  1. New Tables
    - `bookings`
      - `id` (uuid, primary key)
      - `activity_id` (text)
      - `user_email` (text)
      - `booking_date` (date)
      - `num_members` (int)
      - `status` (text)
      - `created_at` (timestamp)
      
    - `enquiries`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text)
      - `response` (text)
      - `created_at` (timestamp)
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id text NOT NULL,
  user_email text NOT NULL,
  booking_date date NOT NULL,
  num_members int NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  CONSTRAINT valid_members CHECK (num_members > 0 AND num_members <= 20)
);

-- Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  response text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

-- Policies for bookings
CREATE POLICY "Users can view own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (auth.jwt()->>'email' = user_email);

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt()->>'email' = user_email);

-- Policies for enquiries
CREATE POLICY "Users can view own enquiries"
  ON enquiries
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt()->>'email');

CREATE POLICY "Users can create enquiries"
  ON enquiries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Admin policies
CREATE POLICY "Admin can view all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@advikentures.com');

CREATE POLICY "Admin can view all enquiries"
  ON enquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'admin@advikentures.com');