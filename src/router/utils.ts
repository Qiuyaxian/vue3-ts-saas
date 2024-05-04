import { RouteRecordRaw } from 'vue-router'
import type { SystemMenuRouteRecord, SystemMenuRouteRecordRaw } from '~/types'
import { isURL } from '@/utils'
// 自动加载模块
export const registerRouteModules = (): Array<RouteRecordRaw | Promise<any>> => {
  const modules = import.meta.glob('./modules/*.ts', { eager: true });
  const routeModules: Array<RouteRecordRaw | any> = Object.values(modules).reduce(
  (pre: Array<RouteRecordRaw | Promise<any>>, cur: any) => {
      const done = typeof cur.default === 'function' ? new Promise((resolve: Function, reject:  Function) => {
      cur.default(resolve)
    }) :  Promise.resolve(cur.default)
    return [...pre, done]
  }, []);
  return routeModules
}
// todo: 原来vite只支持一层路径。。。。 
export const loadSystemViewFile = (filePath: string, fileType: string = 'vue') => () => import(`@/views/${filePath}.${fileType}`)
// todo：支持多层级
export const registerSystemAsyncViews = () => {
  const modulesMap = new Map()
  const modules = import.meta.glob('../views/**/*.vue');
  for (const path in modules) {
    const filePathKey: string | null = path.replace(/^(\.\.\/)*((.*?)+)(\.vue)$/, '$2')
    modulesMap.set(filePathKey, modules[path])
  }
  return modulesMap
};

export const createSystemMenuRouteItemFactory = (getComponentFactory: Function) => {
  const createSystemMenuRouteItem = (systemRouteRecordRawItem: SystemMenuRouteRecordRaw, parentRoute?: SystemMenuRouteRecord)  => {
    const  {
        id = '1',
        icon = '',
        name = '',
        url = '/',
        route = '',
        isTab = true,
        isRoot = false,
        isHome = false,
        component = null,
        children = null
    } = systemRouteRecordRawItem
    // const componentPath = /^\//gi.test(url) ? `views${url}` : `views/${url}`
    const routeViewType = url && isURL(url) ? 'iframe' : 'module'
    const routeMeta = systemRouteRecordRawItem.meta || {}
    // const component = url ? systemViews.get(componentPath) : null
    const routeComponent = component ? component : getComponentFactory(systemRouteRecordRawItem)
    // const routePath = route && !isRoot ? route.replace(/^\//gi, '') : route
    // const routeName = parentRoute && parentRoute.route ? `${(parentRoute.route as any).name}-${routePath.replace(/(\/)+/gi, '-')}` : routePath ? routePath.replace(/(\/)+/gi, '-') : routePath
    const routeRecordRaw: RouteRecordRaw = {
      path: route,
      name: String(id),
      meta: {
        ...routeMeta,
        id,
        url: url ? url : '404',
        icon,
        name,
        isTab,
        isRoot,
        isHome,
        type: routeViewType,
      },
      props: true,
      component: routeComponent
    }
    if (Array.isArray(children)) {
      routeRecordRaw.children = children
    }
    return routeRecordRaw
  }
  return createSystemMenuRouteItem
}

// 递归处理路由
export const createSystemMenuRouteFactory = (getComponentFactory: Function) => {
  const createSystemMenuRouteItem = createSystemMenuRouteItemFactory(getComponentFactory)
  const createSystemMenuRoute = (routes: Array<SystemMenuRouteRecordRaw>, parentRoute?: RouteRecordRaw) => {
    const routeList = !Array.isArray(routes) ? [routes] : routes
    return routeList.map(item => {
      const routeItem: RouteRecordRaw = createSystemMenuRouteItem(item)
      if (Array.isArray(item.children)) routeItem.children = createSystemMenuRoute(item.children, routeItem ? routeItem : parentRoute)
      return routeItem
    }) as Array<SystemMenuRouteRecord>
  }
  return createSystemMenuRoute
}
