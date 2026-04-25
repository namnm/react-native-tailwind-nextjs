/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { useEffect } from 'react'
import type { ViewStyle } from 'react-native'
import {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import type { RippleProps } from '@/rn/components/ripple/config'
import {
  rippleDefaultBackground,
  rippleDurationMs,
} from '@/rn/components/ripple/config'
import { View } from '@/rn/core/components/view'

type RippleNativeProps = RippleProps & {
  style: ViewStyle
}

export const Ripple = (props: RippleNativeProps) => {
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  useEffect(() => {
    scale.value = 0
    opacity.value = 1
    scale.value = withTiming(1, {
      duration: rippleDurationMs,
      easing: Easing.out(Easing.ease),
    })
    opacity.value = withTiming(0, {
      duration: rippleDurationMs,
      easing: Easing.out(Easing.ease),
    })
  }, [opacity, scale])

  const animation = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }))

  return (
    <View
      {...props}
      pointerEvents='none'
      className={['absolute', rippleDefaultBackground, props.className]}
      reanimatedStyle={animation}
    />
  )
}
