import type { Post } from '@/types/post'
import { getAuthorizationHeaders, GetCurrentUser } from './authService';
import { ref, type Ref } from 'vue';

export const loadedPosts : Ref<Post[]> = ref([]);

export async function loadPosts(): Promise<void>
{
  loadedPosts.value = (await getPosts())
    .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}



export async function getPosts(): Promise<Post[]> 
{
  const response = await fetch('http://localhost:8000/api/posts', {
      method: 'GET',
      headers: getAuthorizationHeaders()
    });

  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.status}`)
  }

  const data = await response.json()
  return data as Post[]
}

export async function getPost(postId : string) : Promise<Post>
{
  const response = await fetch(`http://localhost:8000/api/post/${postId}`, {
      method: 'GET',
      headers: getAuthorizationHeaders()
    });

  if (!response.ok) {
    throw new Error(`Failed to fetch post:${postId}. ${response.status}`)
  }

  const data = await response.json()
  return data as Post;
}

export async function createPost(content: string) : Promise<void> 
{
  const response = await fetch('http://localhost:8000/api/posts', {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    body: JSON.stringify({ 'content': content })
  });

  if (!response.ok) {
    throw new Error(`Failed to post ${response.status}`)
  }

  await loadPosts();
}

export async function addComment(postId: string, comment: string) : Promise<void> 
{
  const response = await fetch(`http://localhost:8000/api/post/${postId}/comments`, {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    body: JSON.stringify({ 'comment': comment })
  });

  if (!response.ok) {
    throw new Error(`Failed to post ${response.status}`)
  }

  await loadPosts();
}

export async function toggleLike(postId: string) : Promise<void> 
{
  const post = await getPost(postId);
  const react = post.likes.includes(GetCurrentUser()) ? "dislike" : "like";

  const response = await fetch(`http://localhost:8000/api/post/${postId}/reacts`, {
    method: 'POST',
    headers: getAuthorizationHeaders(),
    body: JSON.stringify({ 'react': react })
  });

  if (!response.ok) {
    throw new Error(`Failed to post ${response.status}`)
  }

  await loadPosts();
}