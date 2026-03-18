/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { useCallback, useRef, useState } from 'react'

type UseControllableStateProps<T> = {
  value?: T
  onChange?: (value: T) => void
  defaultValue?: T
}

export const useControllableState = <T>({
  value,
  onChange,
  defaultValue,
}: UseControllableStateProps<T>) => {
  const [_state, _setState] = useState<T | undefined>(defaultValue)

  const isControlled = value !== undefined
  const controlledRef = useRef(isControlled)

  if (process.env.NODE_ENV !== 'production') {
    if (controlledRef.current !== isControlled) {
      console.warn(
        `useControllableState: component switched from ${
          controlledRef.current ? 'controlled' : 'uncontrolled'
        } to ${isControlled ? 'controlled' : 'uncontrolled'} mode`,
      )
      controlledRef.current = isControlled
    }
  }

  const state = isControlled ? value : _state
  const setState = useCallback(
    (v: T | ((prev: T) => T)) => {
      const nextValue =
        typeof v === 'function' ? (v as (prev: T) => T)(state as T) : v

      if (!isControlled) {
        _setState(nextValue)
      }
      onChange?.(nextValue)
    },
    [isControlled, onChange, state],
  )

  return [state as T, setState] as const
}
