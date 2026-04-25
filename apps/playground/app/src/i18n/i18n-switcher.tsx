/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import type { ReactNode } from 'react'

import { Text } from '@/rn/core/components/base/text'
import { View } from '@/rn/core/components/base/view'
import { getLangUntyped } from '@/rn/core/i18n/config'
import { useI18nSwitcherProps } from '@/rn/core/i18n/use-i18n-switcher-props'
import { languages } from '#/i18n/config'

export const I18nSwitcher = async () => {
  const { currentLang, LinkWeb, onPressNative } = await useI18nSwitcherProps()
  return (
    <View className='m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1'>
      {languages.map(l => {
        const lang = getLangUntyped(l.locale)
        let children: ReactNode = (
          <Text
            key={l.locale}
            className={[
              'rounded-full px-3 py-1 font-medium',
              currentLang === lang
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600',
            ]}
            onPress={onPressNative && (() => onPressNative(lang))}
          >
            {l.nativeName}
          </Text>
        )
        if (LinkWeb) {
          children = <LinkWeb lang={lang} children={children} />
        }
        return children
      })}
    </View>
  )
}
