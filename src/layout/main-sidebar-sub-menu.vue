<template>
  <el-sub-menu 
      v-if="menu.children && menu.children.length >= 1"
      :index="menu.id"
      :popper-class="'site-sidebar--' + sidebarLayoutSkin + '-popper'">
      <template #title>
        <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg>
        <span>{{ menu.name }}</span>
      </template>
      <sub-menu
        v-for="item in menu.children" 
        :key="item.id"
        :menu="item"
        :dynamicMenuRoutes="dynamicMenuRoutes">
      </sub-menu>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.id" @click="gotoRouteHandle(menu)">
      <icon-svg :name="menu.icon || ''" class="site-sidebar__menu-icon"></icon-svg>
      <span>{{ menu.name }}</span>
    </el-menu-item>
</template>
<script setup>
import { ref, defineProps, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

import SubMenu from './main-sidebar-sub-menu.vue'

import { useSystemStore } from '@/store/modules/system.ts'
const $route = useRoute()
const $router = useRouter()
const systemStore = useSystemStore()
const props = defineProps({
  menu: {
    type: Object,
    required: true
  },
  dynamicMenuRoutes: {
    type: Array,
    required: true
  }
})
const sidebarLayoutSkin = computed(() => {
  return systemStore.sidebarLayoutSkin
})
const menuActiveName = computed(() => {
  return systemStore.menuActiveName
})

// 通过menuId与动态(菜单)路由进行匹配跳转至指定路由
const gotoRouteHandle = (menuItem) => {
  if (menuActiveName.value === menuItem.id) return
  $router.push({ path: menuItem.path })
}
</script>