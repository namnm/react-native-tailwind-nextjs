/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import { useColorScheme } from 'react-native'

import {
  darkModeCompose,
  darkModeCookieKey,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  toClassNameDarkModeState,
} from '@/rn/core/theme/dark-mode-config'
import { useSafeContext } from '@/rn/core/utils/use-safe-context'
import { mmkv } from '@/rn/mmkv'

type ContextState = {
  v: boolean | undefined
  set: (v: boolean | undefined) => void
}
const Context = createContext<ContextState | undefined>(undefined)

// this promise should be await before using the below provider
let initialDarkMode: boolean | undefined = undefined
export const initDarkModeNative = async () => {
  initialDarkMode = darkModeToBolean(mmkv.getString(darkModeCookieKey))
}

export const useDarkModeUser = () => useSafeContext(Context).v
export const useSetDarkMode = () => useSafeContext(Context).set

export const DarkModeProviderNative = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode)

  const contextState: ContextState = {
    v: darkMode,
    set: v => {
      if (v === true) {
        mmkv.set(darkModeCookieKey, darkModeEnabled)
      } else if (v === false) {
        mmkv.set(darkModeCookieKey, darkModeDisabled)
      } else {
        mmkv.remove(darkModeCookieKey)
      }
      initialDarkMode = v
      setDarkMode(v)
    },
  }

  return <Context value={contextState}>{children}</Context>
}

export const useDarkModeStateNative = () => {
  const user = useDarkModeUser()
  const os = useColorScheme()
  return toClassNameDarkModeState(darkModeCompose(user, os))
}
