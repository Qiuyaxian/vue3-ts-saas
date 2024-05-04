import { defineStore } from 'pinia'
import type { SystemMenuRouteRecord, SystemMenuRouteRecordRaw, SystemMenuRouteType } from '~/types'

export const useSystemStore = defineStore({
  id: 'system',
  state: () => {
    return {
      isReady: false,
      renderType: import.meta.env.VUE_APP_SYSTEM_RENDER || 'route',
      modeType: import.meta.env.VUE_APP_SYSTEM_MODE || 'route',
      // 页面文档可视高度(随窗口改变大小)
      documentClientHeight: 0,
      navbarHeight: 50,
      sidebarTabsHeight: 30,
      // 导航条, 布局风格, defalut(默认) / inverse(反向)
      navbarLayoutType: 'default',
      // 侧边栏, 布局皮肤, light(浅色) / dark(黑色)
      sidebarLayoutSkin: 'dark',
      // 侧边栏, 折叠状态
      sidebarFold: false,
      // 内容, 是否需要刷新
      contentIsNeedRefresh: false,
      // 侧边栏, 菜单
      homeMenu: {},
      menuList: [],
      menuListMap: new Map(),
      menuActiveName: '',
      // 主入口标签页
      mainTabs: [],
      mainTabsMap: new Map(),
      mainTabsActiveName: ''
    }
  },
  actions: {
    getReady() {
      return new Promise((resolve, reject) => {
        resolve(this.isReady)
      })
    },
    setReady(isReady) {
      this.isReady = isReady
    },
    setMenuList(menuList: Array<SystemMenuRouteRecord>, callback?: Function) {
      (this.menuList as Array<SystemMenuRouteRecord>) = (this.menuList as Array<SystemMenuRouteRecord>).concat(menuList)
      callback && callback()
    },
    setMenuListMap(key: string | number, value: SystemMenuRouteRecord) {
      this.menuListMap.set(key, value)
    },
    setHomeMenu(route: SystemMenuRouteRecord) {
      (this.homeMenu as SystemMenuRouteRecord) = route
    }
  }
})
