import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import SimpleIcon from '../src/vite'

export default defineConfig({
  plugins: [vue(), SimpleIcon()],
})
