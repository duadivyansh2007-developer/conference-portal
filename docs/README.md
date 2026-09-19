# IKON2027 / PRAKASH 2027 — Conference Website

Official website for the **International Conference on Indian Knowledge Systems (IKS)**, organized by the Department of Applied Sciences, **Poornima Institute of Engineering & Technology (PIET), Jaipur**.

- **Proposed Titles:** IKON2027 (Indian Knowledge Systems for Outreach and Novelty) / PRAKASH 2027 (Promoting Research, Advancement, and Knowledge Systems for Applied Sustainable Heritage)
- **Dates:** 26–27 February 2027 (3-day event; schedule doc shows a 2-day academic programme)
- **Mode:** Hybrid (offline with online participation)
- **Venue:** PIET Campus, Jaipur, Rajasthan
- **Organizer:** Department of Applied Sciences, PIET

This repo is modeled on the structure of live IKS conference sites (IISER Pune's `iksconference.in`, JAGSoM's IKS Conference, NIT Uttarakhand's NCIKS 2026, IKSHA/Gautam Buddha University) — a public marketing/information site (Home, About, Tracks, Schedule, Committee, Speakers, Registration, Downloads, Contact) backed by a small application for registration, abstract/paper submission, and payments.

## Repo layout

```
project/
├── README.md              — you are here
├── PRD.md                 — product requirements / vision
├── REQUIREMENTS.md        — functional & non-functional requirements
├── ARCHITECTURE.md        — system architecture
├── TECH_STACK.md          — chosen technologies & rationale
├── DATABASE_SCHEMA.md     — data model
├── API_SPEC.md            — REST API contract
├── UI_UX_SPEC.md          — pages, components, design system
├── USER_FLOWS.md          — step-by-step flows for each user type
├── SECURITY.md            — security & privacy plan
├── TESTING.md             — test strategy
├── TODO.md                — build backlog
├── CHANGELOG.md           — release history
├── docs/
│   ├── decisions/         — architecture decision records (ADRs)
│   └── features/          — one-pager spec per feature
├── frontend/               — Next.js app (public site + registration UI)
└── backend/                 — API server, DB migrations, admin tools
```

## Source material

All conference facts (tracks, sub-tracks, committee, budget, dates, fees, funding agencies) are taken from `PROPOSAL_FOR_ORGANIZING_AN_INTERNATIONAL_CONFERENCE_ON_INDIAN_KNOWLEDGE_SYSTEMS.docx`. Anything not yet finalized in the proposal (final title, exact keynote speakers, final dates/venue hall, bank details) is marked `TBD` throughout these docs and must be confirmed by the Organizing Committee before launch.

## Quick start (once scaffolded)

```bash
# frontend
cd frontend && npm install && npm run dev

# backend
cd backend && npm install && npm run dev
```

See `TECH_STACK.md` for the full toolchain and `ARCHITECTURE.md` for how the pieces fit together.

## Reference sites analyzed

| Site | Org | Notable feature borrowed |
|---|---|---|
| iksconference.in | IISER Pune | Single-page scroll site, live schedule, speaker cards, poster-registration flow, pre-conference quiz |
| jagsom.edu.in/iks-conference | JAGSoM | Tiered registration pricing (in-person/virtual/foreign), bank-transfer details, Google Form registration, brochure download |
| nituk.ac.in/iks2026 | NIT Uttarakhand | Track-based CFP structure |
| theiksha.org/conference | Gautam Buddha University / IKSHA | Multi-stage abstract → full paper → journal timeline |
