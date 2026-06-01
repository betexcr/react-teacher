# Dynamic Form Generation and Validation

## Problem Statement

Design and implement a Form Builder system that allows admins to create, update, and manage dynamic forms. The forms should be:

- **Configurable:** Define fields (text, checkbox, select, file upload) with conditional visibility (show Field B when Field A = “Yes”)
- **Validatable:** Client and server validation—required, patterns, lengths, and cross-field rules
- **Scalable:** Handle high submission volume without degrading editor or renderer performance
- **Collaborative:** Multiple admins can co-edit schema in real time without silent overwrites
- **Auditable:** Versioned schemas, submission logs, and validation error trails for compliance

## System Architecture

- **Client Layer:** Schema-driven React renderer, React Hook Form + Zod, WebSocket collaboration UI, draft autosave (localStorage / IndexedDB)
- **API Layer:** REST CRUD for forms and submissions, server-side validation, auth, WebSocket rooms per `formId`
- **Data Layer:** `forms` and `submissions` tables, event bus for webhooks/analytics, backups and retention policies

```text
Admin Builder ──► POST /forms/{id}/schema ──► DB (versioned JSON schema)
End User      ──► POST /forms/{id}/submit  ──► Validate ──► submissions
Collaboration ──► WS form:{id}             ──► Broadcast patch events
```

## Key Technical Decisions

### 1. Schema-first storage with versioning

Each form document stores `{ version, fields[], rules[] }` as JSON. Submissions reference `form_version` so historical answers stay interpretable after schema changes.

**Zod** (or JSON Schema) generates runtime validators from the same source of truth used on the client—reducing drift between layers.

### 2. Validation strategy (client + server)

- **Client:** Immediate feedback via RHF `resolver: zodResolver(schema)`—reduces invalid traffic
- **Server:** Authoritative validation, authorization, and business rules (e.g. unique email per tenant)

Never trust client-only validation for security or billing-sensitive fields.

### 3. Conditional logic

Evaluate visibility with a small DSL:

```ts
type Condition = { field: string; op: 'eq' | 'neq' | 'in'; value: unknown };

function isVisible(field: FieldDef, values: Record<string, unknown>) {
  if (!field.when) return true;
  return field.when.every((c) => evalCondition(c, values));
}
```

Re-run when watched fields change; unregister hidden field values to avoid ghost submissions.

### 4. Real-time collaboration

WebSocket **rooms** keyed by `formId`. Events: `FIELD_ADDED`, `FIELD_UPDATED`, `RULE_CHANGED`. Use optimistic UI; server serializes patches with version checks (`expectedVersion`) to detect conflicts.

For stricter needs, consider CRDT/OT; for admin builders, **last-write-wins with version bump** is often enough.

## Implementation: Core Components

### Server schema (Zod)

```ts
import { z } from 'zod';

export const fieldSchema = z.discriminatedUnion('type', [
  z.object({
    id: z.string(),
    type: z.literal('text'),
    label: z.string(),
    required: z.boolean().optional(),
    pattern: z.string().optional(),
  }),
  z.object({
    id: z.string(),
    type: z.literal('select'),
    label: z.string(),
    options: z.array(z.object({ value: z.string(), label: z.string() })),
  }),
]);

export const formSchema = z.object({
  version: z.number().int().positive(),
  fields: z.array(fieldSchema),
});

export type FormDefinition = z.infer<typeof formSchema>;
```

### Dynamic renderer (client)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildZodFromForm } from './buildZodFromForm';

export function DynamicForm({ definition }: { definition: FormDefinition }) {
  const schema = buildZodFromForm(definition);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  const values = watch();

  return (
    <form onSubmit={handleSubmit((data) => submitToApi(definition.version, data))}>
      {definition.fields.map((field) => {
        if (!isVisible(field, values)) return null;
        return (
          <FieldRenderer
            key={field.id}
            field={field}
            register={register}
            error={errors[field.id]?.message as string | undefined}
          />
        );
      })}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Collaboration + server validation

```ts
// Server: reject stale writes
app.patch('/forms/:id', async (req, res) => {
  const { expectedVersion, patch } = req.body;
  const form = await db.forms.findById(req.params.id);
  if (form.version !== expectedVersion) {
    return res.status(409).json({ error: 'CONFLICT', currentVersion: form.version });
  }
  const next = applyPatch(form, patch);
  await db.forms.update({ ...next, version: form.version + 1 });
  wss.to(`form:${req.params.id}`).emit('FORM_UPDATED', next);
  res.json(next);
});
```

## Performance Optimization

- Lazy-load heavy field types (rich text, file upload widgets)
- Memoize `FieldRenderer` with `React.memo`; split form state by section to limit rerenders
- Debounce autosave drafts (500ms); flush on `visibilitychange`
- Server: index `submissions(form_id, created_at)`; archive cold submissions
- Paginate submission admin tables; stream large exports
- CDN-cache public form definitions; invalidate on version bump

## Edge Cases and Error Handling

- **Concurrent admin edits:** Return 409 with latest schema; client merges or reloads
- **Validation failures:** Field-level error map `{ fieldId: message }` for accessible inline display
- **Large uploads:** Direct-to-S3 presigned URLs; chunked upload with progress
- **Abandoned drafts:** TTL drafts in IndexedDB; cron cleanup on server
- **XSS:** Sanitize rich text; never `dangerouslySetInnerHTML` with raw admin HTML without allowlist
- **Schema migration:** Block breaking changes on live forms or fork a new version
