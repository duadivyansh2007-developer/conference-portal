# REQUIREMENTS

## 1. Functional Requirements

### FR-1 Public Content Pages
- FR-1.1 Home page: hero (title, dates, venue, mode, CTA to register), theme statement, quick stats (100–150 participants, 5 tracks, 35 sub-tracks, hybrid), highlights carousel.
- FR-1.2 About Conference page: rationale (Sushruta Samhita, Kerala School of Mathematics, Arthashastra, etc.), NEP 2020 alignment, objectives (7 items from proposal §4).
- FR-1.3 About PIET / Department of Applied Sciences page.
- FR-1.4 Tracks page: 5 tracks, each expandable to show its 7 sub-tracks (35 total), sourced from a single tracks data file (see `DATABASE_SCHEMA.md`).
- FR-1.5 Schedule page: Day-wise timeline (Day 1: Inauguration + Plenary I + parallel tracks; Day 2: Plenary II + parallel tracks + IKS Expo + Valedictory), downloadable as PDF.
- FR-1.6 Committee page: Chief Patron, Patron, Chairperson, Conveners, Organizing Members, Technical & Documentation Committee, Hospitality & Logistics Committee — grouped, with designation.
- FR-1.7 Resource Persons / Speakers page: cards for confirmed international/national/internal experts; shows "TBD" placeholders until confirmed by committee (target 11–14 experts).
- FR-1.8 IKS Expo page: description of the startup/innovator showcase (herbal products, green building, manuscript scanning) and an "apply to exhibit" form.
- FR-1.9 Downloads page/section: brochure PDF, call-for-papers PDF, schedule PDF.
- FR-1.10 Certificates & Feedback page: policy text (participation/presentation certificates subject to attendance; best paper awards subject to sponsorship; feedback form link).
- FR-1.11 Venue & Travel page: address, map embed, nearest airport/station, accommodation guidance (TBD content).
- FR-1.12 Contact/FAQ page: contact form, conveners' emails/phones, FAQ accordion.
- FR-1.13 Funding Agencies / Sponsors section: logos + names of ICSSR, DST, AIU/UGC, ICHR, AINRF and any confirmed industry sponsors, with a "partner with us" CTA.

### FR-2 Registration
- FR-2.1 Registration form captures: name, email, phone, affiliation/institution, country, category (Foreign Delegate / Indian Academician-Faculty / Research Scholar-Student), mode (in-person/online), dietary/accessibility notes (optional), accompanying-person count (optional).
- FR-2.2 System computes fee from category (Foreign $150–300 per final decision; Faculty ₹2,000; Scholar/Student ₹1,000) and currency (USD vs INR).
- FR-2.3 Payment via gateway: Razorpay for INR, PayPal/Stripe for USD. No TA/DA messaging must be shown before payment (per proposal: "No TA/DA shall be provided to any participants").
- FR-2.4 On successful payment: generate a registration ID, send confirmation email with a PDF receipt, show a confirmation screen.
- FR-2.5 Failed/abandoned payments are retryable; a registration record exists in `pending` state until paid.
- FR-2.6 Admin can manually mark a registration as paid (for bank-transfer/offline payments) with a note and reference number.

### FR-3 Abstract & Paper Submission
- FR-3.1 Author account (email + OTP or magic link — no heavy auth needed) to submit and track submissions.
- FR-3.2 Submission form: title, authors (name, affiliation, email per author), track, sub-track, abstract text (word-limit enforced, default 300 words unless CFP states otherwise), keywords, presentation mode preference (oral/poster).
- FR-3.3 File upload for full paper (doc/docx/pdf) at the full-paper stage, separate from the abstract stage, with size limit (e.g. 10 MB).
- FR-3.4 Submission status lifecycle: `submitted → under_review → accepted/revision_requested/rejected → full_paper_submitted → finalized`.
- FR-3.5 Reviewer/committee member view to see submissions filtered by track/sub-track, leave comments, set decision.
- FR-3.6 Automated email at each status transition.
- FR-3.7 IKS Expo application is a lighter-weight variant of the same submission flow (no track/sub-track, has a "product/innovation" description field instead).

### FR-4 Admin / Organizing Committee Console
- FR-4.1 Role-based access: `super_admin` (Conveners), `committee` (Organizing/Technical members — scoped to review), `hospitality` (view registrations & dietary/accommodation info only).
- FR-4.2 Dashboard: counts of registrations by category/payment-status, submissions by track/status, revenue collected vs budget target (₹4,18,000 per proposal §13).
- FR-4.3 CSV/Excel export of registrations and submissions.
- FR-4.4 Content management for fields that change often: important dates, announcements/banner, speaker list, schedule, downloads — without a code deploy (simple CMS table or a headless CMS, see `TECH_STACK.md`).
- FR-4.5 Manual certificate generation trigger (bulk) post-event, using a template + attendee list.

### FR-5 Notifications
- FR-5.1 Transactional emails: registration confirmation, payment receipt, abstract received/decision, full-paper reminder, event reminder (T-7 days, T-1 day).
- FR-5.2 Optional: WhatsApp/SMS reminder integration — out of scope v1, noted in `TODO.md`.

## 2. Non-Functional Requirements

- NFR-1 **Performance:** public pages should score ≥90 on Lighthouse mobile; first contentful paint <2s on 4G.
- NFR-2 **Availability:** target 99.5% uptime in the 60 days before and during the event (registration window is the critical period).
- NFR-3 **Scalability:** must comfortably handle 150 concurrent registrants during a fee-deadline rush without manual intervention.
- NFR-4 **Accessibility:** WCAG 2.1 AA for public pages (many delegates are senior academics; hybrid/online mode implies varied assistive-tech use).
- NFR-5 **Internationalization:** currency handling for USD/INR is mandatory; full i18n (multi-language UI) is out of scope v1, but Sanskrit/Devanagari terms (Dharma, Nyaya, Arthashastra, etc.) must render correctly (UTF-8, diacritics like Ā, ṛ).
- NFR-6 **Security & privacy:** see `SECURITY.md` — PII (passport-adjacent data is NOT collected; only name/contact/affiliation), PCI compliance is delegated entirely to the payment gateway (no card data touches our servers).
- NFR-7 **Data retention:** registration & submission data retained per PIET's institutional policy (default: retain until 3 years post-event for audit, then archive) — confirm with committee, mark `TBD`.
- NFR-8 **Browser support:** last 2 versions of Chrome, Edge, Safari, Firefox; graceful degradation on older mobile browsers common in tier-2/3 India.
- NFR-9 **Budget:** hosting/infra cost should fit within the "Online Platform and Technical Support (Hybrid Mode)" line item, ₹20,000, per proposal §13 — favors low-cost/managed hosting over custom infra.
