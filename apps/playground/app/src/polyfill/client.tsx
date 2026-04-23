/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

'use client'

import '#/polyfill/init-twrnc-config'
import '#/polyfill/init-i18n'
import '#/polyfill/init-minified-class-names'
import '#/polyfill/init-theme'

import { ReactNativeWebEnhancer } from '@/rn/core/polyfill/react-native-web-client'
import { composeProviders } from '@/rn/core/utils/compose-providers'

export const ClientEnhancer = composeProviders(ReactNativeWebEnhancer)
