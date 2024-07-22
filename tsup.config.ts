import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  clean: true,
  cjsInterop: true,
  format: ['cjs', 'esm'],
  target: ['node18', 'es2016'],
  external: ['vue'],
  ignoreWatch: ['src/style.scss'],
  onSuccess: 'pnpm run build:style',
})
