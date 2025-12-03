# Technology Stack

Complete list of all technologies, packages, and tools used in Apollo AI.

## Core Framework & Runtime

### Next.js & React
```json
{
  "next": "15.3.5",
  "react": "19.0.0",
  "react-dom": "19.0.0"
}
```

**Why Next.js 15?**
- App Router for modern routing
- React Server Components support
- Turbopack for faster builds
- Automatic code splitting
- Built-in optimization

**Why React 19?**
- Latest features and performance improvements
- Better concurrent rendering
- Enhanced hooks

### TypeScript
```json
{
  "typescript": "^5"
}
```

**Benefits:**
- Type safety across the codebase
- Better IDE support
- Catch errors at compile time
- Self-documenting code

## 3D Graphics & Visualization

### Three.js Ecosystem
```json
{
  "three": "^0.181.2",
  "@react-three/fiber": "^9.4.2",
  "@react-three/drei": "^10.7.7",
  "@types/three": "^0.181.0"
}
```

**Purpose:**
- **three**: Core 3D rendering engine
- **@react-three/fiber**: React renderer for Three.js (declarative 3D)
- **@react-three/drei**: Helper components (OrbitControls, Text, Line, etc.)

**Used For:**
- 3D drone model rendering
- Corn field visualization
- Interactive camera controls
- 3D text and lines

### Related 3D Libraries
```json
{
  "three-globe": "^2.43.0",
  "cobe": "^0.6.5"
}
```

## Animation Libraries

### Framer Motion
```json
{
  "framer-motion": "^12.23.24",
  "motion": "^12.23.24",
  "motion-dom": "^12.23.23"
}
```

**Features Used:**
- Scroll-based animations (useScroll, useTransform)
- Element visibility detection (useInView)
- Smooth transitions and springs
- Gesture animations (whileHover, whileTap)
- AnimatePresence for enter/exit animations

**Animation Examples:**
- Hero section fade-out on scroll
- Section slide-in animations
- Card hover effects
- Button interactions

## UI Component Libraries

### Shadcn UI (Radix UI Based)
```json
{
  "@radix-ui/react-accordion": "^1.2.11",
  "@radix-ui/react-alert-dialog": "^1.1.14",
  "@radix-ui/react-aspect-ratio": "^1.1.7",
  "@radix-ui/react-avatar": "^1.1.10",
  "@radix-ui/react-checkbox": "^1.3.2",
  "@radix-ui/react-collapsible": "^1.1.11",
  "@radix-ui/react-context-menu": "^2.2.15",
  "@radix-ui/react-dialog": "^1.1.14",
  "@radix-ui/react-dropdown-menu": "^2.1.15",
  "@radix-ui/react-hover-card": "^1.1.14",
  "@radix-ui/react-label": "^2.1.7",
  "@radix-ui/react-menubar": "^1.1.15",
  "@radix-ui/react-navigation-menu": "^1.2.13",
  "@radix-ui/react-popover": "^1.1.14",
  "@radix-ui/react-progress": "^1.1.7",
  "@radix-ui/react-radio-group": "^1.3.7",
  "@radix-ui/react-scroll-area": "^1.2.9",
  "@radix-ui/react-select": "^2.2.5",
  "@radix-ui/react-separator": "^1.1.7",
  "@radix-ui/react-slider": "^1.3.5",
  "@radix-ui/react-slot": "^1.2.3",
  "@radix-ui/react-switch": "^1.2.5",
  "@radix-ui/react-tabs": "^1.1.12",
  "@radix-ui/react-toggle": "^1.1.9",
  "@radix-ui/react-toggle-group": "^1.1.10",
  "@radix-ui/react-tooltip": "^1.2.7"
}
```

**Why Radix UI?**
- Unstyled, accessible components
- WAI-ARIA compliant
- Keyboard navigation
- Focus management
- Customizable with Tailwind

### Headless UI
```json
{
  "@headlessui/react": "^2.2.9"
}
```

## Icon Libraries

```json
{
  "lucide-react": "^0.552.0",
  "@heroicons/react": "^2.2.0",
  "@tabler/icons-react": "^3.35.0",
  "react-icons": "^5.5.0"
}
```

**Primary Icons:** Lucide React
- Used for: Leaf, Brain, Upload, BarChart3, Users, Target, Zap, Github, Linkedin, Twitter, CheckCircle2, Cpu, FileText, Map

## Styling

### Tailwind CSS 4
```json
{
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "@tailwindcss/typography": "^0.5.19",
  "tw-animate-css": "^1.4.0"
}
```

**Tailwind CSS 4 Features:**
- New @import syntax
- @theme directive for design tokens
- @custom-variant for dark mode
- Improved performance
- Better CSS variables support

### Styling Utilities
```json
{
  "class-variance-authority": "^0.7.1",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1",
  "tailwindcss-animate": "^1.0.7"
}
```

**Purpose:**
- **class-variance-authority**: Type-safe variant system for components
- **clsx**: Conditional className utility
- **tailwind-merge**: Merge Tailwind classes without conflicts
- **tailwindcss-animate**: Pre-built animation utilities

## Form Handling

```json
{
  "react-hook-form": "^7.60.0",
  "@hookform/resolvers": "^5.1.1",
  "zod": "^4.1.12"
}
```

**Stack:**
- **react-hook-form**: Performant form library
- **@hookform/resolvers**: Zod integration
- **zod**: Schema validation

## UI Enhancement Libraries

### Carousels & Sliders
```json
{
  "embla-carousel-react": "^8.6.0",
  "embla-carousel-autoplay": "^8.6.0",
  "embla-carousel-auto-scroll": "^8.6.0",
  "swiper": "^12.0.3"
}
```

### Data Visualization
```json
{
  "recharts": "^3.0.2"
}
```

### Other UI Utilities
```json
{
  "react-dropzone": "^14.3.8",
  "react-day-picker": "^9.8.0",
  "date-fns": "^4.1.0",
  "react-intersection-observer": "^10.0.0",
  "react-resizable-panels": "^3.0.3",
  "react-responsive-masonry": "^2.7.1",
  "react-syntax-highlighter": "^15.6.1",
  "@types/react-syntax-highlighter": "^15.5.13",
  "react-wrap-balancer": "^1.1.1",
  "vaul": "^1.1.2",
  "sonner": "^2.0.6",
  "cmdk": "^1.1.1",
  "input-otp": "^1.4.2"
}
```

## Theme & Dark Mode

```json
{
  "next-themes": "^0.4.6"
}
```

## Database & Backend (Ready for Integration)

```json
{
  "@libsql/client": "^0.15.15",
  "drizzle-orm": "^0.44.7",
  "drizzle-kit": "^0.31.6",
  "better-auth": "1.3.10",
  "bcrypt": "^6.0.0"
}
```

**Note:** Database setup ready but not actively used in Stage 1 MVP.

## Payments (Ready for Integration)

```json
{
  "stripe": "^19.2.0",
  "autumn-js": "^0.1.43",
  "atmn": "^0.0.28"
}
```

## Utilities

### Particle Effects
```json
{
  "@tsparticles/engine": "^3.8.1",
  "@tsparticles/react": "^3.0.0",
  "@tsparticles/slim": "^3.8.1"
}
```

### Miscellaneous
```json
{
  "simplex-noise": "^4.0.3",
  "dotted-map": "^2.2.3",
  "mini-svg-data-uri": "^1.4.4",
  "qss": "^3.0.0",
  "estree-walker": "2.0.2",
  "@number-flow/react": "^0.5.10"
}
```

### Code Parsing
```json
{
  "@babel/parser": "^7.28.5"
}
```

## Development Tools

### Linting & Code Quality
```json
{
  "eslint": "^9.38.0",
  "eslint-config-next": "^16.0.1",
  "@eslint/eslintrc": "^3.3.1"
}
```

### TypeScript Types
```json
{
  "@types/node": "^20",
  "@types/react": "^19",
  "@types/react-dom": "^19"
}
```

## Build Configuration

### Next.js Config
- Turbopack for development
- Image optimization for all domains
- Custom loader for component tagging
- TypeScript & ESLint error suppression for builds

### PostCSS Config
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

### TypeScript Config
- Target: ES2017
- Strict mode enabled
- Path aliases: `@/*` → `./src/*`
- JSX: preserve (Next.js handles transformation)

## Package Manager

**Bun** (Primary)
- Faster than npm/yarn
- Built-in TypeScript support
- Compatible with Node.js ecosystem

**Alternative:** npm, yarn, or pnpm also supported

## Key Dependencies Summary

| Category | Primary Libraries |
|----------|------------------|
| **Framework** | Next.js 15, React 19, TypeScript |
| **3D Graphics** | Three.js, React Three Fiber, Drei |
| **Animation** | Framer Motion |
| **UI Components** | Radix UI (Shadcn UI) |
| **Icons** | Lucide React |
| **Styling** | Tailwind CSS 4, CVA |
| **Forms** | React Hook Form, Zod |
| **Charts** | Recharts |

## Installation Commands

```bash
# Install all dependencies
bun install
# or
npm install

# Add a new package
bun add <package-name>
# or
npm install <package-name>

# Add dev dependency
bun add -d <package-name>
# or
npm install -D <package-name>
```

## Version Requirements

- **Node.js**: 20.x or higher
- **Bun**: Latest stable version
- **npm**: 10.x or higher (if using npm)

---

**Last Updated:** December 2025
