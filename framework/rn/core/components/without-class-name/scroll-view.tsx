/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type {
  NativeMethods,
  ScrollViewComponent,
  ScrollViewProps,
} from 'react-native'
import { ScrollView } from 'react-native'

import type { CommonProps } from '@/rn/core/components/lib/common-props'
import { normalizePropsRnw } from '@/rn/core/components/lib/normalize-props-rnw'
import type { StrMap } from '@/shared/ts-utils'

export type ScrollViewPropsWocn = CommonProps<ScrollViewRn> & ScrollViewProps

// export native type for ref
export type ScrollViewRn = ScrollViewComponent & NativeMethods

export const ScrollViewWocn = (props: StrMap) => {
  props = normalizePropsRnw(props)
  return <ScrollView {...props} />
}
