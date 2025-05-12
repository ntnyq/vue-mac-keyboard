# vue-mac-keyboard

[![CI](https://github.com/ntnyq/vue-mac-keyboard/workflows/CI/badge.svg)](https://github.com/ntnyq/vue-mac-keyboard/actions)
[![NPM VERSION](https://img.shields.io/npm/v/vue-mac-keyboard.svg)](https://www.npmjs.com/package/vue-mac-keyboard)
[![NPM DOWNLOADS](https://img.shields.io/npm/dy/vue-mac-keyboard.svg)](https://www.npmjs.com/package/vue-mac-keyboard)
[![LICENSE](https://img.shields.io/github/license/ntnyq/vue-mac-keyboard.svg)](https://github.com/ntnyq/vue-mac-keyboard/blob/main/LICENSE)

> ⌨️ Macbook computer keyboard style for VueJS component.

## Playground

[playground](https://vue-mac-keyboard.ntnyq.com)

## Install

**npm**:

```shell
npm i vue-mac-keyboard
```

**yarn**

```shell
yarn add vue-mac-keyboard
```

**pnpm**

```shell
pnpm add vue-mac-keyboard
```

## Screenshot

![Screenshot](https://raw.githubusercontent.com/ntnyq/vue-mac-keyboard/main/screenshots/keyboard.png)

## Usage

### Local Component

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import { MacKeyboard } from 'vue-mac-keyboard'
import 'vue-mac-keyboard/style'
import type { KeycodeData } from 'vue-mac-keyboard'

const keycode = ref([])
</script>

<template>
  <MacKeyboard v-model:keycode="keycode" />
</template>
```

### Global component registed via plugin

```ts
import { createApp } from 'vue'
import MacKeyboard from 'vue-mac-keyboard'
import App from '@/App.vue'
import 'vue-mac-keyboard/style'

const app = createApp(App)

app.use(MacKeyboard)

app.mount('#app')
```

Use it in component:

```vue
<script lang="ts" setup>
import { ref } from 'vue'
import type { KeycodeData } from 'vue-mac-keyboard'

const keycode = ref([])

function onKeycodeDown(keycodeData: KeycodeData) {
  keycode.value = [keycodeData.keycode]
}
function onKeycodeUp(keycodeData: KeycodeData) {
  keycode.value = []
}
</script>

<template>
  <MacKeyboard
    @keycode-down="onKeycodeDown"
    @keycode-up="onKeycodeUp"
    :keycode
  />
</template>
```

## Props

### keycode/v-model:keycode

- **type**: `number[]`
- **default**: `[]`

Highlighted keys.

See **[keycodeDataList](https://github.com/ntnyq/vue-mac-keyboard/blob/main/src/constants.ts)** for all available keycodes.

### disabled

- **type**: `boolean`
- **default**: `undefined`

Disable the keyboard from interacting.

## Events

### keycodeDown

- **type**: `(keycodeData: KeycodeData) => void`

Triggered when a keycode is pressed.

### keycodeUp

- **type**: `(keycodeData: KeycodeData) => void`

Triggered when a keycode is released.

## Interfaces

```ts
interface KeycodeData {
  /**
   * keycode of the key
   */
  keycode: number

  /**
   * key names, used for rendering UI
   */
  name: string[]
}
```

## Credits

- [uiwjs/react-mac-keyboard](https://github.com/uiwjs/react-mac-keyboard) created by [jaywcjlove](https://github.com/jaywcjlove)

## Changelog

[See releases](https://github.com/ntnyq/vue-mac-keyboard/releases)

## License

[MIT](./LICENSE) License © 2024-PRESENT [ntnyq](https://github.com/ntnyq)
