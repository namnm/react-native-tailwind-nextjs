import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'

import {
  darkModeCookieKey,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
} from '@/rn/core/dark-mode/config'
import { useSafeContext } from '@/rn/core/utils/use-safe-context'
import { storage } from '@/rn/storage'

type ContextState = {
  v: boolean | undefined
  set: (v: boolean | undefined) => void
}
const Context = createContext<ContextState | undefined>(undefined)

// this promise should be await before using the below provider
let initialDarkMode: boolean | undefined = undefined
export const initDarkModeNative = async () => {
  const v = await storage.getItem(darkModeCookieKey)
  initialDarkMode = darkModeToBolean(v)
}

export const useDarkModeUser = () => useSafeContext(Context).v
export const useSetDarkMode = () => useSafeContext(Context).set

export const DarkModeProviderNative = ({ children }: PropsWithChildren) => {
  const [darkMode, setDarkMode] = useState(initialDarkMode)

  const contextState: ContextState = {
    v: darkMode,
    set: async v => {
      if (v === true) {
        await storage.setItem(darkModeCookieKey, darkModeEnabled)
      } else if (v === false) {
        await storage.setItem(darkModeCookieKey, darkModeDisabled)
      } else {
        await storage.removeItem(darkModeCookieKey)
      }
      initialDarkMode = v
      setDarkMode(v)
    },
  }

  return <Context value={contextState}>{children}</Context>
}
