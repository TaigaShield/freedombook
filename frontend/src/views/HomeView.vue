<template>
  <div>
    <h1>🏠 Home</h1>
    <!-- <img src="http://localhost:8000/uploads/mikewazowski.jpg"/> -->
  </div>
    <div>
        <PostSubmission/>
        <div v-if="loading">Loading posts...</div>
        <div v-else-if="error">{{ error }}</div>
        <div v-else>
            <Post
                v-for="post in loadedPosts"
                :key="post.postId"
                v-bind="post"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import PostSubmission from '@/components/PostSubmission.vue';
import { ref, onMounted } from 'vue';
import Post from '../components/Post.vue'
import { loadedPosts, loadPosts } from '../services/postService'

const loading = ref(true)
const error = ref<string | null>(null)

async function refresh () 
{
  try {
    await loadPosts();
  } catch (err: any) {
    error.value = err.message || 'Failed to load tweets'
  } finally {
    loading.value = false
  }
}

onMounted(refresh);
</script>
