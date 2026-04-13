# Phase 1 Context: Infrastructure & Landing Page

## Goal
Set up the Monotone Tailwind configuration in the existing `frontend` directory and build the Landing Page with the 3D Canvas, acting as the foundation for the SocietyOS Web Admin Portal.

## Key Decisions
- **3D Canvas Implementation**: We will install the standard `three` package (`npm install three`). The raw vanilla Three.js animation code given in `design/Text.txt` will be extracted and run within a React `useEffect` inside a dedicated `ThreeCanvas` component. We will **not** use `@react-three/fiber` for this phase.
- **Tailwind Configuration (v4 Migration)**: The existing `frontend` is using Tailwind v4. The legacy `tailwind.config` JSON object from `design/Text.txt` will be manually mapped to CSS variables using the `@theme` directive in `frontend/src/index.css`. This includes the Monotone color palette (e.g., `#0a0a0a` background, `#c7c6c6` secondary, `#121212` surface).
- **Routing Base**: The Landing Page will be the root `/` route. It will include a CTA button or navigation element that links to the upcoming Admin Login page (e.g., `/login`).

## Implementation Notes
- Use `frontend/src/index.css` for overriding existing styles. Clean up existing irrelevant CSS from `App.css` or `index.css`.
- Override existing components in `frontend/src/App.jsx` and `frontend/src/pages/` to set up `react-router-dom` pointing to the new `LandingPage` component.
- The `ThreeCanvas` should be placed absolutely behind the main content with `z-index: -1` and `pointer-events: none` to replicate the ambient background effect.
- Ensure the Inter font family and Material Symbols Outlined are correctly loaded in `index.html`.
