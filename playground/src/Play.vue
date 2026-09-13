<script lang="ts" setup>
import KeyboardActivity from './components/keyboard/KeyboardActivity.vue'
import KeyboardHistory from './components/keyboard/KeyboardHistory.vue'
import KeyboardStage from './components/keyboard/KeyboardStage.vue'
import TypingArea from './components/keyboard/TypingArea.vue'
import { useKeyboardInput } from './composables/useKeyboardInput'

const {
  activeKeys,
  history,
  isListening,
  isWindowFocused,
  keycodes,
  lastStroke,
  canUndoClear,
  clearHistory,
  undoClear,
  pressVirtualKey,
  releaseVirtualKeys,
  toggleListening,
} = useKeyboardInput()
</script>

<template>
  <div
    class="playground mx-auto w-full max-w-1160px px-5 pb-6 pt-6 sm:px-8 sm:pt-8"
  >
    <div class="mb-5 flex flex-wrap items-end justify-between gap-5">
      <div>
        <h1 class="text-32px font-650 tracking--1px sm:text-36px">
          Keyboard playground
        </h1>
        <p class="mt-2 text-muted">Start typing. See every key come to life.</p>
      </div>
      <button
        @click="toggleListening"
        :aria-pressed="!isListening"
        class="button-secondary"
        type="button"
      >
        <span
          :class="isListening ? 'i-ri:pause-line' : 'i-ri:play-line'"
          aria-hidden="true"
        />
        {{ isListening ? 'Pause listening' : 'Resume listening' }}
      </button>
    </div>

    <section
      class="keyboard-workspace"
      aria-label="Live keyboard"
    >
      <KeyboardActivity
        :active-keys
        :is-listening
        :is-window-focused
        :last-stroke
      />
      <KeyboardStage
        @press="pressVirtualKey"
        @release="releaseVirtualKeys"
        :keycodes
        :active-codes="activeKeys.map(key => key.code)"
        :is-listening
      />
      <div
        class="flex flex-wrap items-center justify-between gap-2 px-5 pb-5 text-12px text-muted sm:px-7"
      >
        <span class="flex items-center gap-2"
          ><span
            class="i-ri:keyboard-line"
            aria-hidden="true"
          />Use your keyboard or click a key</span
        >
        <span>Mac layout · Browser shortcuts stay active</span>
      </div>
    </section>

    <div class="mt-4 grid gap-4 md:grid-cols-2">
      <TypingArea />
      <KeyboardHistory
        @clear="clearHistory"
        @undo="undoClear"
        :history
        :can-undo-clear
      />
    </div>

    <footer
      class="mt-4 flex flex-wrap justify-between gap-2 text-12px text-muted"
    >
      <span>Made for the feel of a Mac keyboard.</span>
      <span>Input stays in this tab. Nothing is sent or saved.</span>
    </footer>
  </div>
</template>
