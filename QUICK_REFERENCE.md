# Quick Reference - Theme & Blog Implementation

## 🎨 Using the Theme System

### Import and Use Theme in Components:
```tsx
import { useTheme } from '@/context/ThemeContext';

export function MyComponent() {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## 🎬 Animation Classes - Quick Copy

### Fade & Entrance Effects:
```html
<!-- Fade in -->
<div className="animate-fade-in">Content</div>

<!-- Slide up from bottom -->
<div className="animate-slide-up">Content</div>

<!-- Slide down from top -->
<div className="animate-slide-down">Content</div>

<!-- Slide in from left -->
<div className="animate-slide-left">Content</div>

<!-- Slide in from right -->
<div className="animate-slide-right">Content</div>

<!-- Scale up -->
<div className="animate-scale-in">Content</div>
```

### Continuous Effects:
```html
<!-- Floating animation -->
<div className="animate-float">Content</div>

<!-- Glowing text -->
<h1 className="animate-glow">Glowing Title</h1>

<!-- Shimmer effect -->
<div className="animate-shimmer">Content</div>
```

### Hover Effects:
```html
<!-- Lift up on hover -->
<button className="hover-lift">Click me</button>

<!-- Glow on hover -->
<div className="hover-glow">Hover me</div>

<!-- Smooth transitions -->
<div className="transition-smooth">Smooth</div>
```

## 📝 Blog Component Usage

### Add a Blog Section to Any Page:
```tsx
import Blog from '@/sections/Blog';

export function MyPage() {
  return (
    <>
      <Blog />
    </>
  );
}
```

### Create a New Blog Article:
```ts
// In src/data/blogs.ts, add to flutterBlogs array:

{
  id: 'flutter-example',
  title: 'My Flutter Article Title',
  excerpt: 'Short summary of article',
  content: `
# Article Title

## Introduction
Your article content in markdown format...

## Section 2
More content...
  `,
  category: 'Performance', // Pick one: Performance, Architecture, UI/UX, Backend, Deployment
  date: '2024-01-20',
  readTime: '8 min read',
  image: '/flutter-example.jpg',
  tags: ['Flutter', 'Android', 'iOS']
}
```

## 🎯 CSS Variables - Light Theme Colors

```css
/* Light Theme - Edit in src/index.css */
[data-theme="light"] {
  --background: 0 0% 100%;         /* White */
  --foreground: 0 0% 4%;           /* Dark text */
  --card: 0 0% 98%;                /* Light gray */
  --primary: 33 100% 50%;          /* Orange */
  --secondary: 218 38% 85%;        /* Light blue */
  --muted: 215 16% 75%;            /* Gray */
  --accent: 195 100% 50%;          /* Cyan */
  --input: 215 16% 90%;            /* Input background */
}
```

## 📂 Key File Locations

| Purpose | File |
|---------|------|
| Theme logic | `src/context/ThemeContext.tsx` |
| Toggle button | `src/components/ThemeToggle.tsx` |
| Blog articles | `src/data/blogs.ts` |
| Blog component | `src/sections/Blog.tsx` |
| Animations | `src/index.css` |
| Blog guide | `THEME_AND_BLOG_GUIDE.md` |
| Changes log | `CHANGELOG.md` |

## 🔗 Routes

```
/              → Home page (includes blog section)
/blog          → Blog page (full blog view)
/admin         → Admin page
```

## 🚀 Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 💡 GSAP Animation Example

```tsx
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.my-element', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref}>
      <div className="my-element">Animated content</div>
    </div>
  );
}
```

## 🎨 Tailwind Color Classes

All Tailwind utilities work with theme colors:

```html
<!-- Primary color -->
<div className="text-primary bg-primary/10">Primary</div>

<!-- Secondary color -->
<div className="text-secondary border-secondary">Secondary</div>

<!-- Accent color -->
<div className="bg-accent text-accent-foreground">Accent</div>

<!-- Muted colors -->
<div className="text-muted-foreground">Muted</div>

<!-- Background/Foreground -->
<div className="bg-background text-foreground">Content</div>
```

## 🔧 Theme Toggle Button

The theme toggle button is automatically placed in the top-right corner via `ThemeToggle` component in `App.tsx`. It shows:
- ☀️ Sun icon in light mode
- 🌙 Moon icon in dark mode

## 📱 Responsive Classes

```html
<!-- Mobile first (default) -->
<div className="text-sm">Mobile size</div>

<!-- Tablet and up (md) -->
<div className="md:text-base">Tablet size</div>

<!-- Desktop and up (lg) -->
<div className="lg:text-lg">Desktop size</div>

<!-- Extra large (xl) -->
<div className="xl:text-xl">XL size</div>
```

## ⚡ Performance Tips

1. **Use const constructors** to prevent unnecessary re-renders
2. **Lazy load blog images** using native lazy loading
3. **Use animations sparingly** - not every element needs animation
4. **Profile animations** with DevTools if performance is an issue
5. **Minimize JavaScript** in production builds

## 🎓 SEO Tips for Blog

1. Add `<meta>` tags for article meta description
2. Use semantic HTML (`<article>`, `<section>`, etc.)
3. Include keyword in article title and first 100 words
4. Write comprehensive content (8-10 min reads)
5. Link to related articles internally
6. Use descriptive image alt text
7. Publish regularly for freshness signals
8. Promote content on social media

---

**Save this file for quick reference while developing!**
