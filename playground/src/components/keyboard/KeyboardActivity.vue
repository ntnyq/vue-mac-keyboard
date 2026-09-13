<script lang="ts" setup>
import { computed } from 'vue'
import type { KeyboardKey, KeyStroke } from '../../utils/keyboard'

interface Props {
  /** Keys currently held, including simultaneous modifiers. */
  activeKeys: readonly KeyboardKey[]
  /** Whether new presses are recorded. */
  isListening: boolean
  /** Whether the page can receive physical keyboard events. */
  isWindowFocused: boolean
  /** Keep the last press visible after release. */
  lastStroke: KeyStroke | null
}

const props = defineProps<Props>()

const status = computed(() => {
  if (!props.isListening) {
    return 'Paused'
  }
  if (!props.isWindowFocused) {
    return 'Click here to start'
  }
  return props.activeKeys.length ? 'Receiving input' : 'Listening for keys'
})
const displayedKeys = computed(() =>
  props.activeKeys.length
    ? props.activeKeys.map(key => key.label)
    : props.lastStroke
      ? [props.lastStroke.chord]
      : [],
)
</script>

<template>
  <div class="activity-strip">
    <div class="min-w-0">
      <div
        class="mb-3 flex items-center gap-2 text-12px text-muted"
        role="status"
      >
        <span
          :class="{ 'is-live': isListening && isWindowFocused }"
          class="status-dot"
          aria-hidden="true"
        />
        {{ status }}
      </div>
      <div
        class="flex min-h-11 flex-wrap items-center gap-2"
        aria-label="Current keys"
        role="group"
        aria-live="off"
      >
        <template v-if="displayedKeys.length">
          <kbd
            v-for="(label, index) in displayedKeys"
            :key="index"
            :class="{ 'is-held': activeKeys.length > 0 }"
            class="live-key"
            >{{ label }}</kbd
          >
          <span class="ml-1 text-12px text-muted">{{
            activeKeys.length ? 'pressed' : 'last pressed'
          }}</span>
        </template>
        <span
          v-else
          class="text-23px font-500 tracking--0.5px"
          >Press any key</span
        >
      </div>
    </div>
    <dl class="event-details">
      <div>
        <dt>Key</dt>
        <dd>
          {{ lastStroke?.key === ' ' ? 'Space' : lastStroke?.key || '—' }}
        </dd>
      </div>
      <div>
        <dt>Code</dt>
        <dd>
          {{
            lastStroke?.source === 'On-screen'
              ? 'On-screen'
              : lastStroke?.code || '—'
          }}
        </dd>
      </div>
      <div>
        <dt>Keycode</dt>
        <dd>{{ lastStroke?.keycode ?? '—' }}</dd>
      </div>
    </dl>
  </div>
</template>
