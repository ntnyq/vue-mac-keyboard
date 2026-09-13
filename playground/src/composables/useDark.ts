/**
 * @file useDark
 */

import { useDark } from '@vueuse/core'
import { watchEffect } from 'vue'

export const isDark = useDark()

watchEffect(() => {
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark.value ? '#191c22' : '#f5f6f8')
})

export function toggleDark() {
  isDark.value = !isDark.value
}
