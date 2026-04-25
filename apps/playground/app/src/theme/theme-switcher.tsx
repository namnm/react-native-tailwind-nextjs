/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import { Text } from '@/rn/core/components/text'
import { View } from '@/rn/core/components/view'
import { useSetTheme, useTheme } from '@/rn/core/theme'
import { getAvailableThemes } from '@/rn/core/theme/config'
import { capitalCase } from '@/shared/lodash'

export const ThemeSwitcher = async () => {
  const themes = getAvailableThemes()
  const theme = await useTheme()
  const setTheme = useSetTheme()

  return (
    <View className='m-2 flex-row items-center gap-2 rounded-full bg-gray-200 p-1'>
      {themes.map(v => {
        const active = v.name === theme
        return (
          <Text
            key={`${v.name}`}
            className={[
              'rounded-full px-3 py-1 font-medium',
              active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600',
            ]}
            onPress={() => setTheme(v.name)}
          >
            {capitalCase(v.name)}
          </Text>
        )
      })}
    </View>
  )
}
