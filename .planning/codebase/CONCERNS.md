# Codebase Concerns and Tech Debt

This document tracks known technical debt, potential architectural bottlenecks, security considerations, and fragile areas in the SocietyOS codebase.

## 1. Technical Debt & Quality Gaps
- **Lack of Automated Testing**: The codebase completely lacks test suites (`jest`, `cypress`, etc. are absent). This makes regression detection very difficult. Implementing a unit-testing baseline for backend logic is critical.
- **Language Inconsistency**: `/mobile` utilizes TypeScript, while `/backend` and `/frontend` rely purely on JavaScript. This prevents end-to-end type safety (e.g., sharing API payload TS interfaces between backend and frontend). Moving backend and frontend to TypeScript would heavily mitigate runtime bugs.
- **Missing API Documentation**: No OpenAPI/Swagger specifications exist to natively document the endpoints and payloads required by the clients.

## 2. Security Considerations
- **Manual JWT Management**: While JWTs (`jsonwebtoken`) are used effectively, the responsibility to manage expiry, refreshing tokens, securely storing secrets, and preventing replay attacks rests entirely on the custom code. Transitioning this logic directly into Supabase Auth might reduce the attack surface.
- **Rate Limiting**: `express-rate-limit` is installed, which is excellent, but careful attention is required to ensure standard endpoints (especially Auth and QR Generation) don't trigger denial of service parameters locally while handling scale correctly in production.
- **Secret Management**: Must ensure that Cloudinary API keys and Supabase Postgres credentials do not get inadvertently exposed to client-side builds.

## 3. Potential Scalability & Performance Bottlenecks
- **Socket.IO State**: Real-time websocket infrastructure defaults to memory or Redis adapter. If horizontal scaling is needed (multiple Node backend replicas), ensuring `socket.io-redis` adapter is correctly handling the pub/sub connection states will be crucial to prevent missed push notifications.
- **Database Migrations Flow**: Prisma handles migrations, but any destructive changes to schema should be carefully staged, especially due to constraints matching specific UUIDs across user types.
