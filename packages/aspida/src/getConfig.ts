import fs from 'fs'
import path from 'path'

export type BaseConfig = {
  input: string
  baseURL: string
  trailingSlash: boolean
  outputEachDir: boolean
}

type ConfigFile = {
  input?: string
  baseURL?: string
  trailingSlash?: boolean
  outputEachDir?: boolean
}

const defaultConfig: BaseConfig = {
  input: ['apis', 'api'].find(input => fs.existsSync(input)) ?? 'apis',
  baseURL: '',
  trailingSlash: false,
  outputEachDir: false
}

export default (configPath = 'aspida.config.js'): BaseConfig[] => {
  if (fs.existsSync(configPath)) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const config: ConfigFile | ConfigFile[] = require(path.join(process.cwd(), configPath))

    return Array.isArray(config)
      ? config.map(c => ({ ...defaultConfig, ...c }))
      : [{ ...defaultConfig, ...config }]
  }

  return [{ ...defaultConfig }]
}
