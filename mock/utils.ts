
import type { MockRequest, MockResopnseData, MockResopnse } from '../types'

export const createMockRequest = (request: MockRequest) => {
  const mockRequestServe: MockRequest = {
    url: request.url,
    method: request.method
  }
  // get
  if (request.response) {
    mockRequestServe.response = (...args: any[]) => {
      return createMockResopnse((request as any).response(args))
    }
  }
  // post异步操作[]
  if (request.rawResponse) {
    mockRequestServe.rawResponse = (req: any, res: any) => {
      return (request as any).rawResponse({
        req,
        res,
        createMockResopnse
      })
    }
  }
  return mockRequestServe
}

export const createMockResopnse = (data: MockResopnseData): MockResopnse => {
  return {
    code: data.code || 200,
    results: data.results || null,
    message: data.message ||'成功',
    errors: data.errors || null
  } as MockResopnse
}