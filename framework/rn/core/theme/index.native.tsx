/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import AsyncStorage from '@react-native-async-storage/async-storage'
import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'

import { themeCookieKey, toValidTheme } from '@/rn/core/theme/config'
import { useSafeContext } from '@/rn/core/utils/use-safe-context'

type ContextState = {
  v: string | undefined
  set: (v: string | undefined) => Promise<void>
}
const Context = createContext<ContextState | undefined>(undefined)

// this promise should be await before using the below provider
let initialTheme: string | undefined = undefined
export const themePromiseNative = AsyncStorage.getItem(themeCookieKey).then(
  v => {
    initialTheme = toValidTheme(v)
  },
)

export const useTheme = () => useSafeContext(Context).v
export const useSetTheme = () => useSafeContext(Context).set

export const ThemeProviderNative = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(initialTheme)

  const contextState: ContextState = {
    v: theme,
    set: v => {
      let p: Promise<void>
      v = toValidTheme(v)
      if (v !== undefined) {
        p = AsyncStorage.setItem(themeCookieKey, v)
      } else {
        p = AsyncStorage.removeItem(themeCookieKey)
      }
      initialTheme = v
      setTheme(v)
      return p
    },
  }

  return <Context value={contextState}>{children}</Context>
}
