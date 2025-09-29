
import React from 'react';
import { Link } from 'react-router-dom';
import { posts } from '../data/posts';
import type { BlogPost } from '../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="flex flex-col items-start justify-between group">
    <div className="w-full relative">
        <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl bg-gray-100 overflow-hidden">
            <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
            />
        </div>
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
    <div className="max-w-xl mt-4">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.publishedDate} className="text-gray-500">
          {post.publishedDate}
        </time>
      </div>
      <div className="relative">
        <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-brand-primary">
          <Link to={`/blog/${post.slug}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 text-sm leading-6 text-gray-600">{post.excerpt}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            {post.author}
          </p>
        </div>
      </div>
    </div>
  </article>
);


const BlogListPage: React.FC = () => {
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
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogListPage;
