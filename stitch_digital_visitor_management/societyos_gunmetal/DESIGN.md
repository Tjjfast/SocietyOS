# Design System Specification: Atmospheric Gunmetal

## 1. Overview & Creative North Star
**The Creative North Star: "The Nocturnal Curator"**

This design system moves away from the loud, saturated energy of traditional SaaS platforms and embraces a "Nocturnal Curator" aesthetic. It is an editorial-first approach where the interface feels like a high-end physical object—specifically, a sheet of frosted obsidian or deep charcoal metal. 

We break the "template" look through **tonal depth** rather than structural rigidity. By leaning into intentional asymmetry and overlapping glass layers, the UI feels organic and expansive. The goal is to create an environment that commands authority through quiet, sophisticated minimalism, replacing vibrant blue gradients with a monochromatic, gunmetal-driven palette that emphasizes texture and translucency over flat color.

---

### 2. Colors
The color strategy is rooted in "Gunmetal Grey," utilizing deep cool-toned neutrals to create a sense of weight and premium craftsmanship.

*   **Primary Palette:** 
    *   `primary`: `#b3c9e2` (Muted Steel)
    *   `primary_container`: `#34495e` (Gunmetal Core)
    *   `background`: `#090e18` (Obsidian Base)
*   **The "No-Line" Rule:** Designers are strictly prohibited from using 1px solid borders to section off large areas of the UI. Boundaries must be defined solely by background shifts (e.g., a `surface_container_low` card sitting on a `surface` background).
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical stack.
    *   **Level 0 (Base):** `surface` (#090e18)
    *   **Level 1 (Sections):** `surface_container_low` (#0c1321)
    *   **Level 2 (Active Cards):** `surface_container_highest` (#152641)
*   **The "Glass & Gradient" Rule:** Floating elements (modals, dropdowns, navigation) must utilize high-spec glassmorphism.
    *   **Surface:** `rgba(20, 25, 35, 0.6)`
    *   **Effect:** `backdrop-filter: blur(24px)`
    *   **Signature Texture:** Use a subtle tonal shift gradient from `primary_container` (#34495E) to a deeper `surface_variant` (#152641) for main CTA backgrounds to provide a metallic "sheen."

---

### 3. Typography
We use **Inter** as our sole typeface, relying on extreme scale and weight contrast to drive the editorial narrative.

*   **Display (Large/Medium):** Reserved for moments of high brand impact. Tracking should be tightened (-2%) to give it an authoritative, "pressed" feel.
*   **Headline & Title:** Use `on_surface` (#dbe5ff) for maximum legibility. These convey the structure of the data without the need for divider lines.
*   **Body & Labels:** `on_surface_variant` (#9babce) should be used for secondary body text to reduce visual noise and emphasize the hierarchy of the gunmetal surfaces.

---

### 4. Elevation & Depth
In this system, depth is not a "drop shadow"—it is a manipulation of light and transparency.

*   **The Layering Principle:** Stacking `surface_container` tokens is the primary method of elevation. A card does not "sit on" a background; it emerges from it through a shift in tonal value.
*   **Ambient Shadows:** If a floating effect is required (e.g., a global menu), use an ultra-diffused shadow: `box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must never be pure black; it should feel like a tinted occlusion.
*   **The "Ghost Border":** For containment of glass elements, use a 1px border with `outline_variant` (#384866) at **10% opacity**. This "Ghost Border" mimics the catch-light on the edge of a lens.
*   **Glassmorphism Depth:** The `20px+` backdrop blur is mandatory for any element that overlaps content. This ensures the "Gunmetal" feel remains light-responsive and integrated.

---

### 5. Components

#### Buttons
*   **Primary:** Solid `primary_container` (#34495e) with `on_primary_container` text. 20px (xl) corner radius. No vibrant gradients.
*   **Secondary:** Ghost variant. 1px border (0.1 opacity) with a subtle `backdrop-blur`.
*   **Tertiary:** Plain text with `label-md` styling, using `on_surface_variant`.

#### Input Fields
*   **Surface:** `surface_container_lowest` (#000000) with 0.4 opacity.
*   **States:** On focus, the "Ghost Border" increases to 0.3 opacity. Helper text uses `body-sm` in `on_surface_variant`.

#### Cards & Lists
*   **Strict Rule:** No divider lines. Separate content using vertical white space (from the `xl` spacing scale) or by nesting a `surface_container_high` item within a `surface_container` parent.
*   **Shape:** All containers must strictly adhere to the `Round 20px` (xl) corner radius.

#### Navigation Rail (Custom Component)
*   A slim, vertical glass pillar on the left edge. High blur (30px), 1px white border (0.05 opacity). Icons should be `outline` style to maintain the "etched into metal" look.

---

### 6. Do's and Don'ts

**Do:**
*   Use `surface_bright` (#182c4d) sparingly for hover states to simulate a "glow" from beneath the glass.
*   Embrace asymmetry—align content to the left with wide right margins to create an editorial feel.
*   Ensure all text on `primary_container` surfaces uses the `on_primary_container` token for accessibility.

**Don't:**
*   **No Vibrancy:** Avoid the previous electric blues or violets. If color is needed for "Success," use muted teals; for "Error," use the `error_dim` (#bb5551) token.
*   **No Hard Lines:** Never use a solid 100% opaque border. It breaks the illusion of the frosted glass atmosphere.
*   **No Default Shadows:** Avoid the standard "Material" shadows. If it looks like a standard box-shadow, it's too heavy. Increase the blur and lower the opacity.