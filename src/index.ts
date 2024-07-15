import { MacKeyboard } from './core'
import type { Plugin } from 'vue'

export const install: Plugin = app => {
  app.component('MacKeyboard', MacKeyboard)
}

export type { Props, Emits } from './types'

export const MacKeyboardPlugin = { install }

export { MacKeyboard, MacKeyboardPlugin as default }

export * from './types'
export * from './constants'
