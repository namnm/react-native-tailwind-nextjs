/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { FC } from 'react'

import type { TextPropsWocn } from '@/rn/core/components/without-class-name/text'
import { TextWocn } from '@/rn/core/components/without-class-name/text'
import type { ClassName } from '@/rn/core/tw/class-name'
import { createClassNameComponent } from '@/rn/core/tw/lib/create-class-name-component'

export type { TextRn } from '@/rn/core/components/without-class-name/text'

export type TextProps = TextPropsWocn & {
  className?: ClassName
}

export const Text: FC<TextProps> = createClassNameComponent({
  TextWocn,
})

export const H1: FC<TextProps> = props => (
  <Text {...props} accessibilityRole='header' aria-level='1' />
)
export const H2: FC<TextProps> = props => (
  <Text {...props} accessibilityRole='header' aria-level='2' />
)
export const H3: FC<TextProps> = props => (
  <Text {...props} accessibilityRole='header' aria-level='3' />
)
export const H4: FC<TextProps> = props => (
  <Text {...props} accessibilityRole='header' aria-level='4' />
)
export const H5: FC<TextProps> = props => (
  <Text {...props} accessibilityRole='header' aria-level='5' />
)
export const H6: FC<TextProps> = props => (
  <Text {...props} accessibilityRole='header' aria-level='6' />
)

export const Span: FC<TextProps> = props => <Text {...props} rnwTag='span' />
