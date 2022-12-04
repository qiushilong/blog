import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: 8000,
  },
  css: ['~/assets/css/global.css'],
  // vite 配置
  vite: {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'assets/icon')],
        // 指定symbolId格式
        symbolId: 'icon-[name]',
      }),
    ],
  },
})
