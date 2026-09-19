# TODO / Build Backlog

Legend: 🔴 blocked on committee decision · 🟡 in progress · ⬜ not started · ✅ done

## Milestone 0 — Decisions needed from Organizing Committee (blockers)
- 🔴 Final conference title (IKON2027 vs PRAKASH2027 vs other)
- 🔴 Final venue/auditorium name + address
- 🔴 Domain name choice (dedicated `.in` vs PIET subdomain)
- 🔴 Payment gateway merchant accounts (Razorpay KYC, PayPal/Stripe business account) — these take days to approve, start early
- 🔴 Bank account details for the manual bank-transfer fallback path
- 🔴 Confirmed/target list of international & national keynote speakers
- 🔴 Data retention policy sign-off (`SECURITY.md` §6)
- 🔴 Journal/publication partner(s) for accepted full papers, if any

## Milestone 1 — Foundations
- ⬜ Repo scaffolding: `frontend/` (Next.js + Tailwind + shadcn/ui), `backend/` (Express + Prisma)
- ⬜ CI pipeline (lint, typecheck, test, build) on GitHub Actions
- ⬜ Provision staging Postgres + object storage
- ⬜ Implement `DATABASE_SCHEMA.md` as Prisma schema + initial migration
- ⬜ Seed script: load tracks/sub-tracks (35 total) and committee list from the source proposal so content is correct on day one

## Milestone 2 — Public marketing site (static content)
- ⬜ Home, About, About PIET, Objectives pages
- ⬜ Tracks page (accordion, data-driven)
- ⬜ Committee page (grouped, data-driven)
- ⬜ Schedule page (Day 1 / Day 2 tabs, data-driven, PDF download)
- ⬜ Speakers page with "invited/confirmed/TBD" status badges
- ⬜ Downloads page (brochure/CFP/schedule placeholders until final PDFs exist)
- ⬜ Venue & Travel page
- ⬜ Contact/FAQ page
- ⬜ Funding agencies / sponsors strip
- ⬜ Lighthouse ≥90 mobile check passing in CI

## Milestone 3 — Registration & payments
- ⬜ Registration form (3-step wizard) + server-side fee computation
- ⬜ Razorpay integration (order create + webhook + signature verification)
- ⬜ PayPal/Stripe integration (order create + webhook)
- ⬜ Manual bank-transfer fallback path + admin "mark as paid" action
- ⬜ Confirmation email + PDF receipt generation
- ⬜ Registration status lookup page (`/register/status/:code`)
- ⬜ Payment reconciliation job (nightly compare DB vs gateway ledger)

## Milestone 4 — Submissions
- ⬜ Passwordless OTP auth for authors
- ⬜ Abstract submission wizard (track → sub-track → details)
- ⬜ Author "My Submissions" dashboard + status tracker
- ⬜ Full-paper upload flow (unlocked post-acceptance)
- ⬜ Committee review UI (`/admin/submissions`), decision + comments
- ⬜ Status-transition emails (submitted/decision/reminders)
- ⬜ IKS Expo application flow (lighter variant of submission)

## Milestone 5 — Admin console
- ⬜ Admin auth (email+password, argon2, optional TOTP 2FA for `super_admin`)
- ⬜ RBAC middleware (`super_admin`/`committee`/`hospitality`)
- ⬜ Dashboard (registration/payment/submission stat cards + revenue-vs-target chart)
- ⬜ Registrations table + export CSV
- ⬜ Submissions table + review workflow
- ⬜ Content editor for CMS blocks (important dates, announcement banner, speakers, schedule)
- ⬜ Certificate bulk-generation tool (participation + presentation)

## Milestone 6 — Hardening & launch
- ⬜ Full `SECURITY.md` checklist pass
- ⬜ Full `TESTING.md` pre-launch checklist pass
- ⬜ Real low-value live transaction test (INR + USD)
- ⬜ Committee UAT sign-off
- ⬜ Backup restore drill
- ⬜ Go-live: DNS cutover, open public registration

## Post-launch / nice-to-have (explicitly out of v1 scope, see `PRD.md` Non-goals)
- ⬜ WhatsApp/SMS reminders
- ⬜ Full peer-review workflow (multi-reviewer, blind review)
- ⬜ Multi-language UI
- ⬜ Live-streaming embed for hybrid sessions (Day-of tech; may just be a Zoom/YouTube link initially rather than a built feature)
- ⬜ Automatic attendance tracking (QR check-in) feeding certificate eligibility
