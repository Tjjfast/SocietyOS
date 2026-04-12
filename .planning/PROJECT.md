# SocietyOS Mobile — Role-Based UI Migration

## What This Is

SocietyOS is a digital visitor management and society operations platform. The mobile application (`/mobile`) serves three distinct user roles — **Resident**, **Guard (ShieldGuard)**, and **Service Staff** — each with their own tailored Expo Router tab-based experience. This milestone migrates the existing scaffold to a production-ready, high-fidelity implementation of the **Stitch "Gunmetal + Aqua"** design system across all 15 screens.

## Core Value

Every screen must faithfully reproduce the provided Stitch UI — glassmorphism cards, Gunmetal palette, Inter typography, blur nav bars — such that a designer looking at the app and the Stitch HTML side-by-side sees no meaningful deviation.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->
- ✓ Expo Router scaffold with NativeWind v4 — existing
- ✓ Tailwind design tokens (Gunmetal palette) in `tailwind.config.js` — existing
- ✓ Core UI primitives (`Text`, `Button`, `Card`, `Icon`) — existing
- ✓ Resident Home screen (partial implementation) — existing

### Active

<!-- Current scope. Building toward these. -->

- [ ] Auth flow: Role Selection screen → Login screen (navigation to role-specific app)
- [ ] Complete Resident app: 4-tab layout (Home, Visitors, Messages, Vault) with all screens
- [ ] Complete Guard "ShieldGuard" app: 4-tab layout (Logs, Scan, Status, Alerts) + Settings
- [ ] Complete Service Staff app: 3-tab layout (Home/Digital ID, Activity, Profile)
- [ ] Reusable shared components: `GlassInput`, `StatusPill`, `SettingsRow`, `TabBar`
- [ ] Role-based navigation root: auth group → role-specific tab group
- [ ] All screens must match the Stitch HTML/CSS pixel-for-pixel on glassmorphism, spacing, typography, and color

### Out of Scope

- Backend API integration — mock data only for this milestone (real API calls are a future milestone)
- Push notifications wiring — UI shells only
- Camera/QR scanner hardware integration — mock scanner screen for now
- iOS-specific blur (BlurView limitations) — approximate with `bg-opacity` fallback
- Web/tablet responsive layouts — mobile portrait only

## Context

- **Design System**: "Atmospheric Gunmetal" — dark obsidian base (`#090e18`), primary `#dbe5ff`, teal accent `#53fec2`, glassmorphism cards with `backdrop-blur` and `bg-[#1e293b]/40` borders.
- **Typography**: Inter (300/400/500/600/700) loaded via `@expo-google-fonts/inter`.
- **Routing**: Expo Router with file-based routes. Role groups: `(auth)`, `(resident)`, `(guard)`, `(service)`.
- **Styling**: NativeWind v4 with custom Tailwind tokens. No StyleSheet.create patterns — className only.
- **Icons**: `@expo/vector-icons` MaterialIcons (matches Material Symbols used in Stitch HTML).
- **Existing issues**: Font loading previously broken (fixed), NativeWind babel plugin configured.
- **Stitch source**: 12+ HTML templates provided by user representing exact target UI for each screen.

## Constraints

- **Tech Stack**: React Native / Expo (no switching to bare workflow)
- **Styling**: NativeWind v4 + Tailwind CSS only. No inline StyleSheet unless NativeWind has a hard limitation (e.g., BlurView)
- **Design fidelity**: No generic or placeholder UI — must match Stitch HTML
- **TypeScript**: Strict mode, `tsc --noEmit` must pass after each phase
- **Path**: All mobile code lives in `c:/Codes/SocietyOS/mobile/`

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| NativeWind v4 (not v2) | Aligns with Expo SDK 54 / React Native New Architecture | — Pending |
| Expo Router file-based groups for roles | Clean separation of `(auth)`, `(resident)`, `(guard)`, `(service)` without complex state | — Pending |
| Mock auth (no backend calls this milestone) | Unblocks UI work; API integration is next milestone | — Pending |
| MaterialIcons via @expo/vector-icons | Direct parity with Stitch HTML Material Symbols | — Pending |
| `(auth)/index.tsx` = Role Selection screen | Login always follows role selection, preserving Stitch navigation flow | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-13 after initialization*
