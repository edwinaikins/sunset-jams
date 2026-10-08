# Sunset Jams Vol. 1 — site + backend

Next.js 14 (App Router, TypeScript) landing page for **Sunset Jams Vol. 1: The Homecoming**, plus an admin
backend for managing RSVPs, VIP table / vendor / sponsor bookings, and contact messages.

## Stack

- **Next.js 14** (App Router) deployed on **Vercel**
- **Postgres** (works with Vercel Postgres, Neon, Supabase, or any standard Postgres) via the `pg` driver
- Password-protected `/admin` dashboard using a signed, httpOnly cookie (no extra auth service needed)

## Local setup

```bash
npm install
cp .env.example .env.local
# edit .env.local: DATABASE_URL, ADMIN_PASSWORD, SESSION_SECRET
npm run dev
```

Tables are created automatically on first request (`CREATE TABLE IF NOT EXISTS …` in `src/lib/db.ts`) —
there's no separate migration step to run.

Generate a strong `SESSION_SECRET` with:

```bash
openssl rand -base64 32
```

## What's included

- **Public site** (`/`) — hero, event info, RSVP form, VIP table / vendor / sponsor booking form, and a
  contact form, all writing straight to Postgres.
- **Admin dashboard** (`/admin`, password-protected):
  - `/admin/rsvps` — guest list, search, check-in toggle, CSV export
  - `/admin/bookings` — VIP table / vendor / sponsor requests, approve/decline, CSV export
  - `/admin/messages` — contact inbox, mark read/unread, CSV export
  - `/admin/content` — edit the public page's wording, images, links and lists; changes go live on save

## Environment variables

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `ADMIN_PASSWORD` | Password for `/admin` |
| `SESSION_SECRET` | Random secret used to sign the admin session cookie |

## Deploying on Vercel

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add a Postgres database to the project (Vercel's Storage tab → Postgres, or connect an external one like
   Neon/Supabase) and copy its connection string into `DATABASE_URL`.
4. Set `ADMIN_PASSWORD` and `SESSION_SECRET` in the project's Environment Variables.
5. Deploy. The database tables are created automatically the first time the site receives a request.
