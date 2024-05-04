import { AxiosRequestConfig } from 'axios'

export interface SystemAxiosRequestConfig extends AxiosRequestConfig {
  // 发送前
  transformRequestAdapter?: Function
  // 响应后
  transformResponseAdapter?: Function
}

export interface ApiConfig {
  domain: string
  [k: string]: any
}

export interface SystemApiConfig extends AxiosRequestConfig {
  originConfig?: any
}

export interface platformApiConfig {
  [k: string]: SystemApiConfig
}
