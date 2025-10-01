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

  const HCAPTCHA_SITE_KEY = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

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
