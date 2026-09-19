# Feature: Registration & Payments

## Summary
Lets a delegate register for the conference under one of three fee categories, pay online in the correct currency, and receive a confirmation + receipt. Backed by `FR-2` in `REQUIREMENTS.md`, `USER_FLOWS.md` §1, `API_SPEC.md` §Registration, ADR 0002.

## Fee table (source: proposal §1 & §13)
| Category | Fee | Currency |
|---|---|---|
| Foreign Delegate | $150 – $300 (final single figure or tiered-by-date TBD) | USD |
| Indian Academician/Faculty | ₹2,000 | INR |
| Research Scholar/Student | ₹1,000 | INR |

**Note:** the proposal gives a *range* for foreign delegates ($150–300); the committee must decide a single confirmed figure (or an early-bird vs regular split) before launch — tracked in `TODO.md` Milestone 0.

## Explicit policy to surface in the UI
"No TA/DA shall be provided to any participants" (proposal §1) — must appear as an acknowledgment checkbox before payment, not just fine print, to avoid disputes.

## Edge cases
- Duplicate registration attempts (same email, same category) — warn but don't hard-block, in case of a genuine second registration (e.g., a spouse using the same email); admin can merge/cancel duplicates manually.
- Payment succeeds but webhook is delayed/lost — a reconciliation job (`TODO.md` Milestone 3) polls the gateway for any `pending` registration older than 15 minutes and re-checks status directly with the gateway API before flagging it for manual review.
- Refunds (e.g., a visa-denied foreign delegate) — v1 supports admin-triggered refund via the gateway dashboard + a manual status update to `refunded`; no self-service refund flow.

## Out of scope (v1)
- Group/bulk registration discounts.
- Invoicing for institutional (not individual) payment.
