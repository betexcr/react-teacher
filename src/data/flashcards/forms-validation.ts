import type { FlashcardDeck } from './types';

export const formsValidationDeck: FlashcardDeck = {
  "id": "forms-validation",
  "slug": "forms",
  "title": "Forms & Validation",
  "cards": [
    {
      "question": "What is Controlled form fields?",
      "explanation": "value + onChange tied to state; single source of truth.\n\n```tsx\nimport { useState } from 'react';\n\nconst [email, setEmail] = useState('');\n\nreturn (\n  <input\n    name=\"email\"\n    value={email}\n    onChange={(e) => setEmail(e.target.value)}\n  />\n);\n```\n\nvalue + onChange ties inputs to React state so validation and submit payloads stay consistent—every keystroke re-renders unless you optimize hot paths."
    },
    {
      "question": "What is react-hook-form?",
      "explanation": "Uncontrolled refs + register(); less re-renders; resolver for schema validation.\n\n```tsx\nimport React from 'react';\nimport { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\n\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(schema),\n});\n\n<form onSubmit={handleSubmit(onSubmit)}>\n  <input {...register('email')} />\n  {errors.email && <span>{errors.email.message}</span>}\n</form>\n```\n\nregister() uses refs for inputs to cut re-renders; zodResolver connects schema validation—Controller wraps MUI/Chakra when third-party inputs manage their own value."
    },
    {
      "question": "What is Zod + forms?",
      "explanation": "Schema defines shape; zodResolver validates; inferred TypeScript types.\n\n```tsx\nimport React from 'react';\nimport { z } from 'zod';\n\nconst schema = z.object({\n  email: z.string().email(),\n  age: z.coerce.number().min(18),\n});\n\ntype FormData = z.infer<typeof schema>;\n```\n\nOne schema drives runtime validation and z.infer types—change the schema once instead of duplicating TS interfaces and manual checks."
    },
    {
      "question": "What is Field-level vs form-level validation?",
      "explanation": "onBlur per field UX; submit validates all; display errors map.\n\n```tsx\nimport React from 'react';\n\nconst onBlur = async (name: keyof FormData) => {\n  await trigger(name);\n};\n\n<button type=\"submit\" onClick={handleSubmit(onValid, onInvalid)}>Save</button>\n```\n\nValidate on blur for friendly UX; run full schema on submit to catch cross-field rules like password confirm—map Zod issues to field paths."
    },
    {
      "question": "What is Touched/dirty flags?",
      "explanation": "Show errors after interaction; dirty means user changed value.\n\n```tsx\nimport React from 'react';\n\n{touchedFields.email && errors.email && (\n  <p id=\"email-error\">{errors.email.message}</p>\n)}\n```\n\nShow errors only after touch to avoid screaming red on first paint—dirty means the user changed the value from the default."
    },
    {
      "question": "What is Async validation?",
      "explanation": "Check username availability on blur; debounce API calls.\n\n```tsx\nimport { useMemo } from 'react';\n\nconst checkUsername = useMemo(\n  () => debounce(async (name: string) => {\n    const ok = await api.isAvailable(name);\n    setError(ok ? undefined : 'Username taken');\n  }, 400),\n  []\n);\n```\n\nDebounce username availability checks on blur—cancel in-flight requests when the user types again to avoid showing stale \"taken\" results."
    },
    {
      "question": "What is Form state machines?",
      "explanation": "Multi-step wizards; branch logic; XState for complex flows.\n\n```tsx\nimport { useReducer } from 'react';\n\nconst [step, send] = useReducer(wizardReducer, { name: 'contact' });\n\n<button onClick={() => send({ type: 'NEXT' })}>Continue</button>\n```\n\nMulti-step wizards with branching (billing vs shipping) stay maintainable as explicit states and events—XState shines when flows exceed three steps."
    },
    {
      "question": "What is File inputs?",
      "explanation": "Controlled tricky—often uncontrolled ref or store File in state on change.\n\n```tsx\nimport { useState } from 'react';\n\nconst [file, setFile] = useState<File | null>(null);\n\n<input\n  type=\"file\"\n  onChange={(e) => setFile(e.target.files?.[0] ?? null)}\n/>\n```\n\nFiles are awkward to control fully—store File in state on change or use uncontrolled ref and read files on submit for uploads."
    },
    {
      "question": "What is Native form validation?",
      "explanation": "required, pattern, constraint validation API—supplement with JS.\n\n```tsx\nimport React from 'react';\n\n<input type=\"email\" required pattern=\"[^@]+@[^@]+\" />\n```\n\nrequired, minLength, and pattern give free UX before JS—still re-validate on the server; native messages need styling or reportValidity for polish."
    },
    {
      "question": "What is Accessibility in forms?",
      "explanation": "label htmlFor, aria-invalid, aria-describedby for errors.\n\n```tsx\nimport React from 'react';\n\n<label htmlFor=\"email\">Email</label>\n<input\n  id=\"email\"\n  aria-invalid={!!errors.email}\n  aria-describedby={errors.email ? 'email-error' : undefined}\n/>\n{errors.email && <p id=\"email-error\">{errors.email.message}</p>}\n```\n\nAssociate labels with htmlFor, wire aria-invalid and aria-describedby to error text—screen readers announce errors only when ids match."
    },
    {
      "question": "What is Reset form?",
      "explanation": "setState initial values; RHF reset(); key prop remount trick.\n\n```tsx\nimport { useEffect } from 'react';\n\nuseEffect(() => {\n  reset(defaultValuesForUser(user));\n}, [user, reset]);\n\n// Or: <Form key={user.id} />\n```\n\nRHF reset(defaultValues) restores fields; remounting with key={userId} clears stubborn uncontrolled widgets when switching records."
    },
    {
      "question": "What is Dynamic fields?",
      "explanation": "```tsx\nimport React from 'react';\n\nconst { fields, append, remove } = useFieldArray({ control, name: 'items' });\n\n{fields.map((field, index) => (\n  <div key={field.id}>\n    <input {...register(`items.${index}.name` as const)} />\n    <button type=\"button\" onClick={() => remove(index)}>Remove</button>\n  </div>\n))}\n```\n\nuseFieldArray manages repeatable sections (line items, attendees)—each row needs stable keys from field.id, not array index alone."
    },
    {
      "question": "What is Server Actions forms?",
      "explanation": "```tsx\n'use client';\n\nimport { useTransition } from 'react';\n\nexport function ContactForm({ action }: { action: (fd: FormData) => Promise<void> }) {\n  const [pending, start] = useTransition();\n  return (\n    <form action={(fd) => start(() => action(fd))}>\n      <button disabled={pending}>Send</button>\n    </form>\n  );\n}\n```\n\nPlain <form action={serverFn}> works without JS; pending spinners and useActionState need a client boundary—progressive enhancement first."
    },
    {
      "question": "What is Prevent double submit?",
      "explanation": "Disable button while pending; isSubmitting flag.\n\n```tsx\nimport React from 'react';\n\n<button type=\"submit\" disabled={isSubmitting}>\n  {isSubmitting ? 'Saving…' : 'Save'}\n</button>\n```\n\nDisable the submit button while isSubmitting or an action is pending—guards against duplicate charges when users double-click impatiently."
    }
  ]
};
