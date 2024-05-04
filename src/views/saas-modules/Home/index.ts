import Home from './views/Home.vue'

// 初始化store
export const installStore = async (store) => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
// 初始化路由
export const installRouter = async (app) => {
	console.log(app, 'app')
  return new Promise((resolve, reject) => {
  	app.addRoutes({
      id:'home',
      icon:'',
      name:'Home',
      url: '/home',
      route: '/home',
      path: '/home',
      component: Home,
      isHome: true,
      isTab: true
    })
    resolve()
  })
}
// 初始化全局组建
export const installComponetns = async () => {
  return new Promise((resolve, reject) => {
    resolve()
  })
}
// 