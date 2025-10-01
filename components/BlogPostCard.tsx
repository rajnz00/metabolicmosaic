--- START OF FILE src/components/BlogPostCard.tsx ---
import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { urlFor } from '../sanity';
import type { BlogPost } from '../types';

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => (
  <article className="flex flex-col items-start justify-between group">
    <div className="w-full relative">
        <div className="aspect-w-16 aspect-h-9 w-full rounded-2xl bg-gray-100 overflow-hidden">
            {post.mainImage && (
                <img
                    src={urlFor(post.mainImage).width(800).height(450).url() || ''}
                    alt={post.mainImage.alt || post.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                />
            )}
        </div>
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
    <div className="max-w-xl mt-4">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime={post.publishedAt} className="text-gray-500">
          {format(new Date(post.publishedAt), 'PPP')}
        </time>
      </div>
      <div className="relative">
        <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-brand-primary">
          <Link to={`/blog/${post.slug.current}`}>
            <span className="absolute inset-0" />
            {post.title}
          </Link>
        </h3>
        <p className="mt-5 text-sm leading-6 text-gray-600">{post.excerpt}</p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            {post.author?.name || 'Unknown Author'}
          </p>
        </div>
      </div>
    </div>
  </article>
);


export default BlogPostCard;
--- END OF FILE src/components/BlogPostCard.tsx ---