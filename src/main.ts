import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue'
import '@/styles/index.scss'

import elementInstall from '@/element-ui'
import componentInstall from '@/components'
import storeInstall, { globalStore } from '@/store'
import routerInstall, { globalRouter } from '@/router'
import SystemInit from '@/create-system'
import * as SaasHome from './views/saas-modules/Home'

const createSystem: any = SystemInit(() => createApp(App))

createSystem.use(elementInstall)
createSystem.use(componentInstall)
createSystem.use(storeInstall)
createSystem.use(routerInstall)

createSystem.useSaas(SaasHome)

const systemApp: any = createSystem()
createSystem.ready(() => {
 systemApp.app.mount('#app')
})

