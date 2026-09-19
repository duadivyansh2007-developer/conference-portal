# ADR 0002: Use two payment gateways (Razorpay for INR, PayPal/Stripe for USD)

**Status:** Accepted

## Context
Registration fees per the proposal are split by currency and category: Foreign Delegates pay $150–300 (USD), while Indian Academicians/Faculty (₹2,000) and Research Scholars/Students (₹1,000) pay in INR. Indian payment gateways (Razorpay, PayU, Cashfree) are optimized for INR/domestic cards and UPI; foreign cards and USD settlement are often clunky or unsupported on the standard onboarding tier. PayPal/Stripe are what international academics expect and trust for a $150–300 charge.

## Decision
Integrate Razorpay for all INR transactions (Faculty, Scholar/Student categories) and PayPal (with Stripe as a documented fallback option) for all USD transactions (Foreign Delegate category). The registration category determines which gateway is presented — the user never chooses a gateway independently of their category.

## Consequences
- **Positive:** each gateway is used for the currency/audience it's best at; fewer failed-payment support emails.
- **Positive:** clean separation in `payments.gateway` makes reconciliation and reporting straightforward.
- **Negative:** two integrations to build, test, and keep credentials for (two webhook endpoints, two signature-verification code paths) — mitigated by keeping both behind a single internal `PaymentProvider` interface in the backend so the rest of the app doesn't care which gateway was used.
- **Negative:** Razorpay KYC/merchant approval and PayPal Business verification both take real calendar time — flagged as a Milestone 0 blocker in `TODO.md`, start early.

## Alternatives considered
- Single international gateway (Stripe/PayPal) for everything — rejected: INR settlement and UPI support are materially worse for the majority-Indian-scholar audience, and Indian institutions/scholars often prefer/trust a domestic gateway.
- Single domestic gateway (Razorpay) for everything, including USD — rejected: Razorpay's international-card/USD support historically requires additional approvals and doesn't offer the familiar PayPal checkout UX foreign academics expect.
