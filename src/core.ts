import { computed, defineComponent, h } from 'vue'
import { keycodeDataList } from './constants'
import { emits, EventKey, props } from './types'
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
      if (props.disabled) {return}

      context.emit(EventKey.KeycodeDown, keycodeData)
      keycode.value = [keycodeData.keycode]
    }
    function onKeycodeUp(keycodeData: KeycodeData) {
      if (props.disabled) {return}

      context.emit(EventKey.KeycodeUp, keycodeData)
      keycode.value = []
    }

    return () =>
      h(
        'div',
        {
          class: ['vue-mac-keyboard', props.disabled ? 'is-disabled' : ''],
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
                class: [
                  keycode.value.includes(keycodeData.keycode)
                    ? 'is-pressed'
                    : '',
                  props.disabled ? 'is-disabled' : '',
                ],
                'data-key': keycodeData.keycode,
              },
              keycodeData.name.map(name => h('span', {}, name)),
            ),
          ),
        ),
      )
  },
})
