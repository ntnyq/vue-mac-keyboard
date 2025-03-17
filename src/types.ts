import type { ExtractPropTypes, PropType } from 'vue'

export interface KeycodeData {
  keycode: number
  name: string[]
}

// eslint-disable-next-line no-void
const UNDEFINED = void 0

const NonDefaultBooleanType = {
  type: Boolean,
  default: UNDEFINED,
}

export const props = {
  /**
   * Active keys
   */
  keycode: Array as PropType<number[]>,

  /**
   * Disabled keycode events
   */
  disabled: NonDefaultBooleanType,
}

export const EventKey = Object.freeze({
  KeycodeDown: 'keycodeDown',
  KeycodeUp: 'keycodeUp',
  /**
   * suport `v-model:keycode`
   */
  KeycodeUpdate: 'update:keycode',
})

export type Props = ExtractPropTypes<typeof props>

export const emits = {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  [EventKey.KeycodeUpdate]: (keycode: number[]) => true,
  [EventKey.KeycodeDown]: (keycodeData: KeycodeData) => true,
  [EventKey.KeycodeUp]: (keycodeData: KeycodeData) => true,
  /* eslint-enable @typescript-eslint/no-unused-vars */
}

export type Emits = typeof emits
