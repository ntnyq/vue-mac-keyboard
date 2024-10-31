import { MacKeyboard } from './core'
import type { Plugin } from 'vue'

export const plugin: Plugin = {
  install(app) {
    app.component('MacKeyboard', MacKeyboard)
  },
}

export * from './types'
export * from './constants'

export { MacKeyboard }

export default plugin
