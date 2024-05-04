<template>
  <main class="site-content" :class="{ 'site-content--tabs': getIsMainTabs }">
    <!-- 主入口标签页 s -->
    <template v-if="getIsMainTabs">
      <div class="site-tabs">
        <ul class="site-tabs__list">
          <li 
           class="site-tabs__item" 
           v-for="(item) in getMenuMainTabs" 
           :key="item.id" 
           :class="{ active: item.id === mainTabsActiveName }"
           @click="selectedTabHandle(item)"
          >
            <span class="site-tabs__item-label">{{ item.name }}</span>
            <el-icon @click.stop="removeTabHandle(item.id)"><Close /></el-icon>
          </li>
        </ul>
        <div class="site-tabs__tools">
          <el-dropdown @command="handleTags">
            <el-button class="site-tabs__dropdown" size="small" type="primary">
              标签选项
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu size="small">
                <el-dropdown-item @click="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
                <el-dropdown-item @click="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                <el-dropdown-item @click="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
                <el-dropdown-item @click="refresh()">刷新当前标签页</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
      <div class="site-tabs--wrapper" :style="siteContentViewHeight">
        <template v-for="item in getMenuMainTabs" :key="item.id">
          <router-view :id="item.id" v-if="item.id === mainTabsActiveName" />
        </template>
      </div>
    </template>
    <!-- 主入口标签页 start -->
    <template v-else>
      <div class="site-main-content" :style="siteContentViewHeight">
        <keep-alive>
          <router-view />
        </keep-alive>
        <!-- <template v-if="systemHomeMenu && systemHomeMenu.route">
          <component :is="systemHomeMenu.route.component"></component>
        </template>
        <template v-else>
          <keep-alive>
            <router-view />
          </keep-alive>
        </template> -->
      </div>
    </template>
    <!-- 主入口标签页 end -->
  </main>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, computed, inject, nextTick } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore } from '@/store/modules/system.ts'
import { isURL } from '@/utils'

const $route = useRoute()
const $router = useRouter()

const refresh = inject('refresh')

const systemStore = useSystemStore()

const routeType = computed(() => {
  return systemStore.routeType
})

const systemHomeMenu  = computed(() => {
  return systemStore.homeMenu
})

const documentClientHeight = computed(() => {
  return systemStore.documentClientHeight
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
const getIsMainTabs = computed(() => {
  if (routeType.value === 'query') {
    return Reflect.has($route.query, 'menu')
  }
  return $route.meta.isTab
})
// 生成列表
const getMenuMainTabs = computed(() => { 
  const mainTabsMap = systemStore.mainTabsMap
  return systemStore.mainTabs.map(mainTabId => {
    return mainTabsMap.get(mainTabId)
  })
})

const mainTabsActiveName = computed({
  get () {
    return systemStore.mainTabsActiveName
  },
  set (value) {
    systemStore.mainTabsActiveName = value
  }
})

const siteContentViewHeight = computed(() => {
  const clientHeight = documentClientHeight.value
  const navbarHeight = systemStore.navbarHeight
  const sidebarTabsHeight = systemStore.sidebarTabsHeight
  const height = clientHeight - navbarHeight
  if ($route.meta.mainTabs) {
    return { height: `${height - sidebarTabsHeight}px` }
  }
  return { height: `${height}px` }
})

// methods
// tabs, 选中tab
const selectedTabHandle = ({ id }) => {
  if (!id) return
  const mainTabsMap = systemStore.mainTabsMap
  const selectTab = mainTabsMap.get(id)
  const routeType = systemStore.routeType
  if (routeType === 'query') {
    if (selectTab) { 
       $router.replace({
        path: '/main',
        query: {
          menu: selectTab,
          ...selectTab.route.query
        },
        params: selectTab.route.params
      })
    }
  } else {
    if (selectTab) {
      $router.push({
        path: selectTab.route.path,
        query: selectTab.route.query,
        params: selectTab.route.params
      })
    }
  }
  
}
// tabs, 删除tab
const removeTabHandle = (id) => {
  const menuIdIndex = mainTabs.value.indexOf(id)
  const routeType = systemStore.routeType
  if (menuIdIndex !== -1) {
    const mainTabsMap = systemStore.mainTabsMap
    mainTabsMap.delete(id)
    mainTabs.value.splice(menuIdIndex, 1)
    const len = mainTabs.value.length
    // 当前选中tab被删除
    if (len !== 0) {
      const newId = mainTabs.value[len - 1]
      const newMenuTab = mainTabsMap.get(newId)
      if (routeType === 'query') { 
        const routeRedirect = $router.replace({
          path: '/main',
          query: {
            menu: newMenuTab.route.name,
            ...newMenuTab.route.query
          },
          params: newMenuTab.route.params
        })
        routeRedirect.then(() => {
          mainTabsActiveName.value = newId
        })
      } else {
        const routeRedirect = $router.push({
          path: newMenuTab.route.path,
          query: newMenuTab.route.query,
          params: newMenuTab.route.params
        })
        routeRedirect.then(() => {
          mainTabsActiveName.value = newId
        })
      }
    } else {
      mainTabs.value = []
      menuActiveName.value = ''
      systemStore.mainTabsMap = new Map()
      if (routeType === 'query') {
        $router.replace({
          path: '/main',
          query: {
            menu: systemHomeMenu.route.name
          }
        })
      } else {
        $router.push({ ...systemHomeMenu.value.route })
      }
    }
  } else {
    mainTabs.value = []
    menuActiveName.value = ''
    systemStore.mainTabsMap = new Map()
    if (routeType === 'query') {
      $router.replace({
        path: '/main',
        query: {
          menu: systemHomeMenu.value.route.name
        }
      })
    } else {
      $router.push({ ...systemHomeMenu.route })
    }
  }
}
// tabs, 关闭当前
const tabsCloseCurrentHandle = () => {
  removeTabHandle(mainTabsActiveName)
}
// tabs, 关闭其它
const tabsCloseOtherHandle = () => {
  const mainTabsMap = systemStore.mainTabsMap
  const tabsActiveName = mainTabsActiveName.value
  mainTabs.value = mainTabs.value.filter(item => {
    if (item !== tabsActiveName) {
      mainTabsMap.delete(item)
    }
    return item === tabsActiveName
  })
}
// tabs, 关闭全部
const tabsCloseAllHandle = () => {
  mainTabs.value = []
  menuActiveName.value = ''
  systemStore.mainTabsMap = new Map()
  if (routeType === 'query') {
    $router.replace({
      path: '/main',
      query: {
        menu: systemHomeMenu.route.name
      }
    })
  } else {
    $router.push({ ...systemHomeMenu.route })
  }
}
// tabs, 刷新当前
// const tabsRefreshCurrentHandle = () => {
//   const tab = $route
//   removeTabHandle(tab.name)
//   nextTick(() => {
//     $router.push({
//       name: tab.name,
//       query: tab.query,
//       params: tab.params
//     })
//   })
// }
</script>