# Codebase Structure

This document provides a breakdown of the directory layout, key file locations, and naming conventions for the SocietyOS monorepo/polyrepo structure.

## High-Level Layout
The repository is split into distinct environments/applications at the root level:
- `/backend`: The Node.js Express server.
- `/frontend`: The web-based admin dashboard (React + Vite).
- `/mobile`: The mobile application codebase (React Native + Expo).
- `/.agent`, `/.planning`, `/.agents`: Local workflow and agentic tooling configuration.
- `/design_assets`: Static UI/UX design references.

## Backend Structure (`/backend`)
Follows a modular structure rather than pure layer-by-layer structure:
- `index.js`: Main entry point, sets up HTTP and Socket.io server.
- `src/app.js`: Express app setup, routing aggregation.
- `prisma/`: Prisma ORM schema (`schema.prisma`) and database seeders (`seed.js`).
- `src/modules/`: Contains business domain partitions. Each directory (e.g., `auth/`, `complaint/`, `visitor/`) likely contains its own routes, controllers, and specific logic.
- `src/shared/`: Shared infrastructure code.
  - `config/`: Configuration setup (e.g., Prisma instance export, Redis config).
  - `middleware/`: Express middleware (auth, rate limiting).
  - `utils/`: Helper functions.
  - `cron/`: Scheduled task definitions (e.g., `passExpiry.js`).

## Frontend Structure (`/frontend`)
Standard React + Vite layout:
- `src/main.jsx`: React root mount.
- `src/App.jsx` / `src/App.css`: Root component and generic styles.
- `src/api.js`: Singleton or configuration for Axios/HTTP requests.
- `src/pages/`: Top-level view components corresponding to routes (e.g., Dashboard, Login, Residents).
- `src/components/`: Reusable UI components (Buttons, Modals, Forms).
- `src/context/`: React Context providers for global state (e.g., Auth, Theme).
- `src/services/`: Specific API call functions mapping to backend endpoints.
- `src/assets/`: Static files (images, icons).

## Mobile Structure (`/mobile`)
Standard Expo Router layout:
- `app/`: Expo Router's file-based routing directory.
  - `(tabs)/`: Tab-based navigation layouts.
  - `_layout.tsx`: Root layout definition.
- `components/`: Reusable mobile UI components.
- `constants/`: Theme values, spacing, standard text strings.
- `hooks/`: Custom React Hooks.
- `assets/`: Fonts and images consumed by the app.

## Naming Conventions
- **Folders/Directories**: lowercase, kebab-case (e.g., `design_assets`, `visitor`).
- **Files**:
  - React/React Native Components: PascalCase (e.g., `App.jsx`, `Modal.tsx` depending on exact style guide).
  - Utility/Config Scripts: camelCase or kebab-case (e.g., `api.js`, `schema.prisma`).
- **Environment Variables**: CONSTANT_CASE (e.g., `DATABASE_URL`, `JWT_SECRET`).
