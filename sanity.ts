--- START OF FILE src/sanity.ts ---
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from './types';

// Ensure these are set in your .env or Netlify environment variables
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET;
export const SANITY_API_VERSION = '2023-05-03'; // Use current date for API version

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  console.error('SANITY_PROJECT_ID and SANITY_DATASET must be set in your environment variables.');
}

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true, // `false` if you want to ensure fresh data for authenticated requests, `true` for public content
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
--- END OF FILE src/sanity.ts ---