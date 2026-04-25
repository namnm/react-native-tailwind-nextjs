/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import Link from 'next/link'
import type { PropsWithChildren } from 'react'
import type { TextStyle } from 'react-native'

import { useCurrentLocaleUntyped } from '@/rn/core/i18n'
import { getDefaultLocaleUntyped } from '@/rn/core/i18n/config'
import { qsStableStringify } from '@/shared/qs'
import type { NonUndefinedKeys } from '@/shared/ts-utils'

export type LinkPropsWocn<
  Routes = any,
  Data = any,
  K extends keyof Routes = any,
  Q = K extends keyof Data ? Data[K] : never,
> = PropsWithChildren<{
  pathname: K
  scroll?: boolean
  style?: TextStyle
}> &
  (NonUndefinedKeys<Q> extends never ? { query?: Q } : { query: Q })

export const LinkUntypedWocn = async ({
  pathname,
  query,
  ...props
}: LinkPropsWocn) => {
  const locale = await useCurrentLocaleUntyped()
  if (locale !== getDefaultLocaleUntyped()) {
    pathname = `/${locale}${pathname}`
  }

  const q = query && qsStableStringify(query)
  const href = q ? `${pathname}?${q}` : pathname

  return <Link {...(props as any)} href={href} />
}
