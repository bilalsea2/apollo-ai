# UI Components Documentation

Complete guide to all 53 Shadcn UI components used in Apollo AI.

## Overview

All UI components are located in `src/components/ui/` and are built using:
- **Radix UI** - Accessible, unstyled primitives
- **Tailwind CSS** - Utility-first styling
- **Class Variance Authority (CVA)** - Type-safe variant system
- **Lucide React** - Icons

## Component Categories

### Layout & Structure
- [Card](#card)
- [Separator](#separator)
- [Aspect Ratio](#aspect-ratio)
- [Resizable](#resizable)
- [Scroll Area](#scroll-area)

### Navigation
- [Navigation Menu](#navigation-menu)
- [Menubar](#menubar)
- [Breadcrumb](#breadcrumb)
- [Tabs](#tabs)
- [Pagination](#pagination)
- [Sidebar](#sidebar)

### Form Elements
- [Button](#button)
- [Input](#input)
- [Textarea](#textarea)
- [Select](#select)
- [Checkbox](#checkbox)
- [Radio Group](#radio-group)
- [Switch](#switch)
- [Slider](#slider)
- [Label](#label)
- [Form](#form)
- [Field](#field)
- [Input Group](#input-group)
- [Input OTP](#input-otp)

### Overlays & Dialogs
- [Dialog](#dialog)
- [Alert Dialog](#alert-dialog)
- [Sheet](#sheet)
- [Drawer](#drawer)
- [Popover](#popover)
- [Tooltip](#tooltip)
- [Hover Card](#hover-card)
- [Context Menu](#context-menu)
- [Dropdown Menu](#dropdown-menu)

### Feedback
- [Alert](#alert)
- [Toast (Sonner)](#toast-sonner)
- [Progress](#progress)
- [Spinner](#spinner)
- [Skeleton](#skeleton)

### Data Display
- [Table](#table)
- [Badge](#badge)
- [Avatar](#avatar)
- [Calendar](#calendar)
- [Chart](#chart)
- [Carousel](#carousel)
- [Accordion](#accordion)
- [Collapsible](#collapsible)
- [Empty](#empty)
- [Item](#item)

### Interactive
- [Command](#command)
- [Toggle](#toggle)
- [Toggle Group](#toggle-group)
- [Button Group](#button-group)
- [Kbd](#kbd)

---

## Component Details

### Card

Flexible container component with header, content, and footer sections.

**Location:** `src/components/ui/card.tsx`

**Usage:**
```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description text</CardDescription>
    <CardAction>
      <Button>Action</Button>
    </CardAction>
  </CardHeader>
  <CardContent>
    Main content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

**Key Features:**
- Composable sub-components
- Automatic spacing and layout
- Grid-based header for title/action alignment
- Border and shadow styling
- Flexible content area

---

### Button

Versatile button component with multiple variants and sizes.

**Location:** `src/components/ui/button.tsx`

**Variants:**
- `default` - Primary button (green background)
- `destructive` - Danger/delete actions (red)
- `outline` - Bordered button
- `secondary` - Secondary actions (gray)
- `ghost` - Transparent button
- `link` - Text link style

**Sizes:**
- `default` - h-9, standard padding
- `sm` - h-8, compact
- `lg` - h-10, large
- `icon` - Square 9×9 for icons

**Usage:**
```typescript
import { Button } from "@/components/ui/button";

<Button variant="default" size="default">Click me</Button>
<Button variant="outline" size="sm">Small Outline</Button>
<Button variant="ghost" size="icon">
  <Icon />
</Button>
```

**As Link:**
```typescript
import Link from "next/link";
<Button asChild>
  <Link href="/page">Go to page</Link>
</Button>
```

---

### Badge

Small status indicator or label component.

**Location:** `src/components/ui/badge.tsx`

**Variants:**
- `default` - Primary badge (green)
- `secondary` - Gray badge
- `destructive` - Red badge
- `outline` - Bordered badge

**Usage:**
```typescript
import { Badge } from "@/components/ui/badge";

<Badge variant="default">New</Badge>
<Badge variant="outline">Stage 1</Badge>
<Badge variant="destructive">Error</Badge>
```

**With Icon:**
```typescript
<Badge>
  <CheckIcon />
  Completed
</Badge>
```

---

### Input

Text input component with focus states and validation.

**Location:** `src/components/ui/input.tsx`

**Usage:**
```typescript
import { Input } from "@/components/ui/input";

<Input type="text" placeholder="Enter text..." />
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="0" />
```

**With Label:**
```typescript
import { Label } from "@/components/ui/label";

<div>
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" />
</div>
```

**File Input:**
```typescript
<Input type="file" />
```

---

### Select

Dropdown selection component.

**Location:** `src/components/ui/select.tsx`

**Usage:**
```typescript
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
    <SelectItem value="option3">Option 3</SelectItem>
  </SelectContent>
</Select>
```

**With Groups:**
```typescript
import { SelectGroup, SelectLabel } from "@/components/ui/select";

<SelectContent>
  <SelectGroup>
    <SelectLabel>Fruits</SelectLabel>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
  </SelectGroup>
  <SelectGroup>
    <SelectLabel>Vegetables</SelectLabel>
    <SelectItem value="carrot">Carrot</SelectItem>
  </SelectGroup>
</SelectContent>
```

---

### Dialog

Modal dialog component for overlays and forms.

**Location:** `src/components/ui/dialog.tsx`

**Usage:**
```typescript
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    <div>Main content</div>
    <DialogFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

**Without Close Button:**
```typescript
<DialogContent showCloseButton={false}>
  {/* content */}
</DialogContent>
```

---

### Checkbox

Checkbox input with label support.

**Location:** `src/components/ui/checkbox.tsx`

**Usage:**
```typescript
import { Checkbox } from "@/components/ui/checkbox";

<Checkbox id="terms" />
<Label htmlFor="terms">Accept terms</Label>
```

**With State:**
```typescript
const [checked, setChecked] = useState(false);

<Checkbox checked={checked} onCheckedChange={setChecked} />
```

---

### Toast (Sonner)

Toast notification system using Sonner.

**Location:** `src/components/ui/sonner.tsx`

**Setup in Layout:**
```typescript
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

**Usage:**
```typescript
import { toast } from "sonner";

// Success toast
toast.success("Success message");

// Error toast
toast.error("Error message");

// Info toast
toast.info("Info message");

// Loading toast
toast.loading("Loading...");

// Promise toast
toast.promise(fetchData(), {
  loading: "Loading...",
  success: "Data loaded!",
  error: "Failed to load"
});
```

---

### Tooltip

Hover tooltip component.

**Location:** `src/components/ui/tooltip.tsx`

**Usage:**
```typescript
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="ghost" size="icon">
        <InfoIcon />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Tooltip text</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### Tabs

Tab navigation component.

**Location:** `src/components/ui/tabs.tsx`

**Usage:**
```typescript
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
    <TabsTrigger value="tab3">Tab 3</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Tab 1 content</TabsContent>
  <TabsContent value="tab2">Tab 2 content</TabsContent>
  <TabsContent value="tab3">Tab 3 content</TabsContent>
</Tabs>
```

---

### Table

Data table component with header, body, and footer.

**Location:** `src/components/ui/table.tsx`

**Usage:**
```typescript
import { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption } from "@/components/ui/table";

<Table>
  <TableCaption>Table caption</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
      <TableHead>Column 3</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
      <TableCell>Data 3</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

### Accordion

Collapsible content sections.

**Location:** `src/components/ui/accordion.tsx`

**Usage:**
```typescript
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Question 1</AccordionTrigger>
    <AccordionContent>
      Answer 1 content
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Question 2</AccordionTrigger>
    <AccordionContent>
      Answer 2 content
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

**Multiple Open:**
```typescript
<Accordion type="multiple">
  {/* items */}
</Accordion>
```

---

### Progress

Progress bar component.

**Location:** `src/components/ui/progress.tsx`

**Usage:**
```typescript
import { Progress } from "@/components/ui/progress";

<Progress value={50} />
<Progress value={75} className="h-2" />
```

---

### Skeleton

Loading placeholder component.

**Location:** `src/components/ui/skeleton.tsx`

**Usage:**
```typescript
import { Skeleton } from "@/components/ui/skeleton";

<Skeleton className="h-12 w-12 rounded-full" />
<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

---

### Spinner

Loading spinner component.

**Location:** `src/components/ui/spinner.tsx`

**Usage:**
```typescript
import { Spinner } from "@/components/ui/spinner";

<Spinner />
<Spinner className="text-green-600" />
```

---

### Avatar

User avatar component with fallback.

**Location:** `src/components/ui/avatar.tsx`

**Usage:**
```typescript
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="User" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### Alert

Alert message component.

**Location:** `src/components/ui/alert.tsx`

**Variants:**
- `default` - Info alert
- `destructive` - Error alert

**Usage:**
```typescript
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

<Alert>
  <InfoIcon />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This is an informational alert message.
  </AlertDescription>
</Alert>

<Alert variant="destructive">
  <AlertCircleIcon />
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    Something went wrong.
  </AlertDescription>
</Alert>
```

---

## Complete Component List

All 53 UI components available:

1. **accordion** - Collapsible content sections
2. **alert-dialog** - Confirmation dialogs
3. **alert** - Alert messages
4. **aspect-ratio** - Maintain aspect ratios
5. **avatar** - User avatars
6. **badge** - Status badges
7. **breadcrumb** - Navigation breadcrumbs
8. **button-group** - Grouped buttons
9. **button** - Buttons
10. **calendar** - Date picker calendar
11. **card** - Content cards
12. **carousel** - Image/content carousels
13. **chart** - Data charts (Recharts)
14. **checkbox** - Checkboxes
15. **collapsible** - Collapsible sections
16. **command** - Command palette
17. **context-menu** - Right-click menus
18. **dialog** - Modal dialogs
19. **drawer** - Slide-out drawers
20. **dropdown-menu** - Dropdown menus
21. **empty** - Empty states
22. **field** - Form field wrapper
23. **form** - Form components (React Hook Form)
24. **hover-card** - Hover popover cards
25. **input-group** - Input with addons
26. **input-otp** - OTP/PIN input
27. **input** - Text inputs
28. **item** - Generic item component
29. **kbd** - Keyboard shortcut display
30. **label** - Form labels
31. **menubar** - Menu bar navigation
32. **navigation-menu** - Complex navigation
33. **pagination** - Page navigation
34. **popover** - Popover content
35. **progress** - Progress bars
36. **radio-group** - Radio button groups
37. **resizable** - Resizable panels
38. **scroll-area** - Custom scrollbars
39. **select** - Select dropdowns
40. **separator** - Visual separators
41. **sheet** - Side sheets
42. **sidebar** - Application sidebar
43. **skeleton** - Loading skeletons
44. **slider** - Range sliders
45. **sonner** - Toast notifications
46. **spinner** - Loading spinners
47. **switch** - Toggle switches
48. **table** - Data tables
49. **tabs** - Tab navigation
50. **textarea** - Multi-line text input
51. **toggle-group** - Toggle button groups
52. **toggle** - Toggle buttons
53. **tooltip** - Tooltips

---

## Common Patterns

### Form Pattern
```typescript
import { Form, Field } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

function MyForm() {
  const form = useForm();
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Field
          control={form.control}
          name="email"
          render={({ field }) => (
            <Input {...field} type="email" />
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Dialog with Form
```typescript
<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Form Title</DialogTitle>
    </DialogHeader>
    <form>
      <Input />
      <Textarea />
    </form>
    <DialogFooter>
      <Button>Submit</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Card with Actions
```typescript
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardAction>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </CardAction>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

---

## Styling Guidelines

### Customization
All components accept `className` prop for custom styling:
```typescript
<Button className="bg-blue-500 hover:bg-blue-600">
  Custom Button
</Button>
```

### Using cn() Utility
Merge classes properly:
```typescript
import { cn } from "@/lib/utils";

<div className={cn("base-classes", condition && "conditional-classes", className)}>
  Content
</div>
```

### Dark Mode
Components automatically support dark mode via CSS variables:
```typescript
// No changes needed, dark mode is automatic
<Button>Works in dark mode</Button>
```

---

## Installation

All components are pre-installed. To add more Shadcn components:

```bash
npx shadcn@latest add <component-name>
```

Example:
```bash
npx shadcn@latest add dropdown-menu
npx shadcn@latest add tooltip
```

---

## Resources

- **Shadcn UI Docs**: https://ui.shadcn.com
- **Radix UI Docs**: https://www.radix-ui.com
- **Tailwind CSS**: https://tailwindcss.com
- **Lucide Icons**: https://lucide.dev

---

**Last Updated:** December 2025
