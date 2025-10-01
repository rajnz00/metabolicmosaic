
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@sanity/client';
import fetch from 'node-fetch'; // Netlify Functions use Node.js, so node-fetch is available.

const { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN, HCAPTCHA_SECRET_KEY } = process.env;

if (!SANITY_PROJECT_ID || !SANITY_DATASET || !SANITY_API_TOKEN || !HCAPTCHA_SECRET_KEY) {
  console.error('Missing Sanity or hCaptcha environment variables.');
}

const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: '2023-05-03', // Use current date for API version
  token: SANITY_API_TOKEN,
  useCdn: false, // Must be false for authenticated writes
});

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { postId, authorName, authorEmail, commentText, hCaptchaToken } = JSON.parse(event.body || '{}');

    // 1. Validate hCaptcha
    const hCaptchaVerificationUrl = 'https://hcaptcha.com/siteverify';
    const hCaptchaResponse = await fetch(hCaptchaVerificationUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${HCAPTCHA_SECRET_KEY}&response=${hCaptchaToken}`,
    });
    const hCaptchaData = await hCaptchaResponse.json();

    if (!hCaptchaData.success) {
      console.warn('hCaptcha verification failed:', hCaptchaData['error-codes']);
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'hCaptcha verification failed. Please try again.' }),
      };
    }

    // 2. Basic input validation
    if (!postId || !authorName || !commentText) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: postId, authorName, commentText' }),
      };
    }

    // 3. Create comment document in Sanity
    const newComment = {
      _type: 'comment',
      post: {
        _ref: postId,
        _type: 'reference',
      },
      authorName,
      authorEmail: authorEmail || undefined, // Only store if provided
      commentText,
      approved: false, // All comments require moderation
      _createdAt: new Date().toISOString(),
    };

    const result = await sanityClient.create(newComment);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Comment submitted successfully for moderation!',
        commentId: result._id,
      }),
    };
  } catch (error) {
    console.error('Error submitting comment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error.' }),
    };
  }
};

export { handler };
--- END OF FILE netlify/functions/submit-comment.ts ---
2. Sanity.io Schema Definitions (for your Sanity Studio project)

These files should be placed in your Sanity Studio project's schemas directory (e.g., my-sanity-studio/schemas/). You'll likely have an index.ts or schema.ts file that imports and exports these.

a) schemas/author.ts

code
TypeScript
download
content_copy
expand_less
--- START OF FILE schemas/author.ts ---
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        }),
      ],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: {
            decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
            annotations: [],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
});
--- END OF FILE schemas/author.ts ---

b) schemas/post.ts

code
TypeScript
download
content_copy
expand_less
--- START OF FILE schemas/post.ts ---
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short summary for blog listings.',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }, { title: 'Numbered', value: 'number' }],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                    validation: (Rule) => Rule.required(),
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
});
--- END OF FILE schemas/post.ts ---

c) schemas/comment.ts

code
TypeScript
download
content_copy
expand_less
--- START OF FILE schemas/comment.ts ---
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'authorEmail',
      title: 'Author Email',
      type: 'string', // Stored for Gravatar or contact, not publicly displayed
    }),
    defineField({
      name: 'commentText',
      title: 'Comment',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'post',
      title: 'Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Comments must be approved before they are visible on the site.',
      initialValue: false, // Default to not approved
    }),
    defineField({
      name: '_createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true, // Auto-set by function
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'commentText',
      postTitle: 'post.title',
      approved: 'approved',
    },
    prepare({ title, subtitle, postTitle, approved }) {
      return {
        title: `${title} on ${postTitle || 'N/A'}`,
        subtitle: subtitle,
        media: approved ? undefined : (
          <span style={{ fontSize: '1.5em' }} role="img" aria-label="Not Approved">🚫</span>
        ), // Visual indicator for unapproved
      };
    },
  },
});
--- END OF FILE schemas/comment.ts ---

d) schemas/category.ts (Optional, but good for organization)

code
TypeScript
download
content_copy
expand_less
--- START OF FILE schemas/category.ts ---
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
});
--- END OF FILE schemas/category.ts ---

e) Update sanity-studio/schemas/index.ts (or schema.ts)
You need to import and export these new schemas in your Sanity Studio's main schema file. It will look something like this:

code
TypeScript
download
content_copy
expand_less
--- START OF FILE sanity-studio/schemas/index.ts (example) ---
import { schemaTypes } from 'sanity'; // or wherever your existing types are

import author from './author';
import category from './category';
import post from './post';
import comment from './comment'; // <-- Add this

export const schema = {
  types: schemaTypes.concat([
    // Existing schemas
    author,
    category,
    post,
    comment, // <-- Add this
  ]),
};
--- END OF FILE sanity-studio/schemas/index.ts (example) ---
3. Client-Side Dependencies (Update package.json)

You'll need to install these new libraries.

code
JSON
download
content_copy
expand_less
--- START OF FILE package.json (relevant additions) ---
{
  "dependencies": {
    "@portabletext/react": "^3.0.11",
    "@sanity/client": "^6.14.3",
    "@sanity/image-url": "^1.0.2",
    "@hcaptcha/react-hcaptcha": "^1.10.1",
    "react-share": "^5.1.0",
    "date-fns": "^3.6.0",
    "@heroicons/react": "^2.1.3"  // If you don't have this for ClipboardDocumentListIcon
  }
}

