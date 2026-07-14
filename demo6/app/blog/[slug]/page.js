// app/blog/[slug]/page.js
import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CommentSection from '@/components/CommentSection'; 

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function SinglePostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <article className="max-w-3xl mx-auto">
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to Blog
      </Link>
      <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
      <div className="text-gray-500 mb-6">{post.date}</div>
      {post.coverImage && (
        <img src={post.coverImage} alt={post.title} className="w-full h-64 object-cover rounded mb-6" />
      )}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
      
      {/* Add the comment section here */}
      <CommentSection postId={post.id} />
    </article>
  );
}