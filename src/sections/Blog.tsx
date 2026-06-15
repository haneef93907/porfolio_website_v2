import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { defaultBlogs, getPublishedBlogs, type BlogPost } from '../data/blogs';
import { loadContent } from '../lib/contentApi';
import Navigation from './Navigation';
import Footer from './Footer';
import SEO from '../components/SEO';
import { safeArray } from '../lib/utils';
import { SITE_URL } from '../config/site';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

export default function Blog() {
  const location = useLocation();
  const standalone = location.pathname === '/blog';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getPublishedBlogs());

  useEffect(() => {
    let active = true;
    void loadContent<BlogPost[]>('blogs', defaultBlogs).then((result) => {
      if (!active) return;
      setBlogs(
        result.data
          .filter((blog) => blog.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = ['All', 'Client Growth', 'SEO', 'Performance', 'Architecture', 'UI/UX', 'Backend', 'Deployment'];

  const filteredBlogs = selectedCategory === 'All'
    ? blogs
    : blogs.filter(blog => blog.category === selectedCategory);

  const content = (
    <section
      id="blog"
      className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="blog-header text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Flutter Blog</h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Read practical Flutter articles, case stories, Firebase guides,
            performance notes, and mobile app advice for production-ready apps.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
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

        <div className="mt-20 seo-gradient border border-border rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-2">Need a production-ready Flutter app?</h3>
          <p className="text-muted-foreground mb-6">
            Explore the articles, then reach out when you are ready to build,
            fix, optimize, or launch your mobile app.
          </p>
          <Button variant="default" asChild>
            <Link to="/#contact">Contact Me</Link>
          </Button>
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
        canonical={`${SITE_URL}/blog`}
      />
      <Navigation />
      <div className="pt-16">{content}</div>
      <Footer />
    </>
  );
}
