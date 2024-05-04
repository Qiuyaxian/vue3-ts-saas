<template>
  <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
      <div class="site-navbar__header">
        <h1 class="site-navbar__brand" @click="gotoHome()">
          <a class="site-navbar__brand-lg" href="javascript:;">容器快速开发平台</a>
          <a class="site-navbar__brand-mini" href="javascript:;">容器</a>
        </h1>
      </div>
      <div class="site-navbar__body clearfix">
        <div class="site-navbar__menu">
          <div class="site-navbar__switch" @click="sidebarFold = !sidebarFold">
             <el-icon v-if="!sidebarFold"><Fold /></el-icon>
             <el-icon v-else><Expand /></el-icon>
          </div>
        </div>
        <MainUser />
      </div>
      <!-- 弹窗, 修改密码 -->
      <!-- <update-password v-if="updatePassowrdVisible" ref="updatePassowrd"></update-password> -->
    </nav>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSystemStore } from '@/store/modules/system.ts'
import { useUserStore } from '@/store/modules/user.ts'
import MainUser from './main-user.vue'
const $route = useRoute()
const $router = useRouter()
const systemStore = useSystemStore()
const userStore = useUserStore()
const userInfo = computed(() => {
  return userStore.userInfo
})
const sidebarFold = computed({
  get () {
    return systemStore.sidebarFold
  },
  set (value) {
    systemStore.sidebarFold = value
  }
})
const navbarLayoutType = computed(() => {
  return systemStore.navbarLayoutType
})
const gotoHome = () => {
  const homeMenu = systemStore.homeMenu
  $router.push({ ...homeMenu.route })
}
</script>