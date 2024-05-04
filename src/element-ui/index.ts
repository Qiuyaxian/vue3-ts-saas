import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css';

export default {
  install: function (systemApp: any) {
    systemApp.app && systemApp.app.use(ElementPlus)
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      systemApp.app && systemApp.app.component(key, component)
    }
  }
} 