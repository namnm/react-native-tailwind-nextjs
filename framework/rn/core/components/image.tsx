/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { ImagePropsWocn } from '@/rn/core/components/without-class-name/image'
import { ImageWocn } from '@/rn/core/components/without-class-name/image'
import type { ClassName } from '@/rn/core/tw/class-name'
import { createClassNameComponent } from '@/rn/core/tw/lib/create-class-name-component'

export type ImageProps = ImagePropsWocn & {
  className?: ClassName
}

export const Image: FC<ImageProps> = createClassNameComponent({
  ImageWocn,
})
