import i18next from 'i18next'

import { getLocaleUntyped, i18nCookieKey } from '@/rn/core/i18n/config'
import { useCurrentLangUntyped } from '@/rn/core/i18n/index.native'
import type { I18nSwitcherProps } from '@/rn/core/i18n/use-i18n-switcher-props'
import { mmkv } from '@/rn/mmkv'

export const useI18nSwitcherProps = (): I18nSwitcherProps => {
  const currentLang = useCurrentLangUntyped()
  return {
    currentLang,
    onPressNative,
  }
}
const onPressNative = async (v: string) => {
  i18next.changeLanguage(v)
  const locale = getLocaleUntyped(v)
  mmkv.set(i18nCookieKey, locale)
}
