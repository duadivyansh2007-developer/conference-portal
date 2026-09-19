# USER FLOWS

## 1. Delegate registration & payment

1. Visitor lands on `/` (often via a shared brochure/WhatsApp link) → clicks "Register Now".
2. Selects category → sees live fee (Foreign $150–300 / Faculty ₹2,000 / Scholar ₹1,000).
3. Fills personal/affiliation details.
4. Reviews summary, ticks "I understand no TA/DA will be provided" checkbox (required — cannot proceed without it).
5. Redirected to Razorpay (INR) or PayPal (USD) checkout.
6. On success → webhook flips `registrations.status` to `paid`, a `payments` row is written, confirmation email + PDF receipt sent.
7. User lands on confirmation page with `registration_code`; can revisit `/register/status/:code` anytime to re-download the receipt.
8. **Failure/abandon path:** registration stays `pending`; user gets a "complete your payment" reminder email after 24h (background job) with a resume link.
9. **Offline/bank-transfer path (fallback):** user selects "pay by bank transfer" → sees bank details + a reference note to include → registration stays `pending` until a committee member manually marks it `paid` in `/admin/registrations` with the UTR reference.

## 2. Author abstract → full paper → decision

1. Author goes to `/submit`, enters email, receives OTP, verifies.
2. Clicks "New Submission" → picks Track → Sub-track (from the 5×7 taxonomy) → enters title, co-authors, abstract text (word-limit enforced), keywords, oral/poster preference.
3. Submits → status `submitted`, confirmation email sent, submission appears under "My Submissions".
4. **Committee side:** a Technical & Documentation Committee member (role `committee`) opens `/admin/submissions`, filters by sub-track, opens the submission, leaves a comment and sets decision → status becomes `under_review` then `accepted`/`revision_requested`/`rejected`.
5. Author is emailed the decision automatically.
6. If `accepted`: the "Upload Full Paper" action unlocks on the author's submission page; author uploads a doc/docx/pdf (≤10MB).
7. Status → `full_paper_submitted`. Committee reviews formatting/content, optionally requests changes, eventually sets `finalized`.
8. Finalized + presented submissions become eligible for a **presentation certificate**; all `paid` registrants are eligible for a **participation certificate** (subject to an attendance flag the hospitality team sets during the event — recorded as a boolean on `registrations`, added post-MVP if attendance tracking is wanted; v1 issues participation certificates to all `paid` registrations by default).

## 3. IKS Expo applicant

1. Startup/innovator visits `/expo`, reads the theme (herbal products, green building tech, manuscript scanning, etc.), clicks "Apply to Exhibit".
2. Fills a lightweight form (org, contact, category, description) → `expo_applications` row created, status `submitted`.
3. Committee reviews in admin, sets `accepted`/`rejected`; applicant notified by email either way.
4. Accepted exhibitors receive logistics details (booth, timing — Day 2, 01:00–02:30 PM per proposal §12) via a follow-up email — content of that email is a static template, not modeled as its own DB entity.

## 4. Organizing committee — day-to-day content edits

1. Convener logs into `/admin` with email+password.
2. Needs to update, say, the abstract-submission deadline (a common late-breaking change, per the pattern seen on JAGSoM's "Extended Deadlines" banner).
3. Goes to Content → `important_dates` block → edits the date → saves → homepage banner and `/downloads` page (if it echoes dates) update immediately, no code deploy.
4. Similarly for adding a newly confirmed keynote speaker: Speakers → "Add Resource Person" → fills name/affiliation/bio/photo/category → sets status `confirmed` → appears on `/speakers` immediately.

## 5. Funding-agency reviewer (read-only, unauthenticated)

1. Reviewer receives the site link as part of a funding proposal packet.
2. Browses `/`, `/about` (objectives, NEP 2020 alignment), `/tracks`, `/committee` (to see institutional backing — Chairman/Director listed as Chief Patron/Patron), `/downloads` (brochure PDF matching the proposal document).
3. No account needed; this flow exists purely to validate that the public pages alone (no login) tell a complete, credible story — this is effectively an acceptance-test flow for `REQUIREMENTS.md` FR-1.

## 6. Post-event certificate run

1. After the conference, a `super_admin` goes to Admin → Certificates.
2. Selects "Generate Participation Certificates" → system iterates all `registrations.status = paid` (optionally filtered by an attendance flag if that's been recorded), renders each into a PDF from a template (name, conference title, dates), stores in object storage, records a `certificates` row.
3. Selects "Generate Presentation Certificates" for all `submissions.status = finalized` similarly.
4. System emails each recipient their certificate as an attachment/link; recipients can also self-serve re-download later via `/register/status/:code` or `/submit/status/:code`.
