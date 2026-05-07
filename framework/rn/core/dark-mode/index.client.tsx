'use client'

import BrowserCookies from 'js-cookie'
import { useSyncExternalStore } from 'react'

import {
  darkClassName,
  darkModeCookieKey,
  darkModeCookieMaxAge,
  darkModeDisabled,
  darkModeEnabled,
  darkModeToBolean,
  lightClassName,
} from '@/rn/core/dark-mode/config'

let initialized = false
let currentDarkMode: boolean | undefined = undefined
const subscribers = new Set<() => void>()

const subscribe = (cb: () => void) => {
  subscribers.add(cb)
  return () => subscribers.delete(cb)
}

const getSnapshot = () => {
  if (!initialized) {
    initialized = true
    currentDarkMode = darkModeToBolean(BrowserCookies.get(darkModeCookieKey))
  }
  return currentDarkMode
}
// server can also resolve this using cookie
const getSnapshotServer = getSnapshot

export const useDarkModeUser = () =>
  useSyncExternalStore(subscribe, getSnapshot, getSnapshotServer)

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

  currentDarkMode = v
  subscribers.forEach(cb => cb())
}
