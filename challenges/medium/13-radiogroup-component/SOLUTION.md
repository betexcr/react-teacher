# Solution: RadioGroup Component

## Approach

Parent owns value; RadioGroup renders radios as buttons with radio role.

## Key concepts

- **Radio group pattern**: One name, one selected value—WAI-ARIA radiogroup.

## Solution code

```tsx
type Option = { value: string; label: string; disabled?: boolean };

export function RadioGroup({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  label: string;
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = options.findIndex((o) => o.value === value);
    if (e.key === 'ArrowDown') onChange(options[(idx + 1) % options.length].value);
    if (e.key === 'ArrowUp') onChange(options[(idx - 1 + options.length) % options.length].value);
  };

  return (
    <div role="radiogroup" aria-label={label} onKeyDown={onKeyDown}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          disabled={o.disabled}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
```

## Walkthrough

Controlled value from parent; keyboard wraps selection index.

## Common mistakes

- Native radio without grouping label
- Forgetting aria-checked

## Stretch goals

- Roving tabindex
- RadioGroupContext for compound API
