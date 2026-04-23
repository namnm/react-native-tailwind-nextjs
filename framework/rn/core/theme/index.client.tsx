/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import EventEmitter from 'eventemitter3'
import BrowserCookies from 'js-cookie'
import { useEffect, useState } from 'react'

import {
  getAvailableThemes,
  getThemeClassName,
  themeCookieKey,
  themeCookieMaxAge,
  toValidTheme,
} from '@/rn/core/theme/config'

const emitter = new EventEmitter()
const cookieTheme = BrowserCookies.get(themeCookieKey)

// toValidTheme is only correct after initTheme is called
// so we set it undefined here and let useTheme handle it after initTheme is called
let initialTheme: string | undefined = undefined

export const useTheme = () => {
  const [theme, setTheme] = useState(initialTheme || toValidTheme(cookieTheme))

  useEffect(() => {
    emitter.on('change', setTheme)
    return () => {
      emitter.off('change', setTheme)
    }
  }, [setTheme])

  return theme
}

export const useSetTheme = () => (v: string | undefined) => {
  const list = document.documentElement.classList
  for (const theme of getAvailableThemes()) {
    list.remove(theme.className as string)
  }

  v = toValidTheme(v)
  if (v) {
    const className = getThemeClassName(v)
    if (className) {
      list.add(className as string)
    }
    BrowserCookies.set(themeCookieKey, v, {
      expires: themeCookieMaxAge,
    })
  } else {
    BrowserCookies.remove(themeCookieKey)
  }

  initialTheme = v
  emitter.emit('change', v)
}
