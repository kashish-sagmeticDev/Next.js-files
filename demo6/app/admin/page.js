// app/admin/page.js
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminGuard from '@/components/AdminGuard';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
        if (res.ok) {
          toast.success('Post deleted');
          fetchPosts(); // refresh list
        } else {
          toast.error('Failed to delete');
        }
      } catch (error) {
        toast.error('Error');
      }
    }
  };

  return (
    <AdminGuard>
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Link href="/admin/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            New Post
          </Link>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Create one!</p>
        ) : (
          <div className="bg-white shadow rounded overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td className="px-6 py-4">{post.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{post.date}</td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link href={`/admin/edit/${post.id}`} className="text-blue-600 hover:underline">Edit</Link>
                      <button onClick={() => handleDelete(post.id)} className="text-red-600 hover:underline ml-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminGuard>
  );
}