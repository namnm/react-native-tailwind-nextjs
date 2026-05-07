'use client'

import type { TextInputProps } from '@/rn/components/input/text-input'
import { TextInput } from '@/rn/components/input/text-input'

export type NumberInputProps = TextInputProps

export const NumberInput = (props: NumberInputProps) => (
  <TextInput
    {...props}
    keyboardType='numeric'
    inputMode='numeric'
    autoCorrect={false}
    autoCapitalize='none'
  />
)
