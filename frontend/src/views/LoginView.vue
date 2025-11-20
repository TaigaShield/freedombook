<template>
  <div>
    <h1>ℹ️ Login </h1>
    <form @submit.prevent="onLoginClick">
        <p>Username: <input type="text" required v-model="_usernameInput"></p>
        <p>Password: <input type="password" v-model="_passwordInput"></p>
        <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { authorize } from '@/services/authService'
import { useRouter } from 'vue-router'

const router = useRouter()
let _usernameInput = ''
let _passwordInput = ''

async function onLoginClick() {
    await authorize(_usernameInput, _passwordInput);
    router.push('/')
}
</script>
