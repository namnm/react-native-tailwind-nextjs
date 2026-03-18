### About this boilerplate

A mono repo demonstrating React Native with Tailwind CSS class names, fully compatible with Next.js App Router SSR streaming. The target is cross-platform UI sharing between a React Native mobile app and a Next.js web app, with shared i18n, theming, and navigation.

It is opinionated and serves as a reference implementation - read the code carefully before adopting patterns.

---

### Folder structure & aliases

There are two primary aliases:

- **`@/`** → `./framework` - an internal framework kept in-repo for rapid development (treated like a local npm package)
- **`#/`** → `src/` inside whichever app you are working in (e.g. `apps/playground/app/src` or `apps/playground/app-nextjs/src`)

**`@/` (framework)**

| Path                   | Description                                                                                                                                                |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@/rn/core/components` | Base + compound UI components (base wrappers, button, accordion, ripple)                                                                                   |
| `@/rn/core/tw`         | Tailwind runtime: `cva`, `clsx`, `tw`, `runtimeStyle`, class-name types                                                                                    |
| `@/rn/core/theme`      | Color scheme / dark mode                                                                                                                                   |
| `@/rn/core/i18n`       | Internationalization                                                                                                                                       |
| `@/rn/core/navigation` | Navigation primitives                                                                                                                                      |
| `@/rn/core/utils`      | Shared hooks and utilities                                                                                                                                 |
| `@/rn/core/polyfill`   | Platform polyfills                                                                                                                                         |
| `@/rn/immer`           | Immer wrapper                                                                                                                                              |
| `@/shared/*`           | Platform-agnostic utilities: `lodash`, `ts-utils`, `ulidx`, `qs`, `json-safe`, `json-stable`, `simple-log`, `circular-deps`                                |
| `@/devtools/*`         | Build tooling: babel plugins (`tw`, `async-hook`, `client-extension`), `next-config`, `metro-config`, `eslint`, `postcss-config`, `normalize`, `webpack-*` |
| `@/nodejs/*`           | Node.js scripts: `exec`, `fs`, `glob`, `log`, `path`, `kill`, `entrypoint`, `gitignore`                                                                    |

**`apps/`** - actual app logic

| Path                         | Description                                               |
| ---------------------------- | --------------------------------------------------------- |
| `apps/playground/app`        | React Native mobile app (entry: `index.js`, source: `#/`) |
| `apps/playground/app-nextjs` | Next.js web app (App Router, source: `#/app`)             |

`#/` contents differ per app but typically include: `pages/` or `app/`, `components/`, `i18n/`, `theme/`, `polyfill/`, and app entry points.

---

### React Native base components and styling

Do not import components from react-native, use these instead:

```tsx
import { Text } from '@/rn/core/components/base/text'
import { View } from '@/rn/core/components/base/view'
import { ScrollView } from '@/rn/core/components/base/scroll-view'
import { SafeAreaView } from '@/rn/core/components/base/safe-area-view'
import { FlatList } from '@/rn/core/components/base/flat-list'
import { Pressable } from '@/rn/core/components/base/pressable'
import { Input } from '@/rn/core/components/base/input'
import { Image } from '@/rn/core/components/base/image'
```

Do not use `style` or react-native `StyleSheet`. The above components support `className` with Tailwind CSS, transpiled at build time via a babel plugin.

### className usage

String literals, variables, ternaries, and arrays are supported:

```tsx
<View className='flex flex-col transition' />
<View className={variable} />
<View className={['flex flex-col', withTransition && 'transition', className]} />
```

Use `tw` to assign styles to a variable:

```tsx
const style = tw`flex flex-col transition`
```

Use `clsx` to compose class names:

```tsx
const composed = clsx(
  'flex flex-col',
  withTransition && 'transition',
  className,
)
```

Use `runtimeStyle` only when class names cannot be statically analyzed (not recommended - not captured by the babel plugin):

```tsx
const style = runtimeStyle('flex flex-col')
```

### cva

`cva` signature is similar to [cva](https://cva.style/docs/getting-started/variants). Terms used here:

- **Attribute** - a characteristic of the component (e.g. color, size, shape)
- **Attribute value** - a value of an attribute (e.g. red, sm, pill)
- **Variant** - a full combination of all attributes and values

```tsx
const button = cva({
  classNames: { button: '..', text: '..' },
  attributes: {
    size: { sm: { button: '..', text: '..' } },
  },
  defaultVariant: { size: 'sm' },
  compoundVariants: [{ size: 'sm', classNames: { button: '..', text: '..' } }],
})

type Props = Variant<typeof button>

const MyComponent = (variant: Props) => {
  const cn = button(variant)
  return (
    <Pressable className={cn.button}>
      <Text className={cn.text}>CVA Button</Text>
    </Pressable>
  )
}
```

### Selectors

- **Platform:** `web:`, `ios:`, `android:`, `native:` - stripped at build time for non-matching platforms
- **Color scheme:** `dark:`, `light:`
- **Responsive:** `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- **Event handlers:** `active:` (Pressable), `focus:` (TextInput)
- **Props:** `disabled:`, `checked:` - pass those fields to hook options
- **Group / peer:** `group-<selector>:`, `group-<key>-<selector>:`, `peer-<selector>:`, `peer-<key>-<selector>:`
- **Nested:** `<selector1>:<selector2>:..<class-name>` - deeper nesting takes precedence
- Transition (`transition`, `transition-[<value>]`, `duration-*`, `ease-*`, `delay-*`), animation (`animate-spin`, `animate-pulse`, etc.), and basic grid (`grid`, `grid-cols-<n>`, `gap`, etc.) are supported via Reanimated.

### Client extension

`.client` extension alias works like `.native` / `.ios` / `.android`. A babel plugin rewrites import paths in the client bundle. Works with webpack only (not turbopack). If you add or remove a `.client` file, delete `.next` cache and restart the dev server.

### Async components

Async components with `await use..` hooks are transpiled to non-async for client/native bundles:

```tsx
// server
export const Hello = async () => {
  const t = await useTranslation('common')
  return <Text>{t('hello')}</Text>
}

// transpiled for client/native
import { useTranslation } from '@/i18n/index.client'
export const Hello = () => {
  const t = useTranslation('common')
  return <Text>{t('hello')}</Text>
}
```

### Context

Avoid global Context - it marks the entire subtree as a client component and breaks SSR streaming.

- **Server:** use async methods (`next/headers`, `fetch`, etc.)
- **Client:** use `next/navigation`, singleton, `useSyncExternalStore`
- **Native:** Context is fine; add providers at the native entry point

### I18n / Theme / Navigation

All three are configured and work across server, client, and native bundles.

### VS Code Intellisense

```json
{ "tailwindCSS.classFunctions": ["tw", "cva", "clsx"] }
```

---

### Button

```tsx
import { Button } from '@/rn/core/components/button'
```

Props:

- `type`: `'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error'` - default `'primary'`
- `appearance`: `'solid'` - default `'solid'`
- `size`: `'sm' | 'md' | 'lg' | 'xl' | 'xxl'` - default `'md'`
- `shape`: `'rounded' | 'pill'` - default `'rounded'`
- `elevation`: `boolean` - shows a 3D shadow beneath the button, default `true`
- `elevationClassName`: `ClassName` - extra classes for the elevation layer
- `ripple`: `boolean` - enables ripple press effect, default `true`
- `rippleClassName`: `ClassName` - extra classes for the ripple
- Inherits all `PressableProps` except `children`
- `children`: text label rendered inside the button

```tsx
<Button type='primary' size='lg' shape='pill'>Submit</Button>
<Button type='error' elevation={false} ripple={false}>Delete</Button>
```

### Accordion

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/rn/core/components/accordion'
```

**Accordion** (root)

- `type: 'single' | 'multiple'` - controls single or multi-panel open mode
- `value` / `defaultValue` / `onValueChange` - controlled/uncontrolled state (`string` for single, `string[]` for multiple)

**AccordionItem**

- `value: string` - unique identifier for this item
- Inherits `ViewProps`

**AccordionTrigger**

- `children`: `ReactNode` or `(open: boolean) => ReactNode` - pass a render function to customize based on open state; default rendering appends a rotating chevron
- Inherits `PressableProps` (except `children`)

**AccordionContent**

- Animates height open/close
- Inherits `ViewProps`

```tsx
<Accordion type='single' defaultValue='item-1'>
  <AccordionItem value='item-1'>
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value='item-2'>
    <AccordionTrigger>
      {open => <Text>{open ? 'Close' : 'Open'} Section 2</Text>}
    </AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>
```
