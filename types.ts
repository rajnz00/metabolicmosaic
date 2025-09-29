
export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  publishedDate: string;
  excerpt: string;export interface BlogPost {
  slug: string;
  title: string;
  author: string;
  publishedDate: string;
  excerpt: string;
  content: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stripeLink?: string;
}

export interface Guide extends Product {}
  content: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

export interface Guide extends Product {}
