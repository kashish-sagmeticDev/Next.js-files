// lib/posts.js
import fs from 'fs';
import path from 'path';
import { slugify } from '@/utils/slugify';
import { formatDate } from '@/utils/formatDate';

const dataFilePath = path.join(process.cwd(), 'data', 'posts.json');

// ensure directory exists
const ensureDataDir = () => {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
};

const readPosts = () => {
  ensureDataDir();
  const fileContent = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileContent);
};

const writePosts = (posts) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
};

export async function getAllPosts() {
  const posts = readPosts();
  // sort by id descending (newest first)
  return posts.sort((a, b) => b.id - a.id);
}

export async function getPostBySlug(slug) {
  const posts = readPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export async function getPostById(id) {
  const posts = readPosts();
  return posts.find((post) => post.id === id) || null;
}

export async function createPost(postData) {
  const posts = readPosts();
  const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
  const now = new Date().toISOString();
  const newPost = {
    id: newId,
    slug: slugify(postData.title),
    title: postData.title,
    content: postData.content,
    excerpt: postData.excerpt || postData.content.substring(0, 150),
    coverImage: postData.coverImage || '',
    date: formatDate(now),
    createdAt: now,
  };
  posts.push(newPost);
  writePosts(posts);
  return newPost;
}

export async function updatePost(id, postData) {
  const posts = readPosts();
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Post not found');
  
  const updatedPost = {
    ...posts[index],
    title: postData.title,
    slug: slugify(postData.title),
    content: postData.content,
    excerpt: postData.excerpt || postData.content.substring(0, 150),
    coverImage: postData.coverImage || '',
    updatedAt: new Date().toISOString(),
  };
  posts[index] = updatedPost;
  writePosts(posts);
  return updatedPost;
}

export async function deletePost(id) {
  const posts = readPosts();
  const filtered = posts.filter(p => p.id !== id);
  writePosts(filtered);
}