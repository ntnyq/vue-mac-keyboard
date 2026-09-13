import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { useKeyboardInput } from '../playground/src/composables/useKeyboardInput'

enableAutoUnmount(afterEach)
afterEach(() => vi.restoreAllMocks())

async function setupKeyboard() {
  const wrapper = mount(
    defineComponent({
      setup: useKeyboardInput,
      render: () => h('div'),
    }),
  )
  await nextTick()
  return wrapper
}

function dispatchKey(
  type: 'keydown' | 'keyup',
  code: string,
  key: string,
  options: KeyboardEventInit = {},
) {
  const event = new KeyboardEvent(type, {
    code,
    key,
    bubbles: true,
    cancelable: true,
    ...options,
  })
  window.dispatchEvent(event)
  return event
}

describe('playground keyboard input', () => {
  it('highlights physical keys immediately and retains the last press after release', async () => {
    const { vm } = await setupKeyboard()
    const event = dispatchKey('keydown', 'KeyA', 'a')
    expect(vm.keycodes).toEqual([65])
    expect(vm.lastStroke?.label).toBe('A')
    expect(event.defaultPrevented).toBe(false)
    dispatchKey('keyup', 'KeyA', 'a')
    expect(vm.keycodes).toEqual([])
    expect(vm.lastStroke?.code).toBe('KeyA')
  })

  it('keeps both Shift keys independently and preserves chords when one key is released', async () => {
    const { vm } = await setupKeyboard()
    dispatchKey('keydown', 'ShiftLeft', 'Shift', { shiftKey: true })
    dispatchKey('keydown', 'ShiftRight', 'Shift', { shiftKey: true })
    dispatchKey('keydown', 'KeyA', 'A', { shiftKey: true })
    expect(vm.keycodes).toEqual([16, 65])
    expect(vm.lastStroke?.chord).toContain('⇧ Shift + A')
    dispatchKey('keyup', 'ShiftLeft', 'Shift', { shiftKey: true })
    expect(vm.keycodes).toEqual([16, 65])
    dispatchKey('keyup', 'KeyA', 'A', { shiftKey: true })
    expect(vm.keycodes).toEqual([16])
    dispatchKey('keyup', 'ShiftRight', 'Shift')
    expect(vm.keycodes).toEqual([])
  })

  it('does not flood history on repeat and keeps only the latest 12 presses', async () => {
    const { vm } = await setupKeyboard()
    dispatchKey('keydown', 'KeyA', 'a')
    for (let index = 0; index < 20; index++) {
      dispatchKey('keydown', 'KeyA', 'a', { repeat: true })
    }
    expect(vm.history).toHaveLength(1)
    dispatchKey('keyup', 'KeyA', 'a')
    for (let index = 0; index < 20; index++) {
      dispatchKey('keydown', 'KeyB', 'b')
      dispatchKey('keyup', 'KeyB', 'b')
    }
    expect(vm.history).toHaveLength(12)
    expect(vm.history[0].id).toBe(21)
  })

  it('maps punctuation, right Command and IME physical codes without keyCode', async () => {
    const { vm } = await setupKeyboard()
    dispatchKey('keydown', 'Equal', '+', { shiftKey: true })
    expect(vm.keycodes).toEqual([16, 187])
    expect(vm.lastStroke?.chord).toBe('⇧ Shift + +')
    dispatchKey('keyup', 'Equal', '+')
    dispatchKey('keydown', 'KeyN', 'Process', { isComposing: true })
    expect(vm.keycodes).toEqual([78])
    dispatchKey('keyup', 'KeyN', 'Process')
    dispatchKey('keydown', 'MetaRight', 'Meta', { metaKey: true })
    expect(vm.keycodes).toEqual([91])
    dispatchKey('keydown', 'KeyC', 'c', { metaKey: true })
    // macOS can omit C's keyup while Command is down.
    dispatchKey('keyup', 'MetaRight', 'Meta')
    expect(vm.keycodes).toEqual([])
  })

  it('clears held keys when the page loses focus or becomes hidden', async () => {
    const { vm } = await setupKeyboard()
    dispatchKey('keydown', 'KeyA', 'a')
    window.dispatchEvent(new Event('blur'))
    expect(vm.keycodes).toEqual([])
    expect(vm.isWindowFocused).toBe(false)
    window.dispatchEvent(new Event('focus'))
    expect(vm.isWindowFocused).toBe(true)
    dispatchKey('keydown', 'KeyA', 'a')
    vi.spyOn(document, 'hidden', 'get').mockReturnValue(true)
    document.dispatchEvent(new Event('visibilitychange'))
    expect(vm.keycodes).toEqual([])
    expect(vm.history).toHaveLength(2)
  })

  it('combines pointer and physical input and releases a pointer outside the keyboard', async () => {
    const { vm } = await setupKeyboard()
    dispatchKey('keydown', 'ShiftLeft', 'Shift', { shiftKey: true })
    vm.pressVirtualKey({ keycode: 65, name: ['A'] })
    expect(vm.keycodes).toEqual([16, 65])
    expect(vm.lastStroke?.source).toBe('On-screen')
    window.dispatchEvent(new Event('pointerup'))
    expect(vm.keycodes).toEqual([16])
    vm.pressVirtualKey({ keycode: 66, name: ['B'] })
    window.dispatchEvent(new Event('pointercancel'))
    expect(vm.keycodes).toEqual([16])
  })

  it('pauses both input sources and allows clearing history to be undone', async () => {
    const { vm } = await setupKeyboard()
    dispatchKey('keydown', 'KeyA', 'a')
    vm.toggleListening()
    expect(vm.keycodes).toEqual([])
    dispatchKey('keydown', 'KeyB', 'b')
    vm.pressVirtualKey({ keycode: 67, name: ['C'] })
    dispatchKey('keyup', 'KeyB', 'b', { shiftKey: true })
    expect(vm.keycodes).toEqual([])
    expect(vm.history).toHaveLength(1)
    vm.clearHistory()
    expect(vm.history).toHaveLength(0)
    expect(vm.canUndoClear).toBe(true)
    vm.undoClear()
    expect(vm.history[0].label).toBe('A')
    vm.toggleListening()
    dispatchKey('keydown', 'KeyD', 'd')
    expect(vm.keycodes).toEqual([68])
  })

  it('removes listeners on unmount', async () => {
    const wrapper = await setupKeyboard()
    const vm = wrapper.vm
    wrapper.unmount()
    dispatchKey('keydown', 'KeyA', 'a')
    expect(vm.history).toHaveLength(0)
  })
})
