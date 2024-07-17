<script lang="ts" setup>
import 'vue-mac-keyboard/style'
import { ref } from 'vue'
import { MacKeyboard } from 'vue-mac-keyboard'
import { description } from '../../package.json'
import type { KeycodeData } from 'vue-mac-keyboard'

const keycode = ref<number[]>([])

function onKeycodeDown(keycodeData: KeycodeData) {
  keycode.value = [keycodeData.keycode]
}
function onKeycodeUp() {
  keycode.value = []
}
</script>

<template>
  <div class="h-full flex flex-col justify-center p-4 items-center">
    <div class="mb-8 text-center">
      <h1
        class="text-4xl mb-4 text-transparent bg-gradient-to-r bg-clip-text from-teal-400 to-indigo-500 dark:to-yellow-200 font-bold"
      >
        Vue Mac Keyboard
      </h1>
      <p class="text-lg op-50">{{ description }}</p>
    </div>
    <div class="w-full of-x-auto">
      <MacKeyboard
        @keycode-down="onKeycodeDown"
        @keycode-up="onKeycodeUp"
        :keycode="keycode"
      />
    </div>
  </div>
</template>
