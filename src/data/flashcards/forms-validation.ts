import type { FlashcardDeck } from './types';

export const formsValidationDeck: FlashcardDeck = {
  "id": "forms-validation",
  "slug": "forms",
  "title": "Forms & Validation",
  "cards": [
    {
      "question": "What is Controlled form fields?",
      "explanation": "value + onChange tied to state; single source of truth.\n\n```tsx\nconst [email, setEmail] = useState('');\n\n<input value={email} onChange={(e) => setEmail(e.target.value)} />\n```\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is react-hook-form?",
      "explanation": "Uncontrolled refs + register(); less re-renders; resolver for schema validation.\n\n```tsx\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(schema),\n});\n\n<input {...register('email')} />\n```\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Zod + forms?",
      "explanation": "Schema defines shape; zodResolver validates; inferred TypeScript types.\n\n```tsx\nconst schema = z.object({ email: z.string().email() });\ntype FormData = z.infer<typeof schema>;\n```\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Field-level vs form-level validation?",
      "explanation": "onBlur per field UX; submit validates all; display errors map.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Touched/dirty flags?",
      "explanation": "Show errors after interaction; dirty means user changed value.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Async validation?",
      "explanation": "Check username availability on blur; debounce API calls.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Form state machines?",
      "explanation": "Multi-step wizards; branch logic; XState for complex flows.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is File inputs?",
      "explanation": "Controlled tricky—often uncontrolled ref or store File in state on change.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Native form validation?",
      "explanation": "required, pattern, constraint validation API—supplement with JS.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Accessibility in forms?",
      "explanation": "label htmlFor, aria-invalid, aria-describedby for errors.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Reset form?",
      "explanation": "setState initial values; RHF reset(); key prop remount trick.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Dynamic fields?",
      "explanation": "```tsx\nuseFieldArray (RHF) or array state with map for repeatable sections.\n```\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Server Actions forms?",
      "explanation": "```tsx\n'use client';\n<form action={formAction}>\n  <SubmitButton />\n</form>\n```\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    },
    {
      "question": "What is Prevent double submit?",
      "explanation": "Disable button while pending; isSubmitting flag.\n\nInterview tip: explain controlled vs uncontrolled choice and when errors surface (blur, submit, async)."
    }
  ]
};
