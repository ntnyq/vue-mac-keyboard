<script lang="ts" setup>
import 'vue-mac-keyboard/style'
import { ref } from 'vue'
import { MacKeyboard } from 'vue-mac-keyboard'
import { description } from '../../package.json'

const keycode = ref<number[]>([])
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
      <MacKeyboard v-model:keycode="keycode" />
    </div>
    <div class="justify-center flex h-60px items-center">
      <div
        v-show="keycode.length > 0"
        class="min-w-200px"
      >
        <span class="op-60 text-lg mr-1">Keycode:</span>
        <span class="font-bold text-2xl">{{ keycode.join(', ') }}</span>
      </div>
    </div>
  </div>
</template>
