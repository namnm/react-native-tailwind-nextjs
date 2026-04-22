/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ConfigAPI, PluginPass } from '@babel/core'

import { get } from '@/shared/lodash'

export const getIsServer = (
  pluginPass: PluginPass,
  callerIsServer: boolean | undefined,
): boolean | undefined => {
  const v: boolean | undefined = get(pluginPass.opts, 'isServer')
  if (typeof v === 'boolean') {
    return v
  }
  return callerIsServer
}

export const getCallerIsServer = (api: ConfigAPI): boolean | undefined => {
  let v: boolean | undefined = undefined
  // could be empty in traverse only mode without api
  if (typeof api?.caller !== 'function') {
    return
  }
  api.caller(c => {
    v = get(c, 'isServer')
    if (typeof v !== 'boolean') {
      v = undefined
    }
    return undefined
  })
  return v
}
