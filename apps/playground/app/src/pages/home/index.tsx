/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

import { Input } from '@/rn/core/components/base/input'
import { ScrollView } from '@/rn/core/components/base/scroll-view'
import { H1, Span } from '@/rn/core/components/base/text'
import { View } from '@/rn/core/components/base/view'
import { Button } from '@/rn/core/components/button'
import { useTranslationUntyped } from '@/rn/core/i18n'
import { isWeb } from '@/rn/core/utils/platform'
import { useSafeAreaPadding } from '@/rn/core/utils/use-safe-area'
import { I18nSwitcher } from '#/i18n/i18n-switcher'
import { DemoGrid } from '#/pages/home/grid'
import { useDemoRefs } from '#/pages/home/refs'
import { DemoRuntime } from '#/pages/home/runtime'
import { DarkModeSwitcher } from '#/theme/dark-mode-switcher'
import { ThemeSwitcher } from '#/theme/theme-switcher'

export const HomePage = async () => {
  const t = await useTranslationUntyped('home')
  const padding = useSafeAreaPadding()
  const Container = isWeb ? View : ScrollView

  const [demoRefs, demoRefsNative] = useDemoRefs()

  return (
    <>
      <Container
        className={[
          padding,
          'bg-primary-50 flex-1 transition dark:bg-gray-700',
        ]}
      >
        <View className='bg-primary-100 dark:bg-primary-950 p-10 transition'>
          <H1 className='text-center text-3xl font-bold text-black transition md:text-4xl lg:text-5xl dark:text-gray-200'>
            React Native - Tailwind - NextJS
          </H1>
          <Span className='mt-5 text-center text-black transition dark:text-gray-200'>
            {t('description')}
          </Span>
          <View className='mt-5 items-center'>
            <Button className='w-40' type='primary'>
              CVA Button
            </Button>
          </View>
        </View>

        <DemoGrid />
        {demoRefs}
        <DemoRuntime />
        <Input className='m-auto w-60 rounded-md bg-white text-black transition dark:bg-gray-800 dark:text-gray-200' />
        <View className='flex-1' />
        <I18nSwitcher />
        <ThemeSwitcher />
        <DarkModeSwitcher />
      </Container>
      {/* need to render outside of scroll view on native */}
      {demoRefsNative}
    </>
  )
}
