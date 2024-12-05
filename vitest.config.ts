import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: [...defaultExclude, '**/playground/**'],
      include: ['**/src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
    environment: 'happy-dom',
    reporters: ['dot'],
  },
})
