/*
  # Add booking fields to enquiries table
  
  1. Changes
    - Adds phone number fields (primary and alternative)
    - Adds booking-related fields (package, date, travelers, price)
    - Makes phone field required for new entries
  
  2. Security
    - Maintains existing RLS policies
    - No changes to security configuration
  
  3. Notes
    - Uses safe ALTER TABLE operations
    - Preserves existing data
    - Sets appropriate defaults and constraints
*/

-- Add new columns to enquiries table
ALTER TABLE enquiries 
  ADD COLUMN IF NOT EXISTS phone text DEFAULT '',
  ADD COLUMN IF NOT EXISTS alt_phone text,
  ADD COLUMN IF NOT EXISTS package_name text,
  ADD COLUMN IF NOT EXISTS booking_date date,
  ADD COLUMN IF NOT EXISTS num_travelers integer,
  ADD COLUMN IF NOT EXISTS price text;

-- Make phone required for future records
ALTER TABLE enquiries ALTER COLUMN phone SET NOT NULL;