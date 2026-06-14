import { Link, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { getBlogBySlug } from "../data/blogs";
import Navigation from "../sections/Navigation";
import Footer from "../sections/Footer";
import SEO from "../components/SEO";

function renderMarkdown(content: string) {
  return content
    .trim()
    .split("\n")
    .map((line, index) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith("# ")) {
        return (
          <h2 key={index} className="mt-10 font-grotesk text-3xl font-bold text-foreground">
            {trimmed.replace("# ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h3 key={index} className="mt-8 font-grotesk text-2xl font-semibold text-foreground">
            {trimmed.replace("## ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("### ")) {
        return (
          <h4 key={index} className="mt-6 font-grotesk text-xl font-semibold text-foreground">
            {trimmed.replace("### ", "")}
          </h4>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={index} className="ml-5 list-disc text-muted-foreground">
            {trimmed.replace("- ", "")}
          </li>
        );
      }
      if (trimmed.startsWith("```")) return null;
      return (
        <p key={index} className="mt-4 leading-8 text-muted-foreground">
          {trimmed.replace(/\*\*/g, "")}
        </p>
      );
    });
}

export default function BlogDetail() {
  const { slug = "" } = useParams();
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-background px-6 py-32 text-center">
          <h1 className="font-grotesk text-4xl font-bold">Article not found</h1>
          <Link to="/blog" className="mt-6 inline-flex text-primary">
            Back to blog
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <SEO
        title={blog.seoTitle}
        description={blog.seoDescription}
        image={blog.image}
        canonical={`https://mhaneef.vercel.app/#/blog/${blog.slug}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: blog.title,
          description: blog.excerpt,
          datePublished: blog.date,
          author: { "@type": "Person", name: "Muhammad Haneef" },
        }}
      />
      <Navigation />
      <main className="bg-background px-6 pb-20 pt-28 sm:pt-32">
        <article className="mx-auto max-w-3xl">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
          >
            <ArrowLeft size={16} />
            Back to blog
          </Link>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {blog.category} - {blog.readTime}
          </p>
          <h1 className="mt-4 font-grotesk text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {blog.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {blog.excerpt}
          </p>
          <img
            src={blog.image}
            alt={blog.title}
            className="mt-10 aspect-video w-full rounded border border-border object-cover"
            loading="eager"
          />
          <div className="mt-10">{renderMarkdown(blog.content)}</div>
          <div className="mt-10 flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <span key={tag} className="rounded bg-secondary px-3 py-1 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
