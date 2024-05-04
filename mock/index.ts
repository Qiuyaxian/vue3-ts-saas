import { MockMethod } from 'vite-plugin-mock'
import userApi from './user'
import listApi from './list'

export default [
  ...userApi,
  ...listApi
] as MockMethod[]