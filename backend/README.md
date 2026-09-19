# Backend

Node.js/Express API implementing `../API_SPEC.md` against the schema in `../DATABASE_SCHEMA.md`.

## Planned structure (to scaffold in Milestone 1, see `../TODO.md`)

```
backend/
├── src/
│   ├── routes/
│   │   ├── content.ts
│   │   ├── tracks.ts
│   │   ├── committee.ts
│   │   ├── resourcePersons.ts
│   │   ├── schedule.ts
│   │   ├── registrations.ts
│   │   ├── payments/
│   │   │   ├── razorpay.ts
│   │   │   └── paypal.ts
│   │   ├── submissions.ts
│   │   ├── expoApplications.ts
│   │   ├── auth.ts
│   │   └── admin/
│   │       ├── dashboard.ts
│   │       ├── registrations.ts
│   │       ├── submissions.ts
│   │       ├── content.ts
│   │       └── certificates.ts
│   ├── services/
│   │   ├── feeCalculator.ts          # single source of truth for category → fee
│   │   ├── emailService.ts
│   │   ├── certificateGenerator.ts
│   │   └── paymentReconciliation.ts
│   ├── middleware/
│   │   ├── auth.ts                   # JWT verify
│   │   ├── rbac.ts                   # role checks
│   │   └── rateLimit.ts
│   ├── jobs/                          # BullMQ workers: emails, certificates, reconciliation
│   └── prisma/
│       ├── schema.prisma
│       └── migrations/
├── tests/
│   ├── unit/
│   └── integration/
└── package.json
```

Not yet scaffolded — this file is a placeholder until Milestone 1 work begins.
