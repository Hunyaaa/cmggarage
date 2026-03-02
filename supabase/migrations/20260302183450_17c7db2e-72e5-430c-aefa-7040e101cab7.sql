
-- Create storage bucket for contact form images
INSERT INTO storage.buckets (id, name, public)
VALUES ('contact-images', 'contact-images', true);

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload contact images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'contact-images');

-- Allow public read access
CREATE POLICY "Public read access for contact images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'contact-images');
