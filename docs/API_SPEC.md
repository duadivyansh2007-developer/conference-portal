# API SPEC

Base URL: `/api/v1`. JSON in/out. Auth via `Authorization: Bearer <jwt>` for admin/committee and author sessions; public content endpoints are unauthenticated.

## Public content

| Method | Path | Description |
|---|---|---|
| GET | `/tracks` | List tracks with nested sub-tracks |
| GET | `/committee` | List committee members grouped by `role_group` |
| GET | `/resource-persons` | List speakers, filterable by `?category=` |
| GET | `/schedule` | Full schedule, filterable by `?day=` |
| GET | `/content/:key` | Fetch a CMS content block (e.g. `home.hero`, `important_dates`) |
| GET | `/downloads` | List downloadable files (brochure, CFP, schedule PDF) with URLs |

## Registration

| Method | Path | Description |
|---|---|---|
| POST | `/registrations` | Create a registration in `pending` status; returns `registration_code` + computed `fee_amount`/`fee_currency` |
| GET | `/registrations/:code` | Fetch a registration's public status (for a "check my status" page) |
| POST | `/registrations/:id/payments/razorpay/order` | Create a Razorpay order for this registration (INR only) |
| POST | `/registrations/:id/payments/paypal/order` | Create a PayPal order (USD only) |
| POST | `/webhooks/razorpay` | Razorpay payment webhook → marks `payments` row + `registrations.status=paid` |
| POST | `/webhooks/paypal` | PayPal webhook → same |
| GET | `/registrations/:code/receipt.pdf` | Download PDF receipt once paid |

**Validation rules** (mirrored client + server via shared Zod schema):
- `category` must be one of `foreign_delegate|faculty|scholar_student`; server derives `fee_amount`/`fee_currency` — client-submitted fee amounts are always ignored/recomputed server-side (prevents tampering).
- `email` format-validated; `phone` E.164-normalized.

## Submissions

| Method | Path | Description |
|---|---|---|
| POST | `/auth/otp/request` | Request an email OTP/magic link for author login |
| POST | `/auth/otp/verify` | Verify OTP, returns author-scoped JWT |
| POST | `/submissions` | Create a new abstract submission (auth required) |
| GET | `/submissions/mine` | List the authenticated author's submissions |
| GET | `/submissions/:code` | Fetch one submission (author-owner or admin/committee) |
| PATCH | `/submissions/:id/full-paper` | Upload/attach full paper file (author, only once status is `accepted`) |
| GET | `/submissions/:id/status` | Lightweight status poll |

## Expo applications

| Method | Path | Description |
|---|---|---|
| POST | `/expo-applications` | Submit an IKS Expo application |
| GET | `/expo-applications/:id` | Fetch status (applicant, via emailed link token) |

## Admin (role-gated)

| Method | Path | Role | Description |
|---|---|---|---|
| POST | `/admin/auth/login` | — | Email+password login for committee/admin |
| GET | `/admin/dashboard/summary` | any admin role | Counts: registrations by category/status, revenue vs target, submissions by track/status |
| GET | `/admin/registrations` | `super_admin`, `hospitality` (read-only) | Paginated, filterable list |
| PATCH | `/admin/registrations/:id` | `super_admin` | Manual status change (e.g. mark bank-transfer as paid), add note |
| GET | `/admin/registrations/export.csv` | `super_admin` | Full export |
| GET | `/admin/submissions` | `super_admin`, `committee` | Paginated, filterable by track/sub-track/status |
| POST | `/admin/submissions/:id/review` | `committee`, `super_admin` | Add `review_comments` row, optionally set `decision` |
| PATCH | `/admin/submissions/:id/status` | `super_admin` | Force-set submission status |
| PUT | `/admin/content/:key` | `super_admin` | Update a CMS content block |
| POST | `/admin/committee` / `PATCH /admin/committee/:id` | `super_admin` | Manage committee list |
| POST | `/admin/resource-persons` / `PATCH .../:id` | `super_admin` | Manage speakers |
| POST | `/admin/schedule` / `PATCH .../:id` | `super_admin` | Manage schedule sessions |
| POST | `/admin/certificates/generate` | `super_admin` | Bulk-generate certificates for all `paid` registrations (participation) or `finalized` submissions (presentation) |

## Error format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "email is required",
    "fields": { "email": "required" }
  }
}
```

Standard HTTP status codes: `400` validation, `401` unauthenticated, `403` unauthorized (wrong role), `404` not found, `409` conflict (e.g., duplicate active registration), `429` rate-limited (auth/OTP endpoints), `500` server error.

## Rate limiting & abuse prevention
- OTP request/verify: 5 requests / 15 min / IP+email.
- Registration/submission creation: basic honeypot field + rate limit per IP to deter bot spam (no CAPTCHA by default to keep it accessible; add hCaptcha only if abuse is observed).
