
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { posts } from '../data/posts';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-brand-primary hover:underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-white px-6 py-12 lg:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-brand-primary">{post.author} &bull; {post.publishedDate}</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">{post.excerpt}</p>
        <div className="mt-10 max-w-2xl">
            <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            <div className="mt-8 prose lg:prose-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
        <div className="mt-12">
            <Link to="/blog" className="text-brand-primary font-semibold hover:text-brand-secondary">&larr; Back to all posts</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
