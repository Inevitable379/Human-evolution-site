# Human Evolution Site

A visually rich, fluid, and highly animated webpage about human evolution, inspired by Neal.fun.

## Concept

This site explores what differentiates humans from other animals through a narrative, scroll-driven experience. Users journey through five key milestones in human evolution:

1. **Bipedalism** (~6 million years ago) — Walking upright freed our hands
2. **Tool Use** (~2.6 million years ago) — Shaping the world around us
3. **Fire Mastery** (~1 million years ago) — Cooking, warmth, and social bonding
4. **Language** (~100,000 years ago) — Complex communication and abstract thought
5. **Agriculture** (~10,000 years ago) — Settling down and building civilizations

## Tech Stack

- **Framework**: Next.js 15 with React 19
- **Animations**: IntersectionObserver, requestAnimationFrame, and CSS transitions
- **Styling**: CSS Modules with custom properties
- **Approach**: Mobile-first responsive design

## Features

- Smooth scroll-driven animations at 60fps
- Interactive timeline with milestone markers
- Morphing SVG illustrations that respond to scroll position
- Parallax depth effects
- Data visualizations (brain size, population growth)
- Accessibility: reduced-motion support, ARIA roles, keyboard navigation
- Performance optimized: lazy loading, requestAnimationFrame, will-change hints

## Prerequisites

- [Node.js](https://nodejs.org/) version 18.18 or later
- npm (included with Node.js)

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/Inevitable379/Human-evolution-site.git
   cd Human-evolution-site
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Production Build

To create and serve an optimized production build:

```bash
npm run build
npm start
```

The production server starts on [http://localhost:3000](http://localhost:3000) by default.

### Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the development server       |
| `npm run build` | Create an optimized production build |
| `npm start`     | Serve the production build         |

## Project Structure

```
├── pages/
│   ├── index.js          # Main page component
│   └── _app.js           # App wrapper with global styles
├── components/
│   ├── Hero.js            # Landing hero section
│   ├── Timeline.js        # Interactive milestone timeline
│   ├── MilestoneSection.js # Individual milestone sections
│   ├── DataViz.js         # Mini data visualizations
│   ├── MorphingSVG.js     # Morphing SVG illustrations
│   ├── Navigation.js      # Sticky navigation
│   └── Footer.js          # Site footer
├── styles/
│   ├── globals.css        # Global styles and CSS variables
│   └── components/        # Component-specific CSS modules
├── public/                # Static assets
└── package.json
```

## Accessibility

- Respects `prefers-reduced-motion` media query
- Semantic HTML with proper heading hierarchy
- ARIA labels and roles for interactive elements
- Full keyboard navigation support
- Color contrast ratios meet WCAG AA standards

## Performance

- Targets 60fps for all animations
- Uses `will-change` and `transform` for GPU-accelerated animations
- Lazy loads off-screen content
- Minimal JavaScript bundle with tree-shaking
