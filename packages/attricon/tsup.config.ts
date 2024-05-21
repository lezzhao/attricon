import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/vite.ts',
  ],
  clean: true,
  dts: true,
  format: ['esm', 'cjs'],
  minify: true,
})
