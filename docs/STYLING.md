# Styling System Documentation

Complete guide to the styling system used in Apollo AI.

## Table of Contents
1. [Tailwind CSS 4](#tailwind-css-4)
2. [Design Tokens](#design-tokens)
3. [Custom Classes](#custom-classes)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Animations](#animations)
7. [Responsive Design](#responsive-design)

---

## Tailwind CSS 4

Apollo AI uses **Tailwind CSS 4**, the latest version with significant improvements.

### Key Features

**New Import Syntax:**
```css
@import "tailwindcss";
@import "tw-animate-css";
```

**@theme Directive:**
```css
@theme inline {
  --color-primary: var(--primary);
  --font-sans: var(--font-geist-sans);
}
```

**@custom-variant for Dark Mode:**
```css
@custom-variant dark (&:is(.dark *));
```

**@layer System:**
```css
@layer base {
  * {
    @apply border-border outline-ring/50;
  }
}
```

---

## Design Tokens

### CSS Variables

Located in `src/app/globals.css`:

```css
:root {
  /* Core Colors */
  --background: oklch(0.98 0 0);              /* #FAFAFA - Off-white */
  --foreground: oklch(0.145 0 0);             /* #252525 - Near-black */
  
  /* Primary (Green for agriculture theme) */
  --primary: oklch(0.55 0.15 145);            /* #22C55E - Green-600 */
  --primary-foreground: oklch(0.985 0 0);     /* #FBFBFB - White */
  
  /* Accent (Same as primary) */
  --accent: oklch(0.55 0.15 145);             /* #22C55E - Green-600 */
  --accent-foreground: oklch(0.985 0 0);      /* #FBFBFB - White */
  
  /* Cards & Surfaces */
  --card: oklch(1 0 0 / 70%);                 /* White with 70% opacity */
  --card-foreground: oklch(0.145 0 0);        /* #252525 */
  
  /* Popover */
  --popover: oklch(1 0 0 / 90%);              /* White with 90% opacity */
  --popover-foreground: oklch(0.145 0 0);     /* #252525 */
  
  /* Secondary */
  --secondary: oklch(0.97 0 0);               /* #F7F7F7 - Light gray */
  --secondary-foreground: oklch(0.205 0 0);   /* #343434 - Dark gray */
  
  /* Muted */
  --muted: oklch(0.97 0 0);                   /* #F7F7F7 */
  --muted-foreground: oklch(0.5 0 0);         /* #808080 - Mid gray */
  
  /* Destructive (Errors) */
  --destructive: oklch(0.577 0.245 27.325);   /* #EF4444 - Red */
  
  /* Borders & Inputs */
  --border: oklch(0.85 0 0);                  /* #D9D9D9 - Light gray */
  --input: oklch(0.922 0 0);                  /* #EBEBEB - Very light gray */
  --ring: oklch(0.55 0.15 145);               /* #22C55E - Green (focus ring) */
  
  /* Charts */
  --chart-1: oklch(0.646 0.222 41.116);       /* Orange */
  --chart-2: oklch(0.6 0.118 184.704);        /* Cyan */
  --chart-3: oklch(0.398 0.07 227.392);       /* Blue */
  --chart-4: oklch(0.828 0.189 84.429);       /* Yellow */
  --chart-5: oklch(0.769 0.188 70.08);        /* Lime */
  
  /* Sidebar */
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
  
  /* Border Radius */
  --radius: 0.625rem;                         /* 10px */
}
```

### Dark Mode Variables

```css
.dark {
  --background: oklch(0.145 0 0);             /* #252525 - Dark */
  --foreground: oklch(0.985 0 0);             /* #FBFBFB - Light */
  
  --card: oklch(0.205 0 0);                   /* #343434 */
  --card-foreground: oklch(0.985 0 0);
  
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  
  --primary: oklch(0.922 0 0);                /* Light in dark mode */
  --primary-foreground: oklch(0.205 0 0);
  
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  
  --destructive: oklch(0.704 0.191 22.216);
  
  --border: oklch(1 0 0 / 10%);               /* White with 10% opacity */
  --input: oklch(1 0 0 / 15%);                /* White with 15% opacity */
  --ring: oklch(0.556 0 0);
  
  /* Dark mode charts */
  --chart-1: oklch(0.488 0.243 264.376);      /* Purple */
  --chart-2: oklch(0.696 0.17 162.48);        /* Green */
  --chart-3: oklch(0.769 0.188 70.08);        /* Lime */
  --chart-4: oklch(0.627 0.265 303.9);        /* Pink */
  --chart-5: oklch(0.645 0.246 16.439);       /* Orange */
}
```

### Computed Radius Tokens

```css
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);     /* 6px */
  --radius-md: calc(var(--radius) - 2px);     /* 8px */
  --radius-lg: var(--radius);                 /* 10px */
  --radius-xl: calc(var(--radius) + 4px);     /* 14px */
}
```

---

## Custom Classes

### Glass Morphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

**Usage:**
```html
<div class="glass-card rounded-xl p-6">
  Glass morphism card
</div>
```

### Tech Borders

```css
.tech-border {
  border: 1px solid rgba(34, 197, 94, 0.3);
  box-shadow: 
    0 0 0 1px rgba(34, 197, 94, 0.1),
    inset 0 0 20px rgba(34, 197, 94, 0.05);
}
```

**Usage:**
```html
<div class="tech-border rounded-xl p-6">
  Green tech-themed border
</div>
```

### Dotted Background

```css
.dotted-bg {
  background-image: radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

**Usage:**
```html
<div class="dotted-bg">
  Notebook-style dotted pattern
</div>
```

---

## Color System

### OKLCH Color Space

Apollo AI uses **OKLCH** color space for better perceptual uniformity:

```
oklch(lightness chroma hue / alpha)
```

**Benefits:**
- More predictable lightness
- Better color interpolation
- Wider gamut support

**Example:**
```css
--primary: oklch(0.55 0.15 145);
/* 
  Lightness: 0.55 (55% brightness)
  Chroma: 0.15 (15% saturation)
  Hue: 145 (green)
*/
```

### Status Colors

```typescript
const statusColors = {
  healthy: "#22c55e",              // Green-500
  stressed: "#ef4444",             // Red-500
  moderate: "#eab308",             // Yellow-500
  "nutrient-deficient": "#f97316", // Orange-500
  "water-stress": "#3b82f6",       // Blue-500
};
```

### Semantic Colors

```css
/* Success */
.text-success { color: #22c55e; }
.bg-success { background: #22c55e; }

/* Warning */
.text-warning { color: #eab308; }
.bg-warning { background: #eab308; }

/* Error */
.text-error { color: #ef4444; }
.bg-error { background: #ef4444; }

/* Info */
.text-info { color: #3b82f6; }
.bg-info { background: #3b82f6; }
```

---

## Typography

### Font Families

```css
@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}
```

**Geist Sans** - Primary font (Variable font)
- Used for all UI text
- Modern, clean sans-serif
- Optimized for readability

**Geist Mono** - Monospace font
- Used for code blocks
- Technical displays

### Font Sizes

Tailwind's default scale:
```
text-xs    → 0.75rem (12px)
text-sm    → 0.875rem (14px)
text-base  → 1rem (16px)
text-lg    → 1.125rem (18px)
text-xl    → 1.25rem (20px)
text-2xl   → 1.5rem (24px)
text-3xl   → 1.875rem (30px)
text-4xl   → 2.25rem (36px)
text-5xl   → 3rem (48px)
```

### Font Weights

```
font-normal     → 400
font-medium     → 500
font-semibold   → 600
font-bold       → 700
```

### Line Heights

```
leading-none    → 1
leading-tight   → 1.25
leading-normal  → 1.5
leading-relaxed → 1.625
```

---

## Animations

### Keyframe Animations

#### Bounce Down (Scroll Indicator)
```css
@keyframes bounce-down {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(12px); }
}

.bounce-down {
  animation: bounce-down 1s ease-in-out infinite;
}
```

#### Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
  50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
}

.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

#### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
}

.float-animation {
  animation: float 3s ease-in-out infinite;
}
```

#### Scan Line
```css
@keyframes scan-line {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

.scan-line {
  animation: scan-line 2s ease-in-out infinite;
}
```

### Framer Motion Animations

#### Scroll-Based
```typescript
const { scrollYProgress } = useScroll();
const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
const y = useTransform(scrollYProgress, [0.1, 0.2], [100, 0]);
```

#### Intersection Observer
```typescript
const ref = useRef(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 60 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  Content
</motion.div>
```

#### Hover/Tap Interactions
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Button
</motion.button>
```

### Tailwind Animate

From `tw-animate-css` package:

```html
<!-- Fade animations -->
<div class="animate-in fade-in">Fade in</div>
<div class="animate-out fade-out">Fade out</div>

<!-- Slide animations -->
<div class="slide-in-from-top">Slide from top</div>
<div class="slide-in-from-bottom">Slide from bottom</div>
<div class="slide-in-from-left">Slide from left</div>
<div class="slide-in-from-right">Slide from right</div>

<!-- Zoom animations -->
<div class="zoom-in">Zoom in</div>
<div class="zoom-out">Zoom out</div>

<!-- Spin -->
<div class="animate-spin">Spinner</div>
```

---

## Responsive Design

### Breakpoints

Tailwind's default breakpoints:

```css
sm:  640px   /* @media (min-width: 640px) */
md:  768px   /* @media (min-width: 768px) */
lg:  1024px  /* @media (min-width: 1024px) */
xl:  1280px  /* @media (min-width: 1280px) */
2xl: 1536px  /* @media (min-width: 1536px) */
```

### Mobile-First Approach

```html
<!-- Base (mobile) -->
<div class="text-sm p-4">
  
<!-- Tablet -->
<div class="text-sm md:text-base md:p-6">
  
<!-- Desktop -->
<div class="text-sm md:text-base lg:text-lg lg:p-8">
```

### Container Queries

Used in some components:

```css
@container/card-header (min-width: 640px) {
  /* Styles */
}
```

### Responsive Utilities

```html
<!-- Hide/Show -->
<div class="hidden md:block">Desktop only</div>
<div class="block md:hidden">Mobile only</div>

<!-- Flex Direction -->
<div class="flex flex-col md:flex-row">
  <!-- Stacks on mobile, row on desktop -->
</div>

<!-- Grid Columns -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 col mobile, 2 tablet, 3 desktop -->
</div>

<!-- Text Alignment -->
<div class="text-center sm:text-left">
  <!-- Center on mobile, left on desktop -->
</div>
```

---

## Spacing System

### Padding & Margin Scale

```
0  → 0
1  → 0.25rem (4px)
2  → 0.5rem (8px)
3  → 0.75rem (12px)
4  → 1rem (16px)
6  → 1.5rem (24px)
8  → 2rem (32px)
12 → 3rem (48px)
16 → 4rem (64px)
20 → 5rem (80px)
```

### Common Patterns

```html
<!-- Card padding -->
<div class="p-6">Card content</div>

<!-- Section spacing -->
<section class="py-20 px-4">Section</section>

<!-- Container -->
<div class="max-w-6xl mx-auto px-4">Container</div>

<!-- Gap in flex/grid -->
<div class="flex gap-4">Items</div>
<div class="grid grid-cols-3 gap-6">Items</div>
```

---

## Shadows

### Shadow Scale

```css
shadow-xs   → box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
shadow-sm   → box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
shadow      → box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
shadow-md   → box-shadow: 0 6px 16px -4px rgba(0, 0, 0, 0.1);
shadow-lg   → box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.1);
shadow-xl   → box-shadow: 0 20px 40px -12px rgba(0, 0, 0, 0.25);
```

### Custom Shadows

```css
/* Glass card shadow */
box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

/* Tech border shadow */
box-shadow: 
  0 0 0 1px rgba(34, 197, 94, 0.1),
  inset 0 0 20px rgba(34, 197, 94, 0.05);
```

---

## Focus States

### Focus Ring

```css
focus-visible:border-ring 
focus-visible:ring-ring/50 
focus-visible:ring-[3px]
```

**Visual:**
- 3px ring around element
- Green color (ring = primary)
- 50% opacity
- Only on keyboard focus (focus-visible)

### Disabled States

```css
disabled:pointer-events-none 
disabled:cursor-not-allowed 
disabled:opacity-50
```

---

## Best Practices

### 1. Use Design Tokens
```css
/* Good */
color: var(--primary);
background: var(--background);

/* Avoid */
color: #22c55e;
background: white;
```

### 2. Mobile-First
```html
<!-- Good -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Avoid -->
<div class="text-lg md:text-sm">
```

### 3. Semantic Classes
```html
<!-- Good -->
<button class="bg-primary text-primary-foreground">

<!-- Avoid -->
<button class="bg-green-600 text-white">
```

### 4. Consistent Spacing
```html
<!-- Good - using scale -->
<div class="p-6 gap-4">

<!-- Avoid - arbitrary values -->
<div class="p-[23px] gap-[17px]">
```

### 5. Use cn() Utility
```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  condition && "conditional-classes",
  props.className
)}>
```

---

## Component Styling Pattern

```typescript
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        outline: "outline-classes",
      },
      size: {
        default: "h-9 px-4",
        sm: "h-8 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
```

---

## Resources

- **Tailwind CSS 4 Docs**: https://tailwindcss.com
- **OKLCH Color Space**: https://oklch.com
- **Framer Motion**: https://www.framer.com/motion/
- **CVA**: https://cva.style

---

**Last Updated:** December 2025
