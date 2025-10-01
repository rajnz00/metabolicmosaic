import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import { products } from '../data/products';
import NewsletterSignup from '../components/NewsletterSignup';

const BlogPostCard: React.FC<{ post: typeof posts[0] }> = ({ post }) => (
  <Link to={`/blog/${post.slug}`} className="group block">
    <div className="overflow-hidden rounded-lg">
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="mt-4">
      <p className="text-sm text-gray-500">{post.publishedDate}</p>
      <h3 className="text-xl font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">{post.title}</h3>
      <p className="mt-2 text-gray-600">{post.excerpt}</p>
    </div>
  </Link>
);

const ProductCard: React.FC<{ product: typeof products[0] }> = ({ product }) => (
  <Link to="/products" className="group block">
    <div className="overflow-hidden rounded-lg bg-gray-100">
      <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
    </div>
    <div className="mt-4 flex justify-between">
      <div>
        <h3 className="text-md font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">{product.name}</h3>
      </div>
      <p className="text-md font-medium text-brand-dark">${product.price.toFixed(2)}</p>
    </div>
  </Link>
);

const HomePage: React.FC = () => {
  const featuredPosts = posts.slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-brand-dark">
        <div className="absolute inset-0">
          <img className="w-full h-full object-cover" src="/images/hero.jpg" alt="Healthy lifestyle"/>
          <div className="absolute inset-0 bg-brand-dark opacity-60"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Build Your Health Mosaic
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Science-backed strategies for sustainable health and peak performance. No myths, just actionable insights.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
            <Link
              to="/blog"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-brand-dark bg-brand-accent hover:bg-amber-400 sm:px-10"
            >
              Explore Insights
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Blog Posts */}
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">From the Blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              The latest articles on nutrition, exercise, and health.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {featuredPosts.map((post) => (
              <BlogPostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="bg-brand-light py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">Featured Products</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Curated products to support your health journey.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  );
};

export default HomePage;