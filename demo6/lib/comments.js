// lib/comments.js
import fs from 'fs';
import path from 'path';

const commentsFilePath = path.join(process.cwd(), 'data', 'comments.json');

// ensure directory exists
const ensureFile = () => {
  const dir = path.dirname(commentsFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(commentsFilePath)) {
    fs.writeFileSync(commentsFilePath, JSON.stringify([]));
  }
};

const readComments = () => {
  ensureFile();
  const content = fs.readFileSync(commentsFilePath, 'utf8');
  return JSON.parse(content);
};

const writeComments = (comments) => {
  fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2));
};

// Get comments for a specific post (by postId)
export async function getCommentsByPostId(postId) {
  const comments = readComments();
  return comments
    .filter((comment) => comment.postId === postId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
}

// Add a new comment
export async function addComment({ postId, name, content }) {
  const comments = readComments();
  const newId = comments.length > 0 ? Math.max(...comments.map(c => c.id)) + 1 : 1;
  const newComment = {
    id: newId,
    postId,
    name: name.trim(),
    content: content.trim(),
    createdAt: new Date().toISOString(),
  };
  comments.push(newComment);
  writeComments(comments);
  return newComment;
}