<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <sub-menu
          v-for="menu in menuList"
          :key="menu.menuId"
          :menu="menu"
          :dynamicMenuRoutes="dynamicMenuRoutes">
        </sub-menu>
      </el-menu>
    </div>
  </aside>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, computed, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cloneDeep from 'lodash/cloneDeep'
import { useSystemStore } from '@/store/modules/system.ts'
import SubMenu from './main-sidebar-sub-menu.vue'

const dynamicMenuRoutes = ref([])

const $route = useRoute()
const $router = useRouter()
const systemStore = useSystemStore()

const sidebarFold = computed(() => {
  return systemStore.sidebarFold
})
const sidebarLayoutSkin = computed(() => {
  return systemStore.sidebarLayoutSkin
})

const menuList = computed({
  get () {
    return systemStore.menuList
  },
  set (value) {
    systemStore.menuList = value
  }
})

const menuActiveName = computed({
  get () {
    return systemStore.menuActiveName
  },
  set (value) {
    systemStore.menuActiveName = value
  }
})

const mainTabs = computed({
  get () {
    return systemStore.mainTabs
  },
  set (value) {
    systemStore.mainTabs = value
  }
})

const mainTabsActiveName = computed({
  get () {
    return systemStore.mainTabsActiveName
  },
  set (value) {
    systemStore.mainTabsActiveName = value
  }
})
// 监听路由变化，如果不存在路由，则新增到tabs
const mainRouteChange = (route, routeFrom) => {
  const routeType = systemStore.routeType
  const mainTabsMap = systemStore.mainTabsMap
  if (routeType === 'query') {
    const systemQuery = route.query
    const { menu } = systemQuery
    const menuItem = systemStore.menuListMap.get(menu)
    const homeMenu = systemStore.homeMenu

    if (menu && menuItem && menuItem.isTab) {
      const routeParams = cloneDeep(route.params)
      const routeQuery = cloneDeep(route.query)
      const routeId = menuItem.id
      // 用于404，401，500，等特殊路由记录
      // tab选中, 不存在先添加
      const tabIndex = mainTabs.value.indexOf(routeId)
      if (tabIndex === -1) {
        // 是否是异步
        // if (meta.isDynamic) {
        //   route = dynamicMenuRoutes.value.filter(item => item.name === route.name)[0]
        //   if (!route) {
        //     return console.error('未能找到可用标签页!')
        //   }
        // }
        const tab = {
          ...menuItem,
          route: {
            path: menuItem.route.path,
            name: menuItem.route.name,
            meta: cloneDeep(menuItem.route.meta),
            params: routeParams,
            query: routeQuery
          }
        }
        mainTabs.value = mainTabs.value.concat(routeId)
        mainTabsMap.set(routeId, tab)
      } else {
        // 更新路由参数
        const mainTab = mainTabsMap.get(routeId)
        mainTab.params = routeParams
        mainTab.query = routeQuery
        mainTabsMap.set(routeId, mainTab)
      }
      //设定当前打开发tab标签
      menuActiveName.value = String(routeId)
      mainTabsActiveName.value = String(routeId)
    }
  } else {
    const meta = route.meta
    const routeParams = cloneDeep(route.params)
    const routeQuery = cloneDeep(route.query)
    if (route.path !== '/' && meta && meta.isTab) {
      const routeId = meta.id
      // 用于404，401，500，等特殊路由记录
      // tab选中, 不存在先添加
      const tabIndex = mainTabs.value.indexOf(routeId)
      if (tabIndex === -1) {
        // 是否是异步
        // if (meta.isDynamic) {
        //   route = dynamicMenuRoutes.value.filter(item => item.name === route.name)[0]
        //   if (!route) {
        //     return console.error('未能找到可用标签页!')
        //   }
        // }
        const tab = {
          ...meta,
          route: {
            path: route.path,
            name: route.name,
            meta: cloneDeep(route.meta),
            params: routeParams,
            query: routeQuery
          }
        }
        mainTabs.value = mainTabs.value.concat(routeId)
        mainTabsMap.set(routeId, tab)
      } else {
        // 更新路由参数
        const mainTab = mainTabsMap.get(routeId)
        mainTab.params = routeParams
        mainTab.query = routeQuery
        mainTabsMap.set(routeId, mainTab)
      }
      //设定当前打开发tab标签
      menuActiveName.value = String(routeId)
      mainTabsActiveName.value = String(routeId)
    }
  }
} 
watch(() => $route, (to) => {
  mainRouteChange(to)
}, {
  deep: true,
  immediate: true
})
</script>