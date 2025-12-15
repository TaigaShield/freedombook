<template>
  
  <span>freedomWall</span>
  <span v-if="loggedIn">
    <nav style="display: flex; gap: 1rem;">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
      <a href="/">Logout</a> 
    </nav>
    <hr />
    <RouterView />
  </span>
  <span v-else>
    <LoginView />
  </span>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { loggedIn } from './services/authService';
import LoginView from './views/LoginView.vue';

// NOTE: holy, the logout href just works lmao
// because it goes to / and since the username and password are stored in memory it just resets
</script>
