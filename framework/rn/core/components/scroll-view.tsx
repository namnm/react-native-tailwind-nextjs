/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ScrollViewPropsWocn } from '@/rn/core/components/without-class-name/scroll-view'
import { ScrollViewWocn } from '@/rn/core/components/without-class-name/scroll-view'
import type { ClassName } from '@/rn/core/tw/class-name'
import { createClassNameComponent } from '@/rn/core/tw/lib/create-class-name-component'

export type { ScrollViewRn } from '@/rn/core/components/without-class-name/scroll-view'

export type ScrollViewProps = ScrollViewPropsWocn & {
  className?: ClassName
  contentContainerClassName?: ClassName
}

export const ScrollView: FC<ScrollViewProps> = createClassNameComponent({
  ScrollViewWocn,
  extraClassNameKeys: ['contentContainerClassName'],
})
