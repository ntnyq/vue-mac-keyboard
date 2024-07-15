<script lang="ts" setup>
import 'vue-mac-keyboard/style'
import { ref } from 'vue'
import { MacKeyboard } from 'vue-mac-keyboard'
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
  <main>
    <MacKeyboard
      @keycode-down="onKeycodeDown"
      @keycode-up="onKeycodeUp"
      :keycode="keycode"
    />
  </main>
</template>
