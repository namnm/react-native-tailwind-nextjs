# React Native - Tailwind - NextJS

React Native with Tailwind CSS class names. Compatible with NextJS App Router SSR stream.

This repository is currently serving as a boilerplate for a full combination example with NextJS. The code is very opinionated and mostly serve as demonstration with no unit tests. We should consider it as a reference and take a deep look before using it in our project.

```tsx
// transpile jsx class names to style object
// transpiled styles are moved to the root scope to avoid object creation on each render
// jsx prop `className` will be normalized and renamed to `style` through a wrapper component
const MyComponent = () => <View className='flex flex-col transition' />
// -> will be transpiled to:
const _style = {
  display: 'flex',
  flexDirection: 'column',
  transition: [
    /* .. */
  ],
  transitionDuration: 150,
  transitionTimingFunction: 'ease-in-out',
}
const MyComponent = () => <View style={_style} />

//
// support array in jsx
const MyComponent = ({ withTransition, className, ...props }: Props) => (
  <View
    {...props}
    className={['flex flex-col', withTransition && 'transition', className]}
  />
)
// -> will be transpiled to:
const _style1 = {
  /* .. */
}
const _style2 = {
  /* .. */
}
const MyComponent = ({ withTransition, className, ...props }: Props) => (
  <View {...props} style={[_style1, withTransition && _style2, className]} />
)

//
// transpile class names directly to store as a variable
// on web they will be kept as string
const style = tw`flex flex-col transition`
// -> will be transpiled to:
const style = {
  // ..
}

//
// support cva
const button = cva({
  className: '..',
  // support multiple class names
  classNames: {
    button: '..',
    text: '..',
  },
  attributes: {
    // similar to cva variants
    attr1: {
      value1: '..',
    },
    attr2: {
      value2: {
        // support multiple class names
        button: '..',
        text: '..',
      },
    },
  },
  defaultVariant: {
    // similar to cva defaultVariants
  },
  compoundVariants: [
    // similar to cva compoundVariants
    {
      attr1: 'value1',
      attr2: 'value2',
      className: '..',
      // support multiple class names
      classNames: {
        button: '..',
        text: '..',
      },
    },
  ],
})

// similar to the official suggestion from cva:
type Props = Parameters<typeof button>[0]
type Props = Variant<typeof button>

const MyComponent = (variant: Props) => {
  const cn = button(variant)
  return (
    <Pressable className={cn.button}>
      <Text className={cn.text}>CVA Button</Text>
    </Pressable>
  )
}

//
// support clsx
const composed = clsx(
  'flex flex-col',
  withTransition && 'transition',
  className,
)

//
// support runtime conversion from class names to styles, also work on web
// this is not recommended, but can be useful in some cases
// NOTE: these class names are not captured by the babel plugin and postcss-rename
const style = runtimeStyle('flex flex-col')

//
// support runtime conversion from class names to styles in jsx
// this is not recommended, and will be warned during development mode
// NOTE: these class names are not captured by the babel plugin and postcss-rename
const classNameStringFromSomeWhere = 'flex flex-col'
const MyComponent = () => <View className={classNameStringFromSomeWhere} />
```

- All styles are transpiled from string to object at build time using a babel plugin and twrnc under the hood, this will improve performance compared to general twrnc runtime.
- Selectors are handled using hook and have no problem such as twrnc memoBuster. The hook is only needed in react native, thus it will not introduce client component in web.

- `cva` signature is similar to [cva](https://cva.style/docs/getting-started/variants) with some differences and extras. To follow with real life standards and avoid confusion, we will redefine the terms as follows:
  - `Attribute` is similar to a react property. We name it attribute differentiate with other react properties such as event handlers.. An attribute defines a specific characteristic of that component. For example: color, size, shape..
  - `Attribute value` is a value of an attribute. For example with color: red, green, blue..
  - `Variant` is a combination of all attributes with their coresponding values. For example with 2 attributes color and size: color=red size=xs, color=green size=lg.. So if color has 3 values and size has 4 values, the total number of variants is 3x4=12.

- Support platform selector: `web:`, `ios:`, `android:`, `native:`. It will be striped out at build time if the platform doesnt match.
  - On web we need to define a custom variant in global css to take precedence.
  - Automatically strip out class names that are not compatible in native:
    - `theme-`
    - `web:`
    - `web-`
    - `hover:`
    - `group-<key>-hover:`
    - `peer-<key>-hover:`
    - `cursor-pointer`
- Support color scheme selector: `dark:`, `light:`.
- Support responsive screen size selector: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`.
- Support event handler selector: `active:`, `focus:`.
  - Any component with onPressIn onPressOut such as Pressable will support `active:`.
  - Any component with onFocus onBlur such as TextInput will support `focus:`.
- Support props selector: `disabled:`, `checked:`.
  - Need to pass those fields to hook options: props, childrenProps.
- Support group selector: `group-<selector>:`, `group-<key>-<selector>:`.
- Support peer selector: `peer-<selector>:`, `peer-<key>-<selector>:`.
  - Need to use TwPeerProvider to isolate the context if there are many peers in the same page. The provider is simply a Fragment re-export on web.
- Support nested selector: `<selector1>:<selector2>:..:<class-name>`. Nested selector with deeper level will take precedence.
- Support transition using Reanimated:
  - `transition`
  - `transition-all`
  - `transition-colors`
  - `transition-opacity`
  - `transition-shadow`
  - `transition-transform`
  - `transition-none`
  - `transition-[<value>]`
  - `duration-<number>`
  - `duration-initial`
  - `ease-linear`
  - `ease-in`
  - `ease-out`
  - `ease-in-out`
  - `ease-initial`
  - Custom easing:
    - Add new easing to `tailwind.theme.extend` in tailwind.config.cjs
    - Add new easing to `transitionTimingFunctionMap` in normalize-style-config.ts
  - `delay-<number>`
- Support animation using Reanimated:
  - `animate-spin`
  - `animate-ping`
  - `animate-pulse`
  - `animate-bounce`
  - Custom animation:
    - Add new animation to `tailwind.theme.extend` in tailwind.config.cjs
    - Add new animation to `animationMap` in normalize-style-config.ts
- Support basic grid columns:
  - `grid`
  - `grid-cols-none`
  - `grid-cols-<number>`
  - `grid-cols-[..px_..fr]`
  - `gap`
  - `gap-x`
  - `gap-y`
  - Only available within View.
- Support clamping text:
  - `line-clamp-<number>`
  - `line-clamp-none`
  - Will be transpiled to `numberOfLines` and passed through props.
- Support selectable text:
  - `select-text`
  - `select-none`
  - Will be transpiled to `selectable` and passed through props.
- Support placeholder text color:
  - `placeholder-<color>`
  - Will be transpiled to `placeholderTextColor` and passed through props.
  - Under the hood it will get `text-<color>` style using twrnc and map the color to the prop.
- Support caret hidden:
  - `caret-transparent`
  - Will be transpiled to `caretHidden` and passed through props.
- Support object fit:
  - `object-contain`
  - `object-cover`
  - `object-fill`
  - `object-none`
  - `object-scale-down`
  - Will be transpiled to `resizeMode` and passed through props.
- Unsupported class names will be catched during the transpile process.
- Class names on web can be minified using [postcss-rename](https://github.com/google/postcss-rename) since the babel plugin has captured all usage references.

### Client extension

Similar to react native metro variant `.native` `.ios` `.android` extension alias resolve strategy, we also support `.client` extension in the client bundle, using a custom babel and webpack plugin to transpile the import path: `babel-plugin-client-extension`, `webpack-resolve-client-extension`

This is currently working with webpack only, as turbopack use esm module and collect the rsc metadata single unified graph for all environments. We can support turbopack using resolveAlias by glob all .client extension files in nextjs config, but it requires to restart nextjs everytime adding/removing any .client file.

To bypass rsc metadata validation as it happens before the babel process, we need to alias next modules such as `next/..` to be `next-unchecked/..`. We should use another babel plugin to validate these cases: `babel-plugin-rsc-validation`

The transpiled code could be cached. If we add or remove a `.client` file, it will not be resolved correctly as the previous transpiled import path is cached, we need to remove the cache folder `.next` and restart the development server.

To make sure all variants should export the same set of functionalities, we also have a custom eslint rule to check if there is mismatch export between variants and default: `custom/export-validation`. This rule also allows different exports in some edge cases, name the variable with cresponding variant suffix to bypass, for example `somethingNative` will not be reported in the `.native` variant.

This is currently not working with `.web.client` extension, and we intentionally support only `.client`. As the server implementation is broader with async components, we should prioritize server implementation first as the default if there is difference, then client, and native last.

### Async components

To reuse async components in client and native bundle, we will use a custom babel plugin to transpile async components into non-async versions, together with the extension alias resolve strategy above. This will only transpile async components contains `await use..` hooks:

```tsx
import { useTranslation } from '@/i18n'

export const Hello = async () => {
  const t = await useTranslation('common')
  return <Text>{t('hello')}</Text>
}

// -> will be transpiled to:

import { useTranslation } from '@/i18n/index.client'

export const Hello = () => {
  const t = useTranslation('common')
  return <Text>{t('hello')}</Text>
}
```

### Context

There should be no global Context as it marks the whole children as client bundle and destroys the purpose of app router ssr stream.

- In server bundle we will only use async methods such as `next/headers`, `fetch`..
- In client bundle we will try to have the same set of exports using `next/navigation`, singleton and `useSyncExternalStore`..
- In native bundle we can use Context and add the provider at the top native entry point.

### I18n

I18n is already set up and configured to work on all variants: server, client, native.

### Theme

Theme and dark mode is already set up and configured to work on all variants: server, client, native.

### Navigation

Navigation is already set up and configured to work on all variants: server, client, native.

### Image

Image component is aliased using `react-native-fast-image` in native and a plain html `img` tag in nextjs. `resizeMode` should be supported using tw class names such as `object-*`. Other nextjs image features such as auto generated ratio, optimization.. should be done on the backend api level and supply here through tw class names, src set..

### HTML semantic & accessibility

Beside the official semantic props such as `accessibilityRole`, `aria-*`.. we also have `rnwTag` to customize the html tag for the base components.

### Patch react-native-web

- By default, react-native-web has the following limitation:
  - Styles are runtime generated and injected to head, which overrides the tailwind css.
  - Need to extract style on ssr render, which is incompatible or inefficient with nextjs app router ssr stream.
  - Class names are omited from props.
- We will patch react-native-web to allow className and introduce a new prop to compute className instead of using react native style sheet, and more to support custom html tag. Only some critical components are being patched: Text, View, ScrollView, Pressable, TextInput, FlatList. Those components are also exported with reanimated support in react native.
  - Add rnwTag, rnwClassNameData, className in forwardedProps
  - Update logic in createElement to use rnwTag
  - Add rnwClassNameData to each components being patched
  - Update logic in createDOMProps to call a global function rnwClassName. We can not pass function as prop in app router ssr stream. The global function was injected in src/polyfill/react-native.ts
  - There could be better way to handle these, but let's just leave it for now..
- Props with prefix data- will be merged into dataSet as react native web only support this prop.

### VS Code Intellisense

```json
{
  "tailwindCSS.classFunctions": ["tw", "cva", "clsx"]
}
```

### License: MIT

Contact me at [nam@nongdan.dev](mailto:nam@nongdan.dev)
