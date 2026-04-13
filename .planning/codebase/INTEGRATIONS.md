# External Integrations

This document tracks all external services, third-party APIs, webhooks, and infrastructure integrations used by the SocietyOS applications.

## Database & Data Stores
- **PostgreSQL / Supabase**: The primary relational database used for all structured application data. Prisma acts as the database ORM to connect to Supabase's hosted PostgreSQL.
- **Redis (ioredis)**: Used as an in-memory datastore and queue management store. Important for real-time background processes via BullMQ.

## File Storage and Uploads
- **Cloudinary**: Dedicated cloud service for image and file storage. Integrates directly via `cloudinary`, `multer`, and `multer-storage-cloudinary` on the backend to handle profile pictures, visitor passes, notice board attachments, etc.

## Real-Time & WebSockets
- **Socket.IO**: Used for bidirectional real-time communication between the backend and client applications (frontend and mobile). Facilitates immediate push notifications, guard interactions, event alerts, and chat functionalities.

## Security & Authentication
- **JSON Web Tokens (JWT)**: Used as the primary authentication mechanism across the platform in lieu of third-party IDPs.
- **Supabase Auth (Potential)**: Although JWT is handled manually, Supabase capabilities are installed (`supabase@^2.82.0` in backend), indicating potential backend integration or use of Supabase Edge Functions / Auth.

## Scheduled Services
- **BullMQ**: Relies on Redis to queue and execute background jobs securely and robustly.

## Environment Variables required for Integrations
*Backend require the following standard secrets, typical of these integrations:*
- `DATABASE_URL`: Connection string for Supabase PostgreSQL.
- `JWT_SECRET`: For internal token signing.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Credentials to upload files to Cloudinary.
- `REDIS_URL`: Connection string for Redis instance (used by BullMQ).
