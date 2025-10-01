--- START OF FILE src/pages/BlogListPage.tsx ---
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';
import { client } from '../sanity';
import type { BlogPost } from '../types';

const BlogListPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // Fetch only approved posts, ordered by published date
        const query = `*[_type == "post" && defined(slug.current) && publishedAt < now()] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          publishedAt,
          mainImage,
          "author": author->{name, slug, image}
        }`;
        const data = await client.fetch<BlogPost[]>(query);
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-24 sm:py-32 text-center">
        <p className="text-lg text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-24 sm:py-32 text-center text-red-600">
        <p className="text-lg">{error}</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-white py-24 sm:py-32 text-center">
        <p className="text-lg text-gray-600">No blog posts found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">The MetabolicMosaic Blog</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Dive deep into the science of health, nutrition, and human performance.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
--- END OF FILE src/pages/BlogListPage.tsx ---