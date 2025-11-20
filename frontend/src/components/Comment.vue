<template>
  <div class="comment">
    <p><b>{{ commentor }}</b> {{ content }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/types/comment'
defineProps<Comment>()
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


