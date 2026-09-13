<script lang="ts" setup>
import Navbar from './components/Navbar.vue'
import Play from './Play.vue'
</script>

<template>
  <div class="min-h-dvh">
    <a
      class="skip-link"
      href="#main"
      >Skip to keyboard playground</a
    >
    <Navbar />
    <main
      id="main"
      tabindex="-1"
    >
      <Play />
    </main>
  </div>
</template>
