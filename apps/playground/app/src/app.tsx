/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// nextjs entry point

import '#/polyfill/server'

import type { PropsWithChildren } from 'react'

import '../tailwind.css'

import { useCurrentLangUntyped } from '@/rn/core/i18n'
import { useTheme } from '@/rn/core/theme'
import { getThemeClassName } from '@/rn/core/theme/config'
import { useDarkModeUser } from '@/rn/core/theme/dark-mode'
import {
  darkClassName,
  lightClassName,
  webClassName,
} from '@/rn/core/theme/dark-mode-config'
import { clsx } from '@/rn/core/tw/clsx'
import { ClientEnhancer } from '#/polyfill/client'

export const App = async ({ children }: PropsWithChildren) => {
  const [lang, theme, dark] = await Promise.all([
    useCurrentLangUntyped(),
    useTheme().then(getThemeClassName),
    useDarkModeUser(),
  ])
  const htmlClassName = clsx(
    // custom variant web: selector
    webClassName,
    // theme
    theme,
    // custom variant dark: selector
    dark === true && darkClassName,
    dark === false && lightClassName,
  ) as string

  return (
    <html lang={lang} className={htmlClassName}>
      <ClientEnhancer />
      <body className='flex min-h-dvh w-full flex-col'>{children}</body>
    </html>
  )
}
