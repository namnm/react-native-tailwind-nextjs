import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'

import { themeCookieKey, toValidTheme } from '@/rn/core/theme/config'
import { useSafeContext } from '@/rn/core/utils/use-safe-context'
import { mmkv } from '@/rn/mmkv'

type ContextState = {
  v: string | undefined
  set: (v: string | undefined) => void
}
const Context = createContext<ContextState | undefined>(undefined)

// toValidTheme should be called after initTheme, thus we wrap it in the promise
// the init promise should be await before using other methods or providers
let initialTheme: string | undefined = undefined
export const initThemeNative = async () => {
  initialTheme = toValidTheme(mmkv.getString(themeCookieKey))
}

export const useTheme = () => useSafeContext(Context).v
export const useSetTheme = () => useSafeContext(Context).set

export const ThemeProviderNative = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState(initialTheme)

  const contextState: ContextState = {
    v: theme,
    set: v => {
      v = toValidTheme(v)
      if (v !== undefined) {
        mmkv.set(themeCookieKey, v)
      } else {
        mmkv.remove(themeCookieKey)
      }
      initialTheme = v
      setTheme(v)
    },
  }

  return <Context value={contextState}>{children}</Context>
}
