/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { asyncHookPlugin } from '@/devtools/babel-plugin-async-hook'
import { clientExtensionPlugin } from '@/devtools/babel-plugin-client-extension'
import { rscValidationPlugin } from '@/devtools/babel-plugin-rsc-validation'
import { twPlugin } from '@/devtools/babel-plugin-tw'
import { getAlias } from '@/devtools/ts/get-alias'
import { path } from '@/nodejs/path'

type Options = {
  dir: string
  target: 'rn' | 'nextjs'
  twrncConfig?: object
  twExtractOutputPath?: string
}

export const config = ({
  dir,
  target,
  twrncConfig = require(path.join(dir, './src/twrnc')),
  twExtractOutputPath = dir,
}: Options) => {
  const twOptions = {
    twrncConfig,
    extractOutputPath: twExtractOutputPath,
  }

  if (target === 'nextjs') {
    const clientExtensionOptions = {
      alias: getAlias(dir),
    }

    return {
      plugins: [
        rscValidationPlugin,
        [clientExtensionPlugin, clientExtensionOptions],
        asyncHookPlugin,
        [twPlugin, twOptions],
        require.resolve('react-native-worklets/plugin'),
      ],
      presets: [
        require.resolve('@babel/preset-typescript'),
        [require.resolve('@babel/preset-react'), { runtime: 'automatic' }],
      ],
      compact: false,
    }
  }

  const moduleResolverOptions = {
    alias: getAlias(dir, {
      relative: true,
    }),
  }

  const extraOptions = {
    isServer: false,
  }
  const asyncHookOptions = extraOptions
  Object.assign(twOptions, extraOptions)

  return {
    plugins: [
      rscValidationPlugin,
      [asyncHookPlugin, asyncHookOptions],
      [twPlugin, twOptions],
      [require.resolve('babel-plugin-module-resolver'), moduleResolverOptions],
      require.resolve('react-native-worklets/plugin'),
    ],
    presets: [require.resolve('@react-native/babel-preset')],
    compact: false,
  }
}
