# Custom Components Documentation

Complete documentation for all custom components in the Apollo AI project.

## Table of Contents
1. [DroneScanner3D](#dronescanner3d)
2. [HomePage](#homepage)
3. [AnimatedSection](#animatedsection)
4. [GlassCard](#glasscard)
5. [ErrorReporter](#errorreporter)

---

## DroneScanner3D

**Location:** `src/components/DroneScanner3D.tsx`

Interactive 3D visualization component featuring a corn field with a mouse-controlled drone scanner.

### Features
- Real-time 3D rendering using Three.js
- Mouse-controlled drone movement
- Dynamic crop scanning within 3m × 3m coverage area
- Live statistics panel with crop status breakdown
- AI confidence meter
- Glass morphism UI design

### Component Structure

```typescript
export const DroneScanner3D = () => {
  const [crops, setCrops] = useState<CropData[]>([]);
  const [scannedCrops, setScannedCrops] = useState<CropData[]>([]);
  
  // Initialize corn field on mount
  useEffect(() => {
    setCrops(generateCornField());
  }, []);
  
  return (
    <div className="relative w-full h-screen">
      {/* Sky gradient */}
      {/* WebGL Canvas with 3D scene */}
      {/* Info Panel (top right) */}
      {/* Hero overlay (bottom) */}
      {/* Scroll indicator */}
    </div>
  );
};
```

### Sub-Components

#### 1. Scene Component
Main 3D scene containing all 3D elements:
```typescript
const Scene = ({ crops, onScanUpdate }) => (
  <>
    <ambientLight intensity={0.6} />
    <directionalLight position={[10, 15, 10]} intensity={1} castShadow />
    <pointLight position={[-5, 5, -5]} intensity={0.5} color="#87CEEB" />
    
    <Ground />
    {crops.map((crop, i) => <CornStalk key={i} {...crop} />)}
    <Drone crops={crops} onScanUpdate={onScanUpdate} />
    <OrbitControls />
  </>
);
```

#### 2. CornStalk Component
Individual corn plant with status-based coloring:
```typescript
const CornStalk = ({ position, status, scale, rotation }: CropData) => {
  const [hovered, setHovered] = useState(false);
  const color = statusColors[status];
  
  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Stem cylinder */}
      {/* Corn cob */}
      {/* Leaves (3 planes) */}
    </group>
  );
};
```

**Status Colors:**
- `healthy`: #22c55e (green)
- `stressed`: #ef4444 (red)
- `moderate`: #eab308 (yellow)
- `nutrient-deficient`: #f97316 (orange)
- `water-stress`: #3b82f6 (blue)

#### 3. Ground Component
3D terrain with procedural height variation:
```typescript
const Ground = () => {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(25, 25, 50, 50);
    // Apply sine/cosine wave deformation
    return geo;
  }, []);
  
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
      <primitive object={geometry} />
      <meshStandardMaterial color="#3d2817" roughness={0.9} />
    </mesh>
  );
};
```

#### 4. Drone Component
Detailed drone model with coverage area visualization:

**Drone Specifications:**
- Body: Light gray box (0.35 × 0.12 × 0.35 units)
- Top plate: Black (0.2 × 0.02 × 0.2 units)
- Camera: Black sphere (0.06 radius)
- Arms: 4 black cylinders at corners (±0.25 units)
- Rotors: Semi-transparent circles (0.12 radius, 70% opacity)

**Coverage Area:**
- Size: 3m × 3m square
- Red border lines
- Corner markers
- Scanning area fill (15% opacity)
- Lines from drone to corners

```typescript
const Drone = ({ crops, onScanUpdate }) => {
  const droneRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, z: 0 });
  
  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Convert screen coordinates to 3D world coordinates
      // Update mousePos state
    };
    // Add/remove event listener
  }, [camera, gl]);
  
  // Update drone position and scan crops (60fps)
  useFrame((state) => {
    // Lerp drone to mouse position
    // Calculate scanned crops within coverage area
    // Call onScanUpdate callback
  });
  
  return (
    <group ref={droneRef}>
      {/* Drone body meshes */}
      {/* Coverage lines */}
      {/* Coverage square on ground */}
    </group>
  );
};
```

#### 5. InfoPanel Component
Statistics panel showing real-time scan data:

```typescript
const InfoPanel = ({ scannedCrops }: { scannedCrops: CropData[] }) => {
  const stats = useMemo(() => ({
    total: scannedCrops.length,
    healthy: /* count */,
    stressed: /* count */,
    // ... other status counts
  }), [scannedCrops]);
  
  return (
    <motion.div className="absolute top-20 right-4 w-44 md:w-56">
      {/* Header with status indicator */}
      {/* Coverage area info */}
      {/* Crop count */}
      {/* Status breakdown by type */}
      {/* AI confidence meter */}
    </motion.div>
  );
};
```

**Info Panel Styling:**
```css
background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.75) 100%);
backdrop-filter: blur(12px);
border: 1px solid rgba(34, 197, 94, 0.3);
box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
```

### Data Types

```typescript
type CropStatus = "healthy" | "stressed" | "moderate" | "nutrient-deficient" | "water-stress";

interface CropData {
  position: [number, number, number];
  status: CropStatus;
  scale: number;
  rotation: number;
}
```

### Field Generation Algorithm

```typescript
const generateCornField = (): CropData[] => {
  const crops: CropData[] = [];
  const gridSize = 12;  // 25×25 = 625 crops
  const spacing = 0.8;
  
  for (let x = -gridSize; x <= gridSize; x++) {
    for (let z = -gridSize; z <= gridSize; z++) {
      // Add random offset for natural look
      const px = x * spacing + (Math.random() - 0.5) * 0.3;
      const pz = z * spacing + (Math.random() - 0.5) * 0.3;
      
      // Status based on distance from center
      const distFromCenter = Math.sqrt(px * px + pz * pz);
      let status: CropStatus;
      
      if (distFromCenter > 8) {
        // Outer ring: mostly stressed/water-stress
        status = /* random selection */;
      } else if (distFromCenter > 5) {
        // Middle ring: moderate/nutrient-deficient
        status = /* random selection */;
      } else {
        // Center: mostly healthy
        status = /* random selection */;
      }
      
      crops.push({ position: [px, 0, pz], status, scale, rotation });
    }
  }
  return crops;
};
```

### Performance Optimization

1. **Geometry Reuse:** useMemo for terrain geometry
2. **Efficient Updates:** useFrame for 60fps animations
3. **Lazy Loading:** Suspense boundary for 3D content
4. **Memoized Stats:** useMemo for statistics calculation

### Usage Example

```typescript
import { DroneScanner3D } from "@/components/DroneScanner3D";

export default function Page() {
  return (
    <section className="h-screen">
      <DroneScanner3D />
    </section>
  );
}
```

---

## HomePage

**Location:** `src/app/page.tsx`

Main landing page with multiple sections showcasing the project.

### Page Structure

```typescript
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.2], [100, 0]);
  
  return (
    <div ref={containerRef}>
      {/* Fixed Navigation */}
      {/* Hero Section (3D Scanner) */}
      {/* Content Sections */}
    </div>
  );
}
```

### Sections

#### 1. Fixed Navigation
```typescript
<motion.nav className="fixed top-0 w-full z-50 glass-card">
  <div className="max-w-6xl mx-auto px-4 py-3">
    {/* Logo */}
    {/* Nav links */}
    {/* Stage badge */}
  </div>
</motion.nav>
```

#### 2. Hero Section (Fullscreen)
```typescript
<motion.section style={{ opacity: heroOpacity }} className="h-screen">
  <DroneScanner3D />
</motion.section>
```

#### 3. Problem Statement
- 40% crop loss statistic
- $220B economic impact
- 72hrs detection delay

#### 4. Solution (3 Steps)
- Upload images
- AI analysis
- Get insights

#### 5. Team Section
```typescript
teamMembers.map(member => (
  <GlassCard>
    {/* Avatar */}
    {/* Name & role */}
    {/* Skills */}
    {/* Social links */}
  </GlassCard>
))
```

#### 6. Why Us (Competitive Edge)
- Precision: 95%+ accuracy
- Speed: <30 seconds
- Accessibility: Smartphone compatible

#### 7. Technical Approach
- VARI Index
- GLI & ExG
- CNN Model
- LLM Reports
- Heatmaps

#### 8. Roadmap
- Phase 1: MVP (Current)
- Phase 2: Enhancement (Upcoming)
- Phase 3: Scale (Future)

#### 9. Demo Preview
- Upload interface mockup
- Heatmap output example

#### 10. Footer
- Logo & branding
- Hackathon info
- Social links

### Team Data

```typescript
const teamMembers = [
  { 
    name: "Abrorbek Nematov", 
    role: "Software Engineer", 
    skills: ["NumPy", "Django", "PyTorch"], 
    avatar: "AN",
    links: {
      github: "https://github.com/ha-wq",
      twitter: "https://x.com/AbrorbekNemat0v",
      linkedin: "https://www.linkedin.com/in/abrorbek-nematov-2103272a5/"
    }
  },
  // ... 3 more members
];
```

---

## AnimatedSection

Reusable component for scroll-triggered animations.

```typescript
const AnimatedSection = ({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true,      // Animate only once
    margin: "-100px" // Trigger 100px before visible
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

**Usage:**
```typescript
<AnimatedSection>
  <h2>This fades in when scrolled into view</h2>
</AnimatedSection>
```

---

## GlassCard

Reusable glass morphism card component.

```typescript
const GlassCard = ({ 
  children, 
  className = "", 
  hover = true 
}: { 
  children: React.ReactNode; 
  className?: string; 
  hover?: boolean;
}) => (
  <div className={`
    glass-card 
    rounded-xl 
    ${hover ? "hover:scale-[1.02] transition-transform" : ""} 
    ${className}
  `}>
    {children}
  </div>
);
```

**Styling (globals.css):**
```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**Usage:**
```typescript
<GlassCard className="p-6">
  <h3>Glass card content</h3>
</GlassCard>
```

---

## ErrorReporter

**Location:** `src/components/ErrorReporter.tsx`

Error tracking and reporting component.

```typescript
"use client";

import { useEffect } from "react";

export default function ErrorReporter() {
  useEffect(() => {
    // Error handling logic
    // Report errors to console or external service
  }, []);
  
  return null; // No UI rendered
}
```

---

## Component Best Practices

### 1. Client vs Server Components
```typescript
// Client component (interactive)
"use client";
export const InteractiveComponent = () => { /* ... */ };

// Server component (static)
export default function StaticPage() { /* ... */ }
```

### 2. Props Typing
```typescript
interface ComponentProps {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}

export const Component = ({ title, optional = false, children }: ComponentProps) => {
  // ...
};
```

### 3. State Management
```typescript
// Local state
const [state, setState] = useState<Type>(initialValue);

// Refs for DOM/Three.js
const ref = useRef<HTMLDivElement>(null);

// Memoized values
const computed = useMemo(() => expensiveComputation(), [deps]);
```

### 4. Performance
```typescript
// Lazy loading
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>

// Memoization
const MemoizedComponent = memo(Component);

// Debouncing
const debouncedValue = useDebounce(value, 300);
```

---

**Last Updated:** December 2025
