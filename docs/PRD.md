# PRD — IKON2027 / PRAKASH 2027 Conference Website

## 1. Background

The Department of Applied Sciences, PIET Jaipur, is organizing a 3-day hybrid **International Conference on Indian Knowledge Systems (IKS)**, tentatively 26–27 Feb 2027, targeting 100–150 participants (foreign delegates, Indian academicians, research scholars, industry professionals). The conference is aligned with NEP 2020's push to integrate IKS into higher education, and is structured around 5 tracks × 7 sub-tracks (35 sub-themes total), an "IKS Expo" for startups, keynote/plenary sessions by international and national experts, and paper/poster presentations leading to certificates, best-paper awards, and possible journal publication.

Comparable conferences (IISER Pune, JAGSoM, NIT Uttarakhand, GBU/IKSHA, Girijananda Chowdhury University) all run a dedicated microsite that does double duty as (a) a marketing/credibility page for sponsors and delegates and (b) the operational front door for registration, abstract submission, and payment.

## 2. Problem statement

Without a dedicated site, the organizing committee currently has to coordinate registrations, abstracts, and payments manually (email + spreadsheets), which does not scale to 100–150 participants across 3 fee categories (foreign/faculty/scholar) and does not project the credibility needed to attract international keynote speakers and funding agencies (ICSSR, DST, AIU/UGC, ICHR, AINRF).

## 3. Goals

1. Give the conference a professional, credible public presence in time to circulate to funding agencies and prospective keynote speakers.
2. Let participants register and pay online, in the correct fee category, with confirmation and a printable receipt.
3. Let authors submit abstracts/papers against the correct track/sub-track, and let the Technical & Documentation Committee review/accept them.
4. Give the Organizing Committee a lightweight admin view of registrations, payments, and submissions without needing a full CMS team.
5. Auto-generate participation/presentation certificates after the event.

### Non-goals (v1)
- Full peer-review / conference-management-system feature parity (e.g., EasyChair-style reviewer assignment, double-blind workflow) — out of scope unless the committee explicitly asks for it later (see `TODO.md`).
- Building a journal-submission pipeline — the site only collects papers; onward submission to journal partners is manual.
- Mobile native app — a responsive web app is sufficient.

## 4. Target users / personas

| Persona | Needs |
|---|---|
| **Prospective delegate** (Indian faculty/scholar or foreign academic) | Understand the conference theme & tracks, see dates/venue/fees, register and pay, download brochure |
| **Author** | Find their sub-track, submit abstract, get an acceptance decision, submit full paper, get a presentation slot |
| **Startup/exhibitor (IKS Expo)** | Apply to exhibit, see expo terms |
| **Organizing committee member** | See live registration/payment/submission counts, export attendee list, approve/reject abstracts, manage content (dates, speakers, schedule) |
| **Sponsor / funding agency reviewer** | Quickly assess the conference's credibility, scale, and budget ask |
| **General public / press** | Read about the conference and PIET |

## 5. Key features (traced to `REQUIREMENTS.md` for detail)

1. Public marketing site: Home, About Conference, About PIET, Objectives, Tracks & Sub-tracks, Schedule, Committee, Resource Persons/Speakers, IKS Expo, Downloads (brochure/schedule PDF), Certificates & Feedback policy, Venue & Travel, Contact/FAQ.
2. Registration module with 3 fee tiers (Foreign $150–300, Faculty ₹2,000, Scholar/Student ₹1,000) and online payment (Razorpay for INR, PayPal/Stripe for USD).
3. Abstract & full-paper submission module, tied to track/sub-track taxonomy, with file upload and status tracking.
4. Admin dashboard: registrations, payments, submissions, reviewer/committee actions, CSV/Excel export, content editing for dates/announcements.
5. Automated emails: registration confirmation + receipt, abstract received, accept/reject decision, reminders.
6. Certificate generation (participation & presentation) post-event.

## 6. Success metrics

- 100–150 completed, paid registrations before the event.
- ≥35 abstract submissions (at least one per sub-track is aspirational, not required).
- <2% payment-related support emails relative to total registrations.
- Site usable and legible on mobile (≥60% of expected traffic, based on comparable sites) — target Lighthouse mobile score ≥90.
- Zero manual re-keying of registration data into a spreadsheet for the final attendee list (i.e., the export is the source of truth).

## 7. Open questions for the Organizing Committee (must resolve before build sign-off)

- Final title: IKON2027 vs PRAKASH2027 vs another name?
- Final venue hall/auditorium name and address for maps/travel page.
- Confirmed international/national keynote speakers (proposal only sizes the requirement: 3–4 international, 5–6 national, 3–4 internal).
- Bank account / payment gateway merchant details for INR and USD collection.
- Whether papers will be double-blind reviewed or single reviewer per sub-track.
- Journal/publication partner(s), if any, for post-conference proceedings.
