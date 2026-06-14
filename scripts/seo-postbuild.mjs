import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const distDir = path.join(root, "dist");
const indexPath = path.join(distDir, "index.html");
const siteUrl = "https://muhammadhaneef.vercel.app";
const defaultImage = `${siteUrl}/project-amanah.jpg`;
const defaultKeywords =
  "Flutter developer, mobile app developer, Flutter app development, Firebase apps, Android iOS apps, Stripe integration";

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absoluteImage(image = defaultImage) {
  return image.startsWith("http") ? image : `${siteUrl}${image}`;
}

function field(objectSource, key) {
  const match = objectSource.match(new RegExp(`${key}:\\s*["'\`]([\\s\\S]*?)["'\`]\\s*,`));
  return match?.[1]?.replace(/\\n\\s*/g, " ").trim() || "";
}

function extractObjects(source) {
  const objects = [];
  let index = 0;

  while (index < source.length) {
    const start = source.indexOf("{", index);
    if (start === -1) break;

    let depth = 0;
    let inString = "";
    let escaped = false;

    for (let i = start; i < source.length; i++) {
      const char = source[i];

      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === "\\") {
          escaped = true;
        } else if (char === inString) {
          inString = "";
        }
        continue;
      }

      if (char === '"' || char === "'" || char === "`") {
        inString = char;
      } else if (char === "{") {
        depth += 1;
      } else if (char === "}") {
        depth -= 1;
        if (depth === 0) {
          const objectSource = source.slice(start, i + 1);
          if (objectSource.includes("slug:") && objectSource.includes("title:")) {
            objects.push(objectSource);
          }
          index = i + 1;
          break;
        }
      }
    }

    index += 1;
  }

  return objects;
}

function pageHtml({ title, description, canonical, image = defaultImage, schema }) {
  const html = baseHtml;
  const meta = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(defaultKeywords)}" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(absoluteImage(image))}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta name="twitter:card" content="summary_large_image" />
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>` : ""}`;

  return html
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta name="description"[\s\S]*?>/, "")
    .replace(/<meta name="keywords"[\s\S]*?>/g, "")
    .replace(/<link rel="canonical"[\s\S]*?>/g, "")
    .replace(/<meta property="og:[\s\S]*?>/g, "")
    .replace(/<meta name="twitter:card"[\s\S]*?>/g, "")
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "")
    .replace("</head>", `${meta}\n  </head>`);
}

function writeRoute(routePath, meta) {
  const outDir = path.join(distDir, routePath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), pageHtml(meta));
}

const projectSource = read("src/data/projects.ts");
const blogSource = read("src/data/blogs.ts");
const baseHtml = fs.readFileSync(indexPath, "utf8");

const projects = extractObjects(projectSource)
  .map((objectSource) => ({
    slug: field(objectSource, "slug"),
    title: field(objectSource, "seoTitle") || `${field(objectSource, "title")} Flutter Case Study | Muhammad Haneef`,
    description: field(objectSource, "seoDescription") || field(objectSource, "description"),
    image: field(objectSource, "image") || "/project-amanah.jpg",
  }))
  .filter((item) => item.slug);

const blogs = extractObjects(blogSource)
  .map((objectSource) => ({
    slug: field(objectSource, "slug"),
    title: field(objectSource, "seoTitle") || `${field(objectSource, "title")} | Muhammad Haneef`,
    description: field(objectSource, "seoDescription") || field(objectSource, "excerpt"),
    image: field(objectSource, "image") || "/project-amanah.jpg",
    date: field(objectSource, "date") || new Date().toISOString().slice(0, 10),
  }))
  .filter((item) => item.slug);

const homeMeta = {
  title: "Muhammad Haneef | Flutter Developer for Production-Ready Mobile Apps",
  description:
    "Hire Muhammad Haneef, a Flutter Developer with 3.5+ years of experience building production-ready Android and iOS apps with Firebase, REST APIs, Stripe, real-time features, and store deployment.",
  canonical: siteUrl,
  image: defaultImage,
  schema: {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Muhammad Haneef",
    jobTitle: "Flutter Developer",
    url: siteUrl,
  },
};

fs.writeFileSync(indexPath, pageHtml(homeMeta));

writeRoute("blog", {
  title: "Flutter Blog | Muhammad Haneef",
  description:
    "Flutter app development articles, case stories, Firebase guides, performance notes, and client-focused mobile app advice by Muhammad Haneef.",
  canonical: `${siteUrl}/blog`,
  image: defaultImage,
});

for (const blog of blogs) {
  writeRoute(`blog/${blog.slug}`, {
    title: blog.title,
    description: blog.description,
    canonical: `${siteUrl}/blog/${blog.slug}`,
    image: blog.image,
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.description,
      datePublished: blog.date,
      author: { "@type": "Person", name: "Muhammad Haneef" },
    },
  });
}

for (const project of projects) {
  writeRoute(`projects/${project.slug}`, {
    title: project.title,
    description: project.description,
    canonical: `${siteUrl}/projects/${project.slug}`,
    image: project.image,
    schema: {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      creator: { "@type": "Person", name: "Muhammad Haneef" },
    },
  });
}

const urls = [
  { loc: siteUrl, priority: "1.0" },
  { loc: `${siteUrl}/blog`, priority: "0.8" },
  ...blogs.map((blog) => ({ loc: `${siteUrl}/blog/${blog.slug}`, priority: "0.7" })),
  ...projects.map((project) => ({ loc: `${siteUrl}/projects/${project.slug}`, priority: "0.8" })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ loc, priority }) => `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(distDir, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
);

console.log(`SEO postbuild complete: ${urls.length} URLs`);
