<script lang="ts" setup>
import { keycodeDataList, MacKeyboard } from 'vue-mac-keyboard'
import { fromVirtualKey } from '../../utils/keyboard'
import 'vue-mac-keyboard/style'
import type { ObjectDirective } from 'vue'
import type { KeycodeData } from 'vue-mac-keyboard'

interface Props {
  /** Legacy keycodes passed to the published component. */
  keycodes: number[]
  /** Physical codes distinguish left and right modifier positions. */
  activeCodes: string[]
  /** Whether on-screen presses are enabled. */
  isListening: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  press: [key: KeycodeData]
  release: []
}>()

const modifierPositions: Record<number, string> = {
  55: 'ShiftLeft',
  66: 'ShiftRight',
  69: 'AltLeft',
  70: 'MetaLeft',
  72: 'MetaRight',
  73: 'AltRight',
}

function isKeyPressed(element: HTMLElement) {
  const keycode = Number(element.dataset.key)
  if (!props.keycodes.includes(keycode)) {
    return false
  }
  const position = modifierPositions[Number(element.dataset.index)]
  if (!position) {
    return true
  }
  const family = position.replace(/(?:Left|Right)$/, '')
  const hasPhysicalPosition = props.activeCodes.some(
    code => code === `${family}Left` || code === `${family}Right`,
  )
  const hasVirtualPress = props.activeCodes.some(code =>
    code.startsWith(`virtual:${keycode}:`),
  )
  return (
    !hasPhysicalPosition
    || hasVirtualPress
    || props.activeCodes.includes(position)
  )
}

// Adapt the published component's list items without changing its public API.
const vKeyboardControls: ObjectDirective<HTMLElement> = {
  mounted(element) {
    element.querySelector('ul')?.setAttribute('role', 'group')
    element.querySelectorAll('li').forEach((key, index) => {
      const data = keycodeDataList[index]
      key.setAttribute('role', 'button')
      key.setAttribute('aria-label', fromVirtualKey(data).label)
      key.dataset.index = String(index)
      key.tabIndex = index === 0 ? 0 : -1
      if (data.keycode < 0) {
        key.setAttribute('aria-disabled', 'true')
        key.title = 'This hardware key is not reported by the browser'
      }
    })
  },
  updated(element) {
    element.querySelectorAll('li').forEach(key => {
      const isPressed = isKeyPressed(key)
      key.classList.toggle('is-pressed', isPressed)
      key.setAttribute('aria-pressed', String(isPressed))
      key.setAttribute(
        'aria-disabled',
        String(!props.isListening || Number(key.dataset.key) < 0),
      )
    })
  },
}

function getKey(event: Event) {
  return event.target instanceof Element
    ? event.target.closest<HTMLElement>('li[data-key]')
    : null
}

function pressKey(event: Event) {
  if (!props.isListening) {
    return
  }
  const element = getKey(event)
  if (!element) {
    return
  }
  const key = keycodeDataList[Number(element.dataset.index)]
  if (key && key.keycode >= 0) {
    emit('press', key)
  }
}

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0) {
    return
  }
  getKey(event)?.focus({ preventScroll: true })
  pressKey(event)
}

function onKeyDown(event: KeyboardEvent) {
  const element = getKey(event)
  if (!element) {
    return
  }
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    event.stopPropagation()
    if (!event.repeat) {
      pressKey(event)
    }
    return
  }
  const directions: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -14,
    ArrowDown: 14,
  }
  const direction = directions[event.key]
  if (!direction) {
    return
  }
  event.preventDefault()
  const keys = [
    ...(element.parentElement?.querySelectorAll<HTMLElement>('li[data-key]')
      || []),
  ]
  const next =
    keys[(keys.indexOf(element) + direction + keys.length) % keys.length]
  next.focus()
}

function onKeyUp(event: KeyboardEvent) {
  if (!getKey(event) || (event.key !== 'Enter' && event.key !== ' ')) {
    return
  }
  event.preventDefault()
  event.stopPropagation()
  emit('release')
}

function onFocusIn(event: FocusEvent) {
  const element = getKey(event)
  if (!element) {
    return
  }
  element.parentElement
    ?.querySelectorAll<HTMLElement>('li[data-key]')
    .forEach(key => {
      key.tabIndex = key === element ? 0 : -1
    })
}
</script>

<template>
  <div class="keyboard-stage">
    <div
      @pointerdown="onPointerDown"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
      @focusin="onFocusIn"
      @focusout="emit('release')"
      class="keyboard-scroll"
      role="group"
      aria-label="On-screen Mac keyboard. Use arrow keys to navigate, Enter or Space to press."
    >
      <MacKeyboard
        v-keyboard-controls
        :keycode="keycodes"
        :disabled="!isListening"
      />
    </div>
    <p class="mb-4 mt-3 text-center text-12px text-muted lg:hidden">
      Scroll sideways to explore the full keyboard.
    </p>
  </div>
</template>
