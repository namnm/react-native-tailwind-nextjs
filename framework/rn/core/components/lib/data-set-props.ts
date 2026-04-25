/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { dataPrefix } from '@/rn/core/components/lib/common-props'
import { camelCase } from '@/shared/lodash'
import type { StrMap } from '@/shared/ts-utils'

export const dataSetProps = (props: StrMap) => {
  const dataKeys = Object.keys(props).filter(k => k.startsWith(dataPrefix))
  if (!dataKeys.length) {
    return props
  }
  props.dataSet = {}
  for (const k of dataKeys) {
    const camel = camelCase(k.replace(dataPrefix, ''))
    props.dataSet[camel] = props[k]
    delete props[k]
  }
  return props
}
