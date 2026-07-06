# Job Application Tracker

A full-stack web application to track job applications and interview rounds throughout a job search. Built to replace the spreadsheet most people use — with structured statuses, per-application interview history, and secure multi-user accounts.

> 🚧 **Status:** In active development. Building toward a 3-week MVP.

## Why I built this

Job hunting means juggling dozens of applications across different stages. This app organizes them into a clear board view, tracks every interview round per application, and keeps each user's data private behind authentication.

## Tech Stack

**Frontend**
- React + TypeScript (Vite)
- TanStack Query — server state & caching
- React Router — client-side routing
- Tailwind CSS + shadcn/ui — styling
- React Hook Form + Zod — forms & validation

**Backend**
- Node.js + Express + TypeScript — REST API
- Prisma — ORM & migrations
- PostgreSQL (Neon) — database
- Zod — request validation
- JWT + bcrypt — authentication

**Tooling & Deployment**
- Vitest — testing
- ESLint + Prettier — linting & formatting
- Frontend deployed on Vercel, backend on Render

## Features

- [ ] User authentication (register, login, protected routes)
- [ ] Create, edit, and delete job applications
- [ ] Board view grouping applications by status
- [ ] Detail view with interview rounds per application
- [ ] Shared Zod validation across frontend and backend

## Getting Started

_Setup instructions will be added as the project develops._

## License

MIT — see [LICENSE](./LICENSE)
