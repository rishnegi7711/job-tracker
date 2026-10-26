# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Primary user: the builder (repo owner), running their own job search. Applyd is also a portfolio piece, so recruiters and hiring managers who look at the code and live app are a second audience.

## Product Purpose
Replaces the job-search spreadsheet. It tracks every application and each interview round in one place. Success means the user can always answer "where does my search stand, and what happened with company X?" without digging.

## Positioning
- Round-by-round history: each application holds its whole interview timeline (round type, date, outcome), not one status cell.
- Status board at a glance: applications grouped by status, so the state of the whole search reads in one view.
- Planned (not built yet): AI features, namely CV↔job match scores and an assistant. Nothing about them is designed or decided yet.

## Operating Context
Used at a laptop during active applying: logging a new application right after submitting it, then updating it as rounds happen.

## Capabilities and Constraints
- Accounts: register and log in (JWT), and every query is scoped to the user.
- Application: company, role, status, date applied, notes (optional).
- Statuses (fixed): Applied, Interviewing, Rejected, Offer.
- Interview round: type, date, outcome.
  - Types: Phone Screen, Technical Screen, System Design, Coding Interview, Take-home Assignment, Behavioral, Final Round, Offer Discussion.
  - Outcomes: Pending, Passed, Failed.
- Surfaces: Login, Register, Board (`/`), Application detail (`/applications/:id`).
- Desktop-first. Mobile must work but comes second.
- Stack: React + Vite + TS, shadcn/ui, Tailwind v4; Express + Prisma + Postgres. Deployed on Vercel (frontend) and Render (backend).

## Brand Commitments
- Name: "Applyd". There is no logo or brand asset yet.
- Light theme by default, with a designed warm dark mode. (This is a binding constraint, recorded as given. It isn't true yet: the current `:root` is dark-only.)

## Evidence on Hand
No users, testimonials, metrics, or logos. No surface may invent user counts, testimonials, or company logos.

## Product Principles
1. History over snapshot: an application's story (its rounds) matters more than its current label.
2. One glance tells the state of the search.
3. Zero setup: fixed statuses and round types, nothing to configure.
4. Honest: show only real data and real claims, because recruiters will read it.

## Accessibility & Inclusion
WCAG AA: contrast, full keyboard use, and respect for `prefers-reduced-motion`.
