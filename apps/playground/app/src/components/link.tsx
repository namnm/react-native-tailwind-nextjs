/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { LinkComponent } from '@/rn/core/components/link-untyped'
import { LinkUntyped } from '@/rn/core/components/link-untyped'
import type { Routes, RoutesData } from '#/pages/routes'

export const Link = LinkUntyped as LinkComponent<Routes, RoutesData>
