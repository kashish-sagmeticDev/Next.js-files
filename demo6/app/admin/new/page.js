// app/admin/new/page.js
'use client';
import AdminGuard from '@/components/AdminGuard';
import PostForm from '@/components/PostForm';

export default function NewPostPage() {
  return (
    <AdminGuard>
      <div>
        <h1 className="text-3xl font-bold mb-6">Create New Post</h1>
        <PostForm />
      </div>
    </AdminGuard>
  );
}