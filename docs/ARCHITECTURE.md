# Architecture Documentation

Complete architectural overview of the Apollo AI project.

## Project Structure

```
apollo-ai/
├── src/                        # Source code directory
│   ├── app/                    # Next.js App Router directory
│   │   ├── page.tsx           # Homepage (default route "/")
│   │   ├── layout.tsx         # Root layout wrapper
│   │   ├── globals.css        # Global styles (Tailwind + custom)
│   │   ├── favicon.ico        # Site favicon
│   │   └── global-error.tsx   # Global error boundary
│   │
│   ├── components/            # React components
│   │   ├── DroneScanner3D.tsx # 3D drone visualization component
│   │   ├── ErrorReporter.tsx  # Error tracking component
│   │   └── ui/                # Shadcn UI components (50+)
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       └── ... (47 more components)
│   │
│   ├── lib/                   # Utility libraries
│   │   ├── utils.ts           # Common utilities (cn helper)
│   │   └── hooks/             # Custom React hooks
│   │
│   ├── hooks/                 # Global custom hooks
│   │
│   └── visual-edits/          # Visual editing system
│       ├── VisualEditsMessenger.tsx
│       └── component-tagger-loader.js
│
├── public/                    # Static assets
│   └── (images, fonts, etc.)
│
├── docs/                      # Documentation
│   ├── TECHNOLOGY_STACK.md
│   ├── ARCHITECTURE.md (this file)
│   ├── COMPONENTS.md
│   ├── UI_COMPONENTS.md
│   ├── STYLING.md
│   └── CHANGES_LOG.md
│
├── node_modules/              # Dependencies
│
├── .next/                     # Next.js build output
│
├── package.json               # Dependencies & scripts
├── package-lock.json          # Lock file
├── bun.lock                   # Bun lock file
├── next.config.ts             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
├── postcss.config.mjs         # PostCSS configuration
├── eslint.config.mjs          # ESLint configuration
├── components.json            # Shadcn UI configuration
├── next-env.d.ts              # Next.js TypeScript definitions
├── .gitignore                 # Git ignore rules
└── README.md                  # Project overview
```

## Architecture Patterns

### 1. Next.js App Router

**Why App Router?**
- Modern routing with file-system based routing
- React Server Components by default
- Improved data fetching
- Better code organization
- Streaming and Suspense support

**File Structure:**
```
src/app/
├── layout.tsx          # Root layout (wraps all pages)
├── page.tsx            # Homepage route "/"
└── globals.css         # Global styles
```

**Layout Hierarchy:**
```
RootLayout (layout.tsx)
  └── ErrorReporter
  └── VisualEditsMessenger
  └── Page Component (page.tsx)
```

### 2. Component Architecture

#### Client Components
All interactive components use `"use client"` directive:

**DroneScanner3D.tsx** - 3D visualization
- Uses Three.js with React Three Fiber
- Real-time state management
- Mouse event handling
- Canvas rendering

**page.tsx** - Homepage
- Scroll-based animations
- Interactive sections
- Framer Motion integration

#### Server Components
- layout.tsx (metadata generation)
- Static content rendering

#### Component Pattern:
```typescript
"use client";  // Only when needed

import { useState, useEffect } from "react";
// ... imports

export const ComponentName = () => {
  // Hooks
  // State management
  // Event handlers
  
  return (
    // JSX
  );
};
```

### 3. Styling Architecture

#### Tailwind CSS 4
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Design tokens */
}

:root {
  /* CSS variables */
}

@layer base {
  /* Base styles */
}
```

**Key Concepts:**
- Design tokens in CSS variables
- OKLCH color space for better colors
- Custom variants for dark mode
- Utility-first approach
- Component-specific styles using CVA

#### Glass Morphism
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

#### Tech Borders
```css
.tech-border {
  border: 1px solid rgba(34, 197, 94, 0.3);
  box-shadow: 
    0 0 0 1px rgba(34, 197, 94, 0.1),
    inset 0 0 20px rgba(34, 197, 94, 0.05);
}
```

### 4. State Management

**Local State (useState)**
```typescript
const [crops, setCrops] = useState<CropData[]>([]);
const [scannedCrops, setScannedCrops] = useState<CropData[]>([]);
```

**Refs (useRef)**
```typescript
const droneRef = useRef<THREE.Group>(null);
const containerRef = useRef<HTMLDivElement>(null);
```

**Animation State (Framer Motion)**
```typescript
const { scrollYProgress } = useScroll();
const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
```

**Visibility Detection (useInView)**
```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });
```

### 5. 3D Rendering Architecture

**Three.js Scene Structure:**
```
Canvas
  └── Scene
      ├── Lighting
      │   ├── ambientLight
      │   ├── directionalLight
      │   └── pointLight
      ├── Ground (Terrain)
      ├── Crops (CornStalk × 625)
      ├── Drone
      │   ├── Body
      │   ├── Arms
      │   ├── Rotors (× 4)
      │   ├── Camera
      │   └── Coverage Lines
      └── OrbitControls
```

**Component Hierarchy:**
```typescript
<DroneScanner3D>
  <Canvas>
    <Scene>
      <Ground />
      {crops.map(crop => <CornStalk {...crop} />)}
      <Drone />
      <OrbitControls />
    </Scene>
  </Canvas>
  <InfoPanel />
  <HeroOverlay />
</DroneScanner3D>
```

### 6. Animation Architecture

**Scroll-Based Animations:**
```typescript
// Hero fade on scroll
const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

// Content slide up
const contentY = useTransform(scrollYProgress, [0.1, 0.2], [100, 0]);
```

**Intersection Observer Animations:**
```typescript
<AnimatedSection>
  {/* Fades in when visible */}
</AnimatedSection>
```

**Hover/Tap Animations:**
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.button>
```

**Custom Keyframe Animations:**
```css
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(12px); }
}
```

## Data Flow

### 1. Crop Field Generation
```
generateCornField()
  → Creates 625 crops (25×25 grid)
  → Assigns random positions
  → Determines status based on position
  → Returns CropData[]
```

### 2. Drone Scanning
```
Mouse Movement
  → Update mousePos state
  → useFrame hook (60fps)
    → Lerp drone position
    → Calculate scanned crops
    → Call onScanUpdate callback
      → Update InfoPanel
```

### 3. Statistics Calculation
```
scannedCrops (CropData[])
  → useMemo hook
    → Count by status
    → Calculate overall status
    → Return stats object
      → Render in InfoPanel
```

### 4. Scroll Animations
```
User Scrolls
  → scrollYProgress (0-1)
  → useTransform
    → Calculate opacity/position
    → Apply to motion components
      → Render animated UI
```

## Performance Optimizations

### 1. React Optimizations
```typescript
// Memoized calculations
const stats = useMemo(() => { /* ... */ }, [scannedCrops]);

// Lazy loading
<Suspense fallback={null}>
  <Scene />
</Suspense>

// Efficient re-renders
const geometry = useMemo(() => { /* ... */ }, []);
```

### 2. Three.js Optimizations
- Geometry reuse
- Instanced rendering concepts
- Efficient material management
- Proper cleanup in useEffect

### 3. Animation Optimizations
- IntersectionObserver for visibility
- `once: true` for one-time animations
- GPU-accelerated transforms
- RequestAnimationFrame via useFrame

### 4. Code Splitting
- Automatic code splitting by Next.js
- Component-level splitting
- Route-based splitting

## TypeScript Type System

### Core Types
```typescript
type CropStatus = "healthy" | "stressed" | "moderate" | "nutrient-deficient" | "water-stress";

interface CropData {
  position: [number, number, number];
  status: CropStatus;
  scale: number;
  rotation: number;
}
```

### Component Props
```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}
```

### Type Safety
- Strict TypeScript configuration
- Type-safe component props
- Type-safe event handlers
- Type-safe utility functions

## Build Configuration

### Next.js Config
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [/* ... */],
  },
  typescript: {
    ignoreBuildErrors: true,  // For rapid development
  },
  turbopack: {
    rules: {/* custom loaders */}
  }
};
```

### TypeScript Config
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "jsx": "preserve",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### PostCSS Config
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

## Deployment Architecture

### Build Process
```bash
bun run build
  → TypeScript compilation
  → Next.js optimization
  → Static generation
  → Asset optimization
  → .next/ output
```

### Production Structure
```
.next/
├── static/           # Static assets
├── server/           # Server bundles
└── cache/            # Build cache
```

### Optimization Features
- Automatic image optimization
- Code splitting
- Tree shaking
- Minification
- Gzip/Brotli compression

## Security Considerations

### Client-Side Security
- No sensitive data in client code
- XSS protection via React
- CSP headers (can be added)

### Build Security
- Dependency scanning
- Lock file integrity
- No exposed secrets

## Future Architecture Considerations

### Phase 2 Enhancements
- State management library (Zustand/Jotai)
- API routes for backend
- Database integration (Drizzle ORM)
- Authentication (Better Auth)

### Phase 3 Scaling
- Edge functions
- CDN optimization
- Caching strategies
- Real-time WebSocket connections
- Microservices architecture

## Development Workflow

### Local Development
```bash
bun dev → Turbopack dev server → Hot reload
```

### Git Workflow
```
main branch → development → feature branches
```

### Testing Strategy
- Component testing (future)
- E2E testing (future)
- Visual regression testing (future)

---

**Architecture Philosophy:**
- **Simplicity First** - Start simple, scale when needed
- **Performance** - Optimize for user experience
- **Maintainability** - Clean, documented code
- **Scalability** - Ready for future enhancements

**Last Updated:** December 2025
