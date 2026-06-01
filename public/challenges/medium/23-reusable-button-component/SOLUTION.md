# Solution: Build a Reusable Button Component

## Approach

Single component composes class names and conditional spinner.

## Key concepts

- **aria-busy**: Announces loading state to assistive tech.

## Solution code

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'danger';
  loading?: boolean;
};

export function Button({ variant = 'primary', loading, children, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={`btn btn--${variant}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && <span className="spinner" aria-hidden />}
      {children}
    </button>
  );
}
```

## Walkthrough

loading sets disabled and aria-busy; variant drives CSS modifier.

## Common mistakes

- Not disabling during load
- Spinner without aria-hidden

## Stretch goals

- as="a" polymorphism
- Icon-only button labels
