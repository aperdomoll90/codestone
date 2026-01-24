# Perdomo Studio - Project Context

Portfolio website for Adrian Perdomo built with Next.js, TypeScript, and SCSS.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: SCSS Modules with BEM naming (`c-component__block-element`)
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
Animated button with magnetic hover effect and bubble animation. Has `position: absolute` by default - pass className to override when needed.

Props:
- `label` - Button text
- `href` - Link URL (optional)
- `onClick` - Click handler (optional)
- `target` - Link target (auto-detects external links)
- `fontSize`, `padding`, `magnetArea` - Responsive sizing objects `{ default, sm, md, mdx, lg }`
- `className` - Pass to override default absolute positioning
- `backgroundColor`, `backgroundHoverColor` - CSS variable names (e.g., '--darkLavender')

### LoadingScreen
Full-screen loading overlay shown during route transitions. Uses RotatingGlobe animation.

### RotatingGlobe
Pure CSS animated globe with rotating longitude/latitude lines.

Props:
- `className` - Additional classes
- `color` - Globe line color (CSS variable or value)

### ResponsiveNav
Route-aware navigation. Uses `data-route` attribute for route-specific styling.

Route names: 'home', 'about', 'work', 'project'
- home/about: White text/icons
- work/project: Charcoal text/icons

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with hero, work preview, about, contact sections |
| `/work` | Work listing with list/grid view toggle |
| `/work/[slug]` | Individual project detail page |
| `/about` | About page with bio, services, full-bleed background image |

## CSS Variables (globals.scss)

```scss
--white: #fff
--lightLavender: #a7a3d8
--darkLavender: #585672
--blue: #03254e
--charcoal: #1c1d20
--charcoal-transp: #1c1d2050
--charcoal-active: #1c1d20c5
--gray100: (lightest)
--gray100-transp: (with transparency)
--gray200: (light gray)
--gray300: #6F7074
--gray400: (text gray)
```

## Responsive Breakpoints

```scss
@media (min-width: 400px)   // Small mobile
@media (min-width: 800px)   // Tablet / iPad
@media (min-width: 900px)   // Desktop
@media (min-width: 1600px)  // Large desktop
```

## SCSS Structure & Naming

### BEM with Hyphen Nesting
Use hyphens for nested elements within a block:
```scss
.c-about {
  &__main {           // c-about__main
    &-hero {          // c-about__main-hero
      &-title { }     // c-about__main-hero-title
    }
    &-bio {           // c-about__main-bio
      &-text { }      // c-about__main-bio-text
      &-links { }     // c-about__main-bio-links
    }
  }
}
```

### Data Attributes for Dynamic Content
Use `data-*` attributes with `content: attr()` instead of extra elements:
```scss
// Instead of: <span class="number">01</span>
// Use: <div data-index="01">
&::before {
  content: attr(data-index);
}

// Instead of: <h3 class="title">Education</h3>
// Use: <ul data-header="Education">
&::before {
  content: attr(data-header);
}
```

### Direct Element Selectors
Style child elements directly when they don't need classes:
```scss
&-hero {
  h1 { }        // style h1 directly
  > span { }    // style direct span children
  svg { }       // style svg
}
```

### Scroll-Driven Animations
```scss
// Roll-up/reveal effect
--y-from: -30%;
--y-to: 0%;
transform: translateY(var(--y-from));
animation: scroll-move linear forwards;
animation-timeline: scroll(root block);
animation-range: 60% 100%;

// Staggered items with nth-child
&:nth-child(1) { animation-range: 70% 85%; }
&:nth-child(2) { animation-range: 75% 90%; }
&:nth-child(3) { animation-range: 80% 95%; }

// CSS variables for direction changes in breakpoints
--item-x-from: 0;
--item-y-from: 2rem;
```

### Background Images
Use CSS background-image for full-bleed section backgrounds:
```scss
background: var(--gray100) url('/image.png') no-repeat center center;
background-size: cover;
```

## Conventions

1. **BEM Naming**: Use `c-component__block-element` with hyphens for nesting
2. **SCSS Modules**: Each component has its own `.module.scss` file
3. **Client Components**: Use `'use client'` directive for interactive components
4. **Data Attributes over Classes**: Prefer `data-*` for state and dynamic content
5. **Direct Selectors**: Style `h1`, `p`, `svg`, `li` via parent when no class needed
6. **CSS Variables**: Use for colors, animation values, responsive overrides
7. **Scroll Animations**: Use `animation-timeline: scroll(root block)` with `animation-range`
8. **Stable Keys**: Use unique identifiers (e.g., `item.link`) not array index for React keys
