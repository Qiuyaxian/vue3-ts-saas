export interface MockRequest {
  url: string
  method: string
  response?: Function
  rawResponse?: Function
}

export interface MockResopnseData {
  code: number
  results: any
  message: string
  errors: string
  customMockResopnse: any
}

export interface MockResopnse {
  code: number
  results: any
  message: string
  errors: string
   [k: string]: any
}
