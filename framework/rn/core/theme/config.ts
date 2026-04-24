/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ThemeConfig } from '@/rn/core/theme/themes'
import { validateThemeVariables } from '@/rn/core/twrnc-config'
import { initSingleton } from '@/rn/core/utils/init-singleton'
import type { Falsish } from '@/shared/ts-utils'

export const themeCookieKey = 'theme'
export const themeCookieMaxAge = 60 * 60 * 24 * 365

let themes: ThemeConfig[] = []
let themesMap = new Map(themes.map(t => [t.name, t]))
let defaultTheme: string | undefined = undefined

const initThemeUnchecked = (
  availableThemes: ThemeConfig[],
  defaultValue: ThemeConfig,
) => {
  if (!availableThemes.some(t => t.name === defaultValue.name)) {
    availableThemes = [defaultValue, ...availableThemes]
  }

  themes = availableThemes
  themesMap = new Map(themes.map(t => [t.name, t]))
  defaultTheme = defaultValue.name

  if (process.env.NODE_ENV !== 'production') {
    for (const t of availableThemes) {
      validateThemeVariables(t.variables)
    }
  }
}

const getAvailableThemesUnchecked = () => themes

const toValidThemeUnchecked = (theme: string | Falsish) =>
  theme && themesMap.has(theme) ? theme : undefined

const getThemeConfigUnchecked = (theme: string | Falsish) => {
  let v: ThemeConfig | undefined = undefined
  if (theme) {
    v = themesMap.get(theme)
  }
  if (!v && defaultTheme) {
    v = themesMap.get(defaultTheme)
  }
  return v
}

export const { initTheme, getAvailableThemes, toValidTheme, getThemeConfig } =
  initSingleton({
    init: {
      initTheme: initThemeUnchecked,
    },
    getter: {
      getAvailableThemes: getAvailableThemesUnchecked,
      toValidTheme: toValidThemeUnchecked,
      getThemeConfig: getThemeConfigUnchecked,
    },
  })

export const getThemeClassName = (theme: string | Falsish) =>
  getThemeConfig(theme)?.className
export const getThemeVariables = (theme: string | Falsish) =>
  getThemeConfig(theme)?.variables
