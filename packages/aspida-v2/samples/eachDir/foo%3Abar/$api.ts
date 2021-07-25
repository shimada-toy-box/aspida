/* $api.ts was generated by aspida@1.6.3 */
/* eslint-disable */
// prettier-ignore
import type { Methods as Methods0 } from '.'
// prettier-ignore
import type { Methods as Methods1 } from './[bar_id@string].json'
// prettier-ignore
import type { Methods as Methods2 } from './[fooId@number]%40create'

// prettier-ignore
type BasicHeaders = Record<string, string>

// prettier-ignore
type Params = {
  query?: any
  headers?: any
  body?: any
  init?: RequestInit
}

// prettier-ignore
const headersToObject = (headers: Headers): any =>
  [...headers.entries()].reduce((prev, [key, val]) => ({ ...prev, [key]: val }), {})

// prettier-ignore
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

// prettier-ignore
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

// prettier-ignore
const optionToRequest = (
  method: string,
  params?: Params,
  format?: BodyInit
): RequestInit => {
  if (!params) return { method }

  let body
  let headers: BasicHeaders = {}

  switch (format) {
    case undefined:
      break;
    case 'FormData':
      if (typeof FormData !== 'undefined') {
        body = appendDataToFormData(params.body, new FormData())
      } else {
        const formData = new (require('form-data'))()
        body = appendDataToFormData(params.body, formData)
        headers = formData.getHeaders()
      }
      break
    case 'URLSearchParams':
      body = dataToURLString(params.body)
      headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      break
    case 'ArrayBuffer':
    case 'string':
    case 'Blob':
      body = params.body
      break
    default:
      body = JSON.stringify(params.body)
      headers['Content-Type'] = 'application/json;charset=utf-8'
      break
  }

  return { ...params.init, method, body, headers: { ...headers, ...params.init?.headers, ...params.headers } }
}

// prettier-ignore
type ServerData = { status?: number; headers?: BasicHeaders; body?: any }

// prettier-ignore
const send = async <
  Success extends ServerData = { status: number; headers: BasicHeaders },
  Failure extends ServerData = { status: number; headers: BasicHeaders }
>(
  client: typeof fetch,
  method: string,
  baseURL: string,
  url: string,
  resType: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData' | 'void',
  errType: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData' | 'void',
  params?: Params,
  format?: BodyInit
): Promise<
  | { res: Success; err?: undefined }
  | { res?: undefined; err: { type: 'httpError'; data: Failure } }
  | { res?: undefined; err: { type: 'networkError'; data: TypeError } }
> => {
  try {
    const res = await client(
      `${baseURL}${url}${params?.query ? `?${dataToURLString(params.query)}` : ''}`,
      optionToRequest(method, params, format)
    )

    if (res.ok) {
      return {
        res: {
          status: res.status,
          headers: headersToObject(res.headers),
          body: resType === 'void' ? undefined : await res[resType]()
        } as Success
      }
    } else {
      return {
        err: {
          type: 'httpError',
          data: {
            status: res.status,
            headers: headersToObject(res.headers),
            body: errType === 'void' ? undefined : await res[errType]()
          } as Failure
        }
      }
    }
  } catch (e) {
    return { err: { type: 'networkError', data: e } }
  }
}

// prettier-ignore
export const createApi = (config?: { baseURL?: string; trailingSlash?: boolean; init?: RequestInit}) => {
  const f = typeof fetch !== 'undefined' ? fetch : require('node-fetch')
  const prefix = (config?.baseURL ?? '').replace(/\/$/, '')
  const PATH0 = '/foo:bar/'
  const PATH1 = '/'
  const GET = 'GET'

  return {
    _bar_id_json: (val0: string) => {
      const prefix0 = `${PATH0}${val0}.json`

      return {
        $get: (option?: { init?: RequestInit }) =>
          send<Methods1['get']['res']>(f, GET, prefix, `${prefix0}${PATH1}`, 'text', 'void', option),
        $path: () => `${prefix}${prefix0}${PATH1}`
      }
    },
    _fooId_create: (val0: number) => {
      const prefix0 = `${PATH0}${val0}@create`

      return {
        $get: (option?: { init?: RequestInit }) =>
          send<Methods2['get']['res']>(f, GET, prefix, `${prefix0}${PATH1}`, 'text', 'void', option),
        $path: () => `${prefix}${prefix0}${PATH1}`
      }
    },
    $get: (option?: { init?: RequestInit }) =>
      send<Methods0['get']['res']>(f, GET, prefix, PATH0, 'text', 'void', option),
    $path: () => `${prefix}${PATH0}`
  }
}
