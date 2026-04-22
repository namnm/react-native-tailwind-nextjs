/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { LoaderContext } from 'webpack'

import {
  cssVariablesFilenameRegex,
  transformCssVariables,
} from '@/devtools/webpack-css-variables/transform-css-variables'

export default function cssThemeLoader(
  this: LoaderContext<object>,
  src: string,
) {
  if (!cssVariablesFilenameRegex.test(this.resourcePath)) {
    throw new Error('Expected file name to match css variable regex pattern')
  }
  return transformCssVariables(src)
}
