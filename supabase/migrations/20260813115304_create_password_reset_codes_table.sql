/*
# Password Reset Codes Table

1. New Tables
- `password_reset_codes`
  - `id` (uuid, primary key, auto-generated)
  - `customer_id` (bigint, references customers(id) ON DELETE CASCADE)
  - `code` (text, the 6-digit reset code)
  - `contact_method` (text, either 'email' or 'phone')
  - `contact_value` (text, the email or phone the code was sent to)
  - `expires_at` (timestamptz, 15 minutes from creation)
  - `used` (boolean, default false — marks code as consumed after use)
  - `created_at` (timestamptz, default now())

2. Purpose
Stores 6-digit verification codes for the forgot-password flow. When a user
requests a reset, a code is generated and stored here with a 15-minute expiry.
After the user enters the code and sets a new password, the code is marked as used.

3. Security
- RLS enabled on password_reset_codes.
- All CRUD operations allowed for anon, authenticated (the app uses anon-key
  pattern with its own login layer, matching the rest of the schema).
- Codes auto-expire after 15 minutes via the expires_at column.
- The `used` flag prevents code reuse.
*/

CREATE TABLE IF NOT EXISTS password_reset_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id bigint REFERENCES customers(id) ON DELETE CASCADE,
  code text NOT NULL,
  contact_method text NOT NULL,
  contact_value text NOT NULL,
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 minutes'),
  used boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE password_reset_codes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_password_reset_codes" ON password_reset_codes;
CREATE POLICY "anon_select_password_reset_codes" ON password_reset_codes
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_password_reset_codes" ON password_reset_codes;
CREATE POLICY "anon_insert_password_reset_codes" ON password_reset_codes
  FOR INSERT TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_password_reset_codes" ON password_reset_codes;
CREATE POLICY "anon_update_password_reset_codes" ON password_reset_codes
  FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_password_reset_codes" ON password_reset_codes;
CREATE POLICY "anon_delete_password_reset_codes" ON password_reset_codes
  FOR DELETE TO anon, authenticated USING (true);
