# Feature: Admin / Organizing Committee Console

## Summary
Gives the Conveners and committee members a single place to see registrations, payments, and submissions, manage public-page content, and run the post-event certificate batch — without needing developer help for routine updates. Backed by `FR-4` in `REQUIREMENTS.md`, `USER_FLOWS.md` §4 & §6, `API_SPEC.md` §Admin.

## Roles (mirrors proposal's real organizational structure)
| Role | Maps to | Access |
|---|---|---|
| `super_admin` | Conveners (Dr. Krati Sharma, Dr. Neetu Sharma) | Full access: content, registrations, submissions, exports, certificates |
| `committee` | Organizing Members / Technical & Documentation Committee | Review & decide submissions; read-only on registrations |
| `hospitality` | Hospitality and Logistics Committee | Read-only on registrations' dietary/mode/accompanying-count fields only — no payment or full-PII export |

## Dashboard widgets
- Registrations by category (Foreign/Faculty/Scholar) and status (pending/paid/cancelled).
- Revenue collected vs the ₹4,18,000 budget target from proposal §13 (shown as a progress bar; note this compares *registration revenue* against *total estimated budget*, which also includes honoraria/venue/etc. paid from other sources — label clearly to avoid misreading it as "fully funded").
- Submissions by track and by status.
- Upcoming deadlines (pulled from the same `important_dates` CMS block shown publicly, so admin and public are never out of sync).

## Content editing
Editable without a deploy: `home.hero` text, `important_dates`, `announcement_banner`, committee list, resource-persons list, schedule sessions, downloads list. Track/sub-track taxonomy is intentionally **not** freely editable from this UI in v1 (it's fixed to the proposal's 5×7 structure) — changing it requires a migration, to avoid an accidental typo silently breaking the fixture-parity test in `TESTING.md`.

## Exports
CSV/Excel export of registrations (for hospitality headcount planning, name-badge printing) and submissions (for compiling a proceedings/programme booklet).

## Certificate generation
Bulk action, `super_admin` only, per `USER_FLOWS.md` §6 — generates PDFs from a template, stores them, and emails recipients.
