// app/api/posts/[id]/route.js
import { getPostById, updatePost, deletePost } from '@/lib/posts';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  const post = await getPostById(parseInt(id));
  if (!post) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updatePost(parseInt(id), body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await deletePost(parseInt(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}