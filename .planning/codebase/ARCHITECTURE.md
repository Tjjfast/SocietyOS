# System Architecture

This document describes the high-level architecture of the SocietyOS system, including patterns, layers, data flow, abstractions, and key entry points.

## System Pattern & Data Flow
SocietyOS follows a standard client-server architecture with three primary clients interacting with a centralized REST/WebSocket API backend.

1. **Backend Server**: Acts as the central hub. It provides a RESTful API built on Express and real-time event broadcasting built on Socket.IO.
2. **PostgreSQL Database**: Connected via Prisma ORM for structured data storage (Users, Societies, Flats, Passes, Complaints).
3. **Admin Web Dashboard**: React-based SPA built with Vite. Consumes the REST API to manage the society, users, configurations, and overrides.
4. **Resident Mobile App**: Built with Expo/React Native. Residents use this to generate passes, raise complaints, and view notices. Consumes API and Socket.IO for notifications.
5. **Guard Mobile App**: Built with Expo/React Native. Security personnel use this to scan QR codes, verify entrants, and communicate with residents. Consumes API and Socket.IO for real-time alerts.

## Abstractions and Layers

### Backend Layering
The backend uses a modular monolithic structure:
- **Presentation Layer**: Express routers and controllers. Handles HTTP requests/responses and Socket.IO event listeners.
- **Service Layer**: Business logic encapsulated within module-specific controllers and service functions.
- **Data Access Layer**: Prisma Client interactions abstracted usually within controllers or a dedicated repository layer (if expanded).
- **Cross-Cutting Concerns**: Middleware for authentication, logging, rate-limiting, and error handling located in `src/shared`.

### Frontend & Mobile Architecture
- Component-driven architecture using React components.
- Global and context-based state management mapping to the SocietyOS entities.
- Direct API integration usually abstracted into a `services/` or `api.js` layer.

## Entry Points
- **Backend API**: `backend/index.js` initializes the Express app (`app.js`), Socket.IO server, CRON jobs, and connects the Prisma client. API Routes generally start at `/api/...`.
- **Frontend Admin**: `frontend/src/main.jsx` -> `App.jsx`.
- **Mobile Apps**: `mobile/app/_layout.tsx` (Expo Router).

## Real-time Event Flow
1. Event Triggered (e.g., Guard scans a pass at the gate).
2. Mobile App makes a REST request to `POST /api/entry/scan`.
3. Backend controller validates the QR code via Prisma.
4. If valid, Backend emits a Socket.IO event to the specific resident's room (e.g., `io.to(residentId).emit('visitor_arrived', data)`).
5. Resident's Mobile App receives the socket event and displays a notification.
