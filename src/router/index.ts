import { createRouter, createWebHashHistory, RouteRecordRaw, createMatcher } from 'vue-router'
import { createSystemMenuRouteItemFactory, createSystemMenuRouteFactory } from './utils.ts'

const getComponentPath = (routeItem: SystemMenuRouteRecordRaw) => {
  const { url } = routeItem
  const componentPath: string = /^\//gi.test(url) ? `views${url}` : `views/${url}`
  return url ? (componentMap as any)[componentPath] : null
}

const createSystemMenuRouteItem = createSystemMenuRouteItemFactory(getComponentPath)
const createSystemMenuRoute = createSystemMenuRouteFactory(getComponentPath)

import Main from '../views/Main.vue'

const routes: RouteRecordRaw[] = []

const mainRoute: RouteRecordRaw = createSystemMenuRouteItem({
  id:'main',
  icon:'',
  name:'Main',
  url: '/',
  route: '/',
  path: '/',
  isHome: true,
  isTab: false,
  component: Main,
  children: []
})

// mainRoute.children = []

routes.push(mainRoute)

export default {
  name: 'router',
  install: function (systemApp: any) {
    systemApp.addRoutes = function(routeItems: RouteRecordRaw<Array>) {
      const saasRoutes = createSystemMenuRoute(routeItems)
      mainRoute.children = mainRoute.children.concat(saasRoutes)
    }
  },
  installReady: function(systemApp: any) {
    const router = createRouter({
      history: createWebHashHistory(),
      routes,
    })
    router.beforeEach((to, from, next) => {
      const systemStore = systemApp.getStore('system')
      if (!systemStore.isReady) {
        systemStore.getReady().then((state) => {
          systemStore.isReady = true
          systemStore.setMenuList(mainRoute.children, () => {
            next({...to, replace: true})
          }).catch(() => {
            next()
          })
        }).catch(() => {
          next()
        })
      } else {
        next()
      }
    })
    systemApp.app && systemApp.app.use(router);
  }
}
