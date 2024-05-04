<template>
  <div class="site-wrapper" :class="{ 'site-sidebar--fold': sidebarFold }">
    <MainNavbar />
    <MainSidebar />
    <div class="site-content__wrapper" :style="{ 'height': documentClientHeight + 'px' }">
      <MainContent v-if="!contentIsNeedRefresh" />
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted, computed, provide, nextTick } from 'vue'
import { useSystemStore } from '@/store/modules/system.ts'
import MainNavbar from '@/layout/main-navbar.vue'
import MainSidebar from '@/layout/main-sidebar.vue'
import MainContent from '@/layout/main-content.vue'

const systemStore = useSystemStore()
provide('refresh', () => {
  systemStore.contentIsNeedRefresh = true
  nextTick(() => {
    systemStore.contentIsNeedRefresh = false
  })
})

const sidebarFold = computed(() => {
  return systemStore.sidebarFold
})
const contentIsNeedRefresh = computed(() => {
  return systemStore.contentIsNeedRefresh
}) 
const documentClientHeight = computed({
  get () {
    return systemStore.documentClientHeight
  },
  set (value) {
    systemStore.documentClientHeight = value
  }
})
// 重置窗口可视高度
const resetDocumentClientHeight = () => {
  documentClientHeight.value = document.documentElement['clientHeight']
  window.onresize = () => {
    documentClientHeight.value = document.documentElement['clientHeight']
  }
}

onBeforeMount(() => {
  
})

onMounted(() => {
  resetDocumentClientHeight()
})
</script>