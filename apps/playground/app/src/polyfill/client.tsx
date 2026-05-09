'use client'

import '#/shared'
import '#/polyfill/init-minified-class-names'

import { ReactNativeWebEnhancer } from '@/rn/core/polyfill/react-native-web-client'
import { composeProviders } from '@/rn/core/utils/compose-providers'

export const ClientEnhancer = composeProviders(ReactNativeWebEnhancer)
