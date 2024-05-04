import { createPinia } from "pinia"
import piniaPluginPersist from 'pinia-plugin-persist'
import { useSystemStore } from './modules/system'
// 全局变量
const globalStoreMap = new Map()
const store = createPinia()
store.use(piniaPluginPersist)

export const globalStore = store

export default {
  name: 'store',
  install(systemApp: any) {
    // 注册路由
    systemApp.setStore = function(name, store) {
      globalStoreMap[name] = store
    }
    systemApp.getStore = function(name, store) {
      return globalStoreMap[name] ? globalStoreMap[name]() : null
    }
    systemApp.setStore('system', useSystemStore)
    systemApp.app && systemApp.app.use(store)
  }
}
