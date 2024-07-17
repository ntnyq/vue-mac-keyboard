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

export type Props = ExtractPropTypes<typeof props>

export enum EventKey {
  KeycodeDown = 'keycodeDown',
  KeycodeUp = 'keycodeUp',

  /**
   * suport `v-model:keycode`
   */
  KeycodeUpdate = 'update:keycode',
}

export const emits = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [EventKey.KeycodeUpdate]: (keycode: number[]) => true,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [EventKey.KeycodeDown]: (keycodeData: KeycodeData) => true,

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [EventKey.KeycodeUp]: (keycodeData: KeycodeData) => true,
}

export type Emits = typeof emits
