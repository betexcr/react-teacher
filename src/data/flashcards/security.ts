import type { FlashcardDeck } from './types';

export const securityDeck: FlashcardDeck = {
  "id": "security",
  "slug": "security",
  "title": "Security Best Practices",
  "cards": [
    {
      "question": "What is XSS in React?",
      "explanation": "Default escaping in JSX. Danger: dangerouslySetInnerHTML—sanitize with DOMPurify.\n\n```tsx\n// Safe by default\n<p>{userBio}</p>\n\n// Dangerous — sanitize first\n<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />\n```\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is CSRF?",
      "explanation": "Use SameSite cookies, CSRF tokens for cookie-auth forms, avoid credentialed CORS misconfig.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Never store secrets in frontend?",
      "explanation": "API keys in client bundles are public; use server proxy.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Auth token storage?",
      "explanation": "httpOnly cookies preferred over localStorage for XSS resilience.\n\n```tsx\n// Prefer httpOnly cookie set by server\n// Avoid: localStorage.setItem('token', jwt)\n```\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Content Security Policy?",
      "explanation": "HTTP header restricts script sources; mitigates inline injection.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Dependency auditing?",
      "explanation": "npm audit, Dependabot, lockfile integrity.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Open redirects?",
      "explanation": "Validate redirect URLs against allowlist before navigate( userParam ).\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is JWT in SPA?",
      "explanation": "Short expiry, refresh rotation, store securely, validate on server only.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is CORS?",
      "explanation": "Browser enforces; server sets Access-Control-Allow-Origin—not a substitute for auth.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Input validation?",
      "explanation": "Validate on server always; client validation is UX only.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Rate limiting?",
      "explanation": "Server-side throttling on auth and expensive endpoints.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Subresource Integrity?",
      "explanation": "integrity attribute on CDN scripts to detect tampering.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Clickjacking?",
      "explanation": "X-Frame-Options or CSP frame-ancestors.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Sensitive data in URLs?",
      "explanation": "Avoid tokens in query strings—logged in history/referrers.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    },
    {
      "question": "What is Supply chain?",
      "explanation": "Pin deps, review packages, use provenance where available.\n\nInterview tip: state the threat (XSS, CSRF, token leak) and whether the fix belongs on client, server, or both."
    }
  ]
};
