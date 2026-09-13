<script lang="ts" setup>
import type { KeyStroke } from '../../utils/keyboard'

defineProps<{
  history: readonly KeyStroke[]
  canUndoClear: boolean
}>()
const emit = defineEmits<{
  clear: []
  undo: []
}>()
</script>

<template>
  <section
    class="panel flex min-w-0 flex-col"
    aria-labelledby="history-title"
  >
    <div class="flex min-h-10 items-center justify-between gap-3">
      <h2
        id="history-title"
        class="text-15px font-600"
      >
        Recent keystrokes
      </h2>
      <button
        @click="emit('undo')"
        v-if="canUndoClear"
        class="button-text"
        type="button"
      >
        Undo clear
      </button>
      <button
        @click="emit('clear')"
        v-else
        :disabled="!history.length"
        class="button-text"
        type="button"
      >
        Clear history
      </button>
    </div>
    <ol
      v-if="history.length"
      class="mt-4 flex flex-wrap content-start gap-2"
      aria-label="Newest keystrokes first"
    >
      <li
        v-for="stroke in history"
        :key="stroke.id"
        :title="`${stroke.code} · ${stroke.source}`"
        class="history-key"
      >
        {{ stroke.chord }}
      </li>
    </ol>
    <p
      v-else
      class="flex min-h-24 flex-1 items-center justify-center gap-2 text-14px text-muted"
    >
      <span
        class="i-ri:history-line text-18px"
        aria-hidden="true"
      />Your next keystroke starts here.
    </p>
    <p class="mt-auto pt-5 text-12px text-muted">
      Last 12 presses, newest first. Held keys count once.
    </p>
  </section>
</template>
