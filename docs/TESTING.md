# TESTING

## 1. Test pyramid

| Level | Tool | What it covers |
|---|---|---|
| Unit | Vitest/Jest | Fee-calculation logic, Zod schemas, status-transition rules for submissions, certificate templating helpers |
| Integration | Vitest/Jest + Supertest, test Postgres (docker) | API endpoints against a real (throwaway) DB: registration create → payment webhook → status flip; submission lifecycle transitions; RBAC enforcement (a `hospitality` token must get 403 on export endpoints) |
| End-to-end | Playwright | Full browser flows: register + pay (gateway sandbox mode), submit abstract via OTP login, admin login → review a submission → change decision, content edit reflected on public page |
| Manual/UAT | Organizing committee walk-through | Before each milestone (see `TODO.md`), a committee member (non-developer) tries registration and submission flows unaided and reports friction |

## 2. Critical paths that must always be covered (no regression allowed)

1. **Fee integrity:** client cannot alter the amount charged; server always recomputes fee from `category` server-side. Test: attempt to POST a tampered `fee_amount` and assert it's ignored.
2. **Payment webhook signature verification:** a forged/unsigned webhook must never flip a registration to `paid`. Test: send webhook payload without/with invalid signature → expect rejection and no DB change.
3. **Idempotent payment handling:** replaying the same webhook event twice must not create duplicate `payments` rows or double-count revenue.
4. **RBAC:** every `/admin/*` route tested with each of the three roles + an unauthenticated request, asserting the expected 200/403/401 matrix.
5. **Submission status machine:** invalid transitions (e.g., `rejected → full_paper_submitted`) must be rejected by the API even if attempted directly.
6. **Track/sub-track integrity:** a submission cannot reference a `sub_track_id` that doesn't exist or doesn't belong to the selected track.
7. **PDF generation:** receipt and certificate generation produce a valid, openable PDF with correct name/amount/date interpolated (snapshot test on generated text content, not pixel-diff).

## 3. Payment gateway testing
- Razorpay and PayPal/Stripe both provide sandbox/test modes with test card numbers — all Playwright payment tests run against sandbox, never production keys.
- A pre-launch checklist item: run one real ₹1 (or minimum-allowed) live transaction end-to-end in production before opening registration to the public, to catch any sandbox/production config drift (webhook URL, live keys, currency settings).

## 4. Accessibility testing
- Automated: `axe-core` integrated into Playwright runs on key pages (`/`, `/register`, `/submit`, `/tracks`) to catch obvious WCAG violations in CI.
- Manual: keyboard-only pass through the registration and submission forms; screen-reader spot-check (VoiceOver/NVDA) on the same two forms before launch.

## 5. Load/performance testing
- Given the modest scale (≤150 concurrent registrants realistically, spiking around a fee-deadline), a lightweight load test (k6 or Artillery) simulating 150 concurrent users hitting `/register` and the payment-order-creation endpoint is sufficient — no need for large-scale load infra.
- Lighthouse CI on every deploy for the static content pages, enforcing the ≥90 mobile-performance budget from `REQUIREMENTS.md` NFR-1.

## 6. Content correctness testing
- A "fixture parity" test: track/sub-track names and codes rendered on `/tracks` are diffed against a checked-in JSON extracted from the source proposal document, so a future content edit can't silently drop or mis-type one of the 35 sub-tracks.
- Similarly for the committee list and the budget-vs-target figure shown on the admin dashboard, both traceable back to proposal §10 and §13.

## 7. Pre-launch checklist (gate before opening public registration)
- [ ] All critical-path tests above green in CI.
- [ ] One real low-value transaction succeeds end-to-end in production (INR and USD gateways both).
- [ ] Committee UAT sign-off on registration + submission flows.
- [ ] Backups verified restorable (not just "backup job ran") — do a test restore.
- [ ] Privacy notice and TA/DA disclosure text reviewed and approved by Conveners.
