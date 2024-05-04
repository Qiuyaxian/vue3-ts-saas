import isPlainObject from 'lodash/isPlainObject'

import type { ApiConfig, platformApiConfig, SystemApiConfig } from '~/types'

function _loadApiEnvConfig(env: string | undefined): ApiConfig | null {
  if (!env) return null
  const modules = import.meta.glob('./*.ts', { eager: true });
  const apiEnvConfigModules = Object.keys(modules).reduce((pre: any, cur) => {
    const envKey = cur.replace(/^(\.\/)(.*?)(\.ts)$/gi, '$2')
    const envConfig: any = modules[cur]
    if (!envConfig) return pre
    return {
      ...pre,
      [envKey]: {
        ...envConfig.default
      }
    }
  }, {})
  return apiEnvConfigModules[env]
}

function _normalizeApiConfig(originConfig: ApiConfig, env: string | undefined) {
  const finalConfig: platformApiConfig = {}
  const invalidConfig: any[] = []
  Object.entries(originConfig).forEach(([platform, config]) => {
    console.log(platform, 'platform')
    let normalizedConfig: SystemApiConfig | null = null
    if (typeof config === 'string') {
      normalizedConfig = { baseURL: config }
    } else if (isPlainObject(config)) {
      const { domain } = config
      if (domain) {
        normalizedConfig = {
          baseURL: domain,
          originConfig: config
        }
      }
    }
    if (normalizedConfig) {
      finalConfig[platform] = normalizedConfig
    } else {
      invalidConfig.push(platform)
    }
  })
  if (invalidConfig.length > 0) {
    throw Error(`Invalid api config (${env}): ${invalidConfig.join(', ')}`)
  }

  return finalConfig
}

const CONF_ENV: string | undefined = process.env.VUE_APP_ENV

const globalApiConfig = _loadApiEnvConfig(CONF_ENV)

if (!globalApiConfig) {
  throw Error(`${CONF_ENV} api 配置项不存在，请在 src/api.config/ 内配置。`)
}

const normalizedApiConfig = _normalizeApiConfig(globalApiConfig, CONF_ENV)
console.log(normalizedApiConfig, 'normalizedApiConfig')
export default normalizedApiConfig