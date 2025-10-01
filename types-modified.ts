Okay, this is an excellent challenge! We're evolving a static React blog into a more dynamic and interactive system.

The "master prompt" needs to be comprehensive yet modular, guiding the AI through the necessary architectural changes, new components, and service integrations.

Here's the master prompt, followed by the AI's generated output (files and instructions).

Master Prompt for LLM/AI Agent

Project Goal: Evolve the existing static React blog into a dynamic, expandable system with content management, comments, and social sharing.

Current State:

A React application using react-router-dom.

Blog posts are currently loaded from ../data/posts.ts (a static array).

Styling uses Tailwind CSS.

Existing components: BlogPostPage.tsx, BlogListPage.tsx, BlogPostCard.tsx.

A BlogPost type likely defined in ../types.ts.

Desired Outcome:

Dynamic Content Management: Replace static posts.ts with a Headless CMS integration. We'll use Sanity.io for this as it's flexible, has a good free tier, and strong React integration.

Content should include: title, slug, author (reference to an author document), publishedDate, excerpt, mainImage (with alt text), body (rich text/portable text).

Author schema should include: name, slug, image, bio.

Comment Section:

Allow users to post comments on individual blog posts.

Comments should be stored in the Headless CMS (Sanity.io) and linked to specific blog posts.

Comments should include: authorName, authorEmail (optional, for gravatar/contact, but not displayed), commentText, createdAt, approved (boolean, for moderation).

The comment form should be client-side and submit to a Netlify Function which then interacts with Sanity.io.

Comments should only be visible if approved: true.

A CAPTCHA (e.g., hCaptcha) should be integrated into the comment form for spam prevention.

Social Media Sharing:

Integrate sharing buttons for Twitter, Facebook, LinkedIn, and a generic "copy link" option on the individual blog post page.

Use a lightweight React sharing library.

Backend & Deployment:

Leverage Netlify Functions for server-side logic (e.g., submitting comments securely).

Provide clear instructions for setting up Sanity.io, Netlify Functions, environment variables, and deploying the site to Netlify.

Specific Tasks for the AI Agent:

A. Sanity.io Integration:

Schema Definition: Provide JavaScript schemas for post and author (and comment later) for a Sanity Studio project.

Sanity Client: Create a src/sanity.ts file to initialize the Sanity client for fetching data.

Data Fetching Logic:

Update BlogListPage.tsx to fetch all approved blog posts from Sanity.

Update BlogPostPage.tsx to fetch a single blog post and its associated approved comments from Sanity.

posts.ts and types.ts Removal/Update: Remove posts.ts. Update types.ts to reflect the new Sanity data structure.

B. Comment Section Implementation:

Comment Schema: Add the comment schema to the Sanity definitions.

Comment Form Component: Create a src/components/CommentForm.tsx React component.

Fields: Author Name (required), Email (optional), Comment Text (required, textarea).

Integrate hCaptcha.

onSubmit: Call a Netlify Function for submission.

Show loading/success/error states.

Comment List Component: Create a src/components/CommentList.tsx React component.

Display a list of approved comments for a given blog post.

Show authorName, createdAt, commentText.

Netlify Function for Comments: Create netlify/functions/submit-comment.ts.

Accepts POST request with postId, authorName, authorEmail, commentText, hCaptchaToken.

Verify hCaptcha token.

If valid, submit the comment to Sanity (setting approved: false initially).

Return success/error.

Integration into BlogPostPage.tsx: Add the CommentList and CommentForm components to the BlogPostPage.

C. Social Media Sharing:

Sharing Component: Create a src/components/SocialShare.tsx React component.

Accepts url and title as props.

Include buttons/icons for Twitter, Facebook, LinkedIn, Copy Link.

Use react-share or similar library.

Integration into BlogPostPage.tsx: Add the SocialShare component below the blog post content.

D. Code Updates & Refinements:

Existing Components: Modify BlogPostListPage.tsx and BlogPostCard.tsx to display images and content from Sanity data.

Styling: Ensure new components are styled with Tailwind CSS to match the existing theme.

Environment Variables: Clearly list required environment variables (SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN, HCAPTCHA_SITE_KEY, HCAPTCHA_SECRET_KEY).

E. Instructions & Setup Guide:

Sanity Studio Setup: Step-by-step guide to initialize a Sanity project, apply the schemas, and get API tokens.

Netlify Deployment: Instructions for deploying the React app and Netlify Functions.

Local Development: How to run the project locally.

Implicit Requirements:

Use TypeScript.

Maintain existing Tailwind CSS styling conventions.

Provide complete file contents for all new and modified files.

Assume the user has basic knowledge of npm/yarn and Git.

AI-Generated Output: Files and Instructions

Okay, I've processed your master prompt. This is a significant set of changes, so I've broken it down into new files, modified existing files, and comprehensive setup instructions.

1. New and Modified Files

a) src/types.ts (Modified - will contain the BlogPost type from Sanity)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE src/types.ts ---
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanityAuthor {
  _id: string;
  name: string;
  slug: { current: string };
  image?: SanityImage;
  bio?: any; // Sanity Portable Text
}

export interface BlogPost {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: { current: string };
  author: SanityAuthor;
  publishedAt: string; // ISO string
  excerpt: string;
  mainImage?: SanityImage;
  body: any; // Sanity Portable Text
}

export interface Comment {
  _id: string;
  _createdAt: string;
  authorName: string;
  commentText: string;
  approved: boolean;
  post: {
    _ref: string;
    _type: 'reference';
  };
}
--- END OF FILE src/types.ts ---

b) src/sanity.ts (New - Sanity Client Configuration)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE src/sanity.ts ---
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from './types';

// Ensure these are set in your .env or Netlify environment variables
export const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
export const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET;
export const SANITY_API_VERSION = '2023-05-03'; // Use current date for API version

if (!SANITY_PROJECT_ID || !SANITY_DATASET) {
  console.error('SANITY_PROJECT_ID and SANITY_DATASET must be set in your environment variables.');
}

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true, // `false` if you want to ensure fresh data for authenticated requests, `true` for public content
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
--- END OF FILE src/sanity.ts ---

c) src/data/posts.ts (To be removed - replaced by Sanity data fetching)
Action: Delete this file after setting up Sanity.

d) src/components/PortableTextContent.tsx (New - to render Sanity's Portable Text)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE src/components/PortableTextContent.tsx ---
import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '../sanity';
import type { SanityImage } from '../types';

interface PortableTextContentProps {
  blocks: any[]; // Sanity Portable Text blocks
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: SanityImage & { alt?: string } }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <img
          className="my-8 w-full h-auto object-cover rounded-lg shadow-lg"
          alt={value.alt || 'Blog post image'}
          loading="lazy"
          src={urlFor(value).width(800).url() || ''}
        />
      );
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-4xl font-bold my-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-3xl font-bold my-3">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold my-2">{children}</h3>,
    normal: ({ children }) => <p className="mb-4">{children}</p>,
    blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-5 my-4">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-5 my-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-2">{children}</li>,
    number: ({ children }) => <li className="mb-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} className="text-brand-primary hover:underline">
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

const PortableTextContent: React.FC<PortableTextContentProps> = ({ blocks }) => {
  if (!blocks) return null;
  return <PortableText value={blocks} components={components} />;
};

export default PortableTextContent;
--- END OF FILE src/components/PortableTextContent.tsx ---

e) src/components/CommentList.tsx (New - Displays comments)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE src/components/CommentList.tsx ---
import React from 'react';
import { format } from 'date-fns';
import type { Comment } from '../types';

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-gray-600">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">Comments ({comments.length})</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="border-b border-gray-200 pb-6 mb-6 last:border-b-0 last:pb-0 last:mb-0">
          <p className="font-semibold text-gray-900">{comment.authorName}</p>
          <p className="text-sm text-gray-500 mt-1">
            {format(new Date(comment._createdAt), 'PPpp')}
          </p>
          <p className="mt-3 text-gray-700">{comment.commentText}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
--- END OF FILE src/components/CommentList.tsx ---

f) src/components/CommentForm.tsx (New - Form for submitting comments)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE src/components/CommentForm.tsx ---
import React, { useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';

interface CommentFormProps {
  postId: string;
  onCommentSubmitted: () => void; // Callback to refresh comments
}

const CommentForm: React.FC<CommentFormProps> = ({ postId, onCommentSubmitted }) => {
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hCaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY || process.env.HCAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    if (!HCAPTCHA_SITE_KEY) {
      setMessage({ type: 'error', text: 'HCAPTCHA_SITE_KEY is not configured.' });
      setLoading(false);
      return;
    }
    
    if (!hCaptchaToken) {
      setMessage({ type: 'error', text: 'Please complete the CAPTCHA.' });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/.netlify/functions/submit-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          authorName,
          authorEmail,
          commentText,
          hCaptchaToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Comment submitted for moderation!' });
        setAuthorName('');
        setAuthorEmail('');
        setCommentText('');
        setHcaptchaToken(null);
        // Reset hCaptcha if possible, or trigger a re-render
        onCommentSubmitted(); // This should trigger a re-fetch of comments
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to submit comment.' });
      }
    } catch (error) {
      console.error('Comment submission error:', error);
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 p-8 bg-gray-50 rounded-lg shadow-inner">
      <h3 className="text-xl font-bold tracking-tight text-gray-900 mb-6">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="authorName" className="block text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="authorName"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="authorEmail" className="block text-sm font-medium text-gray-700">
            Email (Optional, for Gravatar or contact)
          </label>
          <input
            type="email"
            id="authorEmail"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
            value={authorEmail}
            onChange={(e) => setAuthorEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="commentText" className="block text-sm font-medium text-gray-700">
            Comment <span className="text-red-500">*</span>
          </label>
          <textarea
            id="commentText"
            rows={5}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
        </div>
        <div className="h-captcha-container">
          {HCAPTCHA_SITE_KEY ? (
            <HCaptcha
              sitekey={HCAPTCHA_SITE_KEY}
              onVerify={(token) => setHcaptchaToken(token)}
              onExpire={() => setHcaptchaToken(null)}
            />
          ) : (
            <p className="text-red-500 text-sm">hCaptcha site key not configured. Comment submission may fail.</p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand-primary hover:bg-brand-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !hCaptchaToken}
          >
            {loading ? 'Submitting...' : 'Submit Comment'}
          </button>
        </div>
        {message && (
          <div className={`mt-4 text-sm ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {message.text}
          </div>
        )}
      </form>
    </div>
  );
};

export default CommentForm;
--- END OF FILE src/components/CommentForm.tsx ---

g) src/components/SocialShare.tsx (New - Social Sharing Buttons)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE src/components/SocialShare.tsx ---
import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'; // Assuming you have Heroicons installed

interface SocialShareProps {
  url: string;
  title: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ url, title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap items-center gap-4">
      <span className="text-gray-700 font-medium mr-2">Share this post:</span>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <LinkedinShareButton url={url} title={title}>
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
      <button
        onClick={handleCopyLink}
        className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200"
        title="Copy Link"
      >
        <ClipboardDocumentListIcon className="h-5 w-5 text-gray-700" />
      </button>
      {copied && <span className="text-sm text-green-600">Link copied!</span>}
    </div>
  );
};

export default SocialShare;
--- END OF FILE src/components/SocialShare.tsx ---

h) src/components/BlogPostCard.tsx (Modified - to use Sanity images)

code
TypeScript
download
content_copy
expand_less
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

i) src/pages/BlogListPage.tsx (Modified - to fetch posts from Sanity)

code
TypeScript
download
content_copy
expand_less
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

j) src/pages/BlogPostPage.tsx (Modified - to fetch post and comments from Sanity, and integrate new components)

code
TypeScript
download
content_copy
expand_less
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

k) netlify/functions/submit-comment.ts (New - Netlify Function for comment submission)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE netlify/functions/submit-comment.ts ---
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { create