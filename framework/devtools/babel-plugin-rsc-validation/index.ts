/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ConfigAPI, PluginObj } from '@babel/core'

import {
  getCallerIsServer,
  getIsServer,
} from '@/devtools/babel-config/is-server'
import { shouldTranspile } from '@/devtools/babel-config/should-transpile'

// Modules that are only allowed in React Server Components (RSC) / server context.
// Imports matching any entry will throw a build-time error in client bundles.
const SERVER_ONLY_MODULES: string[] = ['next*/headers', 'server-*']

const wildcardToRegex = (pattern: string) => {
  pattern = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')
  return new RegExp(`^${pattern}$`)
}
const serverOnlyRegexes = SERVER_ONLY_MODULES.map(wildcardToRegex)
const isServerOnly = (importPath: string) =>
  serverOnlyRegexes.some(r => r.test(importPath))

export const rscValidationPlugin = (api: ConfigAPI): PluginObj => {
  const callerIsServer = getCallerIsServer(api)

  return {
    visitor: {
      // use program path to get plugin pass and perform some checks before traverse
      // also prioritize this plugin over others such as react compiler
      Program: (programPath, pluginPass) => {
        const isServer = getIsServer(pluginPass, callerIsServer)
        if (isServer || !shouldTranspile(pluginPass.filename)) {
          return
        }

        programPath.traverse({
          ImportDeclaration: p => {
            const n = p.node
            if (n.importKind === 'type') {
              return
            }
            const importPath = n.source.value
            if (!isServerOnly(importPath)) {
              return
            }
            throw p.buildCodeFrameError(
              `"${importPath}" cannot be imported in a client bundle. This module is only allowed in React Server Components (RSC) or server-side code.`,
            )
          },
        })
      },
    },
  }
}
