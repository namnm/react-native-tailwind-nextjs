/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ViewProps } from '@/rn/core/components/view'
import { View } from '@/rn/core/components/view'
import { useSafeAreaPadding } from '@/rn/core/utils/use-safe-area'

export const SafeAreaView = (props: ViewProps) => {
  const padding = useSafeAreaPadding()
  return <View {...props} className={[padding, props.className]} />
}
