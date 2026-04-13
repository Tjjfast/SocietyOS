# Technology Stack

This document outlines the core technology stack, programming languages, runtimes, frameworks, and dependencies used across the SocietyOS project. It covers the backend services, the admin frontend web application, and the mobile applications for residents and guards.

## Backend Service (`/backend`)
- **Runtime:** Node.js
- **Framework:** Express.js (`express@^5.2.1`)
- **Database ORM:** Prisma (`@prisma/client@^6.19.2`, `prisma@^6.19.2`)
- **Database Engine:** PostgreSQL (Via Supabase)
- **Job Queues / Background Processing:** BullMQ (`bullmq@^5.71.0`)
- **Cache/Datastore:** Redis (`ioredis@^5.10.0`)
- **Realtime / Websockets:** Socket.IO (`socket.io@^4.8.3`)
- **Authentication/Security:**
  - JWT (`jsonwebtoken@^9.0.3`)
  - Password Hashing (`bcryptjs@^3.0.3`)
  - CORS, Helmet, Rate Limiting (`cors`, `helmet`, `express-rate-limit`)
- **File Uploads:** Multer with Cloudinary (`multer`, `multer-storage-cloudinary`, `cloudinary`)
- **Scheduled Tasks:** Node Cron (`node-cron@^4.2.1`)
- **Other utilities:** QR Code generation (`qrcode@^1.5.4`), Mongoose (`mongoose@^9.3.0` - maybe legacy/unused given Prisma setup?)

## Admin Dashboard (`/frontend`)
- **Framework / Runtime:** React 19 (`react@^19.2.4`, `react-dom@^19.2.4`)
- **Build Tool:** Vite (`vite@^6.4.2`)
- **Routing:** React Router v7 (`react-router-dom@^7.13.2`)
- **Styling / CSS Framework:** Tailwind CSS v4 (`tailwindcss@^4.2.2`) with PostCSS
- **Icons:** Lucide React (`lucide-react@^1.8.0`)
- **HTTP Client:** Axios (`axios@^1.13.6`)
- **State/Auth Management:** JWT decoding (`jwt-decode@^4.0.0`)
- **Linting/Code Quality:** ESLint with React standard configs.

## Mobile Applications (`/mobile`)
- **Framework:** React Native / Expo (`expo@~54.0.33`, `react-native@0.81.5`)
- **Routing:** Expo Router (`expo-router@~6.0.23`), React Navigation (`@react-navigation/native@^7.1.8`)
- **UI Components & Features:**
  - Expo UI integrations: Linear Gradient, Blur, Symbols, System UI, Splash Screen, Status Bar.
  - Icons: Expo Vector Icons, Lucide React Native (`lucide-react-native@^1.8.0`).
- **Device Capabilities:** Camera (`expo-camera@^55.0.15`), Secure Store (`expo-secure-store@^55.0.13`), Haptics (`expo-haptics`).
- **HTTP Client:** Axios (`axios@^1.15.0`)
- **Animations/Gestures:** Reanimated (`react-native-reanimated`), Gesture Handler (`react-native-gesture-handler`), Worklets.
- **Language:** TypeScript (`typescript`, `@types/react`)
