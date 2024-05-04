import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      loggedIn: false,
      userInfo: {
      }
    }
  },

  actions: {
    setUserInfo(user: any) {
      this.userInfo = user
      this.loggedIn = true
    }
  }
})
