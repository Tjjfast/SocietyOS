# ROADMAP.md — SocietyOS Mobile UI Migration

## Milestone 1: Role-Based UI (v1.0 Mobile)

---

### Phase 1 — Auth Flow & Root Routing
**Goal:** Restructure Expo Router to support role-based groups. Implement Role Selection and Login screens faithfully matching Stitch HTML.

**Delivers:** M-01, M-02, M-03

**Plans:**
1. Refactor `app/_layout.tsx` — root Stack with `(auth)`, `(resident)`, `(guard)`, `(service)` groups, `headerShown: false` for all
2. Create `app/(auth)/_layout.tsx` — simple Stack layout
3. Create `app/(auth)/index.tsx` — Role Selection screen (Stitch "Select Role (Streamlined)")
4. Create `app/(auth)/login.tsx` — Login screen (Stitch "Login (with Back)")
5. Wire navigation: role selection → login → role-specific tab group

**Acceptance Criteria:**
- [ ] Role Selection shows 3 cards (Resident, Security, Service) on obsidian background matching Stitch
- [ ] Tapping a role card navigates to Login with correct role label
- [ ] Login "back" button returns to role selection
- [ ] Successful login navigates to correct tab group based on selected role
- [ ] No TypeScript errors

---

### Phase 2 — Resident App (4 Tabs)
**Goal:** Complete all Resident-role screens with full Stitch fidelity.

**Depends on:** Phase 1

**Delivers:** M-04, M-05, M-06, M-07, S-01, S-04

**Plans:**
1. Create `app/(resident)/_layout.tsx` — 4-tab bar (Home, Visitors, Messages, Vault) with Gunmetal blur nav
2. Rebuild `app/(resident)/index.tsx` — Home Dashboard (Stitch "Resident Home (Gunmetal)") — full implementation
3. Create `app/(resident)/visitors.tsx` — Access Management (Stitch "Access Management (Aqua)")
4. Create `app/(resident)/create-pass.tsx` — Create Pass form (Stitch "Create Pass") — navigated from Visitors FAB
5. Create `app/(resident)/messages.tsx` — Alerts & Notifications (Stitch "Alerts (Gunmetal)")
6. Create `app/(resident)/vault.tsx` — Themed empty state placeholder

**Acceptance Criteria:**
- [ ] All 4 tabs render with correct icons and active pill style
- [ ] Home: sticky blur header, pass card, bento quick actions, visitors list, notice banner
- [ ] Visitors: pill tabs (Regular/Staff), contact cards with toggles, teal FAB
- [ ] Create Pass: navigates from FAB, form sections, access type grid, QR CTA button
- [ ] Messages: featured entry request card with Approve/Deny, activity feed
- [ ] Vault: styled empty state (no error/blank screen)
- [ ] Pulsing dot on Active Pass pill (S-04)
- [ ] No TypeScript errors

---

### Phase 3 — Guard "ShieldGuard" App (4 Tabs + Settings)
**Goal:** Complete all Guard-role screens with full Stitch fidelity.

**Depends on:** Phase 1

**Delivers:** M-08, M-09, M-10, M-11, M-12

**Plans:**
1. Create `app/(guard)/_layout.tsx` — 4-tab bar (Logs, Scan, Status, Alerts) with ShieldGuard header
2. Create `app/(guard)/logs.tsx` — Activity Logs (Stitch "Guard Dashboard (Logs)")
3. Create `app/(guard)/scan.tsx` — QR Scanner mock (Stitch "Camera Scanner")
4. Create `app/(guard)/status.tsx` — Manual Entry + On-Premises (Stitch "Guard Status")
5. Create `app/(guard)/alerts.tsx` — Guard Alerts (Stitch "Guard Alerts")
6. Create `app/(guard)/settings.tsx` — Settings (Stitch "Guard Settings") — pushed from header icon

**Acceptance Criteria:**
- [ ] All 4 tabs render with shield/security icon theme
- [ ] Logs: metric bento (1,284 / 42 / 03), search bar, log feed with INBOUND/OUTBOUND badges
- [ ] Scan: full-screen mock viewfinder with animated scanner line, corner accents, flash/zoom controls
- [ ] Status: cream inputs, Confirm Entrance button, On-Premises cards with Log Exit buttons
- [ ] Alerts: emergency banner (red), denied entry bento card, system status bar
- [ ] Settings: profile card, settings rows with chevrons, Logout button (error-styled)
- [ ] Settings accessible via header icon (not a tab)
- [ ] No TypeScript errors

---

### Phase 4 — Service Staff App (3 Tabs)
**Goal:** Complete all Service Staff screens with full Stitch fidelity.

**Depends on:** Phase 1

**Delivers:** M-13, M-14, M-15

**Plans:**
1. Create `app/(service)/_layout.tsx` — 3-tab bar (Home, Activity, Profile)
2. Create `app/(service)/index.tsx` — Digital ID / Home (Stitch "Service Dashboard")
3. Create `app/(service)/activity.tsx` — Activity Log (reuse log feed pattern from Guard)
4. Create `app/(service)/profile.tsx` — Profile & Settings (Stitch "Service Profile")

**Acceptance Criteria:**
- [ ] All 3 tabs render with correct icons
- [ ] Home: "Namaste, Arjun" greeting, glow-effect QR ID card with verified badge, stats bento, recent activity
- [ ] Activity: activity log feed (IN/OUT entries with timestamps)
- [ ] Profile: avatar, name/role/ID badges, settings list rows, logout, version footer
- [ ] No TypeScript errors

---

### Phase 5 — Shared Component Polish & QA
**Goal:** Extract reusable primitives, fix visual drift, ensure cross-role consistency, validate all screens against Stitch HTML.

**Depends on:** Phases 2, 3, 4

**Delivers:** M-16, M-17, S-02, S-03

**Plans:**
1. Extract and finalize `components/ui/GlassInput.tsx` — cream/off-white input with icon support
2. Extract and finalize `components/ui/StatusPill.tsx` — all status badge variants
3. Extract and finalize `components/ui/SettingsRow.tsx` — reusable settings list item
4. Audit all tab bars against Stitch navigation HTML — fix any icon, color, or spacing drift
5. Add screen transition animations (stack slide) and haptic feedback on primary actions (S-02, S-03)
6. Run `tsc --noEmit` across all new files, fix all type errors (M-17)

**Acceptance Criteria:**
- [ ] `GlassInput`, `StatusPill`, `SettingsRow` components used across all relevant screens
- [ ] All tab bars: active pill, blur bg, icon colors match Stitch exactly
- [ ] `tsc --noEmit` exits with 0 errors
- [ ] Side-by-side Stitch HTML vs running app shows no meaningful visual deviation on any screen
- [ ] Haptics fire on primary CTAs (Generate QR Pass, Confirm Entrance, Approve/Deny)

---

## Backlog (999.x)

- 999.1 — Backend API integration (replace mock data with real API calls)
- 999.2 — Real QR camera scanning with `expo-camera`
- 999.3 — Push notification wiring
- 999.4 — Persistent auth with `expo-secure-store`
- 999.5 — EAS Build / APK production pipeline

---
*Last updated: 2026-04-13 after initialization*
