# Testing Framework and Practices

This document outlines the testing strategy, frameworks, structure, and mocking practices used across SocietyOS.

## Current State
**Status**: Pre-testing Phase
As of the current phase of development (SocietyOS MVP/V1 Launch), the codebase currently lacks automated testing frameworks (Jest, Mocha, Cypress, Playwright, or React Native Testing Library are noticeably absent from the `package.json` dependencies). Backend lists an exit-error placeholder for `npm test`.

## Future Testing Strategy (Proposed)

### Backend
- **Framework**: Jest or Vitest for unit and integration testing.
- **Mocking**: Mock Prisma client interactions to prevent database side effects when testing controllers.
- **API Testing**: Supertest for endpoint integration tests.

### Frontend (Admin Dashboard)
- **Framework**: Vitest (since it uses Vite) alongside React Testing Library.
- **Unit Testing**: Target core business logic helpers and critical React contexts.
- **Integration Testing**: Focus on end-to-end component rendering matching specific state permutations.

### Mobile
- **Framework**: Jest paired with `@testing-library/react-native`.
- **E2E**: Detox or Expo Application Services (EAS) testing workflows for actual device capability tests (camera/scanning).

## CI/CD
- GitHub Actions or GitLab CI should be configured to run tests automatically on pull requests prior to merging into main.
