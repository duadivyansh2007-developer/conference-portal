# ADR 0001: Split the site into static marketing pages + a small dynamic app

**Status:** Accepted

## Context
The site has two very different workloads: (a) mostly-static informational pages (About, Tracks, Committee, Schedule) that change rarely, and (b) a transactional app (registration + payment, abstract submission, admin console) that must be secure and correct. Comparable reference sites (IISER Pune, JAGSoM) ship the informational side as a single static page and bolt a Google Form or a simple registration page onto it.

## Decision
Use Next.js static generation (SSG) for all public informational pages, and client-rendered pages backed by a REST API for registration/submission/admin. Content for the static pages is still data-driven (via a CMS/content table) so it can be edited without a redeploy, but it's rendered at build/ISR time rather than on every request.

## Consequences
- **Positive:** cheap hosting, fast pages, resilient to traffic spikes on the pages most likely to be shared widely (home, tracks, brochure download).
- **Positive:** clear security boundary — the parts that touch money/PII are a small, separately-testable surface.
- **Negative:** requires either scheduled rebuilds or Incremental Static Regeneration (ISR) so committee content edits show up promptly; pure SSG without ISR would need a rebuild trigger on every content edit (mitigated by using Next.js ISR with a short revalidate window, e.g. 60s, on content-driven pages).

## Alternatives considered
- Fully server-rendered app (no static pages) — rejected: unnecessary server load/cost for pages that rarely change, at a scale (150 participants) where the savings don't matter but the added hosting cost does, given the ₹20,000 infra budget line.
- Fully static site with a third-party form embed (Google Forms, like JAGSoM uses for registration) — rejected as the primary path because it can't do server-side fee computation, gateway webhook verification, or role-based admin review; kept as the **fallback/manual path** for bank transfers only.
