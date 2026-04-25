/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import Image from 'react-native-fast-image'

import { createAnimatedComponent } from '@/rn/core/components/lib/create-animated-component'
import { isReanimated } from '@/rn/core/components/lib/is-reanimated'
import { renderReanimated } from '@/rn/core/components/lib/render-reanimated'
import { styleToProps } from '@/rn/core/components/lib/style-to-props'
import type { ImagePropsWocn } from '@/rn/core/components/without-class-name/image'

const styleProps = ['resizeMode']

export const ImageWocn = ({ src, ...props }: ImagePropsWocn) => {
  props = styleToProps(props, styleProps)
  const Component: any = isReanimated(props) ? AnimatedImage : Image
  const source = typeof src === 'string' ? { uri: src } : src

  return renderReanimated(Component, {
    ...props,
    source,
  })
}

const AnimatedImage = createAnimatedComponent(Image)
