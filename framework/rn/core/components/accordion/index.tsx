/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import type { ComponentProps, ReactElement, ReactNode } from 'react'
import {
  Children,
  cloneElement,
  createContext,
  Fragment,
  useState,
} from 'react'
import type { LayoutChangeEvent } from 'react-native'

import type { PressableProps } from '@/rn/core/components/base/pressable'
import { Pressable } from '@/rn/core/components/base/pressable'
import { Text } from '@/rn/core/components/base/text'
import type { ViewProps } from '@/rn/core/components/base/view'
import { View } from '@/rn/core/components/base/view'
import { useControllableState } from '@/rn/core/utils/use-controllable-state'
import { useSafeContext } from '@/rn/core/utils/use-safe-context'

// ------------------------------------------------------------------------------------- //
// Contexts
// ------------------------------------------------------------------------------------- //

type AccordionContextType = {
  value: string | string[]
  setValue: (value: string) => void
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
)
const useAccordionCtx = () => useSafeContext(AccordionContext)

// ------------------------------------------------

type AccordionItemContextType = {
  open: boolean
  value: string
  firstItem: boolean
}

const AccordionItemContext = createContext<
  AccordionItemContextType | undefined
>(undefined)
const useAccordionItemCtx = () => useSafeContext(AccordionItemContext)

// ------------------------------------------------------------------------------------- //
// Accordion Root
// ------------------------------------------------------------------------------------- //

export type AccordionProps =
  | {
      type: 'single'
      defaultValue?: string
      value?: string
      onValueChange?: (value: string) => void
      children: ReactNode
    }
  | {
      type: 'multiple'
      defaultValue?: string[]
      value?: string[]
      onValueChange?: (value: string[]) => void
      children: ReactNode
    }

export const Accordion = ({
  type,
  value: propValue,
  onValueChange,
  defaultValue,
  children,
}: AccordionProps) => {
  const [value, setValue] = useControllableState<string | string[]>({
    value: propValue,
    defaultValue,
    onChange: v => {
      if (type === 'single' && typeof v !== 'string') {
        return
      }
      if (type === 'multiple' && !Array.isArray(v)) {
        return
      }
      onValueChange?.(v as any)
    },
  })

  const handleValueChange = (itemValue: string) => {
    if (type === 'single') {
      setValue(prev => (prev === itemValue ? '' : itemValue))
      return
    }
    setValue(prev => {
      const prevArr = Array.isArray(prev) ? prev : []
      if (prevArr.includes(itemValue)) {
        return prevArr.filter(v => v !== itemValue)
      }
      return [...prevArr, itemValue]
    })
  }

  return (
    <AccordionContext.Provider value={{ value, setValue: handleValueChange }}>
      {Children.toArray(children).map((child, index) =>
        cloneElement(child as ReactElement<any>, {
          __firstItem: index === 0,
        }),
      )}
    </AccordionContext.Provider>
  )
}

// ------------------------------------------------------------------------------------- //
// AccordionItem
// ------------------------------------------------------------------------------------- //

export type AccordionItemProps = ViewProps & {
  __firstItem?: boolean
  value: string
}

export const AccordionItem = ({
  value,
  children,
  __firstItem,
  ...props
}: AccordionItemProps) => {
  const ctx = useAccordionCtx()
  const open = (Array.isArray(ctx.value) ? ctx.value : [ctx.value]).includes(
    value,
  )

  return (
    <AccordionItemContext.Provider
      value={{ open, value, firstItem: __firstItem || false }}
    >
      <View {...props}>{children}</View>
    </AccordionItemContext.Provider>
  )
}

// ------------------------------------------------------------------------------------- //
// AccordionTrigger
// ------------------------------------------------------------------------------------- //

export type AccordionTriggerProps = Omit<PressableProps, 'children'> & {
  children: ((open: boolean) => ReactNode) | ReactNode
}

export const AccordionTrigger = ({
  children,
  disabled,
  ...props
}: AccordionTriggerProps) => {
  const { setValue } = useAccordionCtx()
  const { open, value, firstItem } = useAccordionItemCtx()

  const handlePress: PressableProps['onPress'] = e => {
    setValue(value)
    props.onPress?.(e)
  }

  const renderChildren = () => {
    if (typeof children === 'function') {
      return children(open)
    }

    return (
      <Fragment>
        {children}
        <View
          className='transition-[transform]'
          style={{ transform: [{ rotate: open ? '270deg' : '90deg' }] }}
        >
          <Text>R</Text>
        </View>
      </Fragment>
    )
  }

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      className={[
        'bg-main flex cursor-pointer flex-row items-center justify-between px-4 py-3 transition',
        !firstItem && 'border-subtle border-t',
        disabled && 'opacity-50',
        props.className,
      ]}
    >
      {renderChildren()}
    </Pressable>
  )
}

// ------------------------------------------------------------------------------------- //
// AccordionContent
// ------------------------------------------------------------------------------------- //

export type AccordionContentProps = ComponentProps<typeof View>

export const AccordionContent = ({
  children,
  ...props
}: AccordionContentProps) => {
  const { open } = useAccordionItemCtx()
  const [contentHeight, setContentHeight] = useState(0)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout
    setContentHeight(height)
  }

  return (
    <View
      className='relative overflow-hidden transition-[height] duration-200'
      style={
        open && !contentHeight
          ? undefined
          : { height: open ? contentHeight : 0 }
      }
    >
      <View
        onLayout={handleLayout}
        className={[
          'pointer-events-none absolute top-0 left-0 -z-10 px-4 pb-3 opacity-0',
          props.className,
        ]}
      >
        {children}
      </View>
      <View
        {...props}
        className={['bg-main px-4 pb-3 transition', props.className]}
      >
        {children}
      </View>
    </View>
  )
}
