import { x } from 'tinyexec'
import { defineConfig } from 'tsdown'

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  hooks: {
    'build:done': async () => {
      await x('npm', ['run', 'build:style'])
    },
  },
})
