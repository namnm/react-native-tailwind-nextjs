import type { LinearGradientProps as LinearGradientPropsWocn } from 'react-native-linear-gradient'
import LinearGradientWocn from 'react-native-linear-gradient'

import type { ViewProps } from '@/rn/core/components/view'
import { createClassNameComponent } from '@/rn/core/tw/lib/create-class-name-component'

export type LinearGradientProps = LinearGradientPropsWocn & ViewProps

export const LinearGradient = createClassNameComponent({ LinearGradientWocn })
