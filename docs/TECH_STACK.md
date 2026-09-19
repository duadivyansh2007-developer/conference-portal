# TECH STACK

## Frontend
| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (React, App Router)** | SSG for content pages + client components for forms; strong SEO out of the box (important for a conference trying to attract international delegates). |
| Styling | **Tailwind CSS** | Fast to theme (saffron/maroon/gold Indian-heritage palette), consistent with `UI_UX_SPEC.md`. |
| Component layer | **shadcn/ui** (Radix-based) | Accessible primitives (dialogs, accordions for tracks, tabs for schedule days) without heavy custom a11y work. |
| Forms | **React Hook Form + Zod** | Client-side validation matching the same schema used server-side. |
| State/data fetching | **TanStack Query** | Simple caching for admin dashboard and submission-status polling. |
| Charts (admin dashboard) | **Recharts** | Registration/payment counts. |

## Backend
| Layer | Choice | Why |
|---|---|---|
| Runtime | **Node.js (LTS)** | Same language as frontend; one team can own both. |
| Framework | **Express** (or Fastify) | Minimal, well-understood, easy for a student/faculty dev team (Cyborgs Club) to maintain. |
| ORM | **Prisma** | Type-safe queries, easy migrations, good fit with Postgres. |
| Validation | **Zod** (shared schema package with frontend where possible) | Single source of truth for form/field rules. |
| Auth | **Passwordless (email OTP / magic link)** for authors; **email+password with hashed credentials (argon2)** for admin/committee | See `SECURITY.md`. |
| Background jobs | **BullMQ + Redis** (or simple Postgres-backed job table if Redis is overkill at this scale) | Emails, certificate batch generation. |
| PDF generation | **Puppeteer or `pdf-lib`** | Receipts and certificates from HTML/templates. |

## Database
- **PostgreSQL** (managed: Supabase, Neon, or Render Postgres). Chosen over MySQL for JSONB support (flexible sub-track/field metadata) and because Prisma + Postgres is the most common, best-documented combination.
- **Redis** (optional, only if using BullMQ) — managed (Upstash) to avoid ops overhead.

## Storage
- **S3-compatible object storage** (Cloudflare R2 recommended for zero egress fees, or Supabase Storage if already using Supabase for DB) for papers, brochures, certificates.

## Payments
- **Razorpay** — INR fee collection (Faculty ₹2,000 / Scholar ₹1,000), UPI + cards + netbanking, widely trusted by Indian institutions.
- **PayPal Checkout or Stripe** — USD fee collection (Foreign Delegate $150–300).
- Both integrated server-side via webhooks so payment status is never trusted from the client alone.

## Email
- **Resend** or **Amazon SES** — transactional email (confirmations, receipts, decisions, reminders). React Email (or MJML) for templating so emails render consistently across clients.

## CMS / editable content
- **Option A (simplest):** a single `content` table (JSON per page-section) editable from the admin console — no third-party dependency, fits the small scale.
- **Option B:** a lightweight headless CMS (e.g., **Payload CMS**, self-hosted, or **Sanity** free tier) if the committee wants a richer editing UI (image uploads, rich text) without developer help.
- **Recommendation:** start with Option A; migrate to Option B only if non-technical committee members find the admin console editing insufficient (tracked as a decision in `docs/decisions/`).

## Hosting / Infra
| Component | Host | Est. cost fit |
|---|---|---|
| Frontend (Next.js) | Vercel (Hobby/Pro) | Free–~$20/mo |
| Backend API | Render or Railway | ~$7–25/mo |
| Postgres | Neon/Supabase (managed) | Free–~$25/mo |
| Object storage | Cloudflare R2 | Pennies at this file volume |
| Domain + email | Existing PIET domain subdomain (e.g., `iks2027.piet.ac.in`) or a dedicated domain (`ikon2027.in`), preferred based on other sites reviewed (most used a dedicated `.in`/subdomain) | ~₹800–1,500/yr |

Total infra should comfortably sit inside the ₹20,000 "Online Platform and Technical Support" budget line (proposal §13), leaving headroom for the payment gateway's transaction fees (2–3% typical, paid out of collected fees, not the budget line).

## Dev tooling
- **TypeScript** across frontend and backend for shared types.
- **ESLint + Prettier** for consistency.
- **GitHub Actions** for CI (lint, typecheck, test, build) and CD (deploy on merge/tag).
- **Playwright** for end-to-end tests of registration/submission flows (see `TESTING.md`).
