/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { PropsWithChildren } from 'react'

import { useRipple } from '@/rn/components/ripple'
import type { PressableProps } from '@/rn/core/components/pressable'
import { Pressable } from '@/rn/core/components/pressable'
import { Text } from '@/rn/core/components/text'
import { View } from '@/rn/core/components/view'
import type { ClassName } from '@/rn/core/tw/class-name'
import type { Variant } from '@/rn/core/tw/cva'
import { cva } from '@/rn/core/tw/cva'
import { composeHandlers } from '@/rn/core/utils/compose-handlers'

const button = cva({
  classNames: {
    button:
      'group flex cursor-pointer select-none items-center justify-center gap-2 overflow-hidden transition',
    text: 'select-none font-medium',
    elevation: 'absolute inset-px translate-y-1 bg-secondary',
  },
  attributes: {
    type: {
      primary: {},
      secondary: {},
      accent: {},
      info: {},
      success: {},
      warning: {},
      error: {},
    },
    appearance: {
      solid: {},
    },
    size: {
      sm: {
        button: 'h-7 px-2',
        text: 'text-sm',
      },
      md: {
        button: 'h-9 px-4',
        text: 'text-base',
      },
      lg: {
        button: 'h-11 px-6',
        text: 'text-lg',
      },
      xl: {
        button: 'h-13 px-8',
        text: 'text-xl',
      },
      xxl: {
        button: 'h-15 px-10',
        text: 'text-2xl',
      },
    },
    shape: {
      rounded: {
        button: 'rounded-md',
        elevation: 'rounded-md',
      },
      pill: {
        button: 'rounded-full',
        elevation: 'rounded-full',
      },
    },
    elevation: {
      true: {
        button: 'active:translate-y-0.5',
      },
    },
  },
  defaultVariant: {
    type: 'primary',
    appearance: 'solid',
    size: 'md',
    shape: 'rounded',
  },
  compoundVariants: [
    {
      type: 'primary',
      appearance: 'solid',
      classNames: {
        button: 'bg-primary hover:bg-primary-600 active:bg-primary-600',
        text: 'text-primary-foreground',
      },
    },
    {
      type: 'secondary',
      appearance: 'solid',
      classNames: {
        button: 'bg-secondary hover:bg-secondary-600 active:bg-secondary-600',
        text: 'text-secondary-foreground',
      },
    },
    {
      type: 'accent',
      appearance: 'solid',
      classNames: {
        button: 'bg-accent hover:bg-accent-600 active:bg-accent-600',
        text: 'text-accent-foreground',
      },
    },
    {
      type: 'info',
      appearance: 'solid',
      classNames: {
        button: 'bg-info hover:bg-info-600 active:bg-info-600',
        text: 'text-info-foreground',
      },
    },
    {
      type: 'success',
      appearance: 'solid',
      classNames: {
        button: 'bg-success hover:bg-success-600 active:bg-success-600',
        text: 'text-success-foreground',
      },
    },
    {
      type: 'warning',
      appearance: 'solid',
      classNames: {
        button: 'bg-warning hover:bg-warning-600 active:bg-warning-600',
        text: 'text-warning-foreground',
      },
    },
    {
      type: 'error',
      appearance: 'solid',
      classNames: {
        button: 'bg-error hover:bg-error-600 active:bg-error-600',
        text: 'text-error-foreground',
      },
    },
  ],
})

export type ButtonProps = Variant<typeof button> &
  Omit<PressableProps, 'children'> &
  PropsWithChildren<{
    elevation?: boolean
    elevationClassName?: ClassName
    ripple?: boolean
    rippleClassName?: ClassName
  }>

export const Button = ({
  type,
  appearance,
  size,
  shape,
  className,
  children,
  elevation = true,
  elevationClassName,
  ripple = true,
  rippleClassName,
  ...props
}: ButtonProps) => {
  const cn = button({
    type,
    appearance,
    size,
    shape,
    elevation,
  })

  const [jsxRipples, propsForRipples] = useRipple({
    className: rippleClassName,
  })
  if (ripple) {
    props = composeHandlers(props, propsForRipples)
  }

  const pressable = (
    <Pressable {...props} className={[cn.button, className]}>
      {ripple && jsxRipples}
      <Text className={cn.text}>{children}</Text>
    </Pressable>
  )

  if (!elevation) {
    return pressable
  }

  return (
    <View>
      <View className={[cn.elevation, elevationClassName]} />
      {pressable}
    </View>
  )
}
