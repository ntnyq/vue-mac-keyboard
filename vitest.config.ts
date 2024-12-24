import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    reporters: ['dot'],
    coverage: {
      exclude: [...defaultExclude, '**/playground/**'],
      include: ['**/src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
  },
})
