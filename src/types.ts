import type { ExtractPropTypes, PropType } from 'vue'

export interface KeycodeData {
  keycode: number
  name: string[]
}

export const props = {
  keycode: Array as PropType<number[]>,
}

export type Props = ExtractPropTypes<typeof props>

export enum EventKey {
  KeycodeDown = 'KeycodeDown',
  KeycodeUp = 'KeycodeUp',
}

export const emits = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [EventKey.KeycodeDown]: (keycodeData: KeycodeData) => true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [EventKey.KeycodeUp]: (keycodeData: KeycodeData) => true,
}

export type Emits = typeof emits
