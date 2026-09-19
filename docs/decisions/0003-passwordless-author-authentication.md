# ADR 0003: Passwordless (OTP/magic-link) authentication for authors; password+role auth for admin/committee

**Status:** Accepted

## Context
Authors interact with the system rarely (submit an abstract, later a full paper, check status) and are a one-time-per-conference audience — asking them to create and remember a password for a system they'll use twice is unnecessary friction and a support burden ("forgot password" emails). Admin/committee members, by contrast, log in repeatedly over months and need durable, role-scoped accounts.

## Decision
- Authors: email-based OTP (or magic link) — no password, no persistent account beyond the email identity.
- Admin/committee: standard email+password (argon2-hashed) accounts, provisioned by a `super_admin`, with an option to require TOTP 2FA for `super_admin` accounts given their access to registration/payment data.

## Consequences
- **Positive:** near-zero password-reset support load for the (larger, one-time) author population.
- **Positive:** admin accounts get proper durable credentials and can be individually revoked/audited.
- **Negative:** OTP flow depends on email deliverability being reliable and fast — mitigated by using a reputable transactional email provider (Resend/SES) and keeping OTP validity at 10 minutes with a clear "resend" option.

## Alternatives considered
- Password accounts for everyone — rejected for authors due to disproportionate support overhead for a low-frequency use case.
- Social login (Google/ORCID) for authors — considered but rejected for v1: adds OAuth complexity and excludes authors without those accounts; may revisit if ORCID integration becomes a committee requirement for journal-partner handoff.
