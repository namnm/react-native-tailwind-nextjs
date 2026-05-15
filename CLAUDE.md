> New to this project? Read `README.md` first - covers Tailwind/cva conventions, RSC/SSR, navigation, and i18n.

# Key locations

| What                               | Where                                                     |
| ---------------------------------- | --------------------------------------------------------- |
| Framework components               | `framework/rn/components/<name>/index.tsx`                |
| Playground pages (shared RN + web) | `apps/playground/app/src/pages/<name>/index.tsx`          |
| Web routes                         | `apps/playground/web/src/app/[locale]/<name>/page.tsx`    |
| Route constants                    | `apps/playground/app/src/pages/route-paths.ts`            |
| RN route map                       | `apps/playground/app/src/pages/routes.native.ts`          |
| Sidebar nav                        | `apps/playground/app/src/components/nav-layout/index.tsx` |

# Reference components

Before building, read the closest existing component:

| Pattern                                    | File                    |
| ------------------------------------------ | ----------------------- |
| Full complexity (cva, ripple, elevation)   | `button/index.tsx`      |
| Boolean toggle + controlled state          | `switch/index.tsx`      |
| Group context pattern                      | `radio/index.tsx`       |
| cva with appearance x type                 | `badge/index.tsx`       |
| Trigger -> Drawer (single/multiple select) | `select/index.tsx`      |
| Trigger -> Drawer + custom UI inside       | `date-picker/index.tsx` |
| Single \| MultipleProps union              | `accordion/index.tsx`   |

All components live under `framework/rn/components/`.

# Adding a component - checklist

1. `framework/rn/components/<name>/index.tsx`
2. `apps/playground/app/src/pages/<name>/index.tsx` - demo (show all variants)
3. `route-paths.ts` - `export const rFoo = '/foo'`
4. `routes.native.ts` - import page + add to `routesNative`
5. `web/src/app/[locale]/<name>/page.tsx` - `export { FooPage as default } from '#/pages/<name>'`
6. `nav-layout/index.tsx` - import constant + `<NavSidebarLink href={rFoo} label='Foo' />`

# Editing a component

Edit the component -> update the playground demo if the API changed.

# cva conventions

- **All class strings in cva** - never hardcode Tailwind strings inline in JSX. Every classname goes in `classNames` (base) or `attributes`/`compoundVariants`.
- **Standard attribute set for form-like components**: `appearance`, `size`, `shape`, `disabled`, `active`, `invalid`.
  - `active` = open/focused state (e.g. drawer open). Mirror TextInput `focus:` border styles via compound variants.
  - `invalid` = error state. Use compound variants per appearance (`border-error` / `border-b-error` for underlined).
  - **Order**: put `invalid` compound variants _after_ `active` so `border-error` always wins when both are true.
- **`underlined` appearance always needs `rounded-none`** - add compound variants for `underlined` x `rounded` and `underlined` x `pill` that override to `rounded-none`.
- **`size` only scales the trigger**, not drawer/popover content - put drawer item padding/font in base `classNames` at a fixed size.

## Compound variant ordering rule

```
1. shape overrides (underlined -> rounded-none)
2. active state  (open border color)
3. invalid state (error border color - wins over active)
```

# Trigger -> Drawer pattern

For components that open a bottom sheet on press (Select, DatePicker):

```tsx
const [open, setOpen] = useState(false)
const cn = fooCva({ ..., active: open })   // active mirrors focus style

<Pressable onPress={() => setOpen(true)} className={cn.trigger}>
  ...
</Pressable>

<Drawer value={open} onChange={setOpen} contentContainerClassName='pb-8'>
  ...
</Drawer>
```

- Drawer content size is **fixed** (not scaled by trigger's `size` prop).
- In multiple-select mode only, render a Done/confirm button inside the drawer; do not close on each item tap.

# Single | Multiple props pattern

```tsx
export type FooProps = (SingleProps | MultipleProps) & BaseProps

// Inside component:
const [state, setState] = useControllableState<string | string[]>({
  value: value as any,
  defaultValue: defaultValue ?? (multiple ? [] : ''),
  onChange: onChange as any,
})
```

Cast with `as any` is correct here - same pattern as `accordion/index.tsx`.

# SVG icons

Icons live in `framework/rn/svg-icons/`. `className` on an icon controls color (`text-*` -> fill) and size (`text-*` -> width/height). Use dedicated directional icons (`chevron-left`, `chevron-bottom`, etc.) instead of rotating `chevron-right`.

# Coding Conventions

- Prefer arrow function and method
- Prefer not to use nullish coalescing

# Formatting Rules

## Language

- Always write code and comment in English.
- You can response in chat using user prompt language.

## Characters

Use only ASCII (0x00-0x7F). Never use Unicode characters outside this range.

Banned examples:

| Category | Banned characters                |
| -------- | -------------------------------- |
| Dashes   | en dash, em dash, horizontal bar |
| Arrows   | any unicode arrows               |
| Quotes   | smart quotes, curly apostrophes  |
| Bullets  | bullet, triangle, diamond        |
| Math     | multiplication, division, minus  |
| Emoji    | all emoji without exception      |
| Misc     | ellipsis, checkmark, copyright   |

Use instead:

- Dashes: plain hyphen-minus (-)
- Arrows: -> or <- or => or <= (two ASCII chars)
- Quotes: straight double quotes (") or straight single quotes (')
- Bullets: plain hyphen (-) or asterisk (\*) or plus (+)
- Math: use plain ASCII operators (\*, /, -)
- Ellipsis: two plain periods (..)
- Copyright: (c)

## Formatting

- Use plain Markdown only: headings (#), bold (\*_), italic (_), code fences (```), tables, blockquotes (>).
- No decorative Unicode borders, box-drawing characters, or special symbols.
- Code blocks must use ASCII-only content unless quoting external source verbatim.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->
