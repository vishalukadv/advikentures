/*
  # Add email notifications system

  1. New Tables
    - `email_notifications`
      - `id` (uuid, primary key)
      - `type` (text) - Type of notification (enquiry/booking)
      - `notification_type` (text) - Type of notification (email)
      - `recipient` (text) - Email recipient
      - `subject` (text) - Email subject
      - `status` (text) - Current status (pending/sent/failed)
      - `client_reference` (text) - Client-side reference
      - `client_metadata` (jsonb) - Client-side metadata
      - `metadata` (jsonb) - Additional metadata
      - `error_details` (jsonb) - Error details if failed
      - `delivery_attempts` (int) - Number of delivery attempts
      - `last_delivery_attempt` (timestamptz) - Last delivery attempt timestamp
      - `sent_at` (timestamptz) - When the email was sent
      - `created_at` (timestamptz) - Record creation time
      - `updated_at` (timestamptz) - Last update time
      - `updated_by` (text) - Who/what updated the record

  2. Security
    - Enable RLS
    - Add policies for authenticated users
*/

-- Create email notifications table
CREATE TABLE IF NOT EXISTS email_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  notification_type text NOT NULL DEFAULT 'email',
  recipient text NOT NULL,
  subject text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  client_reference text NOT NULL,
  client_metadata jsonb DEFAULT '{}'::jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  error_details jsonb DEFAULT '{}'::jsonb,
  delivery_attempts int DEFAULT 0,
  last_delivery_attempt timestamptz,
  sent_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  updated_by text,
  CONSTRAINT valid_status CHECK (status IN ('pending', 'sent', 'failed')),
  CONSTRAINT valid_type CHECK (type IN ('enquiry', 'booking')),
  CONSTRAINT valid_notification_type CHECK (notification_type = 'email')
);

-- Enable RLS
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can insert notifications"
  ON email_notifications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can view own notifications"
  ON email_notifications
  FOR SELECT
  TO authenticated
  USING (
    client_metadata->>'email' = auth.jwt()->>'email'
    OR
    metadata->>'email' = auth.jwt()->>'email'
  );

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_email_notifications_updated_at
  BEFORE UPDATE ON email_notifications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();