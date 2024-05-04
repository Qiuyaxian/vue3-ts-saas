import SvgIcon from './icon-svg/index.vue'

export default {
  install: function (systemApp: any) {
    systemApp.app && systemApp.app.component('icon-svg', SvgIcon)
  }
}