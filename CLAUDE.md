# CodeStone - Project Context

Portfolio website for Adrian Perdomo built with Next.js, TypeScript, and SCSS.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules with BEM naming (`c-component__element--modifier`)
- **Font**: Albert Sans (Google Fonts)

## Project Structure

```
src/app/
├── components/           # Reusable components
│   ├── bubbleButton/     # Animated button with magnetic hover effect
│   ├── curvedSection/    # Reusable section wrapper with curved bottom
│   ├── loadingScreen/    # Route transition loading overlay
│   ├── magnetize/        # Magnetic cursor effect wrapper
│   ├── navigation/       # ResponsiveNav, Footer
│   └── rotatingGlobe/    # Animated CSS globe (used in loading, footer, about)
├── landingSections/      # Homepage sections (hero, content, contact, ribbon)
├── work/                 # /work route - project listing
│   └── [slug]/           # /work/[slug] - individual project pages
├── about/                # /about route - about page
├── layout.tsx            # Root layout with nav, footer, loading screen
└── page.tsx              # Homepage
```

## Key Components

### CurvedSection
Reusable wrapper component with animated curved bottom edge using SVG clipPath.

Props:
- `background` - Background color of section
- `curveBackground` - Background color of curved area
- `animationRange` - Scroll animation range (e.g., '90% 100%')
- `scaleFrom` / `scaleTo` - Control curve animation scale (use same value to disable animation)

### BubbleButton
Animated button with magnetic hover effect and bubble animation.

Props:
- `label` - Button text
- `href` - Link URL (optional)
- `onClick` - Click handler (optional)
- `target` - Link target (auto-detects external links)
- `fontSize`, `padding`, `magnetArea` - Responsive sizing objects `{ default, md, lg }`

### LoadingScreen
Full-screen loading overlay shown during route transitions. Uses RotatingGlobe animation.

### RotatingGlobe
Pure CSS animated globe with rotating longitude/latitude lines.

Props:
- `className` - Additional classes
- `color` - Globe line color (CSS variable or value)

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, work preview, about, contact sections |
| `/work` | Work listing with list/grid view toggle |
| `/work/[slug]` | Individual project detail page |
| `/about` | About page with bio, education, services |

## CSS Variables (globals.scss)

```scss
--white: #fff
--lightLavender: #a7a3d8
--darkLavender: #585672
--blue: #03254e
--charcoal: #1c1d20
--charcoal-transp: #1c1d2050
--charcoal-active: #1c1d20c5
--gray300: #6F7074
--gray200: (lighter gray for placeholders)
--gray400: (text gray)
```

## Responsive Breakpoints

```scss
@media (min-width: 400px)   // Small mobile
@media (min-width: 800px)   // Tablet / iPad
@media (min-width: 900px)   // Desktop
@media (min-width: 1600px)  // Large desktop
```

## Navigation Behavior

- Homepage: Shows Work, About, Contact (anchor links)
- Other routes: Shows Home, Work, About, Contact (route links)
- Current route is filtered from nav items

## Conventions

1. **BEM Naming**: All SCSS uses `.c-component__element--modifier` pattern
2. **SCSS Modules**: Each component has its own `.module.scss` file
3. **Client Components**: Use `'use client'` directive for interactive components
4. **Scroll Animations**: Use `animation-timeline: scroll(root block)` for scroll-driven animations
5. **Data Attributes over Class Toggling**: Prefer `data-*` attributes for state (e.g., `data-active`, `data-hovered`) instead of toggling modifier classes. Style with `&[data-active='true']` in SCSS.
