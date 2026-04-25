/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { Text } from '@/rn/core/components/text'
import { View } from '@/rn/core/components/view'
import { useTranslationUntyped } from '@/rn/core/i18n'
import { useDarkModeUser, useSetDarkMode } from '@/rn/core/theme/dark-mode'

export const DarkModeSwitcher = async () => {
  const [t, dark] = await Promise.all([
    useTranslationUntyped('common'),
    useDarkModeUser(),
  ])
  const setDarkMode = useSetDarkMode()

  const options = [
    {
      value: true,
      name: t('dark'),
    },
    {
      value: false,
      name: t('light'),
    },
    {
      value: undefined,
      name: t('system'),
    },
  ]

  return (
    <View className='m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1'>
      {options.map(v => {
        const active = v.value === dark
        return (
          <Text
            key={`${v.value}`}
            className={[
              'rounded-full px-3 py-1 font-medium',
              active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600',
            ]}
            onPress={() => setDarkMode(v.value)}
          >
            {v.name}
          </Text>
        )
      })}
    </View>
  )
}
