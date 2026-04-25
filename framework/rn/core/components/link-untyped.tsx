/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ReactNode } from 'react'

import type { LinkPropsWocn } from '@/rn/core/components/without-class-name/link-untyped'
import { LinkUntypedWocn } from '@/rn/core/components/without-class-name/link-untyped'
import type { ClassName } from '@/rn/core/tw/class-name'
import { createClassNameComponent } from '@/rn/core/tw/lib/create-class-name-component'

export type LinkProps<
  Routes = any,
  Data = any,
  K extends keyof Routes = any,
  Q = K extends keyof Data ? Data[K] : never,
> = LinkPropsWocn<Routes, Data, K, Q> & {
  className?: ClassName
}

export type LinkComponent<Routes, Data> = <K extends keyof Routes>(
  p: LinkProps<Routes, Data, K>,
) => ReactNode

export const LinkUntyped = createClassNameComponent({
  LinkUntypedWocn,
})
