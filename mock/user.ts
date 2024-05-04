import { MockMethod } from 'vite-plugin-mock'

import { createMockRequest } from './utils'

const mockInterfaceList = [
  createMockRequest({
    url: '/mock/user/getCurrentUser',
    method: 'get',
    response: () => {
      return {
        results: {
          avatar: 'http://localhost:3000/avatar.png',
          name: 'admin',
          age: 18
        }
      }
    }
  })
]

export default mockInterfaceList as MockMethod[]