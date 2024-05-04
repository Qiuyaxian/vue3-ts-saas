
import { RouteRecordRaw } from 'vue-router'

export enum SystemMenuRouteType {
  iframe = 'iframe',
  module = 'module'
}
// 传入值
export interface SystemMenuRouteRecordRaw {
  id: string | number
  // 图标名字
  icon?: string
  // 菜单名
  name: string
  // 展示模式
  // type: string
  // 路由元信息（可以挂载是否是权限等）
  meta?: Object
  // 文件地址或者iframe的src地址
  url: string
  // 静态组建地址
  component?: Function
  // 路由地址
  route: string
  // iframe 地址
  // iframeSrc: string | null,
  // 是否使用 tab 页签
  isTab?: boolean,
  // 是否渲染在根节点
  isRoot?: boolean,
  // 默认首页  
  isHome?: boolean,
  // 进入前  
  beforeEnter?: Function
  // 下级菜单
  children?: Array<SystemMenuRouteRecordRaw>
}
// 菜单项
export interface SystemMenuRouteRecord {
  id: string | number
  // 图标名字
  icon: string
  // 菜单名
  name: string
  // 展示模式
  type: string
  // 路由元信息（可以挂载是否是权限等）
  // menuMeta?: Object
  url: string | null | undefined
  // iframe 地址
  // iframeSrc: string | null,
  // 是否使用 tab 页签
  isTab: boolean
  // 是否渲染在根节点
  isRoot: boolean
  // 默认首页  
  isHome: boolean
  // 路由信息
  route: RouteRecordRaw
  // 下级菜单
  children?: Array<SystemMenuRouteRecord>
}
// tabs 存储项
export interface SystemMenuTabRouteRecord {
  id: string | number
  // 图标名字
  icon: string
  // 菜单名
  name: string
  // 展示模式
  type: string
  // 路由元信息（可以挂载是否是权限等）
  // menuMeta?: Object
  url: string | null | undefined
  // 访问记录
  $route: RouteRecordRaw
}