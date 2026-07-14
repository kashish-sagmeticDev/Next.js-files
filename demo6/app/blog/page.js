// app/blog/page.js
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export default async function BlogPage() {
  const posts = await getAllPosts();
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">All Blog Posts</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No posts yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}