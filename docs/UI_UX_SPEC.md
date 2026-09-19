# UI/UX SPEC

## 1. Design principles

- **Credible, not flashy.** Audience includes senior international academics and funding-agency reviewers — favor clean typographic hierarchy over heavy animation (a lesson from reviewing IISER Pune's and JAGSoM's sites, both of which lead with a calm hero + logos-of-record rather than motion graphics).
- **Heritage-modern palette.** Saffron / deep maroon / gold accents on a warm off-white base, paired with a clean sans-serif for body text and a serif or Devanagari-friendly display font for headings — evokes IKS without becoming kitsch.
- **Single source of truth for facts.** Dates, fees, and track names must pull from the CMS/API, never be hard-coded twice (a recurring flaw noticed on reference sites where a countdown and a text date could drift).
- **Mobile-first.** Most delegates will first encounter the site via a shared WhatsApp link.

## 2. Sitemap / pages

```
/                     Home
/about                About the Conference (+ #objectives, #nep2020 anchors)
/about-piet           About PIET & Dept. of Applied Sciences
/tracks               Tracks & Sub-tracks (accordion, 5 × 7)
/schedule             Day-wise schedule (tabs: Day 1 / Day 2)
/committee            Organizing structure (grouped)
/speakers             Resource Persons / Speakers (filter: international/national/internal)
/expo                 IKS Expo (+ apply-to-exhibit form)
/register             Registration form → payment
/register/status/:code   Registration status/receipt lookup
/submit               Abstract submission (author login → form)
/submit/status/:code  Submission status tracker
/downloads            Brochure / CFP / Schedule PDFs
/certificates         Certificate & feedback policy
/venue                Venue, map, travel, accommodation
/contact              Contact form + FAQ accordion
/admin/*              Admin console (separate layout, auth-gated)
```

## 3. Key page specs

### Home (`/`)
- **Hero:** conference name (final title TBD — show both options only pre-launch, single final title post-decision), tagline, dates "26–27 Feb 2027", venue, "Hybrid" badge, primary CTA "Register Now", secondary CTA "Download Brochure".
- **Quick stats strip:** 100–150 participants · 5 Tracks · 35 Sub-tracks · 3–4 Intl + 5–6 National Experts.
- **About teaser:** 2–3 sentence rationale + "Read more" → `/about`.
- **Tracks preview:** 5 cards (track name + 1-line description) linking to `/tracks`.
- **Important dates strip:** abstract deadline, full paper deadline, registration deadline, conference dates (all CMS-driven, matches JAGSoM's "Extended Deadlines" banner pattern).
- **Funding agencies / partners logo strip:** ICSSR, DST, AIU/UGC, ICHR, AINRF (marked "in principle" / "invited" unless confirmed).
- **Footer:** contact, quick links, social, PIET logo, "Organized by Department of Applied Sciences, PIET Jaipur".

### Tracks (`/tracks`)
- 5 accordion sections (Track 1–5), each opens to a 7-row table (sub-track code + title), mirroring the proposal's §6 tables exactly (borrowed structure from NIT Uttarakhand's track-based CFP layout, but with an accordion instead of a long scroll to stay skimmable on mobile).

### Schedule (`/schedule`)
- Tabs for Day 1 / Day 2 (3rd day only if final agenda uses it). Each tab: vertical timeline card list (time · session title · topic/sub-topics · resource person), same visual pattern as IISER Pune's schedule section. "Download Schedule (PDF)" button pinned at top.

### Committee (`/committee`)
- Grouped sections in this order: Chief Patron → Patron → Chairperson → Conveners → Organizing Members (grid of name+designation cards) → Technical & Documentation Committee → Hospitality & Logistics Committee.

### Speakers (`/speakers`)
- Card grid, filter chips for International/National/Internal. Cards show photo (placeholder silhouette if not yet provided), name, affiliation, short bio. "Invited"/"Confirmed" badge to be transparent about status pre-confirmation (do **not** imply a speaker list is final until the committee confirms — legal/reputational risk if a "confirmed" name later drops out).

### Registration (`/register`)
- Step 1: category selection (radio cards: Foreign Delegate $150–300 / Indian Faculty ₹2,000 / Research Scholar-Student ₹1,000) — fee shown live.
- Step 2: personal/affiliation details form.
- Step 3: review + "No TA/DA will be provided" notice (must be explicitly acknowledged via checkbox, mirroring the proposal's explicit TA/DA policy) → pay.
- Step 4: gateway checkout (Razorpay modal for INR, PayPal button for USD).
- Step 5: confirmation screen with `registration_code`, downloadable receipt, "Add to calendar" button.

### Submit (`/submit`)
- Email OTP login → dashboard of "My Submissions" → "New Submission" wizard: track → sub-track → title/authors/abstract/keywords → submit. Status badge per submission (color-coded per lifecycle state in `DATABASE_SCHEMA.md`).

### Admin console (`/admin`)
- Left nav: Dashboard, Registrations, Submissions, Committee, Speakers, Schedule, Content, Certificates.
- Dashboard: stat cards (paid registrations, pending, revenue vs ₹4,18,000 target, submissions by status) + a simple bar chart of registrations-by-category.
- Tables everywhere use the same pattern: search box, status filter chips, export button, row-click → detail drawer.

## 4. Component inventory (shadcn/ui-based)
`Accordion` (tracks), `Tabs` (schedule days, speaker filters), `Card`, `Badge` (status), `Dialog` (payment modal, confirmation), `Form` + `Input`/`Select`/`Textarea`/`RadioGroup` (registration/submission), `Table` + `Pagination` (admin), `Toast` (form feedback), `Timeline` (custom, for schedule).

## 5. Accessibility notes
- All forms keyboard-navigable, labeled (no placeholder-only labels).
- Color contrast checked against the saffron/maroon palette (deep maroon text on off-white, not saffron-on-white, for body copy).
- PDF downloads (brochure/schedule/CFP) should also have an HTML equivalent where feasible for screen-reader users.
