import type { Guide } from '../types';

export const guides: Guide[] = [
  {
    id: 'guide_001',
    name: 'The 4-Week Metabolic Reset',
    description: 'A comprehensive 28-day nutrition and workout plan designed to boost your metabolism and build healthy habits.',
    price: 49.95,
    imageUrl: 'https://picsum.photos/seed/reset/400/400',
    stripeLink: 'https://buy.stripe.com/test_14A3cx4Gcdiu8Pq3ml8ww04',
  },
  {
    id: 'guide_002',
    name: 'Beginner\'s Guide to Strength Training',
    description: 'Everything you need to know to start lifting weights safely and effectively. Includes a 12-week program.',
    price: 29.95,
    imageUrl: 'https://picsum.photos/seed/strength/400/400',
    stripeLink: 'https://buy.stripe.com/test_5kQbJ3a0w2DQ5De7CB8ww05',
  },
  {
    id: 'guide_003',
    name: 'The Ultimate Meal Prep Cookbook',
    description: 'Over 50 delicious, easy-to-make recipes designed for healthy meal prepping to save you time and keep you on track.',
    price: 19.95,
    imageUrl: 'https://picsum.photos/seed/cookbook/400/400',
    stripeLink: 'https://buy.stripe.com/test_bJe3cx3C85Q27Lme0Z8ww06',
  },
];