import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  clean: true,
  cjsInterop: true,
  format: ['cjs', 'esm', 'iife'],
  target: ['node18', 'es2016'],
  external: ['vue'],
  onSuccess: 'pnpm run build:style',
})
