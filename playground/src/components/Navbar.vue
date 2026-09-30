<script lang="ts" setup>
import { repository, version } from '../../../package.json'
import { isDark, toggleDark } from '../composables/useDark'
</script>

<template>
  <header class="border-b border-base">
    <nav
      class="mx-auto h-16 max-w-1160px flex items-center justify-between gap-3 px-5 sm:px-8"
      aria-label="Main navigation"
    >
      <a
        :href="repository.url"
        class="flex min-w-0 items-center gap-3 rounded-md"
        aria-label="Vue Mac Keyboard on GitHub"
      >
        <span
          class="brand-mark"
          aria-hidden="true"
          >⌘</span
        >
        <span
          class="text-15px font-650 tracking--0.3px"
          translate="no"
          >Vue Mac Keyboard</span
        >
        <span class="version-label hidden sm:inline-flex">v{{ version }}</span>
      </a>
      <div class="flex items-center gap-2">
        <button
          @click="toggleDark"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          class="btn-icon"
          type="button"
        >
          <span
            :class="isDark ? 'i-ri:sun-line' : 'i-ri:moon-line'"
            aria-hidden="true"
          />
        </button>
        <a
          :href="`https://github.com/${repository}`"
          class="btn-icon"
          aria-label="View source on GitHub"
          title="View source on GitHub"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            class="i-ri:github-fill"
            aria-hidden="true"
          />
        </a>
      </div>
    </nav>
  </header>
</template>
