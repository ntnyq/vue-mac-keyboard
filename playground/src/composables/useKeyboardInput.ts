import { useEventListener } from '@vueuse/core'
import { computed, readonly, shallowRef } from 'vue'
import { fromKeyboardEvent, fromVirtualKey } from '../utils/keyboard'
import type { KeycodeData } from 'vue-mac-keyboard'
import type { KeyboardKey, KeyStroke } from '../utils/keyboard'

/**
 * Own the live pressed state and a bounded session history without intercepting typing.
 */
export function useKeyboardInput() {
  const activeKeys = shallowRef<KeyboardKey[]>([])
  const history = shallowRef<KeyStroke[]>([])
  const clearedHistory = shallowRef<KeyStroke[]>([])
  const lastStroke = shallowRef<KeyStroke | null>(null)
  const isListening = shallowRef(true)
  const isWindowFocused = shallowRef(document.hasFocus())
  let sequence = 0

  const keycodes = computed(() => [
    ...new Set(
      activeKeys.value.flatMap(key =>
        key.keycode === null ? [] : [key.keycode],
      ),
    ),
  ])
  const canUndoClear = computed(() => clearedHistory.value.length > 0)

  function press(key: KeyboardKey, repeat = false) {
    if (!isListening.value) {
      return
    }
    isWindowFocused.value = true
    const isHeld = activeKeys.value.some(active => active.code === key.code)
    if (!isHeld) {
      activeKeys.value = [...activeKeys.value, key]
    }
    if (isHeld || repeat) {
      return
    }

    const stroke: KeyStroke = {
      ...key,
      id: ++sequence,
      chord: [...new Set(activeKeys.value.map(active => active.label))].join(
        ' + ',
      ),
    }
    lastStroke.value = stroke
    history.value = [stroke, ...history.value].slice(0, 12)
  }

  function releaseAll() {
    activeKeys.value = []
  }

  function releaseVirtualKeys() {
    activeKeys.value = activeKeys.value.filter(
      key => key.source !== 'On-screen',
    )
  }

  function pressVirtualKey(data: KeycodeData) {
    releaseVirtualKeys()
    press(fromVirtualKey(data))
  }

  function clearHistory() {
    clearedHistory.value = history.value
    history.value = []
  }

  function undoClear() {
    history.value = [...history.value, ...clearedHistory.value].slice(0, 12)
    clearedHistory.value = []
  }

  function toggleListening() {
    isListening.value = !isListening.value
    releaseAll()
  }

  // Recover modifiers if the browser or operating system consumed their keyup.
  function reconcileModifiers(event: KeyboardEvent) {
    const modifiers: Record<number, boolean> = {
      16: event.shiftKey,
      17: event.ctrlKey,
      18: event.altKey,
      91: event.metaKey,
    }
    const hadMeta = activeKeys.value.some(
      key => key.source === 'Keyboard' && key.keycode === 91,
    )
    activeKeys.value = activeKeys.value.filter(key => {
      if (key.source !== 'Keyboard') {
        return true
      }
      if (key.code.startsWith('modifier:') && key.key === event.key) {
        return false
      }
      if (key.keycode !== null && key.keycode in modifiers) {
        return modifiers[key.keycode]
      }
      // macOS may omit keyup for keys released while Command is held.
      return !hadMeta || event.metaKey
    })

    // A modifier may already be held when the user focuses this tab.
    const modifierKeys = [
      { keycode: 16, key: 'Shift', label: '⇧ Shift' },
      { keycode: 17, key: 'Control', label: '⌃ Control' },
      { keycode: 18, key: 'Alt', label: '⌥ Option' },
      { keycode: 91, key: 'Meta', label: '⌘ Command' },
    ]
    for (const key of modifierKeys) {
      if (
        modifiers[key.keycode]
        && key.key !== event.key
        && !activeKeys.value.some(
          active =>
            active.keycode === key.keycode && active.source === 'Keyboard',
        )
      ) {
        activeKeys.value = [
          ...activeKeys.value,
          { ...key, code: `modifier:${key.keycode}`, source: 'Keyboard' },
        ]
      }
    }
  }

  useEventListener(window, 'keydown', event => {
    if (!isListening.value) {
      return
    }
    reconcileModifiers(event)
    press(fromKeyboardEvent(event), event.repeat)
  })
  useEventListener(window, 'keyup', event => {
    if (!isListening.value) {
      return
    }
    const key = fromKeyboardEvent(event)
    activeKeys.value = activeKeys.value.filter(
      active => active.code !== key.code,
    )
    if (key.keycode === 91 && !event.metaKey) {
      // Releasing Command also releases ordinary keys whose keyup macOS swallowed.
      activeKeys.value = activeKeys.value.filter(
        active =>
          active.source !== 'Keyboard'
          || [16, 17, 18, 91].includes(active.keycode ?? 0),
      )
    }
    reconcileModifiers(event)
  })
  useEventListener(window, 'pointerup', releaseVirtualKeys)
  useEventListener(window, 'pointercancel', releaseVirtualKeys)
  useEventListener(window, 'blur', () => {
    isWindowFocused.value = false
    releaseAll()
  })
  useEventListener(window, 'focus', () => {
    isWindowFocused.value = true
  })
  useEventListener(document, 'visibilitychange', () => {
    if (document.hidden) {
      isWindowFocused.value = false
      releaseAll()
    }
  })

  return {
    activeKeys: readonly(activeKeys),
    history: readonly(history),
    lastStroke: readonly(lastStroke),
    isListening: readonly(isListening),
    isWindowFocused: readonly(isWindowFocused),
    keycodes,
    canUndoClear,

    clearHistory,
    undoClear,
    pressVirtualKey,
    releaseVirtualKeys,
    toggleListening,
  }
}
