import { AxiosRequestConfig, AxiosResponse } from 'axios'

import request from './axios-request'
// 倒入环境配置
import config from './config/index'
export const serviceRequest = request({
  baseURL: config.main.baseURL,
  withCredentials: false,
  transformRequestAdapter: (requestConfig: AxiosRequestConfig) => {
    return requestConfig
  }
})

export const userRequest = request({
  baseURL: config.main.baseURL,
  withCredentials: false,
  transformRequestAdapter: (requestConfig: AxiosRequestConfig) => {
    return requestConfig
  },
  transformResponseAdapter: (response: AxiosResponse) => {
    console.log(response.data, 'AxiosResponse')
    return response.data
  }
})