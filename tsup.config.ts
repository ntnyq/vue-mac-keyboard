import { defineConfig } from 'tsup'

export default defineConfig({
  cjsInterop: true,
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['vue'],
  format: ['cjs', 'esm'],
  ignoreWatch: ['src/style.scss'],
  onSuccess: 'pnpm run build:style',
  target: ['node18', 'es2016'],
})
