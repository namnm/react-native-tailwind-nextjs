/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import AsyncStorage from '@react-native-async-storage/async-storage'
import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import { useColorScheme } from 'react-native'

import {
  darkModeCompose,
  darkModeCookieKey,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  toDarkModeState,
} from '@/rn/core/theme/config'
import { useSafeContext } from '@/rn/core/utils/use-safe-context'

type ContextState = {
  v: boolean | undefined
  set: (v: boolean | undefined) => Promise<void>
}
const Context = createContext<ContextState | undefined>(undefined)

// this promise should be await before using the below provider
let initialDarkMode: boolean | undefined = undefined
export const darkModePromiseNative = AsyncStorage.getItem(
  darkModeCookieKey,
).then(v => {
  initialDarkMode = darkModeToBolean(v)
})

export const useDarkModeUser = () => useSafeContext(Context).v
export const useSetDarkMode = () => useSafeContext(Context).set

export const DarkModeProviderNative = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode)

  const contextState: ContextState = {
    v: darkMode,
    set: v => {
      let p: Promise<void>
      if (v === true) {
        p = AsyncStorage.setItem(darkModeCookieKey, darkModeEnabled)
      } else if (v === false) {
        p = AsyncStorage.setItem(darkModeCookieKey, darkModeDisabled)
      } else {
        p = AsyncStorage.removeItem(darkModeCookieKey)
      }
      initialDarkMode = v
      setDarkMode(v)
      return p
    },
  }

  return <Context value={contextState}>{children}</Context>
}

export const useDarkModeStateNative = () => {
  const user = useDarkModeUser()
  const os = useColorScheme()
  return toDarkModeState(darkModeCompose(user, os))
}
