<template>
  <div class="post">
    <p> <b>{{ author }}</b> @ {{ createdAt }}</p>
    <p>{{ content }}</p>
  
    <div class="meta">

      <button @click="onLikeClick" class="like-btn">
        <span v-if="!userLikedThisPost">Like</span>
        <span v-else>Dislike</span>
        {{ likeCount }}
      </button>
      <span>
        {{ [...likes].splice(0, 2).join(', ') }} 
        <span v-if="likes.length > 2">
            and {{ likes.length - 2}} others like this post
        </span>

        <span v-if="likes.length > 0"> likes this post </span>
      </span>
      <!-- 💬 {{ commentCount }} -->
    </div>
    <CommentSubmission :postId="postId"/>
    <div v-if="comments.length" class="comment-section">
      
      <Comment
        v-for="comment in comments"
        :key="comment._id"
        v-bind="comment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed} from 'vue';
  import Comment from './Comment.vue';
  import type {Post as PostType} from '@/types/post';
  import CommentSubmission from './CommentSubmission.vue';
  import { toggleLike } from '@/services/postService';
import { GetCurrentUser } from '@/services/authService';

  const props = defineProps<PostType>();

  const likeCount = computed(() => { 
    console.log(`compute ${props.postId} likes:${props.likes} ${props.likes.length}`);
    return props.likes.length;
  });
  const commentCount = computed(() => props.comments.length);

  const userLikedThisPost = computed(() => props.likes.includes(GetCurrentUser()));
  // Function that triggers when button clicked
  async function onLikeClick() {
    await toggleLike(props.postId);
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
