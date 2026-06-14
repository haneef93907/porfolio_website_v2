import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import gsap from 'gsap';
import { getPublishedBlogs } from '../data/blogs';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from '../components/SEO';
import { safeArray } from '../lib/utils';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { CheckCircle2, FileText, Search, Sparkles, Target } from 'lucide-react';

const seoKeywords = [
  'Flutter developer',
  'Flutter app development',
  'hire Flutter developer',
  'mobile app developer',
  'startup MVP',
  'Firebase app',
  'cross-platform app',
  'app performance',
];

function clampScore(value: number) {
  return Math.max(0, Math.min(100, value));
}

export default function Blog() {
  const location = useLocation();
  const standalone = location.pathname === '/blog';
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const blogs = getPublishedBlogs();
  const [draftTitle, setDraftTitle] = useState('How I build scalable Flutter apps for startups');
  const [draftStory, setDraftStory] = useState(
    'I help founders and businesses turn mobile app ideas into polished Flutter products with clean architecture, Firebase integration, offline support, and performance-focused releases.'
  );

  const categories = ['All', 'Client Growth', 'SEO', 'Performance', 'Architecture', 'UI/UX', 'Backend', 'Deployment'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  const titleLength = draftTitle.trim().length;
  const storyWords = draftStory.trim().split(/\s+/).filter(Boolean).length;
  const matchedKeywords = seoKeywords.filter((keyword) =>
    `${draftTitle} ${draftStory}`.toLowerCase().includes(keyword.toLowerCase())
  );
  const seoScore = clampScore(
    (titleLength >= 45 && titleLength <= 65 ? 25 : titleLength > 20 ? 12 : 0) +
      (storyWords >= 120 ? 25 : storyWords >= 45 ? 15 : 5) +
      Math.min(matchedKeywords.length * 10, 30) +
      (/client|startup|business|founder|hire|project/i.test(draftStory) ? 20 : 0)
  );

  const metaDescription = `${draftStory.replace(/\s+/g, ' ').trim().slice(0, 152)}${
    draftStory.length > 152 ? '...' : ''
  }`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.blog-header', {
        duration: 0.8,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
      });

      gsap.from('.blog-category-btn', {
        duration: 0.6,
        x: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2,
      });

      gsap.from('.seo-helper', {
        duration: 0.8,
        y: 36,
        opacity: 0,
        ease: 'power2.out',
        delay: 0.25,
      });

      gsap.from(cardsRef.current.filter(Boolean), {
        duration: 0.75,
        y: 44,
        opacity: 0,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.35,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredBlogs]);

  const content = (
    <section
      id="blog"
      ref={sectionRef}
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="blog-header text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/30 bg-primary/10 text-primary">
            Flutter content that attracts clients
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Flutter Blog & SEO Story Builder</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Publish practical Flutter articles, case stories, and client-focused guides that explain your expertise and help search engines understand your services.
          </p>
        </div>

        <div className="blog-category-filter flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              className="blog-category-btn"
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="seo-helper seo-gradient border border-border rounded-lg p-5 sm:p-6 lg:p-8 mb-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-6 lg:gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="text-2xl font-bold">Write a blog or success story</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">SEO title</label>
                  <input
                    value={draftTitle}
                    onChange={(event) => setDraftTitle(event.target.value)}
                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                    placeholder="Example: Flutter App Development for Startup MVPs"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{titleLength} characters. Best range: 45-65.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Story or blog draft</label>
                  <textarea
                    value={draftStory}
                    onChange={(event) => setDraftStory(event.target.value)}
                    rows={6}
                    className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Write about the client problem, your Flutter solution, measurable result, and how readers can contact you."
                  />
                </div>
              </div>
            </div>

            <div className="grid content-start gap-4">
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center justify-between gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-accent" />
                    <h4 className="font-semibold">SEO score</h4>
                  </div>
                  <span className="text-3xl font-bold text-primary">{seoScore}</span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${seoScore}%` }}
                  />
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="h-5 w-5 text-primary" />
                  <h4 className="font-semibold">Meta description</h4>
                </div>
                <p className="text-sm text-muted-foreground">{metaDescription || 'Start writing to generate a meta description.'}</p>
              </div>

              <div className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold">Client keywords found</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(matchedKeywords.length ? matchedKeywords : ['Add Flutter + client keywords']).map((keyword) => (
                    <Badge key={keyword} variant="secondary">{keyword}</Badge>
                  ))}
                </div>
              </div>

              <ul className="grid gap-2 text-sm text-muted-foreground">
                {['Mention a client problem', 'Explain your Flutter solution', 'Add business result or metric', 'End with a contact call-to-action'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog, index) => (
            <div
              key={blog.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
            >
              <Card className="h-full cursor-pointer group bg-card border-border motion-card">
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                      {blog.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                  </div>

                  <CardTitle className="line-clamp-2 group-hover:text-accent transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {new Date(blog.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {safeArray(blog.tags).slice(0, 3).map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="text-xs bg-muted/50 border-border"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {safeArray(blog.tags).length > 3 && (
                      <Badge variant="outline" className="text-xs bg-muted/50 border-border">
                        +{safeArray(blog.tags).length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="default"
                    size="sm"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-all"
                  >
                    <Link to={`/blog/${blog.slug}`}>Read More</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found for this category.</p>
          </div>
        )}

        <div className="mt-20 seo-gradient border border-border rounded-lg p-8 text-center animate-soft-reveal">
          <h3 className="text-2xl font-bold mb-2">Turn Flutter knowledge into leads</h3>
          <p className="text-muted-foreground mb-6">
            Share useful posts about Flutter performance, MVP planning, Firebase, SEO, and app growth so clients can find and trust your work.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-background border border-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="default">Subscribe</Button>
          </div>
        </div>
      </div>
    </section>
  );

  if (!standalone) return content;

  return (
    <>
      <SEO
        title="Flutter Blog | Muhammad Haneef"
        description="Flutter app development articles, case stories, Firebase guides, performance notes, and client-focused mobile app advice by Muhammad Haneef."
        canonical="https://mhaneef.vercel.app/#/blog"
      />
      <Navigation />
      <div className="pt-16">{content}</div>
      <Footer />
    </>
  );
}
