-- Create SEO optimizations table
CREATE TABLE IF NOT EXISTS seo_optimizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  path text NOT NULL,
  changes jsonb NOT NULL DEFAULT '{}'::jsonb,
  applied_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE seo_optimizations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for authenticated users only"
  ON seo_optimizations
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users only"
  ON seo_optimizations
  FOR SELECT
  TO authenticated
  USING (true);