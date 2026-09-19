# DATABASE SCHEMA

Relational schema (PostgreSQL + Prisma). Names in `snake_case` for tables/columns.

## Core reference/content tables

### `tracks`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| number | int | 1–5 |
| name | text | e.g. "Scientific Heritage, Mathematics, and Technology" |
| description | text | italic blurb from proposal §6 |

### `sub_tracks`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| track_id | uuid FK → tracks.id | |
| code | text | e.g. "1.1" |
| title | text | e.g. "The Kerala School of Mathematics – Infinite Series, Calculus, and their Global Legacy" |

### `committee_members`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| name | text | |
| designation | text | e.g. "Professor, Department of Applied Sciences" |
| role_group | enum | `patron`, `chairperson`, `convener`, `organizing_member`, `technical_documentation`, `hospitality_logistics` |
| display_order | int | |

### `resource_persons` (speakers)
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| name | text | |
| category | enum | `international`, `national`, `internal` |
| affiliation | text | |
| bio | text nullable | |
| photo_url | text nullable | |
| session | text nullable | e.g. "Plenary I" |
| status | enum | `invited`, `confirmed`, `tbd` |

### `schedule_sessions`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| day | int | 1 or 2 (or 3 if the final agenda uses all 3 days) |
| start_time | time | |
| end_time | time | |
| title | text | e.g. "Plenary I" |
| topic | text nullable | |
| track_ids | uuid[] nullable | for parallel-track sessions |
| resource_person_id | uuid FK nullable | |

### `content_blocks` (simple CMS, Option A from `TECH_STACK.md`)
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| key | text unique | e.g. `home.hero`, `important_dates`, `announcement_banner` |
| json_value | jsonb | free-form structured content |
| updated_by | uuid FK → admin_users.id | |
| updated_at | timestamptz | |

## Registration & payments

### `registrations`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| registration_code | text unique | human-readable, e.g. `IKON27-0042` |
| full_name | text | |
| email | text | |
| phone | text | |
| affiliation | text | |
| country | text | |
| category | enum | `foreign_delegate`, `faculty`, `scholar_student` |
| mode | enum | `in_person`, `online` |
| fee_amount | numeric | snapshot at time of registration |
| fee_currency | enum | `INR`, `USD` |
| dietary_notes | text nullable | |
| accompanying_count | int default 0 | |
| status | enum | `pending`, `paid`, `cancelled`, `refunded` |
| created_at | timestamptz | |

### `payments`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| registration_id | uuid FK → registrations.id | |
| gateway | enum | `razorpay`, `paypal`, `stripe`, `manual_bank_transfer` |
| gateway_reference | text nullable | order/txn id from gateway, or bank UTR for manual |
| amount | numeric | |
| currency | enum | `INR`, `USD` |
| status | enum | `created`, `succeeded`, `failed`, `refunded` |
| raw_webhook_payload | jsonb nullable | for audit/debug |
| created_at | timestamptz | |

## Submissions (abstracts & papers)

### `authors`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| name | text | |
| email | text | |
| affiliation | text | |

### `submissions`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| submission_code | text unique | e.g. `SUB-0031` |
| title | text | |
| sub_track_id | uuid FK → sub_tracks.id | |
| abstract_text | text | |
| keywords | text[] | |
| presentation_mode | enum | `oral`, `poster` |
| full_paper_file_url | text nullable | populated at full-paper stage |
| status | enum | `submitted`, `under_review`, `revision_requested`, `accepted`, `rejected`, `full_paper_submitted`, `finalized` |
| submitted_by_email | text | primary contact for passwordless login/status tracking |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `submission_authors` (join table, ordered)
| column | type | notes |
|---|---|---|
| submission_id | uuid FK | |
| author_id | uuid FK | |
| author_order | int | |
| is_presenting | boolean | |

### `review_comments`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| submission_id | uuid FK | |
| admin_user_id | uuid FK → admin_users.id | |
| comment | text | |
| decision | enum nullable | `accept`, `reject`, `revise` |
| created_at | timestamptz | |

## Expo applications

### `expo_applications`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| applicant_name | text | |
| organization | text | |
| email | text | |
| phone | text | |
| category | enum | `herbal_products`, `green_building`, `manuscript_scanning`, `other` |
| description | text | |
| status | enum | `submitted`, `accepted`, `rejected` |
| created_at | timestamptz | |

## Admin & auth

### `admin_users`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| name | text | |
| email | text unique | |
| password_hash | text | argon2 |
| role | enum | `super_admin`, `committee`, `hospitality` |
| created_at | timestamptz | |

### `auth_otps` (passwordless author login)
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| email | text | |
| code_hash | text | |
| expires_at | timestamptz | |
| consumed | boolean default false | |

## Certificates

### `certificates`
| column | type | notes |
|---|---|---|
| id | uuid PK | |
| registration_id | uuid FK nullable | |
| submission_id | uuid FK nullable | |
| type | enum | `participation`, `presentation`, `best_paper` |
| file_url | text | generated PDF |
| issued_at | timestamptz | |

## Indexing notes
- Unique index on `registrations.email` + `category` is **not** enforced (a person could conceivably register twice under different categories only with admin override) — dedupe logic lives in the API, not a DB constraint, per `API_SPEC.md`.
- Index `submissions.sub_track_id`, `registrations.status`, `payments.status` for the admin dashboard's filtered counts (`FR-4.2`).
