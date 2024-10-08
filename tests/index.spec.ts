import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { MacKeyboard as MacKeyboardComponent } from '../src'

const KEYCODE_ENTER = 13

describe('MacKeyboardComponent', () => {
  it('should work', () => {
    const wrapper = mount(MacKeyboardComponent)

    expect(wrapper.find('.vue-mac-keyboard').exists()).toBeTruthy()
  })

  it('should have fixed count key', () => {
    const wrapper = mount(MacKeyboardComponent)

    expect(wrapper.findAll('.vue-mac-keyboard li').length).toMatchInlineSnapshot(`78`)
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
})
