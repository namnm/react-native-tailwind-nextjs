/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

/* eslint-disable no-restricted-imports */

import AsyncStorage from '@react-native-async-storage/async-storage'
import i18next from 'i18next'
import type { PropsWithChildren } from 'react'
import { I18nextProvider, useTranslation } from 'react-i18next'

import {
  getI18nPromise as getI18nPromiseShared,
  getLangUntyped,
  getLocaleUntyped,
  i18nCookieKey,
} from '@/rn/core/i18n/config'

export const useCurrentLocaleUntyped = () => {
  const { i18n } = useTranslation()
  return getLocaleUntyped(i18n.language as any)
}

export const useCurrentLangUntyped = () => {
  const locale = useCurrentLocaleUntyped()
  return getLangUntyped(locale)
}

export const useTranslationUntyped = (namespace: string) =>
  useTranslation(namespace).t

export const getI18nPromiseNative = () =>
  Promise.all([
    AsyncStorage.getItem(i18nCookieKey).then(v => {
      const lang = getLangUntyped(v as any)
      i18next.changeLanguage(lang)
    }),
    getI18nPromiseShared(),
  ])

export const I18nProviderNative = ({ children }: PropsWithChildren) => (
  <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
)
