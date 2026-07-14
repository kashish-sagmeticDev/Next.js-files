// app/admin/edit/[id]/page.js
'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import AdminGuard from '@/components/AdminGuard';
import PostForm from '@/components/PostForm';
import toast from 'react-hot-toast';

export default function EditPostPage() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/posts/${id}`);
      if (res.ok) {
        const data = await res.json();
        setInitialData(data);
      } else {
        toast.error('Post not found');
      }
    } catch (error) {
      toast.error('Error loading post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!initialData) return <div>Post not found</div>;

  return (
    <AdminGuard>
      <div>
        <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
        <PostForm initialData={initialData} isEditing={true} />
      </div>
    </AdminGuard>
  );
}