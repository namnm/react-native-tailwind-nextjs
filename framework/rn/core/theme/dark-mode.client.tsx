/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import EventEmitter from 'eventemitter3'
import BrowserCookies from 'js-cookie'
import { useEffect, useState } from 'react'

import {
  darkClassName,
  darkModeCookieKey,
  darkModeCookieMaxAge,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  lightClassName,
} from '@/rn/core/theme/dark-mode-config'

const emitter = new EventEmitter()
let initialDarkMode = darkModeToBolean(BrowserCookies.get(darkModeCookieKey))

export const useDarkModeUser = () => {
  const [userScheme, setUserScheme] = useState(initialDarkMode)
  useEffect(() => {
    emitter.on('change', setUserScheme)
    return () => {
      emitter.off('change', setUserScheme)
    }
  }, [setUserScheme])

  return userScheme
}

export const useSetDarkMode = () => (v: boolean | undefined) => {
  const list = document.documentElement.classList
  list.remove(darkClassName)
  list.remove(lightClassName)

  if (v === true) {
    list.add(darkClassName)
    BrowserCookies.set(darkModeCookieKey, darkModeEnabled, {
      expires: darkModeCookieMaxAge,
    })
  } else if (v === false) {
    list.add(lightClassName)
    BrowserCookies.set(darkModeCookieKey, darkModeDisabled, {
      expires: darkModeCookieMaxAge,
    })
  } else {
    BrowserCookies.remove(darkModeCookieKey)
  }

  initialDarkMode = v
  emitter.emit('change', v)
}
