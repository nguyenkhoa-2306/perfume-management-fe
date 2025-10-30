import React from "react";
import type { Comment as TComment } from "../../types";

interface Props {
  comment: TComment;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const author = (comment.author as any) || { name: "Anonymous" };

  return (
    <div className="bg-white rounded-md shadow-sm p-3">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-gray-800">
              {author.name || author}
            </div>
            <div className="text-sm text-yellow-500">
              {"★".repeat(comment.rating || 0)}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">{comment.content}</p>
          {comment.createdAt && (
            <div className="text-xs text-gray-400 mt-2">
              {new Date(comment.createdAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;
