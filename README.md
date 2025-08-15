# Surveyor Jobber

A customizable web app for land survey companies to manage clients, survey jobs, and scheduling. Built as a modular service offering for internal use by survey teams, with integration into company websites and support for branded solutions.

## Features

- **Clients**: Manage client data (name, contact, address, parcel ID).
- **Survey Jobs**: Track survey jobs (specific types TBD) with details like coordinates and deliverables.
- **Scheduling**: Drag-and-drop calendar for team-based job assignments (FullCalendar).
- **Map Integration**: Visualizes survey coordinates (MapLibre GL JS, open-source).
- **Customization**: Modular for company branding and website/microservice integrations.

## Tech Stack

- **Frontend**: Next.js 14 (App Router, React, Sass, Shadcn/ui, FullCalendar, MapLibre GL JS).
- **Backend**: Hono (REST APIs, lightweight).
- **Database**: Neon (serverless PostgreSQL, Drizzle ORM).
- **Tooling**:
  - Logging: Pino (structured, supports custom event logging to Neon).
  - Error Tracking: Sentry.io (error and performance monitoring).
  - Performance: Lighthouse (performance auditing).
  - Linting/Formatting: ESLint (Next.js/Hono config, handles formatting).
  - Validation: Zod (API payloads).
  - Testing: Vitest (unit tests), Playwright (end-to-end tests).
  - Caching: Upstash (Redis for caching/rate-limiting).
- **Deployment**: Vercel (demo), DigitalOcean/AWS/Hostinger (production).

## Architecture

- **Frontend**: Next.js serves client, job, and scheduling UI, calling Hono APIs via REST. Uses Sass (`main.scss` for global styles, `page.module.scss` for scoped styles) for branded, modular styling. Deployed on Vercel.
- **Backend**: Hono provides CRUD APIs (`/api/clients`, `/api/surveys`, `/api/schedules`). Deployed on Vercel serverless functions (Node.js runtime).
- **Database**: Neon PostgreSQL with Drizzle for modular schemas (to be defined).
- **Modularity**: REST APIs (Hono) and dynamic Next.js routes enable company-specific branding and microservice integrations (e.g., website embedding).

## Setup Instructions

### Frontend (Next.js)

1. **Initialize Project**:
   ```bash
   npx create-next-app@latest surveyor-jobber-frontend --typescript --eslint
   ```
   Select App Router, import aliases, and src directory.
2. **Install Dependencies**:
   ```bash
   npm install next-auth fullcalendar @sentry/nextjs maplibre-gl axios zod sass @playwright/test vitest husky lint-staged
   ```
3. **Configure**:
   - Set up NextAuth.js for authentication in `app/api/auth/[...nextauth]/route.ts`.
   - Configure Sass with `main.scss` (global styles) and `page.module.scss` (scoped styles per page/component).
   - Create `.env.local`:
     ```env
     NEXT_PUBLIC_API_URL="https://your-hono-backend.vercel.app"
     NEXT_PUBLIC_MAPLIBRE_TILE_URL="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
     ```
4. **Run Locally**:
   ```bash
   npm run dev
   ```

### Backend (Hono)

1. **Initialize Project**:
   ```bash
   mkdir surveyor-jobber-backend && cd surveyor-jobber-backend
   npm init -y && npm install hono @neondatabase/serverless drizzle-orm drizzle-kit pino zod
   ```
2. **Create Main Entry (`index.ts`)**:

   ```typescript
   import { Hono } from "hono";
   import { logger } from "hono-pino";
   import pino from "pino";

   const app = new Hono();
   app.use("*", logger(pino({ level: "info" })));
   app.get("/", c => c.text("Surveyor Jobber Backend"));
   export default app;
   ```

3. **Configure Drizzle**:
   - Create `drizzle.config.ts` for Neon integration.
   - Set `.env`:
     ```env
     DATABASE_URL="postgresql://..."
     ```
4. **Run Locally**:
   ```bash
   npm run dev
   ```

### Database (Neon)

1. Create a Neon project (free tier) at [Neon Console](https://console.neon.tech).
2. Run migrations:
   ```bash
   npx drizzle-kit push:pg
   ```
3. View data:
   ```bash
   npx drizzle-kit studio
   ```

### Deployment (Vercel)

1. Push frontend and backend to separate GitHub repositories.
2. Deploy each project:
   ```bash
   vercel --prod
   ```
3. Set environment variables in the Vercel dashboard (e.g., `DATABASE_URL`, `NEXT_PUBLIC_API_URL`).

### Production Hosting

- **Hostinger**: VPS for Node.js and PostgreSQL (manual setup, target company’s current provider).
- **AWS**: ECS/Fargate for Hono, Elastic Beanstalk for Next.js, RDS for Neon integration.
- **DigitalOcean**: App Platform for Next.js and Hono, Managed PostgreSQL for Neon.
- **Recommendation**: Prefer DigitalOcean for simplicity and cost-effectiveness; use AWS for enterprise-grade needs or complex integrations.

## Development Workflow

- **Testing**:
  - Unit tests: Vitest (`npm run test`).
  - End-to-end tests: Playwright (`npx playwright test`).
- **Linting/Formatting**: ESLint for both linting and formatting, configured in `.eslintrc.json`.
- **Pre-Commit Hooks**: Husky and Lint-Staged for automated checks:
  ```bash
  npm install --save-dev husky lint-staged
  ```
  Configure in `package.json`:
  ```json
  "husky": { "hooks": { "pre-commit": "lint-staged" } },
  "lint-staged": { "*.{ts,tsx}": ["eslint --fix"] }
  ```

## Customization

- **Branding**: Use Sass (`main.scss` for global themes, `page.module.scss` for page-specific styles) to adapt to company branding.
- **Integrations**: Hono’s REST APIs and Next.js dynamic routes support embedding into company websites or adding microservices.
- **Hosting**: Modular setup allows deployment on Hostinger, AWS, or DigitalOcean based on client preferences.

## Monitoring

- **Logging**: Pino for structured logging, with option to log events (e.g., job creation) to Neon PostgreSQL for internal reporting.
- **Error Tracking**: Sentry.io for real-time error and performance monitoring.
- **Performance**: Lighthouse for auditing frontend performance (run via Chrome DevTools or CLI).

## Next Steps

- Define database schemas (clients, jobs, schedules, additional tables) for surveyor-specific job types in a separate discussion.
- Implement frontend pages: `/clients`, `/surveys`, `/schedule` (FullCalendar for scheduling, MapLibre GL JS for coordinate visualization).
- Develop backend APIs: `/api/clients`, `/api/surveys`, `/api/schedules` with Hono and Zod validation.
- Test locally with `npm run dev` and `npx drizzle-kit studio`.
- Deploy to Vercel for demo and prepare for production on DigitalOcean/AWS/Hostinger.
