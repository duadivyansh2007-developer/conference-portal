# Feature: Abstract & Full Paper Submission

## Summary
Lets authors submit an abstract against one of the 35 sub-tracks (5 tracks × 7 sub-tracks, proposal §6), track its review status, and upload a full paper once accepted. Backed by `FR-3` in `REQUIREMENTS.md`, `USER_FLOWS.md` §2, `API_SPEC.md` §Submissions, ADR 0003.

## Track taxonomy (must match proposal §6 exactly — see the fixture-parity test in `TESTING.md` §6)
1. Scientific Heritage, Mathematics, and Technology (1.1–1.7)
2. Holistic Health, Wellness, and Life Sciences (2.1–2.7)
3. Environmental Ethics, Sustainable Architecture, and Agriculture (3.1–3.7)
4. Governance, Economics, Ethics, and Management (4.1–4.7)
5. Pedagogy, Arts, and Cultural Heritage (5.1–5.7)

## Status lifecycle
```
submitted → under_review → accepted ──► full_paper_submitted → finalized
                         ├→ revision_requested → (resubmit) → under_review
                         └→ rejected
```
Enforced server-side; invalid transitions rejected (`TESTING.md` §2 item 5).

## Fields captured at abstract stage
Title, authors (name/affiliation/email each, ordered, presenting-author flagged), track, sub-track, abstract text (word limit — default 300, confirm against final Call for Papers), keywords, oral/poster preference.

## Fields captured at full-paper stage (unlocked post-acceptance only)
Full paper file (pdf/doc/docx, ≤10MB).

## Notifications
Emailed on: submission received, decision made (accepted/revision/rejected), full-paper reminder if accepted but not yet uploaded within N days of the full-paper deadline (N configurable via CMS `important_dates` block).

## Open questions
- Exact abstract word limit and full-paper length/format (the proposal itself doesn't specify a IKS-conference-wide limit; borrow reasonable academic-conference defaults — e.g., 250–300 word abstract, 3000–6000 word full paper, similar to the pattern seen on comparable IKS CFPs — and have the committee confirm in the final Call for Papers PDF).
- Whether reviews are single-reviewer-per-submission or require two independent reviewers before a decision is finalized (affects `review_comments` UI — v1 assumes single reviewer with a `super_admin` able to override).
