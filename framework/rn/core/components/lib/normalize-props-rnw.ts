/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { omitRnwProps } from '@/rn/core/components/lib/common-props'
import { dataSetProps } from '@/rn/core/components/lib/data-set-props'
import { omit } from '@/shared/lodash'
import type { StrMap } from '@/shared/ts-utils'

export const normalizePropsRnw = (props: StrMap): any => {
  props = omit(props, omitRnwProps)
  props = dataSetProps(props)
  return props
}
