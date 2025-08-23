import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: 'test',
    setupFiles: ['./test/db-setup.mjs'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      all: true,
      include: ['src/**/*.js'],
      exclude: ['node_modules/', 'src/app.mjs', 'src/server.mjs'],
    },
  },
});
