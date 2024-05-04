import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { SystemAxiosRequestConfig } from '~/types'

export default function HttpRequest(requestConfig: SystemAxiosRequestConfig = {}) {
  const {
    transformRequestAdapter = null ,
    transformResponseAdapter = null,
    ...axiosRequestConfig
  } = requestConfig
  const service: AxiosInstance = axios.create({
    withCredentials: true,
    responseType: 'json',
    ...axiosRequestConfig
  })

  service.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
      return typeof transformRequestAdapter === 'function' ? transformRequestAdapter(config) : config
    },
    (error: any) => Promise.reject(error)
  )

  // 拦截响应回调
  service.interceptors.response.use(
    (response: AxiosResponse): Promise<any> => {
      let rejectResponse: any = response
      if (typeof transformResponseAdapter === 'function') {
        rejectResponse = transformResponseAdapter(response)
      }
      if (Object.prototype.toString.call(rejectResponse) !== '[object Promise]') {
        return Promise.resolve(rejectResponse)
      }
      return Promise.resolve(response)
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  return service
}
