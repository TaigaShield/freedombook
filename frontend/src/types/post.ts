import type { Comment } from './comment';

export interface Post {
  postId: string;
  author: string;
  content: string;
  likes: string[];
  comments: Comment[];
  createdAt: Date | string;
}