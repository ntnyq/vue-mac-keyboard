<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
import Play from './Play.vue'
</script>

<template>
  <div class="flex flex-col">
    <Navbar />
    <main class="h-[calc(100vh-var(--h-navbar))]">
      <Play />
    </main>
  </div>
</template>
