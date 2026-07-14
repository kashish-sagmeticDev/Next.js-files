// app/api/comments/route.js
import { getCommentsByPostId, addComment } from '@/lib/comments';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postId = parseInt(searchParams.get('postId'));
  if (!postId) {
    return NextResponse.json({ error: 'postId is required' }, { status: 400 });
  }
  const comments = await getCommentsByPostId(postId);
  return NextResponse.json(comments);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { postId, name, content } = body;
    if (!postId || !name || !content) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }
    const newComment = await addComment({ postId, name, content });
    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}