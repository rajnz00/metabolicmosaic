
import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { createClient } from '@sanity/client';
export default async (req: Request) => {
  const { comment } = await req.json();
  const r = await fetch('https://example.com/api/comments', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ comment })
  });
  return new Response(await r.text(), { status: r.status });
};

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
