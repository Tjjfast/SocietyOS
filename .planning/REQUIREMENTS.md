# SocietyOS Mobile — Requirements

## Milestone: Role-Based UI Migration (v1.0 Mobile)

### Must-Have (M)

| ID | Requirement | Notes |
|----|-------------|-------|
| M-01 | Role Selection screen matching Stitch "Select Role (Streamlined)" HTML | Obsidian bg, 3 glass role cards, SENTRY branding |
| M-02 | Login screen matching Stitch "Login (with Back)" HTML | Back to role selection, cream inputs, role-aware heading |
| M-03 | Login navigates to role-specific tab group (Resident/Guard/Service) | No backend auth; role stored in memory/context |
| M-04 | Resident Home screen matching Stitch "Resident Home (Gunmetal)" HTML | Full-height scroll, sticky header, pass card, bento grid, visitors list |
| M-05 | Resident Access Management screen matching Stitch "Access Management (Aqua)" HTML | Pill tabs, contact cards, FAB button |
| M-06 | Resident Create Pass screen matching Stitch "Create Pass" HTML | Form sections, access type grid, date/time, QR CTA |
| M-07 | Resident Messages/Alerts screen matching Stitch "Alerts (Gunmetal)" HTML | Entry request card, activity feed |
| M-08 | Guard Logs screen matching Stitch "Guard Dashboard (Logs)" HTML | Metric bento, search bar, log feed |
| M-09 | Guard QR Scan screen matching Stitch "Camera Scanner" HTML | Full-screen mock viewfinder, scanning frame animation |
| M-10 | Guard Status/Manual Entry screen matching Stitch "Guard Status (Manual Entry)" HTML | Form, on-premises list |
| M-11 | Guard Alerts screen matching Stitch "Guard Alerts" HTML | Emergency banner, denied entry card, system status |
| M-12 | Guard Settings screen matching Stitch "Guard Settings" HTML | Profile card, settings groups, logout |
| M-13 | Service Home/Digital ID screen matching Stitch "Service Dashboard" HTML | QR ID card, stats bento, recent activity |
| M-14 | Service Activity screen (reuse log feed pattern) | Themed activity list |
| M-15 | Service Profile screen matching Stitch "Service Profile" HTML | Profile header, settings list |
| M-16 | All tab bars match Stitch navigation: blur background, active pill style, correct icons | Gunmetal tab bar per role |
| M-17 | `tsc --noEmit` passes after each phase | TypeScript strict compliance |

### Should-Have (S)

| ID | Requirement | Notes |
|----|-------------|-------|
| S-01 | Resident Vault placeholder screen (themed empty state) | No Stitch source; design-system-consistent |
| S-02 | Smooth screen transition animations | Stack slide transitions |
| S-03 | Haptic feedback on primary actions | Use `expo-haptics` |
| S-04 | Active pass pill/badge animates (pulsing dot) | Brings the UI alive |

### Won't-Have (W)

| ID | Requirement | Notes |
|----|-------------|-------|
| W-01 | Real backend API calls | Future milestone |
| W-02 | Real QR camera scanning | Future milestone |
| W-03 | Push notification wiring | Future milestone |
| W-04 | Persistent auth state across app restarts | Future milestone (needs SecureStore integration) |
| W-05 | Tablet / landscape layouts | Mobile portrait only |

---
*Last updated: 2026-04-13 after initialization*
