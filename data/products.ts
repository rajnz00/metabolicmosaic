import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'prod_001',
    name: 'Metabolic Whey Protein',
    description: 'High-quality, grass-fed whey protein isolate to support muscle recovery and growth. 25g protein per serving.',
    price: 49.99,
    imageUrl: 'https://picsum.photos/seed/whey/400/400',
    stripeLink: 'https://buy.stripe.com/test_14A5kF3C80vIe9K5ut8ww07',
  },
  {
    id: 'prod_002',
    name: 'Electrolyte Hydration Mix',
    description: 'A clean, zero-sugar electrolyte mix to optimize hydration and performance during intense workouts.',
    price: 25.50,
    imageUrl: 'https://picsum.photos/seed/electrolyte/400/400',
    stripeLink: 'https://buy.stripe.com/test_6oU9AVgoUa6i9Tu9KJ8ww08',
  },
  {
    id: 'prod_003',
    name: 'Adjustable Kettlebell',
    description: 'A versatile, space-saving kettlebell that adjusts from 8kg to 24kg. Perfect for home workouts.',
    price: 149.00,
    imageUrl: 'https://picsum.photos/seed/kettlebell/400/400',
    stripeLink: 'https://buy.stripe.com/test_7sYdRb0pW7Ya2r26yx8ww01',
  },
  {
    id: 'prod_004',
    name: 'High-Speed Jump Rope',
    description: 'Durable and lightweight jump rope with steel ball bearings for smooth, fast rotations. Ideal for cardio.',
    price: 25.00,
    imageUrl: 'https://picsum.photos/seed/jumprope/400/400',
    stripeLink: 'https://buy.stripe.com/test_8x2aEZ2y4emyfdO6yx8ww03',
  },
];