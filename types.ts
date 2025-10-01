// Sanity Image type
export interface SanityImage {
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

// Author type
export interface Author {
  name: string;
  slug: {
    current: string;
  };
  image?: SanityImage;
}

// Blog Post type for Sanity
export interface BlogPost {
  _id: string;
  _createdAt: string;
  slug: {
    current: string;
  };
  title: string;
  author?: Author;
  publishedAt: string;
  excerpt: string;
  body: any[]; // Portable Text blocks
  mainImage?: SanityImage;
}

// Comment type
export interface Comment {
  _id: string;
  _createdAt: string;
  authorName: string;
  commentText: string;
  approved?: boolean;
}

// Product type
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stripeLink?: string;
}

// Guide type
export interface Guide extends Product {}

// Static blog post type (for fallback/migration)
export interface StaticBlogPost {
  slug: string;
  title: string;
  author: string;
  publishedDate: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}