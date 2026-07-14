// app/api/posts/route.js
import { getAllPosts, createPost } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await getAllPosts();
  return NextResponse.json(posts);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newPost = await createPost(body);
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}