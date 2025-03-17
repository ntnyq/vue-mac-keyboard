import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import {
  MacKeyboard as MacKeyboardComponent,
  plugin as MacKeyboardPlugin,
} from '../src'

const KEYCODE_ENTER = 13

describe('MacKeyboardPlugin', () => {
  it('should work', () => {
    expect(MacKeyboardPlugin).toBeTruthy()
    expect(MacKeyboardPlugin.install).toBeTruthy()
  })

  it('should register component', () => {
    const MacKeyboard = defineComponent({
      template: `<MacKeyboard />`,
    })
    const wrapper = mount(MacKeyboard, {
      global: {
        plugins: [MacKeyboardPlugin],
      },
    })

    expect(wrapper.find('.vue-mac-keyboard').exists()).toBeTruthy()
  })
})

describe('MacKeyboardComponent', () => {
  it('should work', () => {
    const wrapper = mount(MacKeyboardComponent)

    expect(wrapper.find('.vue-mac-keyboard').exists()).toBeTruthy()
  })

  it('should have fixed count key', () => {
    const wrapper = mount(MacKeyboardComponent)

    expect(
      wrapper.findAll('.vue-mac-keyboard li').length,
    ).toMatchInlineSnapshot(`78`)
  })

  it('should prop keycode work', async () => {
    const wrapper = mount(MacKeyboardComponent)

    expect(wrapper.findAll('.vue-mac-keyboard .is-pressed').length).toBe(0)

    await wrapper.setProps({ keycode: [KEYCODE_ENTER] })

    expect(wrapper.findAll('.vue-mac-keyboard .is-pressed').length).toBe(1)
  })

  it('should events work', async () => {
    const wrapper = mount(MacKeyboardComponent)

    wrapper.find('.vue-mac-keyboard li').trigger('mousedown')

    expect(wrapper.emitted()).toHaveProperty('keycodeDown')

    wrapper.find('.vue-mac-keyboard li').trigger('mouseup')

    expect(wrapper.emitted()).toHaveProperty('keycodeDown')
    expect(wrapper.emitted()).toHaveProperty('keycodeUp')
  })

  it('should be disabled', () => {
    const wrapper = mount(MacKeyboardComponent, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('.vue-mac-keyboard.is-disabled').exists()).toBeTruthy()

    wrapper.find('.vue-mac-keyboard li').trigger('mousedown')

    expect(wrapper.emitted()).not.toHaveProperty('keycodeDown')

    wrapper.find('.vue-mac-keyboard li').trigger('mouseup')

    expect(wrapper.emitted()).not.toHaveProperty('KeyCodeUp')
  })
})
