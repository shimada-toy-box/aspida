/* $api.ts was generated by aspida@1.6.3 */
/* eslint-disable */
import type { Methods as Methods0 } from '.'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'PATCH' | 'OPTIONS'
type RequestType = 'FormData' | 'URLSearchParams' | 'ArrayBuffer' | 'Blob' | 'string' | 'any'
type HttpStatusOk = 200 | 201 | 202 | 203 | 204 | 205 | 206
type BasicHeaders = Record<string, string>

type AspidaRequest = {
  query?: any
  headers?: any
  httpBody?: any
  body?: any
  config?: RequestInit
}

type AspidaParams = {
  query?: any
  headers?: any
  body?: any
  config?: RequestInit
}

const headersToObject = (headers: Headers): any =>
  [...headers.entries()].reduce((prev, [key, val]) => ({ ...prev, [key]: val }), {})

const appendDataToFormData = (data: Record<string, any>, formData: FormData) => {
  Object.entries(data).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => formData.append(key, v))
    } else if (val != null) {
      formData.append(key, val)
    }
  })

  return formData
}

const dataToURLString = (data: Record<string, any>) => {
  const searchParams = new URLSearchParams()

  Object.entries(data).forEach(([key, val]) => {
    if (Array.isArray(val)) {
      val.forEach(v => searchParams.append(key, v))
    } else if (val != null) {
      searchParams.append(key, val)
    }
  })

  return searchParams.toString()
}

const hasFormData = typeof FormData !== 'undefined'

const optionToRequest = (
  option?: AspidaParams,
  type?: RequestType
): AspidaRequest | undefined => {
  if (option?.body === undefined) return option

  let httpBody
  let headers: BasicHeaders = {}

  switch (type) {
    case 'FormData':
      if (hasFormData) {
        httpBody = appendDataToFormData(option.body, new FormData())
      } else {
        const formData = new (require('form-data'))()
        httpBody = appendDataToFormData(option.body, formData)
        headers = formData.getHeaders()
      }
      break
    case 'URLSearchParams':
      httpBody = dataToURLString(option.body)
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      break
    case 'ArrayBuffer':
    case 'string':
    case 'Blob':
    case 'any':
      httpBody = option.body
      break
    default:
      httpBody = JSON.stringify(option.body)
      headers['Content-Type'] = 'application/json;charset=utf-8'
      break
  }

  return { httpBody, ...option, headers: { ...headers, ...option.headers } }
}

const send = async <T = void, U = BasicHeaders, V = HttpStatusOk>(
  client: typeof fetch,
  method: HttpMethod,
  baseURL: string,
  url: string,
  resType: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData' | 'void',
  params?: AspidaParams,
  type?: RequestType
) => {
  const request = optionToRequest(params, type)
  const res = await client(
    `${baseURL}${url}${
      request?.query ? `?${dataToURLString(request.query)}` : ''
    }`,
    {
      method,
      ...request?.config,
      body: request?.httpBody,
      headers: { ...request?.config?.headers, ...request?.headers }
    }
  )

  return {
    status: res.status as any,
    headers: headersToObject(res.headers),
    body: resType === 'void' ? undefined : await res[resType]()
  } as { status: V, headers: U, body: T }
}

/**
 * 3.1 comment
 */
const api = (init?: { baseURL?: string; fetch?: typeof fetch; config?: RequestInit}) => {
  const f = init?.fetch ?? fetch
  const prefix = (init?.baseURL ?? '').replace(/\/$/, '')
  const PATH0 = '/v1.1/3.1'
  const GET = 'GET'
  const POST = 'POST'

  return {
    /**
     * 3.1 get method comment
     * @param option.headers - 3.1 reqHeaders
     */
    $get: (option?: { query?: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: RequestInit }) =>
      send<Methods0['get']['resBody']>(f, GET, prefix, PATH0, 'json', option),
    $post: (option: { body?: Methods0['post']['reqBody'], query: Methods0['post']['query'], config?: RequestInit }) =>
      send<Methods0['post']['resBody']>(f, POST, prefix, PATH0, 'json', option, 'URLSearchParams'),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] } | { method: 'post'; query: Methods0['post']['query'] }) =>
      `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
