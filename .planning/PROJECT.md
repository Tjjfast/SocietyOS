# SocietyOS Web Admin Portal & Landing Page

## What This Is

SocietyOS is a digital visitor management and society operations platform. This milestone shifts focus to the **Web Application**. It establishes a public-facing Landing Page using a Monotone Refresh design with 3D canvas elements, and a robust Admin Portal for managing residents, security guards, and system configurations. It will reuse the existing frontend and backend codebases, overriding outdated/irrelevant code to match the new scope.

## Core Value

Provide a comprehensive, real-time monitoring and administrative interface for SocietyOS, rigorously adhering to the exact Monotone design language and layouts specified in the design references.

## Requirements

### Validated

- ✓ Expo Router scaffold with NativeWind v4 (Mobile UI v1.0)
- ✓ Resident & Guard Mobile Apps (Mobile UI v1.0)

### Active

- [ ] Web Landing Page (Monotone Refresh, 3D Canvas integration)
- [ ] Admin Login Page (Monotone design)
- [ ] Dashboard Core Layout (SideNavBar, TopNavBar)
- [ ] Dashboard System Overviews (Bento Stats)
- [ ] Dashboard Activity Chart & Quick Actions
- [ ] Dashboard Recent Logs & Urgent Review
- [ ] Resident Management Page
- [ ] Guard Management Page
- [ ] Role Management System
- [ ] Integration with existing backend

### Out of Scope

- Mobile app feature additions
- Push notifications integration for web (focus on UI/backend linkage first)

## Context

- **Design System**: "Monotone" — dark background `#0a0a0a` or `#121414`, primary `#ffffff`, secondary/tertiary grays, and glassmorphism elements. Tailwind configuration strictly defined in reference.
- **Typography**: Inter (400 to 900) loaded via Google Fonts.
- **Icons**: Material Symbols Outlined (FILL 0, wght 400).
- **Existing Code**: We are overriding the existing `frontend` and `backend` directories.
- **Design source**: `design/Text.txt` containing full HTML/Tailwind specifications for Landing Page, Main Dashboard, and Admin Login.

## Constraints

- **Design fidelity**: No generic or placeholder UI — must match `Text.txt` exact UI.
- **Architecture**: Next.js / React (or existing web framework found in `frontend`).

## Evolution

This document evolves at phase transitions and milestone boundaries.

---
*Last updated: 2026-04-13 after initialization*
