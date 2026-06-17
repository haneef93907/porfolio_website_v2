import { safeGetStorage, safeSetStorage } from "../lib/safeStorage";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  images?: string[];
  tags: string[];
  seoTitle: string;
  seoDescription: string;
  published: boolean;
}

export const defaultBlogs: BlogPost[] = [
  {
    id: 'hire-flutter-developer-startup',
    slug: 'hire-flutter-developer-startup',
    title: 'How Hiring a Flutter Developer Helps Startups Launch Faster',
    excerpt: 'A client-focused guide explaining how Flutter reduces build time, protects budget, and helps founders ship polished iOS, Android, and web products from one codebase.',
    content: `
# How Hiring a Flutter Developer Helps Startups Launch Faster

Flutter is a strong choice when a startup needs a fast launch without maintaining separate native teams. With one well-structured codebase, a product can reach iOS, Android, and web while keeping design, performance, and iteration speed consistent.

## Why Clients Choose Flutter

- Faster MVP delivery
- Lower long-term maintenance cost
- Native-feeling mobile performance
- Easier feature iteration after launch
- Strong Firebase and API integration support

## What a Good Flutter Developer Adds

A good Flutter developer does more than build screens. They plan app architecture, offline states, analytics, release workflows, payment flows, push notifications, and performance from the beginning.

## Best Projects for Flutter

Flutter works well for marketplaces, booking apps, delivery platforms, fintech dashboards, learning apps, AI tools, and internal business apps.

If you need a scalable Flutter app, start with a clear MVP scope, then build toward measurable client outcomes.
    `,
    category: 'Client Growth',
    date: '2026-06-14',
    readTime: '6 min read',
    image: '/flutter-client-growth.jpg',
    tags: ['Hire Flutter Developer', 'Flutter App Development', 'Startup MVP', 'Mobile App Developer', 'Cross Platform App'],
    seoTitle: 'Hire a Flutter Developer to Launch Startup Apps Faster',
    seoDescription: 'Learn how a Flutter developer helps startups ship polished Android and iOS apps faster with clean architecture and scalable delivery.',
    published: true
  },
  {
    id: 'flutter-seo-web-apps',
    slug: 'flutter-seo-web-apps',
    title: 'Flutter Web SEO: What Clients Should Know Before Building',
    excerpt: 'Practical SEO advice for Flutter web projects, including when to use Flutter web, how to structure landing pages, and how to win search traffic.',
    content: `
# Flutter Web SEO: What Clients Should Know Before Building

Flutter web is excellent for interactive products, dashboards, portals, and app-like experiences. For SEO-heavy marketing pages, a hybrid strategy often works best: use indexable landing pages for content and Flutter for the logged-in app experience.

## SEO Foundations

- Write one page per service or industry
- Use a clear H1 and meta description
- Add case studies with measurable outcomes
- Link blog posts to contact and project pages
- Use schema, Open Graph tags, and fast hosting

## Client-Focused Blog Topics

Write about problems clients search for: app development cost, Flutter vs native, Firebase app development, MVP timelines, app maintenance, performance fixes, and migration from old apps.
    `,
    category: 'SEO',
    date: '2026-06-10',
    readTime: '5 min read',
    image: '/flutter-seo.jpg',
    tags: ['Flutter SEO', 'Flutter Web', 'SEO for Developers', 'Client Acquisition', 'Technical SEO'],
    seoTitle: 'Flutter Web SEO Guide for Clients and Founders',
    seoDescription: 'Practical Flutter web SEO advice for clients, founders, and teams planning indexable app experiences.',
    published: true
  },
  {
    id: 'flutter-performance',
    slug: 'flutter-performance-optimization-guide',
    title: 'Optimizing Flutter App Performance: A Complete Guide',
    excerpt: 'Learn how to build lightning-fast Flutter apps with best practices for performance optimization, memory management, and smooth animations.',
    content: `
# Optimizing Flutter App Performance

Building a high-performance Flutter application requires understanding the framework's rendering pipeline and following best practices. In this comprehensive guide, we'll explore techniques to optimize your Flutter apps for speed and efficiency.

## 1. Widget Performance Optimization

### Use const Constructors
Always use const constructors for widgets that don't change. This prevents unnecessary rebuilds and reduces memory overhead.

### Implement shouldRebuild
Use StatefulWidget efficiently by implementing const where possible and using shouldRebuild to prevent unnecessary rebuilds.

## 2. ListView and Scrolling Performance

Use ListView.builder instead of ListView for long lists. This creates widgets on-demand, reducing memory consumption.

\`\`\`dart
ListView.builder(
  itemCount: 1000,
  itemBuilder: (context, index) {
    return ListTile(title: Text('Item $index'));
  },
)
\`\`\`

## 3. Image Optimization

- Use appropriate image sizes for different screen sizes
- Implement image caching strategies
- Use Network image with cache manager
- Compress images before uploading

## 4. Build Performance

- Use build modes appropriately (debug, profile, release)
- Profile your app using DevTools
- Monitor frame rates and GPU/CPU usage
- Identify jank and eliminate it

## 5. Memory Management

- Avoid memory leaks by properly disposing resources
- Cancel streams and animations
- Use weak references where appropriate
- Monitor memory usage in DevTools

## Best Practices Summary

1. Use const constructors
2. Implement ListView.builder for lists
3. Optimize images
4. Profile regularly
5. Monitor memory usage
6. Use release mode for testing
7. Avoid rebuilding entire trees

Following these practices will significantly improve your Flutter app's performance and user experience.
    `,
    category: 'Performance',
    date: '2024-01-15',
    readTime: '8 min read',
    image: '/flutter-performance.jpg',
    tags: ['Flutter', 'Performance', 'Optimization', 'Best Practices'],
    seoTitle: 'Flutter App Performance Optimization Guide',
    seoDescription: 'A practical guide to optimizing Flutter apps for speed, smooth animation, memory, and production stability.',
    published: true
  },
  {
    id: 'flutter-state-management',
    slug: 'flutter-state-management-provider-riverpod-bloc',
    title: 'State Management in Flutter: Provider vs Riverpod vs Bloc',
    excerpt: 'Compare popular state management solutions in Flutter and learn when to use each one for optimal app architecture.',
    content: `
# State Management in Flutter: A Comprehensive Comparison

Choosing the right state management solution is crucial for building scalable Flutter applications. Let's explore the most popular options and their use cases.

## Provider Pattern

Provider is one of the most popular and recommended state management solutions.

**Advantages:**
- Easy to learn and understand
- Great documentation
- Efficient and performant
- Flexible for various use cases

**When to use:**
- Small to medium-sized projects
- When you need simplicity and flexibility
- For learning state management

## Riverpod

Riverpod is a better version of Provider with improved type safety and testability.

**Advantages:**
- Better type safety
- Improved testability
- More control over state lifecycle
- Excellent for dependency injection

**When to use:**
- Large-scale applications
- When you need strict type safety
- Projects requiring complex state management

## Bloc Pattern

BLoC (Business Logic Component) separates business logic from UI.

**Advantages:**
- Clear separation of concerns
- Highly testable
- Great for team projects
- Scalable architecture

**When to use:**
- Enterprise applications
- Team projects with multiple developers
- Complex business logic requirements

## Comparison Table

| Feature | Provider | Riverpod | Bloc |
|---------|----------|----------|------|
| Learning Curve | Low | Medium | High |
| Type Safety | Medium | High | High |
| Testability | Good | Excellent | Excellent |
| Boilerplate | Low | Low | High |
| Performance | Excellent | Excellent | Excellent |

## Recommendations

- **Start with Provider** if you're new to Flutter
- **Use Riverpod** for larger projects requiring type safety
- **Choose Bloc** for enterprise applications with complex requirements

The best choice depends on your project size, team experience, and specific requirements.
    `,
    category: 'Architecture',
    date: '2024-01-10',
    readTime: '10 min read',
    image: '/flutter-state.jpg',
    tags: ['Flutter', 'State Management', 'Architecture', 'Provider', 'Riverpod', 'Bloc'],
    seoTitle: 'Flutter State Management: Provider vs Riverpod vs Bloc',
    seoDescription: 'Compare Provider, Riverpod, and Bloc for scalable Flutter architecture and production app development.',
    published: true
  },
  {
    id: 'flutter-animations',
    slug: 'creating-beautiful-flutter-animations',
    title: 'Creating Beautiful Animations in Flutter',
    excerpt: 'Master Flutter animations with practical examples, from basic transitions to complex custom animations.',
    content: `
# Creating Beautiful Animations in Flutter

Animations are essential for creating a polished user experience. Flutter provides powerful tools for creating smooth and delightful animations.

## Basic Animations

### AnimatedContainer
Animate changes to container properties over time.

\`\`\`dart
AnimatedContainer(
  duration: Duration(seconds: 1),
  width: _isExpanded ? 200 : 100,
  height: _isExpanded ? 200 : 100,
  color: _isExpanded ? Colors.blue : Colors.green,
  curve: Curves.easeInOut,
)
\`\`\`

## Explicit Animations

Use AnimationController for more control.

\`\`\`dart
late AnimationController controller;

@override
void initState() {
  super.initState();
  controller = AnimationController(
    duration: Duration(seconds: 2),
    vsync: this,
  );
  controller.forward();
}
\`\`\`

## Staggered Animations

Create sequences of animations for complex effects.

## Custom Paint Animations

Use CustomPaint for advanced graphics and animations.

## Animation Best Practices

1. Keep animations brief (< 300ms for UI feedback)
2. Use appropriate curves (easeInOut, elastic, etc.)
3. Avoid over-animating
4. Test on real devices
5. Monitor performance
6. Use ValueListenableBuilder for efficiency

## Popular Animation Packages

- **Lottie**: Complex animations from design files
- **Rive**: Interactive animations
- **GetX**: Simplified animation syntax
- **Animation Package**: Official Flutter animations

Mastering animations will significantly improve your app's visual appeal and user engagement.
    `,
    category: 'UI/UX',
    date: '2024-01-05',
    readTime: '7 min read',
    image: '/flutter-animations.jpg',
    tags: ['Flutter', 'Animations', 'UI', 'UX', 'Design'],
    seoTitle: 'Creating Beautiful Animations in Flutter',
    seoDescription: 'Learn how Flutter animations improve product polish, user experience, and mobile app quality.',
    published: true
  },
  {
    id: 'flutter-firebase',
    slug: 'flutter-firebase-integration-guide',
    title: 'Firebase Integration with Flutter: Real-time Database',
    excerpt: 'Learn how to integrate Firebase with Flutter for real-time data synchronization and backend services.',
    content: `
# Firebase Integration with Flutter

Firebase provides a complete backend solution for Flutter apps. Learn how to integrate and use Firebase services effectively.

## Setup Firebase in Flutter

\`\`\`bash
flutter pub add firebase_core
flutter pub add firebase_database
\`\`\`

Initialize Firebase:

\`\`\`dart
void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}
\`\`\`

## Real-time Database Operations

### Read Data

\`\`\`dart
final ref = FirebaseDatabase.instance.ref('users');
ref.onValue.listen((event) {
  final data = event.snapshot.value;
  print(data);
});
\`\`\`

### Write Data

\`\`\`dart
await FirebaseDatabase.instance.ref('users/user1').set({
  'name': 'John Doe',
  'email': 'john@example.com',
});
\`\`\`

## Firestore vs Realtime Database

**Realtime Database:**
- Great for simple data structures
- Fast for real-time sync
- Good for mobile-first apps

**Firestore:**
- Better for complex queries
- More scalable
- Better for structured data

## Authentication with Firebase

\`\`\`dart
final auth = FirebaseAuth.instance;

// Sign up
await auth.createUserWithEmailAndPassword(
  email: email,
  password: password,
);

// Sign in
await auth.signInWithEmailAndPassword(
  email: email,
  password: password,
);
\`\`\`

## Best Practices

1. Use rules for security
2. Index your data
3. Monitor usage and costs
4. Use offline persistence
5. Implement proper error handling
6. Cache data locally when possible

Firebase integration makes it easy to build feature-rich Flutter apps with minimal backend setup.
    `,
    category: 'Backend',
    date: '2023-12-28',
    readTime: '9 min read',
    image: '/flutter-firebase.jpg',
    tags: ['Flutter', 'Firebase', 'Backend', 'Database', 'Authentication'],
    seoTitle: 'Firebase Integration in Flutter Apps',
    seoDescription: 'Guide to using Firebase Auth, Firestore, Storage, and backend features in production Flutter apps.',
    published: true
  },
  {
    id: 'flutter-web-deployment',
    slug: 'flutter-web-deployment-guide',
    title: 'Deploying Flutter Apps to Web: Complete Guide',
    excerpt: 'Deploy your Flutter web apps with optimized performance and proper SEO configuration.',
    content: `
# Deploying Flutter Apps to Web

Flutter's web support allows you to build cross-platform apps. Here's how to deploy them effectively.

## Enable Web Support

\`\`\`bash
flutter config --enable-web
flutter create . --platforms=web
\`\`\`

## Build for Web

\`\`\`bash
flutter build web
\`\`\`

## Optimization for Web

### Code Size Optimization
- Use flutter build web --release
- Enable tree-shaking
- Lazy load modules
- Minify assets

### Performance

1. **Lazy Loading:** Load features on demand
2. **Asset Compression:** Optimize images and fonts
3. **Caching:** Implement browser caching
4. **CDN:** Use CDN for faster delivery

## SEO Optimization

\`\`\`html
<meta name="description" content="Your app description">
<meta name="keywords" content="flutter, web, app">
<meta property="og:title" content="App Title">
<meta property="og:description" content="App description">
\`\`\`

## Deployment Options

- **Firebase Hosting:** Easy integration with Flutter
- **Netlify:** Good for static sites
- **Vercel:** Great performance
- **AWS S3:** Cost-effective
- **Custom Server:** Full control

## Platform-specific Optimizations

1. Desktop-responsive design
2. Keyboard shortcuts
3. Web-specific features
4. Progressive Web App (PWA)

## Monitoring and Analytics

- Implement analytics
- Monitor performance
- Track user behavior
- Setup error tracking

Flutter web apps can provide excellent performance and reach users across all platforms.
    `,
    category: 'Deployment',
    date: '2023-12-20',
    readTime: '8 min read',
    image: '/flutter-web.jpg',
    tags: ['Flutter', 'Web', 'Deployment', 'SEO', 'Performance'],
    seoTitle: 'Deploying Flutter Web Apps with SEO and Performance',
    seoDescription: 'Deploy Flutter web apps with optimized performance, metadata, hosting, and production configuration.',
    published: true
  }
];

const STORAGE_KEY = "portfolio-blogs-v2";

export const flutterBlogs = defaultBlogs;

export function getBlogs(): BlogPost[] {
  try {
    const stored = safeGetStorage("local", STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeBlog).filter(Boolean);
      }
    }
  } catch {
    // ignore
  }
  return defaultBlogs;
}

export function getPublishedBlogs(): BlogPost[] {
  return getBlogs()
    .filter((blog) => blog.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return getPublishedBlogs().find((blog) => blog.slug === slug || blog.id === slug);
}

export function saveBlogs(blogs: BlogPost[]): void {
  safeSetStorage("local", STORAGE_KEY, JSON.stringify(blogs));
}

export function addBlog(blog: Omit<BlogPost, "id">): BlogPost[] {
  const blogs = getBlogs();
  const newBlog: BlogPost = {
    ...blog,
    id: `blog-${Date.now()}`,
    slug: blog.slug || slugify(blog.title),
  };
  const updated = [newBlog, ...blogs];
  saveBlogs(updated);
  return updated;
}

export function updateBlog(id: string, updates: Partial<BlogPost>): BlogPost[] {
  const blogs = getBlogs();
  const updated = blogs.map((blog) => (blog.id === id ? normalizeBlog({ ...blog, ...updates }) : blog));
  saveBlogs(updated);
  return updated;
}

export function deleteBlog(id: string): BlogPost[] {
  const blogs = getBlogs();
  const updated = blogs.filter((blog) => blog.id !== id);
  saveBlogs(updated);
  return updated;
}

export function resetBlogs(): BlogPost[] {
  saveBlogs(defaultBlogs);
  return defaultBlogs;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeBlog(blog: BlogPost): BlogPost {
  const title = blog?.title || "Untitled Flutter Article";
  const excerpt = blog?.excerpt || "Flutter app development insights by Muhammad Haneef.";
  const tags = Array.isArray(blog?.tags) ? blog.tags : [];
  const image = blog?.image || "/project-amanah.jpg";
  const images = Array.isArray(blog?.images) && blog.images.length ? blog.images : [image];

  return {
    ...blog,
    id: blog?.id || `blog-${Date.now()}`,
    title,
    excerpt,
    content: blog?.content || `# ${title}\n\n${excerpt}`,
    category: blog?.category || "Flutter",
    date: blog?.date || new Date().toISOString().slice(0, 10),
    readTime: blog?.readTime || "5 min read",
    image,
    images,
    tags,
    slug: blog?.slug || slugify(title),
    seoTitle: blog?.seoTitle || `${title} | Muhammad Haneef`,
    seoDescription: blog?.seoDescription || excerpt,
    published: blog?.published ?? true,
  };
}
