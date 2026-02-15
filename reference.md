# reference.md

## Project Summary (Updated: February 12, 2026)
`gridvidya-premium` is a premium single-page landing site for **Gridvidya Pvt. Ltd.** focused on intelligent power-grid and microgrid consultancy.

Current visual direction:
- hybrid corporate + futuristic
- corporate blue-first palette
- controlled glassmorphism
- cinematic but restrained motion

Non-negotiable media usage (unchanged):
- `/public/videos/grid1.mp4` is still used as Hero background
- `/public/videos/grid2.mp4` is still used as Services background

---

## Tech Stack Snapshot

### Declared in `package.json`
- `next`: `^14.2.18`
- `react`: `^18.3.1`
- `react-dom`: `^18.3.1`
- `framer-motion`: `^11.11.17`
- `lucide-react`: `^0.468.0`

### Resolved in `package-lock.json`
- `next`: `14.2.35`
- `react`: `18.3.1`
- `react-dom`: `18.3.1`
- `framer-motion`: `11.18.2`
- `lucide-react`: `0.468.0`

Tooling:
- TypeScript strict mode
- Tailwind + PostCSS + Autoprefixer
- ESLint via `next lint`

---

## Brand Theme Source

Created file:
- `styles/brandTheme.ts`

Exported tokens:
- `primaryBlue = "#3B5BDB"`
- `secondaryBlue = "#4C6EF5"`
- `accentSoft = "#748FFC"`
- `deepBackground = "#0B1220"`
- `glassSurface = "rgba(255,255,255,0.06)"`

---

## Current Architecture

### App Shell
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

### Hero
- `components/hero/HeroSection.tsx`
- `components/hero/MagneticButton.tsx` (present, not mounted)

### Narrative
- `components/MissionVision.tsx`

### Services
- `components/services/ServicesSection.tsx`
- `components/services/ServiceFlipCard.tsx`
- `components/services/ServiceIcons.tsx`

### Background/Ambient
- `components/EnergyMesh.tsx`

### UI Helpers
- `components/ui/LiquidText.tsx` (active)
- `components/ui/ElectricArc.tsx` (active)
- `components/ui/CorporateDivider.tsx` (new, active)
- `components/ui/LiquidHeadline.tsx` (legacy, unused)
- `components/ui/ElectricSpark.tsx` (legacy, unused)

### Media
- `public/videos/grid1.mp4` (hero)
- `public/videos/grid2.mp4` (services)

---

## Current Implemented State

### 1) Global Theme + CSS
Updated in `app/globals.css`:
- reduced overall glow intensity
- shifted from cyan/magenta emphasis to blue/cyan corporate gradients
- added design tokens in `:root`
- updated `eyebrow`, button, glass panel, and focus styles to brand-blue tone
- added new utilities:
  - `.brand-gradient`
  - `.glass-corporate`
  - `.soft-border-glow`

Electric classes retained (toned down):
- `electric-boost`
- `electric-focus`

### 2) Hero Section
Updated in `components/hero/HeroSection.tsx`:
- video usage unchanged (`/videos/grid1.mp4`)
- added corporate blue overlay gradient above video
- reduced visible intensity of `ElectricArc` around eyebrow
- headline updated to:
  - `Engineering resilient power systems through expertise, analytics, and innovation.`
- CTA buttons now use `brand-gradient`

Layout containment and viewport safety fixes:
- root container now uses:
  - `min-h-[100svh]`, `flex`, `items-center`, `overflow-hidden`, `px-6 md:px-12`, `pb-20 md:pb-0`
- content wrapper now uses:
  - `max-w-6xl`, `mx-auto`, `flex flex-col`, `justify-center`, `gap-8`, `py-24`
- headline responsive sizing:
  - `text-4xl md:text-6xl xl:text-7xl`, `leading-tight`, `break-words`
- CTA row:
  - `flex`, `flex-wrap`, `gap-4`, `mt-4`

CTA targets unchanged:
- `Start Consultation` -> `#contact`
- `Explore Services` -> `#services`

### 3) Mission & Vision
Updated in `components/MissionVision.tsx`:
- mission text replaced with:
  - `Deliver advanced power-system expertise, planning intelligence, and engineering insight that enable stable, efficient, and future-ready grids.`
- vision text replaced with:
  - `Become a trusted partner in modern grid evolution by combining deep electrical engineering knowledge with adaptive analytics and innovation.`
- existing parallel cinematic word-reveal animation kept

### 4) Services Section + Flip Cards
Updated in:
- `components/services/ServicesSection.tsx`
- `components/services/ServiceFlipCard.tsx`

Video usage unchanged:
- `/videos/grid2.mp4` remains the section background

Service lineup now includes:
- `Power Systems Planning`
- `Generation and Load Interconnection`
- `Compliance Studies`

Additional cards retained:
- `Grid Stability Consulting`
- `Operational Fault Detection & Mitigation`

Interaction styling updated:
- moved from high-neon flash to softer holographic blue hover
- cursor-tracked glow preserved
- flip interaction and keyboard accessibility (`Enter`/`Space`) preserved

### 5) Technology + Industries Sections
Updated in `app/page.tsx`:
- atmosphere and hover glow rebalanced to corporate blue palette
- reduced neon intensity and shadow aggressiveness
- `LiquidText` behavior retained

### 6) Contact / Start Engagement Section
Updated in `app/page.tsx`:
- container now uses corporate glass surface (`glass-corporate`) + soft edge (`soft-border-glow`)
- border animation changed to softer blue edge pulse (less aggressive than previous electric pulse)
- cursor proximity glow retained with softer values
- removed typing pulse behavior on input/textarea (`onInput` pulse removed)
- focus glow remains via `electric-focus` class
- form behavior still UI-only (`action="#"`)

### 7) Atmosphere Mesh
Updated in `components/EnergyMesh.tsx`:
- palette shifted to brand blue tones
- opacity/brightness reduced
- blur depth increased for softer ambient depth

### 8) Section Divider
Added `components/ui/CorporateDivider.tsx`:
- subtle animated flowing line divider
- uses Framer Motion + brand colors
- inserted between major sections in `app/page.tsx`

---

## Performance + Accessibility Notes

- Reduced-motion checks preserved (`useReducedMotion`) in animated components.
- Card keyboard interaction preserved (`role="button"`, `tabIndex`, `Enter`/`Space` handlers).
- CTA and form are standard semantic controls.
- Animations remain transform/opacity focused for GPU-friendly rendering.

---

## Change Log (Recent Work)

1. Added centralized corporate brand token file: `styles/brandTheme.ts`.
2. Reworked global visual system in `app/globals.css` to blue-first corporate/futuristic balance.
3. Updated Hero overlays/headline/CTA styling while preserving video and motion logic.
4. Updated Mission/Vision content to the new concise corporate messaging.
5. Updated Services taxonomy and descriptions to align with official-style offerings.
6. Softened Service card interaction style from neon-heavy to holographic blue.
7. Rebalanced Technology and Industries section atmosphere to match brand direction.
8. Refined Contact section to corporate glass + soft animated blue edge.
9. Added `CorporateDivider` and integrated it between primary sections.
10. Applied Hero viewport containment/mobile safety fixes to keep content + CTAs visible on all screen sizes.

---

## Rollback/Removal Status

Still present but unused (cleanup candidates):
- `components/ui/LiquidHeadline.tsx`
- `components/ui/ElectricSpark.tsx`
- `components/hero/MagneticButton.tsx`

---

## Known Follow-ups

- Contact form is still UI-only (`action="#"`), not connected to backend/webhook.
- Optional cleanup of legacy unused components.
- Optional alignment pass for a few remaining cyan utility accents in older section classes.

---

## Validation Status

Most recent checks after refactor:
- `npm run lint` -> pass
- `npx tsc --noEmit --incremental false` -> pass

---

## Run Commands
From `F:\Desktop\DEV\Gridvidya\gridvidya-premium`:

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

---

## Latest Update (February 13, 2026) - White Premium Theme Migration
This section is the latest visual baseline for future work. Earlier sections above remain as historical context.

### Updated Visual Direction
- professional white premium corporate style
- clean indigo-led branding
- restrained cinematic motion retained
- improved readability on light surfaces

### Active Brand Palette (Current)
- `Primary`: `#4F46E5`
- `Text Dark`: `#1E293B`
- `Surface Light`: `#FFFFFF`
- `Section Alt`: `#F8FAFC`
- `Soft Blue BG`: `#E0F2FE`

### Brand Theme Tokens (Current in `styles/brandTheme.ts`)
- `primaryBlue = "#4F46E5"`
- `secondaryBlue = "#6366F1"`
- `accentSoft = "#A5B4FC"`
- `deepBackground = "#F8FAFC"`
- `glassSurface = "rgba(255,255,255,0.75)"`

### Typography Update (Current)
- Global font switched to **Inter** using `next/font/google` in `app/layout.tsx`.
- Tailwind mapping updated in `tailwind.config.ts`:
  - `font-inter`
  - `font-heading` and `font-body` now map to Inter variable.

### Global Style System Update (`app/globals.css`)
- `:root` now uses light color scheme and white-premium tokens.
- Body now uses light background and dark text.
- Glass components migrated to light glass style:
  - `background: rgba(255,255,255,0.75)`
  - `backdrop-blur-lg`
  - subtle indigo border
- Neon-heavy glow style replaced with soft shadows:
  - `shadow-lg shadow-indigo-100`
- Inputs, buttons, section typography, eyebrow badges, and focus states updated for light UI.

### Section Background Strategy (Current)
- Hero: video retained + light white gradient overlay.
- Mission: white section baseline.
- Services: `#F8FAFC` alternate section.
- Technology: white section baseline.
- Industries: `#F8FAFC` alternate section.
- Contact: elevated white card over white section.

### Hero Update (`components/hero/HeroSection.tsx`)
- Video kept unchanged: `/videos/grid1.mp4`.
- Overlay changed to light premium gradient:
  - `bg-gradient-to-r from-white/90 via-white/70 to-white/30`
- Hero headline/body text updated to dark slate for readability.
- CTA buttons standardized to indigo primary treatment.
- Existing motion choreography and scroll CTA logic preserved.

### Mission & Vision Update (`components/MissionVision.tsx`)
- White section background applied.
- Card style moved to light premium glass panel.
- Decorative glows shifted from dark/cyan to soft indigo/sky tones.
- Word reveal animation preserved.

### Services + Card Update
Files:
- `components/services/ServicesSection.tsx`
- `components/services/ServiceFlipCard.tsx`
- `components/services/ServiceIcons.tsx`

Current state:
- Video kept unchanged: `/videos/grid2.mp4`.
- Section restyled to light alternate background with soft overlays.
- Card design aligned to:
  - `bg-white`
  - `rounded-2xl`
  - `shadow-lg`
  - `border border-slate-200`
- Hover behavior aligned to:
  - `shadow-xl`
  - subtle scale lift (`1.02`)
- Flip logic, keyboard accessibility, and motion behavior preserved.
- Icon color defaults shifted to indigo-safe tones for white surfaces.

### Technology + Industries Update (`app/page.tsx`)
- Both sections restyled to alternate white / `#F8FAFC` backgrounds.
- Card styling aligned to the same white premium system.
- Hover feedback changed from neon/glow to soft elevation and subtle radial highlight.
- Content architecture unchanged.

### Contact Section Update (`app/page.tsx`)
- Elevated white corporate card style retained (`glass-corporate` + `soft-border-glow`).
- Border animation preserved but softened for light UI.
- Inputs remain UI-only form controls (`action="#"`), with light focus visuals.

### Ambient/Atmosphere Reduction
Files:
- `components/EnergyMesh.tsx`
- `components/ui/ElectricArc.tsx`
- `components/ui/ElectricSpark.tsx` (legacy/unused but recolored)

Current state:
- Energy mesh opacity reduced significantly for low visual noise on white.
- Mesh colors shifted to indigo/sky light tones.
- Blur increased and blend mode softened.
- Arc and spark palettes moved away from neon cyan/magenta to light indigo/blue family.

### Preservation Checklist (Confirmed)
- Background videos: preserved.
- Framer Motion logic: preserved across sections/components.
- Component structure and page flow: preserved.

### Validation After White Theme Migration (February 13, 2026)
- `npm run lint` -> pass (no warnings/errors)
- `npm run build` -> pass (Next.js production build completed successfully)

### Files Updated in This Migration
- `app/globals.css`
- `app/layout.tsx`
- `tailwind.config.ts`
- `styles/brandTheme.ts`
- `app/page.tsx`
- `components/hero/HeroSection.tsx`
- `components/MissionVision.tsx`
- `components/services/ServicesSection.tsx`
- `components/services/ServiceFlipCard.tsx`
- `components/services/ServiceIcons.tsx`
- `components/EnergyMesh.tsx`
- `components/ui/ElectricArc.tsx`
- `components/ui/ElectricSpark.tsx`

---

## Latest Update (February 14, 2026) - Iterative Hero + Why Choose + Services Refinements
This section captures all follow-up implementation changes after the white premium migration above. Historical sections are intentionally kept unchanged.

### 1) Hero Section Current State (`components/hero/HeroSection.tsx`)
- Hero remains video-first:
  - `/videos/grid1.mp4` unchanged
  - light overlay stack and ambient radial glow retained
- Hero content is centered with:
  - `relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden px-6 text-center`
- Text hierarchy currently:
  - Brand title: `Gridvidya`
  - Tagline: `Powering the future`
  - Supporting line (LiquidText): `Empowering your energy future with expertise, innovation, and knowledge.`
- CTA buttons unchanged:
  - `Start Consultation` -> `#contact`
  - `Explore Services` -> `#services`

### 2) Hero Spark Underline (Active)
- The spark under `Powering the future` is now a multi-layer animated SVG (not static, not dashed).
- Structure:
  - text wrapped in `relative inline-block`
  - spark block rendered below text in a centered container
  - SVG uses `w-[120%]`, centered with `left-1/2 -translate-x-1/2`
- Visual behavior:
  - 3 separate wave paths (`spark1`, `spark2`, `spark3`)
  - each wave has distinct path shape, opacity, and animation speed
  - shared indigo gradient stroke (`#6366F1 -> #818CF8 -> #4F46E5`)
  - glow filter via Gaussian blur + merge
  - infinite motion loop in global CSS

### 3) Why Choose Section Current State (`components/MissionVision.tsx`)
- `MissionVision` has been transformed into an editorial `WHY CHOOSE GRIDVIDYA?` section.
- Current structure:
  - centered heading
  - centered intro paragraph
  - three stacked content blocks:
    - `Expertise-driven consulting`
    - `Comprehensive power system services`
    - `Commitment to skill development and industry training`
- Intro text uses typographic quotes around Grid and Vidya.
- Paragraph animation:
  - each block paragraph is split by words (`split(" ")`)
  - each word rendered as `motion.span`
  - staggered word reveal animation retained (hidden/show variants with blur and y offset)

### 4) Services Section Current State (`components/services/ServicesSection.tsx`)
- Services reduced to 3 cards only:
  - `Power Systems Planning`
  - `Generation and Load Interconnection`
  - `Compliance Studies`
- Grid now fixed to:
  - `grid gap-8 md:grid-cols-3`
- Background video unchanged:
  - `/videos/grid2.mp4`
- Existing flip card animation and hover logic preserved.

### 5) Service Flip Card Text/UI Update (`components/services/ServiceFlipCard.tsx`)
- Removed front-face helper text:
  - `Click card for technical details` (deleted)
- Flip behavior, keyboard accessibility, cursor-reactive glow, icon motion, and card sizing remain intact.

### 6) Global CSS Additions (`app/globals.css`)
- Added active spark animation classes and keyframes:
  - `.spark1`, `.spark2`, `.spark3`
  - `@keyframes sparkMove1`, `sparkMove2`, `sparkMove3`
- Legacy spark animation classes from intermediate iterations are still present:
  - `.spark-animate`
  - `.spark-flow`
  - `.spark-flow-fast`
  - related keyframes

### 7) Cleanup Notes (Optional Future Pass)
- Optional CSS cleanup: remove unused intermediate spark animation classes/keyframes if no longer referenced.
- Optional consistency pass: align heading/tagline color tokens if brand token mapping changes again.

### 8) Files Touched In This Iteration
- `components/hero/HeroSection.tsx`
- `components/MissionVision.tsx`
- `components/services/ServicesSection.tsx`
- `components/services/ServiceFlipCard.tsx`
- `app/globals.css`

---

## Latest Update (February 14, 2026) - Hero Electric Typography + Scale Refinement
This section captures the most recent Hero-only refinements requested after the prior iterations above. Existing historical sections are intentionally retained unchanged.

### 1) Hero Container Scale Adjustment (`components/hero/HeroSection.tsx`)
- Hero min-height updated for stronger first-screen impact while preserving centered alignment:
  - `min-h-[85vh] md:min-h-screen`
  - `flex items-center justify-center` behavior preserved
- Background video, overlays, glow orb, and pointer-reactive ambience remain unchanged.

### 2) Main Heading Current State (`components/hero/HeroSection.tsx`)
- Final base heading classes:
  - `text-5xl md:text-6xl lg:text-7xl font-semibold text-gray-900`
- Heading remains wrapped in `relative inline-block` and duplicated with an animated gradient overlay layer.
- Electric + gradient layer classes mirror heading sizing to maintain perfect overlap:
  - `text-5xl md:text-6xl lg:text-7xl font-semibold`
- Typography hierarchy tuned so heading is dominant over supporting text.

### 3) Braided Electric Effect (Active, Stable)
- Electric overlay remains visible and aligned with heading width.
- Braided strands are 3 motion paths inside SVG:
  - `viewBox="0 0 1000 200"`
  - `preserveAspectRatio="none"`
  - `strokeDasharray="8 6"`
  - durations: `0.9s`, `1.2s`, `1.5s`
- Gradient palette currently:
  - `#00eaff -> #7c3aed -> #00eaff`
- Glow currently:
  - SVG `strongGlow` filter (`feGaussianBlur stdDeviation="3"`)
  - subtle supplemental drop-shadow on SVG wrapper

### 4) Dynamic Gradient Text Layer (Active)
- Animated gradient overlay on duplicate heading remains active:
  - `bg-gradient-to-r from-cyan-400 via-violet-500 to-cyan-400`
  - `bg-[length:200%_100%] bg-clip-text text-transparent`
  - background-position animation via Framer Motion:
    - `["0% 50%", "100% 50%"]`, duration `4s`, linear, infinite

### 5) Supporting Copy + Spacing Tuning
- Supporting line adjusted for better hierarchy:
  - `text-lg md:text-xl font-bold mt-4 text-slate-800`
- Internal title stack spacing currently:
  - `gap-6`
- CTA row spacing currently:
  - `mt-14`

### 6) Buttons (Scale-Only Change, Behavior Preserved)
- CTA buttons were scaled up without changing interaction logic:
  - `btn-primary px-8 py-4`
- Existing pulse shadow animation and section-scroll actions unchanged.

### 7) Validation Status
- `npx tsc --noEmit --incremental false` -> pass

### 8) Files Touched In This Latest Update
- `components/hero/HeroSection.tsx`
