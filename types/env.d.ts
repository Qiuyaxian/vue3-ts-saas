/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// declare module 'vite-plugin-mock';
declare module '@laomao800/vue-listview'

declare module 'element-plus/dist/locale/zh-cn.mjs'
