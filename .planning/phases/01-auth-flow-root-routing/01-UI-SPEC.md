---
phase: 1–3
slug: societyos-shieldguard-full-product
status: approved
shadcn_initialized: false
preset: none
created: 2026-04-13
---

# UI Design Contract
> Visual and interaction contract for all frontend phases. Covers Resident, Guard (ShieldGuard), and Service Staff role surfaces.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | NativeWind / Tailwind CSS |
| Preset | none |
| Component library | React Native / Expo UI |
| Icon library | Material Symbols Outlined |
| Font | Inter |

---

## Spacing Scale

Declared values (must be multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Icon gaps, inline padding |
| sm | 8px | Compact element spacing |
| md | 16px | Default element spacing |
| lg | 24px | Section padding |
| xl | 32px | Layout gaps |
| 2xl | 48px | Major section breaks |
| 3xl | 64px | Page-level spacing |

Exceptions: none

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 14px | 400 | 1.5 |
| Label | 12px | 500 | 1 |
| Heading | 24px | 600 | 1.2 |
| Display | 32px | 700 | 1.2 |
| Section Label | 10px | 700 | 1 |
| Micro / Badge | 9px | 700 | 1 |

Section labels use `letter-spacing: 0.2em` and `text-transform: uppercase`.
Headings on editorial screens (Access Management, Activity Logs) may use Display size (48px, weight 700) for hero text.

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#090E18` | Background, page surface |
| Secondary (30%) | `#25293A` | Cards, sidebar, nav (`surface-container-high`) |
| Accent (10%) | `#25E0A7` / `#53FEC2` | Buttons, active states, highlights (`tertiary` / `tertiary-fixed`) |
| Gunmetal Surface | `#34495E` | Active nav pill, primary action cards, nav active indicator |
| Card Glass | `rgba(20,25,35,0.6)` | Glass-morphism card background with `backdrop-filter: blur(24px)` |
| On-Surface | `#DEE1F7` / `#DBE5FF` | Primary text |
| On-Surface Variant | `#9BABCE` | Secondary text, labels, inactive icons |
| Outline Variant | `#424753` / `#384866` | Subtle borders |
| Error | `#FFB4AB` / `#EE7D77` | Error states |
| Error Container | `#93000A` / `#7F2927` | Destructive backgrounds |
| Alert / Warning | `#FACC15` | Notification badge dot |

Accent reserved for: Primary action buttons, active navigation indicators, success states, scanner frame corners, and toggle active states.
Gunmetal (`#34495E`) reserved for: Active bottom nav pill background, primary quick-action card, FAB on Access Management screen.

---

## Glass Morphism System

All cards use the glass panel pattern unless specified otherwise:

| Property | Value |
|----------|-------|
| Background | `rgba(20, 25, 35, 0.6)` |
| Backdrop Filter | `blur(24px)` |
| Border | `1px solid rgba(255, 255, 255, 0.1)` |
| Border Radius | `20px` (default card), `24px` (featured card), `28px` (hero card) |

Gunmetal surface variant (Quick Action primary card):

| Property | Value |
|----------|-------|
| Background | `#34495E` |
| Border | `1px solid rgba(255,255,255,0.05)` |
| Border Radius | `24px` |

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Sign In / Continue / Scan / Generate QR Pass / Confirm Entrance |
| Empty state heading | No data available |
| Empty state body | There is no activity found. |
| Error state | Action failed: please try again |
| Destructive confirmation | Proceed: Are you sure? |
| Pass active badge | Active |
| Pass scanned badge | Scanned |
| Pass approved badge | Approved |
| Entry direction badge | Inbound / Outbound |
| Action required badge | Action Required |
| Security event badge | Security Event |
| Notification dot label | (no label — visual dot only) |
| Scanner guidance | Align QR Code within the frame |
| Scanner subtext | Scanning for authorized credentials... |
| Staff ID prefix | SOS-2024- |
| Guard app name | ShieldGuard |
| Resident app name | SocietyOS |
| Staff app name | SocietyOS Staff |
| Auth screen brand | SENTRY / Auth |
| Auth tagline | Silent Authority Protocol |
| Role select tagline | Select your operational clearance to begin. |
| Clearance labels | Clearance I — Resident / Clearance II — Security / Clearance III — Service |
| Footer legal | Secured by SocietyOS Identity Shield |
| App version footer | ShieldGuard v2.4.0 / SocietyOS Staff v4.2.1 |

---

## User Roles

Three distinct roles exist, each with a dedicated navigation structure and surface:

| Role | App Name | Primary Color Accent | Nav Items |
|------|----------|----------------------|-----------|
| Resident | SocietyOS | `#25E0A7` | Home, Visitors, Messages, Vault |
| Guard | ShieldGuard | `#B3C9E2` (steel blue) | Logs, Scan, Status, Alerts |
| Service Staff | SocietyOS Staff | `#B3C9E2` + cyan | Home (QR), Activity, Profile |

---

## Screen Inventory

### Auth Flow (Shared)

| Screen | Slug | Notes |
|--------|------|-------|
| Role Selection | `role-select` | Three clearance-level buttons, stealth glass style, obsidian background |
| Login | `auth-login` | Minimal "Auth" hero heading, light input fields on dark background, back nav |

### Resident Surfaces

| Screen | Slug | Notes |
|--------|------|-------|
| Resident Home | `resident-home` | Active pass card, quick actions bento, recent visitors list, notice board |
| Access Management | `resident-access` | Tabbed (Regular Guests / Household Staff), person cards with schedule + toggle |
| Alerts & Notifications | `resident-alerts` | High-priority entry request card with approve/deny, activity history list, live camera card |
| Create Pass | `resident-create-pass` | Guest name + phone inputs, access type selector (4 types), date/time, multi-entry toggle, generate QR CTA |

### Guard (ShieldGuard) Surfaces

| Screen | Slug | Notes |
|--------|------|-------|
| Activity Logs | `guard-logs` | Metrics bento (3 KPIs), search + filter bar, chronological log feed with in/out badges |
| Guard Alerts | `guard-alerts` | Emergency broadcast banner, denied entry featured card with vehicle image, overstay sidebar cards, system status bar |
| Manual Entry / Status | `guard-status` | Manual entry form (name, phone, flat), current visitors list with log-exit actions |
| QR Scanner | `guard-scan` | Full-screen camera viewfinder, scanner frame with animated scan line, corner accents, torch + zoom controls |
| Guard Settings | `guard-settings` | Profile panel, security & account list, application list, logout danger zone |

### Service Staff Surfaces

| Screen | Slug | Notes |
|--------|------|-------|
| Staff Home | `staff-home` | Digital QR ID card with glow effect, shift stats bento (hours, attendance), recent activity log |
| Staff Profile | `staff-profile` | Avatar with verified badge, preferences list (edit profile, theme, help), logout action |

---

## Navigation Patterns

### Bottom Navigation Bar (All Roles)

| Property | Value |
|----------|-------|
| Height | `80px` (h-20) |
| Background | `rgba(9,14,24,0.8)` with `backdrop-filter: blur(24px)` |
| Top border | `1px solid rgba(148,163,184,0.1)` |
| Border radius (top) | `20px` |
| Shadow | `0 -10px 30px rgba(0,0,0,0.3)` |
| Active item background | `#34495E` |
| Active item text | `#DBE5FF` |
| Active item shape | `rounded-[20px]` pill, `px-5 py-2` |
| Inactive item text | `#9BABCE` |
| Icon style | Material Symbols Outlined, `FILL 1` when active, `FILL 0` when inactive |
| Label size | 11px, `font-weight: 500`, `letter-spacing: wide` |

### Top App Bar (All Roles)

| Property | Value |
|----------|-------|
| Height | `64px` (h-16) |
| Background | `rgba(9,14,24,0.6)` / `rgba(15,23,42,0.6)` with `backdrop-filter: blur(24px)` |
| Bottom border | `1px solid rgba(148,163,184,0.1)` |
| Shadow | `0 20px 40px rgba(0,0,0,0.4)` |
| Position | Fixed, z-50 |
| Left content | Logo icon + app name (Resident/Guard) OR avatar + name + unit (Resident Home) |
| Right content | Notifications bell + menu icon (Resident) OR settings icon (Guard/Staff) |
| Notification badge | `#FACC15` dot, animated ping ring |

---

## Component Patterns

### Glass Card

Used for: visitor items, notice board, active pass, alerts.

```
background: rgba(20,25,35,0.6)
backdrop-filter: blur(24px)
border: 1px solid rgba(255,255,255,0.1)
border-radius: 20px
padding: 24px
```

### Gunmetal Surface Card

Used for: Primary quick-action card (Create One-Time Pass).

```
background: #34495E
border: 1px solid rgba(255,255,255,0.05)
border-radius: 24px
padding: 20px
height: 144px (h-36)
layout: flex-col, justify-between
```

### Status Badge / Pill

```
background: rgba(255,255,255,0.05)
border: 1px solid rgba(255,255,255,0.1)
border-radius: 9999px
padding: 4px 12px
font-size: 9px
font-weight: 700
letter-spacing: 0.15em
text-transform: uppercase
```

Accent variant (active/approved): text `#25E0A7`, border `rgba(37,224,167,0.3)`
Error variant (denied/expired): text `#EE7D77`, border `rgba(238,125,119,0.3)`
Neutral variant (scanned/outbound): text `#9BABCE`, border `rgba(255,255,255,0.05)`

### Toggle Switch

```
width: 44px (w-11)
height: 24px (h-6)
border-radius: 9999px
background (off): transparent, border outline-variant
background (on): transparent, border tertiary/30
thumb size: 14px × 14px
thumb color (on): #25E0A7
thumb position (on): translateX(20px)
thumb position (off): translateX(0)
```

### Input Field (Light on Dark)

Used on Create Pass, Login, Manual Entry forms.

```
background: #FAF9F6 (cream white) or #F5F5DC (beige)
border: none or 1px solid rgba(0,0,0,0.1)
border-radius: 12px
padding: 14px 16px
color: dark (surface color of the role)
placeholder-color: same dark at 40% opacity
focus-ring: 1px, primary/50
```

### Person Card (Visitor / Log Item)

```
layout: flex, items-center, justify-between
avatar: 48px × 48px, rounded-2xl (visitor list) or 56px × 56px rounded-full (access management)
name: 15px, font-weight: 600
subtitle: 12px, font-weight: 300, on-surface-variant
right: status badge or timestamp
hover: bg-white/[0.03] transition-all
```

### Metrics Bento Card (Guard Logs)

```
background: surface-container-low
border: 1px solid outline-variant/10
border-radius: 12px
padding: 24px
label: 14px, on-surface-variant
value: 30px (text-3xl), font-bold
badge: xs pill with color-coded trend
```

### FAB (Floating Action Button)

Used on Access Management screen.

```
size: 64px × 64px (w-16 h-16)
background: #25E0A7
color: #090E18
border-radius: 16px (rounded-2xl)
shadow: 0 25px 50px rgba(37,224,167,0.2)
position: fixed, bottom-32, right-8
z-index: 70
icon: add (30px, font-bold)
active: scale-90
```

### QR Scanner Frame

```
size: 288px × 288px (w-72 h-72)
border: 2px solid primary/40
border-radius: 12px
backdrop-filter: blur (slight)
corners: 4 accent marks — 32px × 32px, border-width: 4px, color: primary
scan line: h-1, gradient from transparent via primary to transparent, blur-[2px], animated top→bottom 3s ease-in-out infinite
background overlay: box-shadow: 0 0 0 100vmax rgba(9,14,24,0.75)
```

### Emergency / Alert Hero Card

```
background: error-container/20
border: 1px solid error-dim/30
border-radius: 12px
padding: 24px
decorative icon: absolute, top-right, 120px, opacity-10, FILL 1
layout: z-indexed content over decorative layer
CTA row: two buttons (confirm + acknowledge)
```

### Digital ID QR Card (Staff Home)

```
outer wrapper: glass-panel, rounded-[20px], padding: 32px, text-center
glow effect: absolute -inset-0.5, bg-gradient blue→cyan, blur, opacity-20 → 40 on hover
QR container: white background, rounded-xl, shadow-inner, border-4 tertiary/20
verified badge: absolute bottom-right of QR container, bg-cyan-500, rounded-full
```

### Navigation Drawer (Resident Access Management)

```
width: 288px (w-72)
background: #0C1321
border-right: 1px solid rgba(148,163,184,0.1)
shadow: 2xl + black/60
default state: -translate-x-full (hidden)
active nav item: bg-[#152641], rounded-[20px], mx-2
inactive nav item: text-[#9BABCE], hover bg-[#152641]/50
```

---

## Animation & Motion

| Element | Animation | Spec |
|---------|-----------|------|
| Notification badge | Ping ring | `animate-ping`, yellow, infinite |
| Scanner line | Vertical sweep | `@keyframes scan`, 0%→100% top, 3s ease-in-out infinite, fade in/out at edges |
| FAB press | Scale down | `active:scale-90`, `transition-transform` |
| Nav item press | Scale down | `active:scale-90`, `duration-150` |
| Card hover | Slight bg shift | `hover:bg-white/[0.03]`, `transition-all` |
| Drawer | Slide in | `-translate-x-full` → `translate-x-0` |
| Input focus | Ring appear | `focus:ring-1 focus:ring-primary/50` |
| Guard card hover | Opacity lift | `group-hover:opacity-100`, `transition-opacity` |
| Camera feed (guard card) | Subtle zoom | `group-hover:scale-105`, `transition-transform duration-1000` |
| Glass hover (role select) | Lift + brighten | `translateY(-2px)`, border brightens, `cubic-bezier(0.4,0,0.2,1) 0.4s` |

---

## Access Type Selector (Create Pass)

Four tile grid, 2×2:

| Type | Icon | State |
|------|------|-------|
| Delivery | `local_shipping` | Default (light input-glass bg) |
| Cab | `directions_car` | Selected example (`#34495E` bg, white text) |
| Guest | `family_history` | Default |
| Service | `construction` | Default |

Selected tile: `bg-[#34495E]`, `border border-slate-500/30`, `text-[#DBE5FF]`, shadow.
Default tile: `input-glass` (light cream bg), `text-slate-400`.

---

## Auth Screens Specific Rules

### Role Selection Screen

```
background: #0E0E0E (near-black, distinct from app surface)
font family: Manrope (headline) + Inter (body) — exception to global Inter-only rule
button style: stealth-glass (rgba(30,30,30,0.45), blur(20px), border 0.5px rgba(255,255,255,0.08))
button hover: translateY(-2px), brighter border
layout: max-w-sm, centered, full height flex
decorative side element: vertical line + rotated label (desktop only)
```

### Login Screen

```
background: radial-gradient(#191A1A → #0E0E0E)
font family: Manrope (headline) + Inter (body)
brand heading: 56px (text-[3.5rem]), font-light, color: primary (#C6C6C6)
input fields: light bg (#E7E5E4), dark text, no border, rounded corners
submit button: bg-surface-bright, hover → bg-primary text-on-primary, duration-500
forgot password: 10px, uppercase, tracking-widest, opacity-60 → 100 on hover
texture overlay: fixed, z-[-1], opacity-5, mix-blend-overlay
```

Note: Auth screens use a separate, more minimal palette (`#0E0E0E` base, silver/grey primary) compared to the deep navy (`#090E18`) used in all app surfaces.

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-04-13