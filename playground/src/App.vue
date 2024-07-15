<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
import Demo from './Demo.vue'
</script>

<template>
  <div class="flex flex-col">
    <Navbar />
    <main class="h-[calc(100vh-var(--h-navbar))]">
      <Demo />
    </main>
  </div>
</template>
