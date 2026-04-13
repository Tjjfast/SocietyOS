# Roadmap: SocietyOS Mobile UI Migration

## Overview

Migrate the existing SocietyOS Expo mobile scaffold into a production-ready, role-based application with three distinct user experiences (Resident, Guard/ShieldGuard, Service Staff), faithfully implementing the Stitch "Gunmetal + Aqua" glassmorphism design system across 15 screens. Phases 1–5 deliver the complete v1.0 mobile client, starting from auth routing through each role's screens and ending with polish and QA.

## Phases

- [x] **Phase 1: Auth Flow & Root Routing** - Role Selection and Login screens; role-based navigation groups
- [x] **Phase 2: Resident App** - All 4 Resident tabs (Home, Visitors, Messages, Vault) fully implemented
- [x] **Phase 3: Guard ShieldGuard App** - All 4 Guard tabs (Logs, Scan, Status, Alerts) + Settings screen
- [x] **Phase 4: Service Staff App** - All 3 Service tabs (Home/Digital ID, Activity, Profile) fully implemented
- [x] **Phase 5: Shared Polish & QA** - Shared components, tab bar audit, TypeScript validation, micro-animations

## Phase Details

### Phase 1: Auth Flow & Root Routing
**Goal**: Restructure Expo Router into role-based groups and implement Role Selection + Login screens matching Stitch HTML.
**Depends on**: Nothing (first phase)
**Requirements**: M-01, M-02, M-03
**Success Criteria** (what must be TRUE):
  1. Role Selection screen shows 3 glass role cards on obsidian background matching Stitch "Select Role" HTML
  2. Tapping a role card navigates to Login with the correct role label displayed
  3. Login "back" button returns to Role Selection
  4. Successful login routes to the correct role-specific tab group (Resident/Guard/Service)
  5. `tsc --noEmit` passes with zero errors
**Plans**: 5 plans

Plans:
- [x] 01-01: Refactor `app/_layout.tsx` — root Stack with `(auth)`, `(resident)`, `(guard)`, `(service)` groups
- [x] 01-02: Create `app/(auth)/_layout.tsx` — Stack layout, headerShown false
- [x] 01-03: Create `app/(auth)/index.tsx` — Role Selection screen (Stitch "Select Role (Streamlined)")
- [x] 01-04: Create `app/(auth)/login.tsx` — Login screen (Stitch "Login (with Back)")
- [x] 01-05: Wire navigation flow — role selection → login → tab group routing

### Phase 2: Resident App
**Goal**: Build all four Resident tab screens faithfully matching Stitch "Gunmetal + Aqua" HTML templates.
**Depends on**: Phase 1
**Requirements**: M-04, M-05, M-06, M-07, S-01, S-04
**Success Criteria** (what must be TRUE):
  1. 4-tab bar renders with Gunmetal blur background and active pill style matching Stitch
  2. Home: sticky header, active pass card, bento quick actions, recent visitors list, community notice
  3. Visitors: pill tabs, contact cards with toggles, teal FAB navigating to Create Pass
  4. Create Pass: form with glass inputs, access type grid, QR CTA button
  5. Messages: featured entry request card with Approve/Deny, scrollable activity feed
  6. Pulsing dot animation on Active Pass status pill
  7. `tsc --noEmit` passes with zero errors
**Plans**: 6 plans

Plans:
- [x] 02-01: Create ResidentHeader component — glassmorphism top app bar with ping dot
- [x] 02-02: Rebuild `app/(resident)/index.tsx` — Home Dashboard (Stitch "Resident Home (Gunmetal)")
- [x] 02-03: Create `app/(resident)/visitors.tsx` — Access Management (Stitch "Access Management (Aqua)")
- [x] 02-04: Create `app/(resident)/create-pass.tsx` — Create Pass form (Stitch "Create Pass")
- [x] 02-05: Create `app/(resident)/messages.tsx` — Alerts & Notifications (Stitch "Alerts (Gunmetal)")
- [x] 02-06: Create `app/(resident)/vault.tsx` — Themed empty state placeholder

### Phase 3: Guard ShieldGuard App
**Goal**: Build all Guard tab screens plus Settings, faithfully matching Stitch Guard HTML templates.
**Depends on**: Phase 1
**Requirements**: M-08, M-09, M-10, M-11, M-12
**Success Criteria** (what must be TRUE):
  1. 4-tab bar renders with ShieldGuard branding and correct security icons
  2. Logs: metrics bento (1,284 / 42 / 03), search bar, log feed with INBOUND/OUTBOUND badges
  3. Scan: full-screen mock viewfinder with corner accents and animated scanning line
  4. Status: cream inputs, Confirm Entrance button, on-premises visitor cards with Log Exit
  5. Alerts: red emergency banner, denied entry bento card, system status bar
  6. Settings accessible via header icon; shows profile card, settings rows, Logout
  7. `tsc --noEmit` passes with zero errors
**Plans**: 6 plans

Plans:
- [x] 03-01: Create GuardHeader component — ShieldGuard branding + settings nav
- [x] 03-02: Rebuild `app/(guard)/logs.tsx` — Activity Logs (Stitch "Guard Dashboard (Logs)")
- [x] 03-03: Rebuild `app/(guard)/scan.tsx` — QR Scanner mock (Stitch "Camera Scanner")
- [x] 03-04: Rebuild `app/(guard)/status.tsx` — Manual Entry (Stitch "Guard Status (Manual Entry)")
- [x] 03-05: Rebuild `app/(guard)/alerts.tsx` — Guard Alerts (Stitch "Guard Alerts")
- [x] 03-06: Rebuild `app/(guard)/settings.tsx` — Settings (Stitch "Guard Settings")

### Phase 4: Service Staff App
**Goal**: Build all three Service Staff tab screens faithfully matching Stitch Service HTML templates.
**Depends on**: Phase 1
**Requirements**: M-13, M-14, M-15
**Success Criteria** (what must be TRUE):
  1. 3-tab bar renders with Service Staff branding and correct icons
  2. Home: glow-effect QR ID card with verified badge, stats bento (Shift Hours, Attendance), recent activity
  3. Activity: activity log feed with IN/OUT entries and timestamps
  4. Profile: avatar, role/employee ID badges, settings list rows, logout, version footer
  5. `tsc --noEmit` passes with zero errors
**Plans**: 4 plans

Plans:
- [x] 04-01: Polish `app/(service)/_layout.tsx` — 3-tab nav with aqua active tint
- [x] 04-02: Rebuild `app/(service)/index.tsx` — Digital ID / Home with animated glow QR card
- [x] 04-03: Rebuild `app/(service)/activity.tsx` — Activity Log with filter chips and summary bar
- [x] 04-04: Rebuild `app/(service)/profile.tsx` — Profile & Settings with logout danger zone

### Phase 5: Shared Polish & QA
**Goal**: Extract shared components, audit all screens against Stitch HTML, add micro-animations and haptics, achieve zero TypeScript errors.
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: M-16, M-17, S-02, S-03
**Success Criteria** (what must be TRUE):
  1. `GlassInput`, `StatusPill`, `SettingsRow` components extracted and used across all relevant screens
  2. All tab bars match Stitch navigation exactly — active pill, blur bg, icon colors, spacing
  3. `tsc --noEmit` exits with zero errors across the entire mobile project
  4. Haptic feedback fires on primary CTAs (Generate QR Pass, Confirm Entrance, Approve/Deny)
  5. Screen transitions use stack slide animation
**Plans**: 5 plans

Plans:
- [x] 05-01: Extract and finalize `components/ui/GlassInput.tsx` with icon support and cream/dark variants
- [x] 05-02: Extract and finalize `components/ui/StatusPill.tsx` — 5 badge variants (success/warning/danger/neutral/info)
- [x] 05-03: Extract and finalize `components/ui/SettingsRow.tsx` — reusable settings list item + group + divider
- [x] 05-04: Full tab bar audit across all 3 role apps — cleaned imports, added HapticTab to all layouts
- [x] 05-05: Added haptics utility, wired triggerHaptic to CTAs; `tsc --noEmit` passes with zero errors

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Auth Flow & Root Routing | 5/5 | Complete | 2026-04-13 |
| 2. Resident App | 6/6 | Complete | 2026-04-13 |
| 3. Guard ShieldGuard App | 6/6 | Complete | 2026-04-13 |
| 4. Service Staff App | 4/4 | Complete | 2026-04-13 |
| 5. Shared Polish & QA | 5/5 | Complete | 2026-04-13 |
