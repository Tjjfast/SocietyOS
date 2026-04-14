# Roadmap: SocietyOS Web Admin

## Milestones

- ✅ **v1.0 Mobile UI Migration** — Phases 1-5 (shipped)
- 🚧 **v2.0 Web Admin Portal & Landing Page** — Phases 1-4 (in progress)

## Phases

<details>
<summary>✅ v1.0 Mobile UI Migration (Phases 1-5) — SHIPPED 2026-04-13</summary>

- [x] Phase 1: Auth Flow & Root Routing
- [x] Phase 2: Resident App
- [x] Phase 3: Guard ShieldGuard App
- [x] Phase 4: Service Staff App
- [x] Phase 5: Shared Polish & QA
</details>

### 🚧 v2.0 Web Admin Portal & Landing Page (In Progress)

- [x] **Phase 1: Infrastructure & Landing Page**
- [x] **Phase 2: Dashboard Foundation & Auth**
- [x] **Phase 3: Dashboard Overview Modules**
- [x] **Phase 4: Management Portals & Integration**
- [x] **Phase 5: Legacy Modules Migration**

## Phase Details

### Phase 1: Infrastructure & Landing Page
**Goal**: Set up the Monotone Tailwind configuration in the existing `frontend` directory and build the Landing Page with the 3D Canvas.
**Depends on**: Nothing
**Requirements**: WEB-01, WEB-02
**Success Criteria**:
1. Frontend runs using existing framework/infrastructure without errors.
2. Tailwind config strictly matches `design/Text.txt`.
3. Landing Page renders exactly as specified with 3D elements.
**Plans**: 1
- [x] 01-01: Update configs and build `Text.txt` Landing Page

### Phase 2: Dashboard Foundation & Auth
**Goal**: Implement the Admin Login page and the structural layout for the admin dashboard.
**Depends on**: Phase 1
**Requirements**: WEB-03, WEB-04
**Success Criteria**:
1. Admin Login page correctly renders form matching `Text.txt`.
2. Dashboard wrapper contains SideNavBar and TopNavBar.
**Plans**: 1
- [ ] 02-01: Build Admin Login and Core Dashboard Layout

### Phase 3: Dashboard Overview Modules
**Goal**: Build dashboard content: Bento Stats, Activity Chart, Quick Actions, Urgent Review, and Gate Logs.
**Depends on**: Phase 2
**Requirements**: WEB-05, WEB-06, WEB-07, WEB-08, WEB-09
**Success Criteria**:
1. All overview widgets populate and render according to `Text.txt` styling.
**Plans**: 1
- [ ] 03-01: Implement Dashboard Widgets

### Phase 4: Management Portals & Integration
**Goal**: Implement management pages for Residents, Guards, and Roles, routing actions through existing backend structure.
**Depends on**: Phase 3
**Requirements**: WEB-10, WEB-11, WEB-12
**Success Criteria**:
1. Navigating to Residents, Guards, or Roles shows appropriate admin views.
2. Forms and actions connect to existing backend architecture.
**Plans**: 1
- [ ] 04-01: Build internal management pages

### Phase 5: Legacy Modules Migration
**Goal**: Migrate the remaining administrative portals (Flat Registry, Gate Activity, Complaints, and Notices) to the Monotone design system.
**Depends on**: Phase 4
**Success Criteria**:
1. Flats, Entries, Complaints, and Notices pages match the dark surface aesthetic with glass-morphism panels, inheriting the table designs established in the User Management modules.
**Plans**: 1
- [ ] 05-01: Rebuild internal legacy pages

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Infrastructure & Landing Page | 1/1 | Complete | 2026-04-13 |
| 2. Dashboard Foundation & Auth | 1/1 | Complete | 2026-04-14 |
| 3. Dashboard Overview Modules | 1/1 | Complete | 2026-04-14 |
| 4. Management Portals & Integration | 1/1 | Complete | 2026-04-14 |
| 5. Legacy Modules Migration | 1/1 | Complete | 2026-04-14 |

