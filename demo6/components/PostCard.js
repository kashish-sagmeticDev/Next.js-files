// components/PostCard.jsx
import Link from 'next/link';

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-48 object-cover" />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{post.date}</p>
        <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
}