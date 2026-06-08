# File Upload Pipeline

## Problem Statement

Design a production file upload flow for a React app that supports:

- **UX:** Drag-and-drop zone, multi-file queue, per-file progress, cancel/retry
- **Scale:** Large files (100MB+) via chunked/multipart upload without blocking the UI
- **Security:** Direct-to-storage uploads via presigned URLs—files never proxy through your API server
- **Validation:** Client-side type/size checks; server virus scan before marking file "ready"
- **Preview:** Image thumbnails via object URLs; revoke on unmount to avoid memory leaks

## System Architecture

- **Client Layer:** Dropzone, upload queue state machine, XHR/fetch with progress events, polling for scan status
- **API Layer:** `POST /uploads/init` → presigned POST fields, `POST /uploads/complete`, webhook from scanner
- **Data Layer:** Object storage (S3/GCS), upload metadata table, async virus-scan worker

```text
Client ──► POST /uploads/init ──► presigned URL + fields
       ──► PUT/POST chunks to S3 directly (progress events)
       ──► POST /uploads/complete ──► enqueue virus scan
       ──► poll GET /uploads/:id until status=ready
```

## Key Technical Decisions

### 1. Presigned URL vs. multipart through API

**Presigned POST/PUT** lets the browser upload directly to object storage. Your API only mints credentials and records metadata—saves bandwidth and avoids timeout limits on serverless functions.

Flow: client requests upload slot → server returns `{ url, fields, uploadId }` → client POSTs `FormData` to S3 → client notifies server on complete.

### 2. Chunked upload for large files

For files > 5MB, split into parts (e.g. 5MB chunks):

1. `CreateMultipartUpload` on server
2. Upload each part with presigned URLs + `ETag` per part
3. `CompleteMultipartUpload` with ordered ETags

Resume support: persist `{ uploadId, completedParts[] }` in IndexedDB if connection drops.

### 3. Client validation (first line of defense)

- **MIME + extension** allowlist (`image/jpeg`, `application/pdf`)
- **Max size** per tier (free: 10MB, pro: 100MB)
- Reject before network—show inline error on drop

Server re-validates; never trust client-only checks.

### 4. Upload state machine

Per file: `queued → uploading → processing → ready | failed`.

`processing` covers virus scan / transcoding. Poll every 2s with backoff or use WebSocket push when scan completes.

## Implementation: Core Components

### Dropzone + queue

```tsx
import { useCallback, useState } from 'react';

type UploadItem = {
  id: string;
  file: File;
  progress: number;
  status: 'queued' | 'uploading' | 'processing' | 'ready' | 'failed';
  error?: string;
};

export function FileUploadZone() {
  const [items, setItems] = useState<UploadItem[]>([]);

  const onDrop = useCallback((files: FileList | null) => {
    if (!files) return;
    const next = [...files].map((file) => ({
      id: crypto.randomUUID(),
      file,
      progress: 0,
      status: 'queued' as const,
    }));
    setItems((prev) => [...prev, ...next]);
    next.forEach((item) => startUpload(item, setItems));
  }, []);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        onDrop(e.dataTransfer.files);
      }}
      role="region"
      aria-label="File upload drop zone"
    >
      <input
        type="file"
        multiple
        hidden
        id="file-input"
        onChange={(e) => onDrop(e.target.files)}
      />
      <label htmlFor="file-input">Drop files or click to browse</label>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.file.name} — {item.status} — {item.progress}%
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Presigned upload with progress (XHR)

```tsx
async function initUpload(file: File) {
  const res = await fetch('/api/uploads/init', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: file.name, size: file.size, type: file.type }),
  });
  if (!res.ok) throw new Error('Could not start upload');
  return res.json() as Promise<{
    uploadId: string;
    url: string;
    fields: Record<string, string>;
  }>;
}

function uploadToS3(
  file: File,
  url: string,
  fields: Record<string, string>,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    Object.entries(fields).forEach(([k, v]) => form.append(k, v));
    form.append('file', file);

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => (xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error('Upload failed')));
    xhr.onerror = () => reject(new Error('Network error'));
    xhr.open('POST', url);
    xhr.send(form);
  });
}

async function startUpload(
  item: UploadItem,
  setItems: React.Dispatch<React.SetStateAction<UploadItem[]>>
) {
  const update = (patch: Partial<UploadItem>) =>
    setItems((prev) => prev.map((i) => (i.id === item.id ? { ...i, ...patch } : i)));

  try {
    update({ status: 'uploading', progress: 0 });
    const { uploadId, url, fields } = await initUpload(item.file);
    await uploadToS3(item.file, url, fields, (progress) => update({ progress }));
    await fetch(`/api/uploads/${uploadId}/complete`, { method: 'POST' });
    update({ status: 'processing', progress: 100 });
    await pollUntilReady(uploadId, update);
  } catch (e) {
    update({ status: 'failed', error: e instanceof Error ? e.message : 'Upload failed' });
  }
}
```

### Poll virus-scan status

```tsx
async function pollUntilReady(
  uploadId: string,
  update: (patch: Partial<UploadItem>) => void
) {
  for (let attempt = 0; attempt < 30; attempt++) {
    const res = await fetch(`/api/uploads/${uploadId}`);
    const data = await res.json();
    if (data.status === 'ready') {
      update({ status: 'ready' });
      return;
    }
    if (data.status === 'rejected') {
      update({ status: 'failed', error: 'File failed security scan' });
      return;
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  update({ status: 'failed', error: 'Processing timed out' });
}
```

### Image preview (object URL)

```tsx
import { useEffect, useState } from 'react';

function ImagePreview({ file }: { file: File }) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setSrc(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  if (!src) return null;
  return <img src={src} alt="" width={64} height={64} style={{ objectFit: 'cover' }} />;
}
```

## Performance Optimization

- Upload chunks in parallel (max 3 concurrent) for multipart
- Use `requestIdleCallback` for thumbnail generation on large batches
- Revoke object URLs on remove from queue
- Debounce drag-over styling; avoid re-render entire list on every progress tick (update by id)

## Edge Cases and Error Handling

- **Duplicate filenames:** Append suffix or use UUID in storage key
- **Network drop mid-upload:** Retry with same multipart uploadId + resume parts
- **User navigates away:** `beforeunload` warning if uploads in progress
- **CORS on S3:** Configure bucket CORS for browser POST/PUT from your origin
- **Expired presigned URL:** Re-init upload if 403; show "Retry"
- **Empty file / folder drop:** Filter `file.size > 0`; ignore directory entries if unsupported

## Interview Talking Points

- Why presigned URLs beat proxying through Node (cost, timeouts, memory)
- When chunked multipart is required vs. single PUT
- PCI/security: scan async; never serve file until `ready`
