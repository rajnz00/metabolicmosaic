--- START OF FILE src/pages/BlogPostPage.tsx ---
import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { client, urlFor } from '../sanity';
import type { BlogPost, Comment } from '../types';
import PortableTextContent from '../components/PortableTextContent';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';
import SocialShare from '../components/SocialShare';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPostAndComments = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch post with author data
      const postQuery = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        body,
        "author": author->{name, slug, image}
      }`;
      const fetchedPost = await client.fetch<BlogPost>(postQuery, { slug });

      if (!fetchedPost) {
        setError("Post not found.");
        setPost(null);
        return;
      }
      setPost(fetchedPost);

      // Fetch approved comments for this post
      const commentsQuery = `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt asc) {
        _id,
        _createdAt,
        authorName,
        commentText
      }`;
      const fetchedComments = await client.fetch<Comment[]>(commentsQuery, { postId: fetchedPost._id });
      setComments(fetchedComments);

    } catch (err) {
      console.error("Failed to fetch blog post or comments:", err);
      setError("Failed to load content. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchPostAndComments();
  }, [fetchPostAndComments]);

  if (loading) {
    return (
      <div className="text-center py-24">
        <p className="text-lg text-gray-600">Loading blog post...</p>
      </div>
    );
  }

  if (error === "Post not found.") {
    return (
      <div className="text-center py-24">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-brand-primary hover:underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-24 text-red-600">
        <h1 className="text-2xl font-bold">{error || "An error occurred."}</h1>
        <Link to="/blog" className="text-brand-primary hover:underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  // Determine current URL for sharing
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://yourdomain.com/blog/${post.slug.current}`;


  return (
    <div className="bg-white px-6 py-12 lg:py-24 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-brand-primary">
          {post.author?.name || 'Unknown Author'} &bull; {format(new Date(post.publishedAt), 'PPP')}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-8">{post.excerpt}</p>
        <div className="mt-10 max-w-full"> {/* Changed to max-w-full for images */}
            {post.mainImage && (
                <img src={urlFor(post.mainImage).width(1200).url() || ''} alt={post.mainImage.alt || post.title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
            )}
            <div className="mt-8 prose lg:prose-xl">
                <PortableTextContent blocks={post.body} />
            </div>
        </div>
        <SocialShare url={currentUrl} title={post.title} /> {/* Social Share */}
        <CommentList comments={comments} /> {/* Comment List */}
        <CommentForm postId={post._id} onCommentSubmitted={fetchPostAndComments} /> {/* Comment Form */}
        <div className="mt-12">
            <Link to="/blog" className="text-brand-primary font-semibold hover:text-brand-secondary">&larr; Back to all posts</Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
--- END OF FILE src/pages/BlogPostPage.tsx ---