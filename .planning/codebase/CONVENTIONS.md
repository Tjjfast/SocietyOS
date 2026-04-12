# Code Conventions

This document tracks the code conventions and linting rules enforced across the SocietyOS repositories.

## Linting & Formatting
- **ESLint**: Standardized using `eslint.config.js` (Flat Config) across the `frontend` and `mobile` projects.
  - `frontend`: React and React Hooks specific plugins applied to JavaScript/JSX.
  - `mobile`: Expo standard lint configs.
- **Prettier/Formatting**: While not explicitly listed as a separate setup, formatting generally aligns with modern JS/TS standards favored by React/Vite/Expo.
- **TypeScript**: The `mobile` project is fully typed using TypeScript (`tsconfig.json`). Ensure all new code within `/mobile` is strictly typed. `frontend` and `backend` appear to rely on modern JavaScript setups.

## File & Variable Naming
- Use `camelCase` for variables and function names across all JS/JSX/TSX files.
- React components and their corresponding files should be named in `PascalCase`.
- Database schemas defined via Prisma follow typical relational best practices: `PascalCase` for model definitions, `camelCase` for relation fields.

## Error Handling
- **Backend API**: All API calls should be wrapped in `try/catch` and utilize a centralized error handler downstream (Express `next()`).
- **Clients (Frontend/Mobile)**: Axios intercepts and correctly handles non-2xx statuses, surfacing friendly errors to the user, ideally connected to a global Toast/Notification provider if an error occurs.
