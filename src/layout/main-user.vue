<template>
  <div class="site-navbar__menu site-navbar__menu--right">
    <div class="site-navbar__avatar">
      <el-dropdown :show-timeout="0" placement="bottom">
        <span class="el-dropdown-link">
          <img :src="userInfo.avatar" :alt="userName">{{ userInfo.name }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user.ts'
const userStore = useUserStore()
const userInfo = computed(() => {
  return userStore.userInfo
})
</script>