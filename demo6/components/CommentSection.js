// components/CommentSection.jsx
'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data);
    } catch (error) {
      toast.error('Failed to load comments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) {
      toast.error('Please enter both name and comment');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, name, content }),
      });
      if (res.ok) {
        toast.success('Comment added!');
        setName('');
        setContent('');
        fetchComments(); // refresh list
      } else {
        toast.error('Failed to add comment');
      }
    } catch (error) {
      toast.error('Error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-gray-500">Loading comments...</div>;

  return (
    <div className="mt-12 border-t pt-8">
      <h3 className="text-2xl font-semibold mb-4">Comments ({comments.length})</h3>
      
      {/* Comment list */}
      <div className="space-y-4 mb-8">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-50 rounded p-4">
            <div className="flex justify-between items-start mb-1">
              <span className="font-semibold">{comment.name}</span>
              <span className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="bg-white border rounded p-4 space-y-3">
        <div>
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Comment</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your comment here..."
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  );
}