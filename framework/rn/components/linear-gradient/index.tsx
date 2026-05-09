'use client'

// shamelessly copied from react-native-web-linear-gradient

import { useState } from 'react'
import type { LinearGradientProps as LinearGradientPropsWocn } from 'react-native-linear-gradient'

import type { ViewProps } from '@/rn/core/components/view'
import { View } from '@/rn/core/components/view'

export type LinearGradientProps = LinearGradientPropsWocn & ViewProps

export const LinearGradient = ({
  start = { x: 0.5, y: 0 },
  end = { x: 0.5, y: 1 },
  locations = [],
  colors = [],
  useAngle = false,
  angle = 0,
  style,
  onLayout,
  angleCenter,
  ...props
}: LinearGradientProps) => {
  const [size, setSize] = useState({
    width: 1,
    height: 1,
  })

  const onLayoutComposed: typeof onLayout = e => {
    setSize({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    })
    onLayout?.(e)
  }

  const rad = () =>
    Math.atan2(
      size.width * (end.y - start.y),
      size.height * (end.x - start.x),
    ) +
    Math.PI / 2
  const cssAngle = useAngle ? `${angle}deg` : `${rad()}rad`
  const cssColors = colors
    .map((c, i) => {
      const location = locations[i]
      return location ? `${c} ${location * 100}%` : c
    })
    .join(',')
  const bgStyle = {
    backgroundImage: `linear-gradient(${cssAngle},${cssColors})`,
  }

  return (
    <View
      {...props}
      style={[style, bgStyle as any]}
      onLayout={onLayoutComposed}
    />
  )
}
