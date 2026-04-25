/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import { Link } from '@react-navigation/native'

import type { LinkPropsWocn } from '@/rn/core/components/base/without-class-name/link-untyped'
import { omit } from '@/shared/lodash'

const webProps: (keyof LinkPropsWocn)[] = ['scroll']

export const LinkUntypedWocn = ({ pathname, query, ...props }: any) => {
  props = omit(props, webProps)
  return <Link {...props} screen={pathname} params={query} />
}
