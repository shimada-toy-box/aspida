/* $api.ts was generated by aspida@1.6.3 */
/* eslint-disable */
// prettier-ignore
import type { Methods as Methods0 } from '.'
// prettier-ignore
import type { Methods as Methods1 } from './2/[hogeId@number]'
// prettier-ignore
import type { Methods as Methods2 } from './2/[hogeId@string]/entries.json'
// prettier-ignore
import type { Methods as Methods3 } from './2/[hogeId@string]/test-4'
// prettier-ignore
import type { Methods as Methods4 } from './2/[hogeId@string]/test-4/[fugaId]'
// prettier-ignore
import type { Methods as Methods5 } from './2/[hogeId@string]/test-4/fuga aa'
// prettier-ignore
import type { Methods as Methods6 } from './2/[hogeId]'
// prettier-ignore
import type { Methods as Methods7 } from './3.1'
// prettier-ignore
import type { Methods as Methods8 } from './[articleId].json'
// prettier-ignore
import type { Methods as Methods9 } from './users/[userId@string]'

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
type ServerData = { status: number; headers: BasicHeaders; body?: any }

// prettier-ignore
type NormalizedResponse<Success extends ServerData, Failure extends ServerData> =
  | { isSuccess: true; stream: Response['body']; data: Success }
  | { isSuccess: false; isFailure: true; stream: Response['body']; data: Failure }
  | { isSuccess: false; isFailure: false; err: Error };

// prettier-ignore
const send = async <Success extends ServerData = { status: number; headers: BasicHeaders }, Failure extends ServerData = { status: number; headers: BasicHeaders }>(
  client: typeof fetch,
  method: string,
  baseURL: string,
  url: string,
  resType: 'json' | 'text' | 'arrayBuffer' | 'blob' | 'formData' | 'void',
  params?: Params,
  format?: BodyInit
): Promise<NormalizedResponse<Success, Failure>> => {
  try {
    const res = await client(
      `${baseURL}${url}${
        params?.query ? `?${dataToURLString(params.query)}` : ''
      }`,
      optionToRequest(method, params, format)
    )

    if (res.ok) {
      return {
        isSuccess: true,
        stream: res.body,
        data: {
          status: res.status,
          headers: headersToObject(res.headers),
          body: resType === 'void' ? undefined : await res[resType](),
        } as Success
      };
    } else {
      return {
        isSuccess: false,
        isFailure: true,
        stream: res.body,
        data: {
          status: res.status,
          headers: headersToObject(res.headers),
        } as Failure
      };
    }
  } catch (err) {
    return {
      isSuccess: false,
      isFailure: false,
      err,
    };
  }
}

// prettier-ignore
export const createApi = (config?: { baseURL?: string; trailingSlash?: boolean; init?: RequestInit}) => {
  const f = typeof fetch !== 'undefined' ? fetch : require('node-fetch')
  const prefix = (config?.baseURL ?? '').replace(/\/$/, '')
  const PATH0 = '/v1.1'
  const PATH1 = '/v1.1/2'
  const PATH2 = '/entries.json'
  const PATH3 = '/test-4'
  const PATH4 = '/test-4/fuga aa'
  const PATH5 = '/v1.1/3.1'
  const PATH6 = '/v1.1/users'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    $2: {
      hogeId_number: (val1: number) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          $get: (option: { query?: Methods1['get']['query'], headers: Methods1['get']['reqHeaders'], config?: RequestInit }) =>
            send<Methods1['get']['resBody']>(f, GET, prefix, prefix1, 'json', option),
          $path: (option?: { method?: 'get'; query: Methods1['get']['query'] }) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      },
      hogeId_string: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          entries_json: {
            $get: (option?: { config?: RequestInit }) =>
              send<Methods2['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH2}`, 'json', option),
            $path: () => `${prefix}${prefix1}${PATH2}`
          },
          test_4: {
            /**
             * _fugaId comment
             */
            fugaId: (val3: number | string) => {
              const prefix3 = `${prefix1}${PATH3}/${val3}`

              return {
                $get: (option?: { query?: Methods4['get']['query'], config?: RequestInit }) =>
                  send<Methods4['get']['resBody']>(f, GET, prefix, prefix3, 'json', option),
                $post: (option: { body?: Methods4['post']['reqBody'], query: Methods4['post']['query'], config?: RequestInit }) =>
                  send<Methods4['post']['resBody']>(f, POST, prefix, prefix3, 'json', option),
                $put: (option: { query: Methods4['put']['query'], config?: RequestInit }) =>
                  send<Methods4['put']['resBody']>(f, PUT, prefix, prefix3, 'json', option),
                /**
                 * _fugaId delete method
                 * @returns _fugaId resBody
                 */
                $delete: (option: { query: Methods4['delete']['query'], config?: RequestInit }) =>
                  send<Methods4['delete']['resBody']>(f, DELETE, prefix, prefix3, 'json', option),
                $path: (option?: { method?: 'get'; query: Methods4['get']['query'] } | { method: 'post'; query: Methods4['post']['query'] } | { method: 'put'; query: Methods4['put']['query'] } | { method: 'delete'; query: Methods4['delete']['query'] }) =>
                  `${prefix}${prefix3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              }
            },
            fuga_aa: {
              $get: (option: { query: Methods5['get']['query'], config?: RequestInit }) =>
                send<Methods5['get']['resBody']>(f, GET, prefix, `${prefix1}${PATH4}`, 'json', option),
              $post: (option: { body?: Methods5['post']['reqBody'], query: Methods5['post']['query'], config?: RequestInit }) =>
                send<Methods5['post']['resBody']>(f, POST, prefix, `${prefix1}${PATH4}`, 'json', option),
              $put: (option: { query: Methods5['put']['query'], config?: RequestInit }) =>
                send<Methods5['put']['resBody']>(f, PUT, prefix, `${prefix1}${PATH4}`, 'json', option),
              $delete: (option: { body: Methods5['delete']['reqBody'], query: Methods5['delete']['query'], config?: RequestInit }) =>
                send<Methods5['delete']['resBody']>(f, DELETE, prefix, `${prefix1}${PATH4}`, 'json', option),
              $path: (option?: { method?: 'get'; query: Methods5['get']['query'] } | { method: 'post'; query: Methods5['post']['query'] } | { method: 'put'; query: Methods5['put']['query'] } | { method: 'delete'; query: Methods5['delete']['query'] }) =>
                `${prefix}${prefix1}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            },
            $get: (option: { query: Methods3['get']['query'], config?: RequestInit }) =>
              send<void>(f, GET, prefix, `${prefix1}${PATH3}`, 'void', option),
            $post: (option?: { body?: Methods3['post']['reqBody'], query?: Methods3['post']['query'], config?: RequestInit }) =>
              send<void>(f, POST, prefix, `${prefix1}${PATH3}`, 'void', option),
            $put: (option?: { query?: Methods3['put']['query'], config?: RequestInit }) =>
              send<Methods3['put']['resBody']>(f, PUT, prefix, `${prefix1}${PATH3}`, 'json', option),
            $delete: (option: { query: Methods3['delete']['query'], config?: RequestInit }) =>
              send<Methods3['delete']['resBody']>(f, DELETE, prefix, `${prefix1}${PATH3}`, 'json', option),
            $path: (option?: { method?: 'get'; query: Methods3['get']['query'] } | { method: 'post'; query: Methods3['post']['query'] } | { method: 'put'; query: Methods3['put']['query'] } | { method: 'delete'; query: Methods3['delete']['query'] }) =>
              `${prefix}${prefix1}${PATH3}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      },
      hogeId: (val1: number | string) => {
        const prefix1 = `${PATH1}/${val1}`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods6['get']['resBody']>(f, GET, prefix, prefix1, 'json', option),
          $path: () => `${prefix}${prefix1}`
        }
      }
    },
    /**
     * 3.1 comment
     */
    $3_1: {
      /**
       * 3.1 get method comment
       * @param option.headers - 3.1 reqHeaders
       */
      $get: (option?: { query?: Methods7['get']['query'], headers?: Methods7['get']['reqHeaders'], config?: RequestInit }) =>
        send<Methods7['get']['resBody']>(f, GET, prefix, PATH5, 'json', option),
      $post: (option: { body?: Methods7['post']['reqBody'], query: Methods7['post']['query'], config?: RequestInit }) =>
        send<Methods7['post']['resBody']>(f, POST, prefix, PATH5, 'json', option, 'URLSearchParams'),
      $path: (option?: { method?: 'get'; query: Methods7['get']['query'] } | { method: 'post'; query: Methods7['post']['query'] }) =>
        `${prefix}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    articleId_json: (val0: number | string) => {
      const prefix0 = `${PATH0}/${val0}.json`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods8['get']['resBody']>(f, GET, prefix, prefix0, 'json', option),
        $path: () => `${prefix}${prefix0}`
      }
    },
    users: {
      userId: (val1: string) => {
        const prefix1 = `${PATH6}/${val1}`

        return {
          $get: (option: { query: Methods9['get']['query'], headers: Methods9['get']['reqHeaders'], config?: RequestInit }) =>
            send<Methods9['get']['resBody']>(f, GET, prefix, prefix1, 'json', option),
          $post: (option: { query: Methods9['post']['query'], config?: RequestInit }) =>
            send<Methods9['post']['resBody']>(f, POST, prefix, prefix1, 'json', option),
          $path: (option?: { method?: 'get'; query: Methods9['get']['query'] } | { method: 'post'; query: Methods9['post']['query'] }) =>
            `${prefix}${prefix1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
        }
      }
    },
    $get: (option?: { query?: Methods0['get']['query'], config?: RequestInit }) =>
      send<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(f, GET, prefix, PATH0, 'json', option),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] }) =>
      `${prefix}${PATH0}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

// prettier-ignore
export * from './../@constants'
// prettier-ignore
export const api = createApi()
