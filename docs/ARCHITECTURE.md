# ARCHITECTURE

## 1. Overview

A conventional **JAMstack-ish 3-tier web app**: a server-rendered/statically-generated frontend, a REST API backend, and a managed relational database — plus two external services (payment gateway, transactional email) and file storage for uploaded papers/brochures.

```
                         ┌─────────────────────────┐
                         │        Browser           │
                         │ (delegate / author /      │
                         │  committee member)         │
                         └───────────┬────────────┘
                                     │ HTTPS
                          ┌──────────▼───────────┐
                          │   Frontend (Next.js)  │
                          │  - Public pages (SSG)  │
                          │  - Registration UI     │
                          │  - Submission UI        │
                          │  - Admin console (SPA)  │
                          └──────────┬───────────┘
                                     │ REST/JSON (fetch)
                          ┌──────────▼───────────┐
                          │  Backend API (Node)    │
                          │  - Auth (OTP/magic link)│
                          │  - Registrations       │
                          │  - Submissions          │
                          │  - Admin/reporting      │
                          │  - Certificate gen       │
                          └──┬────────┬─────────┬─┘
                             │        │         │
                 ┌───────────▼──┐ ┌───▼─────┐ ┌─▼──────────────┐
                 │  PostgreSQL   │ │  Object  │ │ External APIs   │
                 │  (registrations,│ │ Storage  │ │ - Razorpay (INR)│
                 │  submissions,  │ │ (papers, │ │ - PayPal/Stripe │
                 │  committee,    │ │ brochures,│ │   (USD)         │
                 │  tracks, CMS)  │ │ certs)   │ │ - Email (Resend/│
                 └────────────────┘ └──────────┘ │   SES)          │
                                                  └─────────────────┘
```

## 2. Components

### 2.1 Frontend (`/frontend`)
- **Framework:** Next.js (React), statically generates the marketing pages (Home, About, Tracks, Committee, Schedule, Venue) at build time for speed and SEO; registration/submission/admin pages are client-rendered against the API.
- **Why static for content pages:** conference facts (tracks, committee, schedule) change rarely; static generation gives the Lighthouse-90 target cheaply and survives traffic spikes without scaling the API.
- **Content source:** page copy pulled from a small headless CMS or a versioned JSON/Markdown content layer (see `TECH_STACK.md` §CMS decision) so non-developers on the committee can edit dates/announcements without a deploy.

### 2.2 Backend API (`/backend`)
- **Framework:** Node.js + Express (or Fastify) exposing a REST API (`API_SPEC.md`).
- **Modules:**
  - `auth` — passwordless OTP/magic-link for authors & admin login for committee members.
  - `registrations` — create, fee calculation, payment webhook handling, status.
  - `submissions` — abstract/paper CRUD, status transitions, reviewer comments.
  - `admin` — dashboards, exports, CMS content edits, role-based authorization.
  - `notifications` — templated transactional email sending, queued.
  - `certificates` — post-event bulk PDF generation from a template + attendee list.
- **Background jobs:** a lightweight queue (e.g., BullMQ on Redis, or a simple cron table) for: sending emails, generating certificates in bulk, payment-status reconciliation with the gateway.

### 2.3 Database
- PostgreSQL (managed — e.g., Supabase/Neon/Render Postgres). See `DATABASE_SCHEMA.md`.

### 2.4 File/Object Storage
- S3-compatible storage (S3, Cloudflare R2, or Supabase Storage) for: uploaded full papers, brochure/schedule PDFs, generated certificates, speaker photos.

### 2.5 External services
- **Payment:** Razorpay (INR — domestic faculty/scholar fees) + PayPal or Stripe (USD — foreign delegate fees). Two gateways because Indian gateways generally don't cleanly settle USD for foreign cards, and PayPal/Stripe are what foreign academics expect.
- **Email:** Resend, Postmark, or Amazon SES for transactional email (confirmations, receipts, decisions).
- **Analytics:** privacy-respecting analytics (Plausible/Umami) rather than full Google Analytics, given the accessibility/privacy posture and EU/foreign-delegate audience.

## 3. Environments

| Env | Purpose | Notes |
|---|---|---|
| `local` | developer machines | docker-compose for Postgres + Redis |
| `staging` | committee review, demo to funding agencies | seeded with realistic but fake data |
| `production` | live site | real payments (live gateway keys), backups enabled |

## 4. Deployment

- Frontend → Vercel (or Netlify) — free/low tier fits the ₹20,000 "Online Platform and Technical Support" budget line.
- Backend + DB → a single small managed host (Render/Railway) or a VM if PIET's IT wants self-hosting; either is fine at this scale (150 participants).
- CI/CD: GitHub Actions — lint/test/build on PR, deploy on merge to `main` (staging) and on tag (production).

## 5. Key architectural decisions (see `docs/decisions/` for full ADRs)

1. **Static content + dynamic app split** — keeps hosting cheap and pages fast; only registration/submission/admin need a live server.
2. **Two payment gateways, one currency each** — avoids poor UX/high fees converting USD↔INR through a single gateway.
3. **Passwordless auth for authors** — reduces support burden (no "forgot password" for a one-time-use system); full username/password for admin/committee roles who log in repeatedly.
4. **No custom peer-review engine** — v1 ships a simple accept/reject/revise workflow per submission; a full conference-management system (EasyChair-like) is deliberately out of scope (see `PRD.md` Non-goals).
