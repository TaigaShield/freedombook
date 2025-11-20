<template>
  <div class="comment">
    <form @submit.prevent="onSubmit">
        <textarea
            v-model="_commentContent"
            rows="1"
            cols="50"
            placeholder="write a comment?"
        ></textarea>
        <br />
        <button type="submit">Comment</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { addComment } from '@/services/postService';
let _commentContent : Ref<string> = ref('');

const props = defineProps<{ postId: string }>();

async function onSubmit() {
    await addComment(props.postId, _commentContent.value);
    _commentContent.value = '';
}
</script>

<style scoped>
.comment {
  background: #f8f8f8;
  border-radius: 6px;
  padding: 0.5rem;
  margin-bottom: 0.4rem;
}
.comment b {
  color: #333;
}
</style>
