import { computed, defineComponent, h } from 'vue'
import { EventKey, emits, props } from './types'
import { keycodeDataList } from './constants'
import type { Props } from './types'

export const MacKeyboard = defineComponent({
  name: 'MacKeyboard',

  props: {
    ...props,
  },

  emits: {
    ...emits,
  },

  setup(props, context) {
    const config = computed<Required<Props>>(() => ({
      keycode: props.keycode || [],
    }))

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
                onMousedown: () => context.emit(EventKey.KeycodeDown, keycodeData),
                onMouseup: () => context.emit(EventKey.KeycodeUp, keycodeData),
                class: config.value.keycode.includes(keycodeData.keycode) ? 'pressed' : '',
                'data-key': keycodeData.keycode,
              },
              keycodeData.name.map(name => h('span', {}, name)),
            ),
          ),
        ),
      )
  },
})
