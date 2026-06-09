# Polymorphic Components

## What it is

A polymorphic component accepts an **`as` prop** (or similar) so it renders as different HTML elements or components while keeping the same styles and behavior. A `Button` might render as `<button>`, `<a>`, or `<Link>` depending on usage.

## When to use

- Design systems where one styled primitive must work as link or button
- Accessibility: correct semantic element (`<a href>` for navigation, `<button>` for actions)
- Avoid duplicating CSS across `Button`, `ButtonLink`, `ButtonRouterLink`

## Example

```tsx
import { forwardRef, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';

type BoxProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

function Box<T extends ElementType = 'div'>({ as, children, className, ...rest }: BoxProps<T>) {
  const Component = as ?? 'div';
  return (
    <Component className={['box', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Component>
  );
}

// Usage
<Box as="section" aria-label="Stats">…</Box>
<Box as="a" href="/docs">Read docs</Box>
```

## TypeScript tip

Use generics + `ComponentPropsWithoutRef` so `href` is required when `as="a"` and `onClick` when `as="button"`. Libraries like Radix expose `asChild` with `Slot` instead of `as` — know both variants in interviews.

## Tradeoffs

| Aspect | Details |
|--------|---------|
| Pros | One component, many semantics; consistent styling |
| Cons | Generic types get complex; misuse (`as="div"` with `href`) is possible without strict typing |
| Interview angle | Contrast `as` prop vs wrapping with `<Link><Button /></Link>` (invalid HTML nesting if Button renders `<button>`) |

