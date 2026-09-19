# SECURITY

## 1. Data classification

| Data | Sensitivity | Notes |
|---|---|---|
| Name, email, phone, affiliation, country | Personal, low-medium sensitivity | Collected for registration/submission; not published without consent (committee/speaker listings are opt-in and explicitly agreed to when invited). |
| Payment card/bank details | High | **Never stored on our servers.** Fully delegated to Razorpay/PayPal/Stripe (PCI-DSS compliant hosted checkout). We only store gateway reference IDs and amounts. |
| Uploaded papers | Medium (pre-publication academic work) | Access restricted to the submitting author + committee/reviewer roles. |
| Admin credentials | High | argon2-hashed passwords, no plaintext storage, ever. |

## 2. Authentication & authorization
- **Authors:** passwordless (email OTP/magic link). OTPs are 6-digit, single-use, expire in 10 minutes, rate-limited (5/15min per IP+email) to resist brute force.
- **Admin/committee:** email+password (argon2id hashing), plus recommend enabling **TOTP 2FA** for `super_admin` role given payment-adjacent data access.
- **Authorization:** role-based (`super_admin`, `committee`, `hospitality`) enforced server-side on every admin route — never trust a frontend route guard alone.
- **JWTs:** short-lived access tokens (15 min) + refresh tokens (7 days, rotated, stored httpOnly/secure/sameSite=strict).

## 3. Payment security
- All checkout happens on the gateway's hosted page/SDK widget (Razorpay Checkout, PayPal Buttons) — no raw card fields ever touch our frontend or backend ("SAQ-A" PCI scope, the lightest tier).
- Payment status is only ever trusted from **server-to-server webhooks with signature verification** (Razorpay `x-razorpay-signature`, PayPal webhook signature verification API) — client-side "payment succeeded" callbacks are treated as a UX hint only, never as the source of truth for `registrations.status`.
- Idempotency keys on order creation to prevent double-charging on retry/double-click.

## 4. Application security
- Input validation via shared Zod schemas on both client and server; server-side validation is authoritative.
- Parameterized queries via Prisma (no raw SQL string concatenation) — mitigates SQL injection.
- File upload restrictions: allow-list MIME types (`pdf`, `doc`, `docx`), max size 10MB, files scanned for malware if a scanning service is available (e.g., ClamAV in a Lambda/worker) before being made downloadable to committee members.
- Rate limiting on public write endpoints (registration, submission, contact form) to deter spam/bot abuse; honeypot field as a lightweight first line before adding CAPTCHA friction.
- CSRF protection on any cookie-based session flows; since primary auth is JWT-in-header for API calls, CSRF risk is reduced but still mitigated for any cookie-based admin session.
- Standard security headers (CSP, HSTS, X-Content-Type-Options, Referrer-Policy) set at the frontend edge (Vercel/Next.js middleware).

## 5. Infrastructure security
- Secrets (DB URL, gateway API keys, email API keys, JWT signing secret) in environment variables / the host's secret manager — never committed to git (`.env` in `.gitignore`, `.env.example` committed instead).
- Database backups: daily automated backups with at least 7-day retention (most managed Postgres providers include this) — critical given this is the source of truth for who has paid.
- TLS everywhere (HTTPS-only, enforced via HSTS).
- Principle of least privilege: the committee's `hospitality` role can view dietary/accommodation-relevant registration fields but not export full PII or see payment details.

## 6. Privacy & compliance
- Publish a short **Privacy Notice** on the site (footer link) explaining what's collected and why (registration, submission, contact form), matching India's DPDP Act 2023 expectations for a reasonably-sized institutional site: purpose limitation, no sale of data to third parties, contact for data-deletion requests.
- Committee/speaker names, designations, and photos are published only with their consent (standard for an invited-speaker/committee context, but flag this explicitly to the Conveners as a checklist item before launch).
- Data retention: `TBD` pending PIET institutional policy — default proposal is 3 years post-event, then archive/delete PII while retaining aggregate stats.

## 7. Incident response (lightweight, appropriate to scale)
- A single named technical point-of-contact (likely a Cyborgs Club lead or a convener-designated faculty member) is responsible for rotating any leaked credential/API key immediately and for reviewing gateway webhook logs weekly during the registration window.
- Payment gateway dashboards are the source of truth for reconciliation if the database and gateway ever disagree — never "trust" a local DB row over the gateway's own ledger.
