<template>
  <div class="post">
    <form @submit.prevent="onSubmit">
        <textarea
            v-model="_postContent"
            rows="6"
            cols="50"
            placeholder="what's on your mind?"
        ></textarea>
        <br />
        <button type="submit">Post</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { createPost } from '@/services/postService';
let _postContent : Ref<string> = ref('');

async function onSubmit() {
    await createPost(_postContent.value);
    _postContent.value = '';
}
</script>

<style scoped>
  .post {
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 1rem;
    margin-bottom: 1rem;
  }
  .meta {
    color: #666;
    font-size: 0.9rem;
  }
</style>
