/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { omitNativeProps } from '@/rn/core/components/lib/common-props'
import { styleToProps } from '@/rn/core/components/lib/style-to-props'
import { omitBy } from '@/shared/lodash'
import type { StrMap } from '@/shared/ts-utils'

export const normalizePropsNative = (
  props: StrMap,
  styleProps?: string[],
): any => {
  props = omitBy(props, omitNativeProps)
  props = styleToProps(props, styleProps)
  return props
}
