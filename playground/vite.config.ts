import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Attricon from '../packages/vite/src'

export default defineConfig({
  plugins: [vue(), Attricon()],
})
