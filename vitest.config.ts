import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/index.ts'],
      include: ['src/**/*.ts'],
      reporter: ['lcov']
    },
    include: ['tests/**/*.test.ts'],
    maxConcurrency: 1,
    poolOptions: {
      threads: {
        maxThreads: 1,
        minThreads: 0
      }
    },
    setupFiles: ['vitest/setup.ts'],
    testTimeout: 10000
  }
})