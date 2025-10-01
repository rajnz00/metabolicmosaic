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