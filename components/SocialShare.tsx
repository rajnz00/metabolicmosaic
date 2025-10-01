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