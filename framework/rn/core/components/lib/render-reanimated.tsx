/**
 * Copyright (c) 2025-2026 nongdan.dev
 * See LICENSE file in the project root for full license information.
 */

export const renderReanimated = (Component: any, props: any) => {
  if (props.reanimatedStyle) {
    props = { ...props }
    const style = Array.isArray(props.style) ? props.style : [props.style]
    props.style = [...style, props.reanimatedStyle]
    delete props.reanimatedStyle
  }
  return <Component {...props} />
}
