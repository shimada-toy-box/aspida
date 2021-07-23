/* $api.ts was generated by aspida@1.6.3 */
/* eslint-disable */
// prettier-ignore
import type { Methods as Methods0 } from '.'
// prettier-ignore
import type { Methods as Methods1 } from './[sampleId@number].json'
// prettier-ignore
import type { Methods as Methods2 } from './foo%3Abar'
// prettier-ignore
import type { Methods as Methods3 } from './foo%3Abar/[bar_id@string].json'
// prettier-ignore
import type { Methods as Methods4 } from './foo%3Abar/[fooId@number]%40create'
// prettier-ignore
import type { Methods as Methods5 } from './v1.1'
// prettier-ignore
import type { Methods as Methods6 } from './v1.1/2/[hogeId@number]'
// prettier-ignore
import type { Methods as Methods7 } from './v1.1/2/[hogeId@string]/entries.json'
// prettier-ignore
import type { Methods as Methods8 } from './v1.1/2/[hogeId@string]/test-4'
// prettier-ignore
import type { Methods as Methods9 } from './v1.1/2/[hogeId@string]/test-4/[fugaId]'
// prettier-ignore
import type { Methods as Methods10 } from './v1.1/2/[hogeId@string]/test-4/fuga aa'
// prettier-ignore
import type { Methods as Methods11 } from './v1.1/2/[hogeId]'
// prettier-ignore
import type { Methods as Methods12 } from './v1.1/3.1'
// prettier-ignore
import type { Methods as Methods13 } from './v1.1/[articleId].json'
// prettier-ignore
import type { Methods as Methods14 } from './v1.1/users/[userId@string]'
// prettier-ignore
import type { Methods as Methods15 } from './v2.0'

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
  const prefix = (config?.baseURL ?? 'https://example.com/api/').replace(/\/$/, '')
  const PATH0 = '/foo:bar'
  const PATH1 = '/v1.1'
  const PATH2 = '/v1.1/2'
  const PATH3 = '/entries.json'
  const PATH4 = '/test-4'
  const PATH5 = '/test-4/fuga aa'
  const PATH6 = '/v1.1/3.1'
  const PATH7 = '/v1.1/users'
  const PATH8 = '/v2.0'
  const GET = 'GET'
  const POST = 'POST'
  const PUT = 'PUT'
  const DELETE = 'DELETE'

  return {
    sampleId_json: (val0: number) => {
      const prefix0 = `/${val0}.json`

      return {
        $get: (option?: { config?: RequestInit }) =>
          send<Methods1['get']['resBody']>(f, GET, prefix, prefix0, 'json', option),
        $path: () => `${prefix}${prefix0}`
      }
    },
    foo_bar: {
      bar_id_json: (val1: string) => {
        const prefix1 = `${PATH0}/${val1}.json`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods3['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      fooId_create: (val1: number) => {
        const prefix1 = `${PATH0}/${val1}@create`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods4['get']['resBody']>(f, GET, prefix, prefix1, 'text', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      $get: (option?: { config?: RequestInit }) =>
        send<Methods2['get']['resBody']>(f, GET, prefix, PATH0, 'text', option),
      $path: () => `${prefix}${PATH0}`
    },
    v1_1: {
      $2: {
        hogeId_number: (val2: number) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            $get: (option: { query?: Methods6['get']['query'], headers: Methods6['get']['reqHeaders'], config?: RequestInit }) =>
              send<Methods6['get']['resBody']>(f, GET, prefix, prefix2, 'json', option),
            $path: (option?: { method?: 'get'; query: Methods6['get']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        },
        hogeId_string: (val2: string) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            entries_json: {
              $get: (option?: { config?: RequestInit }) =>
                send<Methods7['get']['resBody']>(f, GET, prefix, `${prefix2}${PATH3}`, 'json', option),
              $path: () => `${prefix}${prefix2}${PATH3}`
            },
            test_4: {
              fugaId: (val4: number | string) => {
                const prefix4 = `${prefix2}${PATH4}/${val4}`

                return {
                  $get: (option?: { query?: Methods9['get']['query'], config?: RequestInit }) =>
                    send<Methods9['get']['resBody']>(f, GET, prefix, prefix4, 'json', option),
                  $post: (option: { body?: Methods9['post']['reqBody'], query: Methods9['post']['query'], config?: RequestInit }) =>
                    send<Methods9['post']['resBody']>(f, POST, prefix, prefix4, 'json', option),
                  $put: (option: { query: Methods9['put']['query'], config?: RequestInit }) =>
                    send<Methods9['put']['resBody']>(f, PUT, prefix, prefix4, 'json', option),
                  $delete: (option: { query: Methods9['delete']['query'], config?: RequestInit }) =>
                    send<Methods9['delete']['resBody']>(f, DELETE, prefix, prefix4, 'json', option),
                  $path: (option?: { method?: 'get'; query: Methods9['get']['query'] } | { method: 'post'; query: Methods9['post']['query'] } | { method: 'put'; query: Methods9['put']['query'] } | { method: 'delete'; query: Methods9['delete']['query'] }) =>
                    `${prefix}${prefix4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
                }
              },
              fuga_aa: {
                $get: (option: { query: Methods10['get']['query'], config?: RequestInit }) =>
                  send<Methods10['get']['resBody']>(f, GET, prefix, `${prefix2}${PATH5}`, 'json', option),
                $post: (option: { body?: Methods10['post']['reqBody'], query: Methods10['post']['query'], config?: RequestInit }) =>
                  send<Methods10['post']['resBody']>(f, POST, prefix, `${prefix2}${PATH5}`, 'json', option),
                $put: (option: { query: Methods10['put']['query'], config?: RequestInit }) =>
                  send<Methods10['put']['resBody']>(f, PUT, prefix, `${prefix2}${PATH5}`, 'json', option),
                $delete: (option: { body: Methods10['delete']['reqBody'], query: Methods10['delete']['query'], config?: RequestInit }) =>
                  send<Methods10['delete']['resBody']>(f, DELETE, prefix, `${prefix2}${PATH5}`, 'json', option),
                $path: (option?: { method?: 'get'; query: Methods10['get']['query'] } | { method: 'post'; query: Methods10['post']['query'] } | { method: 'put'; query: Methods10['put']['query'] } | { method: 'delete'; query: Methods10['delete']['query'] }) =>
                  `${prefix}${prefix2}${PATH5}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
              },
              $get: (option: { query: Methods8['get']['query'], config?: RequestInit }) =>
                send<void>(f, GET, prefix, `${prefix2}${PATH4}`, 'void', option),
              $post: (option?: { body?: Methods8['post']['reqBody'], query?: Methods8['post']['query'], config?: RequestInit }) =>
                send<void>(f, POST, prefix, `${prefix2}${PATH4}`, 'void', option),
              $put: (option?: { query?: Methods8['put']['query'], config?: RequestInit }) =>
                send<Methods8['put']['resBody']>(f, PUT, prefix, `${prefix2}${PATH4}`, 'json', option),
              $delete: (option: { query: Methods8['delete']['query'], config?: RequestInit }) =>
                send<Methods8['delete']['resBody']>(f, DELETE, prefix, `${prefix2}${PATH4}`, 'json', option),
              $path: (option?: { method?: 'get'; query: Methods8['get']['query'] } | { method: 'post'; query: Methods8['post']['query'] } | { method: 'put'; query: Methods8['put']['query'] } | { method: 'delete'; query: Methods8['delete']['query'] }) =>
                `${prefix}${prefix2}${PATH4}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
            }
          }
        },
        hogeId: (val2: number | string) => {
          const prefix2 = `${PATH2}/${val2}`

          return {
            $get: (option?: { config?: RequestInit }) =>
              send<Methods11['get']['resBody']>(f, GET, prefix, prefix2, 'json', option),
            $path: () => `${prefix}${prefix2}`
          }
        }
      },
      $3_1: {
        $get: (option?: { query?: Methods12['get']['query'], headers?: Methods12['get']['reqHeaders'], config?: RequestInit }) =>
          send<Methods12['get']['resBody']>(f, GET, prefix, PATH6, 'json', option),
        $post: (option: { body?: Methods12['post']['reqBody'], query: Methods12['post']['query'], config?: RequestInit }) =>
          send<Methods12['post']['resBody']>(f, POST, prefix, PATH6, 'json', option, 'URLSearchParams'),
        $path: (option?: { method?: 'get'; query: Methods12['get']['query'] } | { method: 'post'; query: Methods12['post']['query'] }) =>
          `${prefix}${PATH6}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
      },
      articleId_json: (val1: number | string) => {
        const prefix1 = `${PATH1}/${val1}.json`

        return {
          $get: (option?: { config?: RequestInit }) =>
            send<Methods13['get']['resBody']>(f, GET, prefix, prefix1, 'json', option),
          $path: () => `${prefix}${prefix1}`
        }
      },
      users: {
        userId: (val2: string) => {
          const prefix2 = `${PATH7}/${val2}`

          return {
            $get: (option: { query: Methods14['get']['query'], headers: Methods14['get']['reqHeaders'], config?: RequestInit }) =>
              send<Methods14['get']['resBody']>(f, GET, prefix, prefix2, 'json', option),
            $post: (option: { query: Methods14['post']['query'], config?: RequestInit }) =>
              send<Methods14['post']['resBody']>(f, POST, prefix, prefix2, 'json', option),
            $path: (option?: { method?: 'get'; query: Methods14['get']['query'] } | { method: 'post'; query: Methods14['post']['query'] }) =>
              `${prefix}${prefix2}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
          }
        }
      },
      $get: (option?: { query?: Methods5['get']['query'], config?: RequestInit }) =>
        send<Methods5['get']['resBody'], BasicHeaders, Methods5['get']['status']>(f, GET, prefix, PATH1, 'json', option),
      $path: (option?: { method?: 'get'; query: Methods5['get']['query'] }) =>
        `${prefix}${PATH1}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    v2_0: {
      $get: (option: { query: Methods15['get']['query'], headers: Methods15['get']['reqHeaders'], config?: RequestInit }) =>
        send<Methods15['get']['resBody'], Methods15['get']['resHeaders'], Methods15['get']['status']>(f, GET, prefix, PATH8, 'text', option),
      $path: (option?: { method?: 'get'; query: Methods15['get']['query'] }) =>
        `${prefix}${PATH8}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
    },
    $get: (option?: { query?: Methods0['get']['query'], headers?: Methods0['get']['reqHeaders'], config?: RequestInit }) =>
      send<Methods0['get']['resBody']>(f, GET, prefix, '', 'formData', option),
    $post: (option: { body: Methods0['post']['reqBody'], query: Methods0['post']['query'], headers?: Methods0['post']['reqHeaders'], config?: RequestInit }) =>
      send<Methods0['post']['resBody']>(f, POST, prefix, '', 'arrayBuffer', option),
    $put: (option: { query: Methods0['put']['query'], config?: RequestInit }) =>
      send<Methods0['put']['resBody'], Methods0['put']['resHeaders'], Methods0['put']['status']>(f, PUT, prefix, '', 'json', option),
    $delete: (option: { query: Methods0['delete']['query'], config?: RequestInit }) =>
      send<void, Methods0['delete']['resHeaders'], Methods0['delete']['status']>(f, DELETE, prefix, '', 'void', option),
    $path: (option?: { method?: 'get'; query: Methods0['get']['query'] } | { method: 'post'; query: Methods0['post']['query'] } | { method: 'put'; query: Methods0['put']['query'] } | { method: 'delete'; query: Methods0['delete']['query'] }) =>
      `${prefix}${option && option.query ? `?${dataToURLString(option.query)}` : ''}`
  }
}

// prettier-ignore
export * from './@types'
// prettier-ignore
export const api = createApi()
