interface SystemModule {
  store?: Object | Function 
  router?: Array<any> | Function
  install: Function
}
function firstCase(str: string) {  
    return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());  
} 
export default function SystemInit(createApp: Function) {
  const systemModules: Array<SystemModule> = []
  const systemModuleReadyList: Array<Function | any> = [] 
  const saasModules: Array<any> = []
  const saasModuleInstalls = []
  const systemApp: any = {}
  const systemReadyList: Array<Function> = []
  const systemReady = (systemApp) => {
    systemModuleReadyList.forEach((systemReadyItem: any) => {
      systemReadyItem && systemReadyItem(systemApp)
    })
    systemReadyList.forEach((systemReadyItem: any) => {
      systemReadyItem && systemReadyItem(systemApp)
    })
  }
  const createSystem = function () {
    const app: any = createApp()
    systemApp['app'] = app
    // 注册模块
    const systemModulesInit = function (modules: Array<SystemModule>) {
      modules.forEach((module) => {
        if (module.name) {
          saasModules.forEach((saasModuleItem: any) => {
            if (Reflect.has(saasModuleItem, `install${firstCase(module.name)}`)) {
              saasModuleInstalls.push(saasModuleItem[`install${firstCase(module.name)}`])
            }
          })
        }
        module.install && module.install(systemApp)
        if (module.installReady) {
          systemModuleReadyList.push(module.installReady)
        }
      })
    }
    systemModulesInit(systemModules)
    if (saasModuleInstalls.length !== 0) {
      const saasModuleReady = saasModuleInstalls.map(moduleItem => {
        return moduleItem(systemApp)
      })
      Promise.all(saasModuleReady).then((data) => {
        systemReady && systemReady(systemApp)
      }).catch((error) => {
        systemReady && systemReady(systemApp)
      })
    }
    return systemApp
  }
  createSystem.ready = function(callback: Function) {
    systemReadyList.push(callback)
  }
  createSystem.use = function(systemModule: SystemModule) {
    systemModules.push(systemModule)
  }
  createSystem.useSaas = function(saasModule: any) {
    saasModules.push(saasModule)
  }
  return createSystem
}