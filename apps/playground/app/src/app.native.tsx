/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

// react-native entry point

import '#/polyfill/native'

import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'
import { AppRegistry } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import {
  getI18nPromiseNative,
  I18nProviderNative,
} from '@/rn/core/i18n/index.native'
import {
  darkModePromiseNative,
  DarkModeProviderNative,
} from '@/rn/core/theme/dark-mode.native'
import {
  themePromiseNative,
  ThemeProviderNative,
} from '@/rn/core/theme/index.native'
import { TwPeerProvider } from '@/rn/core/tw/marker'
import { tw } from '@/rn/core/tw/tw'
import { composeProviders } from '@/rn/core/utils/compose-providers'
import { rHome } from '#/pages/route-paths'
import { routes } from '#/pages/routes'

import { name as appName } from '../app.json'

const RootStack = createNativeStackNavigator({
  screens: routes,
  initialRouteName: rHome,
  screenOptions: {
    headerShown: false,
    contentStyle: tw`bg-white`,
  },
})
const Navigation = createStaticNavigation(RootStack)

const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    Promise.all([
      getI18nPromiseNative(),
      themePromiseNative,
      darkModePromiseNative,
    ]).finally(() => {
      setLoading(false)
    })
  }, [])

  if (loading) {
    // TODO: add global loading such as splash screen
    return null
  }

  return children
}

export const App = composeProviders(
  LoadingProvider,
  SafeAreaProvider,
  I18nProviderNative,
  ThemeProviderNative,
  DarkModeProviderNative,
  TwPeerProvider,
  // must be last
  Navigation,
)
AppRegistry.registerComponent(appName, () => App)
