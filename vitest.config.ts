import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'happy-dom',
    reporters: ['dot'],
    coverage: {
      include: ['./src/**/*.ts'],
      reporter: ['lcov', 'text'],
    },
  },
})
