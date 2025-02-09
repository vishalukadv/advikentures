/*
  # Update Admin Email Address

  1. Changes
    - Update admin email in RLS policies from admin@advikentures.com to info@advikentures.com
    
  2. Security
    - Drop and recreate admin policies with new email
*/

-- Drop existing admin policies
DROP POLICY IF EXISTS "Admin can view all bookings" ON bookings;
DROP POLICY IF EXISTS "Admin can view all enquiries" ON enquiries;

-- Recreate admin policies with new email
CREATE POLICY "Admin can view all bookings"
  ON bookings
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'info@advikentures.com');

CREATE POLICY "Admin can view all enquiries"
  ON enquiries
  FOR ALL
  TO authenticated
  USING (auth.jwt()->>'email' = 'info@advikentures.com');