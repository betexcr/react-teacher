import type { FlashcardDeck } from './types';

export const securityDeck: FlashcardDeck = {
  "id": "security",
  "slug": "security",
  "title": "Security Best Practices",
  "cards": [
    {
      "question": "What is XSS in React?",
      "explanation": "Default escaping in JSX. Danger: dangerouslySetInnerHTML—sanitize with DOMPurify.\n\n```tsx\nimport React from 'react';\nimport DOMPurify from 'dompurify';\n\n<p>{userBio}</p>\n\n<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cmsHtml) }} />\n```\n\nJSX escapes text by default; dangerouslySetInnerHTML bypasses that—sanitize with DOMPurify and treat CMS HTML as untrusted input."
    },
    {
      "question": "What is CSRF?",
      "explanation": "Use SameSite cookies, CSRF tokens for cookie-auth forms, avoid credentialed CORS misconfig.\n\n```tsx\nfetch('/api/transfer', {\n  method: 'POST',\n  credentials: 'include',\n  headers: { 'X-CSRF-Token': csrfFromMeta },\n  body: JSON.stringify(payload),\n});\n```\n\nCookie-based sessions need SameSite cookies and CSRF tokens on mutating requests—SPAs using Authorization headers are less exposed but APIs must still authenticate."
    },
    {
      "question": "What is Never store secrets in frontend?",
      "explanation": "API keys in client bundles are public; use server proxy.\n\n```tsx\n// Bad: const STRIPE_SECRET = import.meta.env.VITE_STRIPE_SECRET;\n// Good: POST /api/create-checkout-session from server route\n```\n\nAnything in VITE_ or NEXT_PUBLIC_ env vars ships to browsers—proxy paid APIs through your server and bill per session server-side."
    },
    {
      "question": "What is Auth token storage?",
      "explanation": "httpOnly cookies preferred over localStorage for XSS resilience.\n\n```tsx\n// Server sets: Set-Cookie: session=…; HttpOnly; Secure; SameSite=Lax\n// Client: fetch('/api/me', { credentials: 'include' })\n```\n\nhttpOnly, Secure, SameSite cookies hide tokens from document.cookie and XSS exfiltration—localStorage tokens are readable by any script injection."
    },
    {
      "question": "What is Content Security Policy?",
      "explanation": "HTTP header restricts script sources; mitigates inline injection.\n\n```tsx\n// Content-Security-Policy: default-src 'self'; script-src 'self'\n```\n\nCSP headers restrict script-src and block inline injection—even with React escaping, CSP limits damage from compromised third-party scripts."
    },
    {
      "question": "What is Dependency auditing?",
      "explanation": "npm audit, Dependabot, lockfile integrity.\n\n```tsx\n// package.json scripts: \"audit\": \"npm audit --audit-level=high\"\n```\n\nRun npm audit and Dependabot in CI; a compromised transitive package runs with the same privileges as your app code during build and runtime."
    },
    {
      "question": "What is Open redirects?",
      "explanation": "Validate redirect URLs against allowlist before navigate( userParam ).\n\n```tsx\nconst ALLOWED = new Set(['/', '/dashboard', '/settings']);\n\nfunction safeRedirect(path: string) {\n  if (ALLOWED.has(path)) navigate(path);\n  else navigate('/');\n}\n```\n\nNever navigate to user-supplied URLs blindly—allowlist hosts or map slugs to internal routes before calling navigate(returnUrl)."
    },
    {
      "question": "What is JWT in SPA?",
      "explanation": "Short expiry, refresh rotation, store securely, validate on server only.\n\n```tsx\n// Server: jwt.verify(token, secret)\n// Client: show claims only after /api/session confirms\n```\n\nVerify JWTs only on the server; short-lived access tokens plus refresh rotation limit theft window—client decode is for display, not trust."
    },
    {
      "question": "What is CORS?",
      "explanation": "Browser enforces; server sets Access-Control-Allow-Origin—not a substitute for auth.\n\n```tsx\n// Server must echo specific origin, not * when credentials: true\n```\n\nCORS is a browser enforcement for cross-origin reads—it does not replace authentication; misconfigured Access-Control-Allow-Origin * with credentials is dangerous."
    },
    {
      "question": "What is Input validation?",
      "explanation": "Validate on server always; client validation is UX only.\n\n```tsx\nconst parsed = schema.safeParse(req.body);\nif (!parsed.success) return Response.json({ errors: parsed.error }, { status: 400 });\n```\n\nClient validation improves UX; attackers bypass it—always validate and encode on the server before DB writes and HTML echo."
    },
    {
      "question": "What is Rate limiting?",
      "explanation": "Server-side throttling on auth and expensive endpoints.\n\n```tsx\n// middleware: if (tooManyRequests(ip)) return 429\n```\n\nThrottle login, password reset, and expensive search endpoints server-side—client debouncing does not stop scripted abuse."
    },
    {
      "question": "What is Subresource Integrity?",
      "explanation": "integrity attribute on CDN scripts to detect tampering.\n\n```tsx\nimport React from 'react';\n\n<script\n  src=\"https://cdn.example.com/lib.js\"\n  integrity=\"sha384-…\"\n  crossOrigin=\"anonymous\"\n/>\n```\n\nSRI hashes on CDN script tags detect tampering—if the CDN serves altered JS, the browser refuses to execute it."
    },
    {
      "question": "What is Clickjacking?",
      "explanation": "X-Frame-Options or CSP frame-ancestors.\n\n```tsx\n// Header: X-Frame-Options: DENY\n// Or CSP: frame-ancestors 'none'\n```\n\nX-Frame-Options DENY or CSP frame-ancestors stops your app from being embedded in invisible iframes that trick clicks."
    },
    {
      "question": "What is Sensitive data in URLs?",
      "explanation": "Avoid tokens in query strings—logged in history/referrers.\n\n```tsx\n// Bad: /reset?token=eyJhbG…\n// Good: POST /api/reset with token in body\n```\n\nTokens in query strings leak via Referer headers, browser history, and server logs—use POST bodies or short-lived exchange codes instead."
    },
    {
      "question": "What is Supply chain?",
      "explanation": "Pin deps, review packages, use provenance where available.\n\n```tsx\n// .npmrc: ignore-scripts=true (when safe for your toolchain)\n```\n\nPin lockfiles, review new dependencies, and enable npm provenance where available—postinstall scripts are a common attack vector."
    }
  ]
};
