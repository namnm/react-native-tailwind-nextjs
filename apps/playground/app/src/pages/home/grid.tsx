/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { Text } from '@/rn/core/components/text'
import { View } from '@/rn/core/components/view'

export const DemoGrid = () => (
  <>
    <Text className='mt-5 text-center font-bold text-black transition dark:text-gray-200'>
      Basic Grid Columns
    </Text>
    <View className='m-auto grid w-full max-w-150 grid-cols-3 gap-2.5 p-2.5'>
      <View className='bg-primary-200 dark:bg-primary-900 h-50 rounded-md transition' />
      <View className='bg-secondary-200 dark:bg-secondary-900 h-50 rounded-md transition'>
        <View className='grid grid-cols-[20px_1fr_20px] gap-2.5 p-2.5'>
          <View className='bg-primary-200 dark:bg-primary-900 h-10 rounded-md transition' />
          <View className='bg-error-200 dark:bg-error-900 h-10 rounded-md transition' />
          <View className='bg-primary-200 dark:bg-primary-900 h-10 rounded-md transition' />
        </View>
      </View>
      <View className='bg-primary-200 dark:bg-primary-900 h-50 rounded-md transition' />
    </View>
  </>
)
