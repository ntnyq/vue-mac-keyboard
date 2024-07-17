import { computed, defineComponent, h } from 'vue'
import { EventKey, emits, props } from './types'
import { keycodeDataList } from './constants'
import type { KeycodeData } from './types'

export const MacKeyboard = defineComponent({
  name: 'MacKeyboard',

  props: {
    ...props,
  },

  emits: {
    ...emits,
  },

  setup(props, context) {
    const keycode = computed({
      get() {
        return props.keycode || []
      },
      set(value: number[]) {
        context.emit(EventKey.KeycodeUpdate, value)
      },
    })

    function onKeycodeDown(keycodeData: KeycodeData) {
      context.emit(EventKey.KeycodeDown, keycodeData)
      keycode.value = [keycodeData.keycode]
    }
    function onKeycodeUp(keycodeData: KeycodeData) {
      context.emit(EventKey.KeycodeUp, keycodeData)
      keycode.value = []
    }

    return () =>
      h(
        'div',
        {
          class: 'vue-mac-keyboard',
        },
        h(
          'ul',
          {},
          keycodeDataList.map(keycodeData =>
            h(
              'li',
              {
                onMousedown: () => onKeycodeDown(keycodeData),
                onMouseup: () => onKeycodeUp(keycodeData),
                class: keycode.value.includes(keycodeData.keycode) ? 'pressed' : '',
                'data-key': keycodeData.keycode,
              },
              keycodeData.name.map(name => h('span', {}, name)),
            ),
          ),
        ),
      )
  },
})
