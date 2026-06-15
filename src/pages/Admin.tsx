import { useMemo, useState } from "react";
import { Link } from "react-router";
import {
  addBlog,
  deleteBlog,
  getBlogs,
  resetBlogs,
  updateBlog,
  type BlogPost,
} from "../data/blogs";
import {
  addProject,
  deleteProject,
  getProjects,
  resetProjects,
  slugify,
  updateProject,
  type Project,
} from "../data/projects";
import { safeRemoveStorage } from "../lib/safeStorage";
import {
  exportCsv,
  getAnalyticsEvents,
  getContactLeads,
  summarizeAnalytics,
  updateContactLead,
  type ContactLead,
} from "../lib/analytics";
import {
  clearAdminSession,
  createAdminSession,
  hasProductionAuthConfig,
  isAdminAuthenticated,
  verifyAdminCredentials,
} from "../lib/adminAuth";
import {
  ArrowLeft,
  BarChart3,
  Download,
  Eye,
  ImagePlus,
  Lock,
  LogOut,
  MousePointerClick,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Shield,
  Smartphone,
  Trash2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";

type Tab = "overview" | "analytics" | "leads" | "projects" | "blogs" | "reports" | "security";

interface ProjectForm {
  id?: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  role: string;
  technologies: string;
  category: string;
  date: string;
  features: string;
  image: string;
  screenshots: string;
  result: string;
  impact: string;
  playStore: string;
  appStore: string;
  website: string;
  caseStudy: string;
  seoTitle: string;
  seoDescription: string;
  featured: boolean;
  published: boolean;
}

interface BlogForm {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string;
  seoTitle: string;
  seoDescription: string;
  published: boolean;
}

const emptyProject: ProjectForm = {
  title: "",
  slug: "",
  description: "",
  overview: "",
  problem: "",
  solution: "",
  role: "Flutter Developer",
  technologies: "Flutter, Firebase, REST APIs",
  category: "Mobile App",
  date: "2026",
  features: "",
  image: "/project-amanah.jpg",
  screenshots: "",
  result: "",
  impact: "",
  playStore: "",
  appStore: "",
  website: "",
  caseStudy: "",
  seoTitle: "",
  seoDescription: "",
  featured: false,
  published: true,
};

const emptyBlog: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Flutter",
  date: new Date().toISOString().slice(0, 10),
  readTime: "5 min read",
  image: "/project-amanah.jpg",
  tags: "Flutter, Mobile Apps",
  seoTitle: "",
  seoDescription: "",
  published: true,
};

function splitLines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function splitComma(value: string) {
  return value.split(",").map((item) => item.trim()).filter(Boolean);
}

function imageUpload(setValue: (value: string) => void) {
  return (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setValue(String(reader.result));
    reader.readAsDataURL(file);
  };
}

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(() => isAdminAuthenticated());
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || "admin@portfolio.local");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogs());
  const [leads, setLeads] = useState<ContactLead[]>(() => getContactLeads());
  const [analyticsVersion, setAnalyticsVersion] = useState(0);
  const [projectForm, setProjectForm] = useState<ProjectForm | null>(null);
  const [blogForm, setBlogForm] = useState<BlogForm | null>(null);
  const analytics = useMemo(() => {
    void analyticsVersion;
    return summarizeAnalytics();
  }, [analyticsVersion]);

  const stats = useMemo(
    () => [
      ["Projects", projects.length],
      ["Published Projects", projects.filter((item) => item.published).length],
      ["Blogs", blogs.length],
      ["Published Blogs", blogs.filter((item) => item.published).length],
      ["Visitors", analytics.uniqueVisitors],
      ["Contact Leads", leads.length],
    ],
    [analytics.uniqueVisitors, blogs, leads.length, projects]
  );

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    if (await verifyAdminCredentials(email, password)) {
      createAdminSession();
      setLoggedIn(true);
    } else {
      alert("Incorrect password");
    }
  };

  const saveProjectForm = () => {
    if (!projectForm) return;
    const payload = {
      slug: projectForm.slug || slugify(projectForm.title),
      title: projectForm.title,
      description: projectForm.description,
      overview: projectForm.overview || projectForm.description,
      problem: projectForm.problem,
      solution: projectForm.solution,
      role: projectForm.role,
      technologies: splitComma(projectForm.technologies),
      category: projectForm.category,
      date: projectForm.date,
      features: splitLines(projectForm.features),
      screenshots: splitLines(projectForm.screenshots || projectForm.image),
      result: projectForm.result,
      impact: projectForm.impact || undefined,
      image: projectForm.image,
      links: {
        playStore: projectForm.playStore || undefined,
        appStore: projectForm.appStore || undefined,
        website: projectForm.website || undefined,
        caseStudy: projectForm.caseStudy || undefined,
      },
      link: projectForm.caseStudy || projectForm.website || undefined,
      seoTitle: projectForm.seoTitle || `${projectForm.title} Flutter Case Study | Muhammad Haneef`,
      seoDescription: projectForm.seoDescription || projectForm.description,
      featured: projectForm.featured,
      published: projectForm.published,
    };

    setProjects(projectForm.id ? updateProject(projectForm.id, payload) : addProject(payload));
    setProjectForm(null);
  };

  const saveBlogForm = () => {
    if (!blogForm) return;
    const payload = {
      slug: blogForm.slug || slugify(blogForm.title),
      title: blogForm.title,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      category: blogForm.category,
      date: blogForm.date,
      readTime: blogForm.readTime,
      image: blogForm.image,
      tags: splitComma(blogForm.tags),
      seoTitle: blogForm.seoTitle || `${blogForm.title} | Muhammad Haneef`,
      seoDescription: blogForm.seoDescription || blogForm.excerpt,
      published: blogForm.published,
    };

    setBlogs(blogForm.id ? updateBlog(blogForm.id, payload) : addBlog(payload));
    setBlogForm(null);
  };

  if (!loggedIn) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <form onSubmit={login} className="w-full max-w-sm rounded border border-border bg-card p-6">
          <div className="mb-6 flex items-center gap-3">
            <Lock className="text-primary" />
            <div>
              <h1 className="font-grotesk text-2xl font-bold">Admin Login</h1>
              <p className="text-sm text-muted-foreground">Protected portfolio dashboard</p>
            </div>
          </div>
          {!hasProductionAuthConfig() && (
            <div className="mb-4 rounded border border-primary/30 bg-primary/10 p-3 text-xs text-muted-foreground">
              Development login is active. Set VITE_ADMIN_EMAIL and VITE_ADMIN_PASSWORD_HASH for deployment.
            </div>
          )}
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mb-3 w-full rounded border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
            placeholder="Admin email"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
            placeholder="Enter admin password"
          />
          <button className="mt-4 w-full rounded bg-primary px-4 py-3 font-semibold text-primary-foreground">
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary">
              <ArrowLeft size={20} />
            </Link>
            <Shield className="text-primary" size={20} />
            <h1 className="font-grotesk text-xl font-bold">Portfolio CMS</h1>
          </div>
          <button
            onClick={() => {
              safeRemoveStorage("session", "portfolio-admin");
              clearAdminSession();
              setLoggedIn(false);
            }}
            className="inline-flex items-center gap-2 rounded border border-border px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-3">
          {(["overview", "analytics", "leads", "projects", "blogs", "reports", "security"] as Tab[]).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`rounded px-4 py-2 text-sm font-semibold capitalize ${
                tab === item ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {tab === "overview" && (
          <section>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map(([label, value]) => (
                <StatCard key={label} label={String(label)} value={String(value)} icon={BarChart3} />
              ))}
            </div>
            <div className="mt-8 rounded border border-border bg-card p-6">
              <h2 className="font-grotesk text-2xl font-bold">Admin backend notes</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This SPA now lazy-loads the admin portal, protects access with an
                expiring admin session, tracks anonymous visitor activity, and
                stores content/leads locally. For true production security,
                connect the same shapes to Firebase Auth + Firestore security
                rules or Supabase Auth + RLS; frontend-only credentials cannot
                protect writes from a determined public user.
              </p>
            </div>
          </section>
        )}

        {tab === "analytics" && (
          <AnalyticsPanel analytics={analytics} onRefresh={() => setAnalyticsVersion((value) => value + 1)} />
        )}

        {tab === "leads" && (
          <LeadsPanel
            leads={leads}
            onChange={(id, updates) => setLeads(updateContactLead(id, updates))}
          />
        )}

        {tab === "projects" && (
          <section>
            <AdminToolbar
              title="Projects"
              onAdd={() => setProjectForm(emptyProject)}
              onReset={() => window.confirm("Reset projects?") && setProjects(resetProjects())}
            />
            {projectForm && (
              <ProjectEditor
                form={projectForm}
                setForm={setProjectForm}
                onSave={saveProjectForm}
                onCancel={() => setProjectForm(null)}
              />
            )}
            <div className="grid gap-4">
              {projects.map((project) => (
                <AdminRow
                  key={project.id}
                  image={project.image}
                  title={project.title}
                  subtitle={`${project.category} - ${project.published ? "Published" : "Draft"}${project.featured ? " - Featured" : ""}`}
                  description={project.description}
                  onEdit={() =>
                    setProjectForm({
                      id: project.id,
                      title: project.title,
                      slug: project.slug,
                      description: project.description,
                      overview: project.overview,
                      problem: project.problem,
                      solution: project.solution,
                      role: project.role,
                      technologies: project.technologies.join(", "),
                      category: project.category,
                      date: project.date,
                      features: project.features.join("\n"),
                      image: project.image,
                      screenshots: project.screenshots.join("\n"),
                      result: project.result,
                      impact: project.impact || "",
                      playStore: project.links.playStore || "",
                      appStore: project.links.appStore || "",
                      website: project.links.website || "",
                      caseStudy: project.links.caseStudy || project.link || "",
                      seoTitle: project.seoTitle,
                      seoDescription: project.seoDescription,
                      featured: project.featured,
                      published: project.published,
                    })
                  }
                  onToggle={() => setProjects(updateProject(project.id, { published: !project.published }))}
                  onDelete={() => window.confirm("Delete project?") && setProjects(deleteProject(project.id))}
                  toggleLabel={project.published ? "Unpublish" : "Publish"}
                />
              ))}
            </div>
          </section>
        )}

        {tab === "blogs" && (
          <section>
            <AdminToolbar
              title="Blogs"
              onAdd={() => setBlogForm(emptyBlog)}
              onReset={() => window.confirm("Reset blogs?") && setBlogs(resetBlogs())}
            />
            {blogForm && (
              <BlogEditor
                form={blogForm}
                setForm={setBlogForm}
                onSave={saveBlogForm}
                onCancel={() => setBlogForm(null)}
              />
            )}
            <div className="grid gap-4">
              {blogs.map((blog) => (
                <AdminRow
                  key={blog.id}
                  image={blog.image}
                  title={blog.title}
                  subtitle={`${blog.category} - ${blog.published ? "Published" : "Draft"}`}
                  description={blog.excerpt}
                  onEdit={() =>
                    setBlogForm({
                      id: blog.id,
                      title: blog.title,
                      slug: blog.slug,
                      excerpt: blog.excerpt,
                      content: blog.content,
                      category: blog.category,
                      date: blog.date,
                      readTime: blog.readTime,
                      image: blog.image,
                      tags: blog.tags.join(", "),
                      seoTitle: blog.seoTitle,
                      seoDescription: blog.seoDescription,
                      published: blog.published,
                    })
                  }
                  onToggle={() => setBlogs(updateBlog(blog.id, { published: !blog.published }))}
                  onDelete={() => window.confirm("Delete blog?") && setBlogs(deleteBlog(blog.id))}
                  toggleLabel={blog.published ? "Unpublish" : "Publish"}
                />
              ))}
            </div>
          </section>
        )}

        {tab === "reports" && <ReportsPanel leads={leads} />}

        {tab === "security" && <SecurityPanel />}
      </div>
    </main>
  );
}

function AdminToolbar({ title, onAdd, onReset }: { title: string; onAdd: () => void; onReset: () => void }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="font-grotesk text-2xl font-bold">{title}</h2>
      <div className="flex gap-3">
        <button onClick={onReset} className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm">
          <RotateCcw size={15} />
          Reset
        </button>
        <button onClick={onAdd} className="inline-flex items-center gap-2 rounded bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
          <Plus size={15} />
          Add
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: LucideIcon }) {
  return (
    <div className="rounded border border-border bg-card p-5">
      <Icon className="mb-4 text-primary" />
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function AnalyticsPanel({
  analytics,
  onRefresh,
}: {
  analytics: ReturnType<typeof summarizeAnalytics>;
  onRefresh: () => void;
}) {
  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-grotesk text-2xl font-bold">Analytics Overview</h2>
        <button onClick={onRefresh} className="rounded border border-border px-4 py-2 text-sm">
          Refresh
        </button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total events" value={String(analytics.totalEvents)} icon={BarChart3} />
        <StatCard label="Unique visitors" value={String(analytics.uniqueVisitors)} icon={Users} />
        <StatCard label="Today" value={String(analytics.todayVisitors)} icon={Users} />
        <StatCard label="Avg seconds" value={String(analytics.avgDuration)} icon={MousePointerClick} />
        <StatCard label="7 day visitors" value={String(analytics.weekVisitors)} icon={Users} />
        <StatCard label="30 day visitors" value={String(analytics.monthVisitors)} icon={Users} />
        <StatCard label="Bounces" value={String(analytics.bounceSessions)} icon={MousePointerClick} />
        <StatCard label="Device types" value={String(Object.keys(analytics.devices).length)} icon={Smartphone} />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Breakdown title="Most viewed sections" data={analytics.sectionViews} />
        <Breakdown title="Most clicked actions" data={analytics.clicks} />
        <Breakdown title="Traffic sources" data={analytics.sources} />
        <Breakdown title="Devices" data={analytics.devices} />
        <Breakdown title="Browsers" data={analytics.browsers} />
        <Breakdown title="Campaigns" data={analytics.campaigns} />
      </div>
    </section>
  );
}

function Breakdown({ title, data }: { title: string; data: Record<string, number> }) {
  const rows = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 8);
  return (
    <div className="rounded border border-border bg-card p-5">
      <h3 className="font-grotesk text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-3">
        {rows.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between gap-4 text-sm">
              <span className="truncate text-muted-foreground">{label}</span>
              <span className="rounded bg-secondary px-2 py-1 font-mono text-xs">{value}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function LeadsPanel({
  leads,
  onChange,
}: {
  leads: ContactLead[];
  onChange: (id: string, updates: Partial<ContactLead>) => void;
}) {
  return (
    <section>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-grotesk text-2xl font-bold">Contact Leads</h2>
        <button
          onClick={() => exportCsv("contact-leads.csv", leads as unknown as Array<Record<string, unknown>>)}
          className="inline-flex items-center gap-2 rounded border border-border px-4 py-2 text-sm"
        >
          <Download size={15} />
          Export CSV
        </button>
      </div>
      <div className="overflow-hidden rounded border border-border bg-card">
        {leads.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No leads captured yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="p-3">Lead</th>
                  <th className="p-3">Project</th>
                  <th className="p-3">Source</th>
                  <th className="p-3">Likely type</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/70 align-top">
                    <td className="p-3">
                      <p className="font-semibold">{lead.name}</p>
                      <p className="text-muted-foreground">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{new Date(lead.createdAt).toLocaleString()}</p>
                    </td>
                    <td className="p-3">
                      <p>{lead.projectType}</p>
                      <p className="text-muted-foreground">{lead.budget}</p>
                    </td>
                    <td className="p-3">{lead.utmSource || lead.sourcePage}</td>
                    <td className="p-3">{lead.likelyVisitor}</td>
                    <td className="p-3">
                      <select
                        value={lead.status}
                        onChange={(event) => onChange(lead.id, { status: event.target.value as ContactLead["status"] })}
                        className="rounded border border-border bg-background px-2 py-1"
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Converted</option>
                        <option>Rejected</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <textarea
                        value={lead.notes}
                        onChange={(event) => onChange(lead.id, { notes: event.target.value })}
                        className="min-h-16 w-full rounded border border-border bg-background px-2 py-1"
                        placeholder="Add notes"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

function ReportsPanel({ leads }: { leads: ContactLead[] }) {
  const events = getAnalyticsEvents();
  return (
    <section className="space-y-5">
      <h2 className="font-grotesk text-2xl font-bold">Reports</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ReportExport title="Visitor events" count={events.length} onExport={() => exportCsv("analytics-events.csv", events as unknown as Array<Record<string, unknown>>)} />
        <ReportExport title="Contact submissions" count={leads.length} onExport={() => exportCsv("contact-leads.csv", leads as unknown as Array<Record<string, unknown>>)} />
        <ReportExport title="Click report" count={events.filter((event) => event.type.includes("click")).length} onExport={() => exportCsv("click-events.csv", events.filter((event) => event.type.includes("click")) as unknown as Array<Record<string, unknown>>)} />
      </div>
    </section>
  );
}

function ReportExport({ title, count, onExport }: { title: string; count: number; onExport: () => void }) {
  return (
    <div className="rounded border border-border bg-card p-5">
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-sm text-muted-foreground">{title}</p>
      <button onClick={onExport} disabled={count === 0} className="mt-4 inline-flex items-center gap-2 rounded border border-border px-3 py-2 text-sm disabled:opacity-50">
        <Download size={15} />
        Export CSV
      </button>
    </div>
  );
}

function SecurityPanel() {
  return (
    <section className="space-y-5">
      <h2 className="font-grotesk text-2xl font-bold">Security</h2>
      <div className="rounded border border-border bg-card p-6 text-sm leading-relaxed text-muted-foreground">
        <p className="font-semibold text-foreground">Current mode: SPA-local admin</p>
        <p className="mt-3">
          Admin access uses an expiring session and environment-configured credentials. This protects casual access,
          but frontend-only authentication cannot be considered production-secure because bundled JavaScript is public.
        </p>
        <p className="mt-3">
          Production recommendation: Firebase Auth + Firestore + Storage with rules checking an admin UID, or Supabase
          Auth + Postgres RLS + Storage policies. Store content, analytics, leads, and media there, not in localStorage.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          "Hidden access is only convenience; /admin still requires login.",
          "Admin route is lazy-loaded outside the public bundle path.",
          "Anonymous analytics avoids exact identity claims.",
          "Leads are classified as likely recruiter/client/unknown only.",
        ].map((item) => (
          <div key={item} className="rounded border border-border bg-card p-4 text-sm text-muted-foreground">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function AdminRow(props: {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  toggleLabel: string;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <article className="flex flex-col gap-4 rounded border border-border bg-card p-4 sm:flex-row">
      <img src={props.image} alt="" className="h-28 w-full rounded object-cover sm:w-40" />
      <div className="flex-1">
        <p className="text-xs uppercase tracking-wider text-primary">{props.subtitle}</p>
        <h3 className="mt-1 font-grotesk text-xl font-semibold">{props.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{props.description}</p>
      </div>
      <div className="flex items-start gap-2">
        <button onClick={props.onToggle} className="rounded border border-border p-2 text-muted-foreground hover:text-primary" aria-label={props.toggleLabel}>
          <Eye size={16} />
        </button>
        <button onClick={props.onEdit} className="rounded border border-border p-2 text-muted-foreground hover:text-primary" aria-label="Edit">
          <Pencil size={16} />
        </button>
        <button onClick={props.onDelete} className="rounded border border-border p-2 text-muted-foreground hover:text-red-400" aria-label="Delete">
          <Trash2 size={16} />
        </button>
      </div>
    </article>
  );
}

function Field(props: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm text-muted-foreground">{props.label}</span>
      {props.textarea ? (
        <textarea
          rows={props.rows || 3}
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      ) : (
        <input
          value={props.value}
          onChange={(event) => props.onChange(event.target.value)}
          className="w-full rounded border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      )}
    </label>
  );
}

function ProjectEditor({ form, setForm, onSave, onCancel }: {
  form: ProjectForm;
  setForm: (form: ProjectForm) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="mb-8 rounded border border-border bg-card p-5">
      <h3 className="mb-5 font-grotesk text-xl font-bold">{form.id ? "Edit Project" : "New Project"}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title, slug: form.slug || slugify(title) })} />
        <Field label="Slug" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
        <Field label="Category" value={form.category} onChange={(category) => setForm({ ...form, category })} />
        <Field label="Date" value={form.date} onChange={(date) => setForm({ ...form, date })} />
        <Field label="Role" value={form.role} onChange={(role) => setForm({ ...form, role })} />
        <Field label="Tech Stack (comma-separated)" value={form.technologies} onChange={(technologies) => setForm({ ...form, technologies })} />
        <Field label="Image URL" value={form.image} onChange={(image) => setForm({ ...form, image })} />
        <label className="flex cursor-pointer items-center gap-2 rounded border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:text-primary">
          <ImagePlus size={16} />
          Upload project image
          <input type="file" accept="image/*" className="hidden" onChange={imageUpload((image) => setForm({ ...form, image }))} />
        </label>
        <Field label="Description" value={form.description} onChange={(description) => setForm({ ...form, description })} textarea />
        <Field label="Overview" value={form.overview} onChange={(overview) => setForm({ ...form, overview })} textarea />
        <Field label="Problem" value={form.problem} onChange={(problem) => setForm({ ...form, problem })} textarea />
        <Field label="Solution" value={form.solution} onChange={(solution) => setForm({ ...form, solution })} textarea />
        <Field label="Features (one per line)" value={form.features} onChange={(features) => setForm({ ...form, features })} textarea rows={5} />
        <Field label="Screenshots (one URL per line)" value={form.screenshots} onChange={(screenshots) => setForm({ ...form, screenshots })} textarea rows={5} />
        <Field label="Result / Impact" value={form.result} onChange={(result) => setForm({ ...form, result })} textarea />
        <Field label="Impact Badge" value={form.impact} onChange={(impact) => setForm({ ...form, impact })} />
        <Field label="Play Store Link" value={form.playStore} onChange={(playStore) => setForm({ ...form, playStore })} />
        <Field label="App Store Link" value={form.appStore} onChange={(appStore) => setForm({ ...form, appStore })} />
        <Field label="Website Link" value={form.website} onChange={(website) => setForm({ ...form, website })} />
        <Field label="Case Study Link" value={form.caseStudy} onChange={(caseStudy) => setForm({ ...form, caseStudy })} />
        <Field label="SEO Title" value={form.seoTitle} onChange={(seoTitle) => setForm({ ...form, seoTitle })} />
        <Field label="SEO Description" value={form.seoDescription} onChange={(seoDescription) => setForm({ ...form, seoDescription })} textarea />
      </div>
      <Checks featured={form.featured} published={form.published} onFeatured={(featured) => setForm({ ...form, featured })} onPublished={(published) => setForm({ ...form, published })} />
      <EditorActions disabled={!form.title || !form.description} onSave={onSave} onCancel={onCancel} />
    </div>
  );
}

function BlogEditor({ form, setForm, onSave, onCancel }: {
  form: BlogForm;
  setForm: (form: BlogForm) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="mb-8 rounded border border-border bg-card p-5">
      <h3 className="mb-5 font-grotesk text-xl font-bold">{form.id ? "Edit Blog" : "New Blog"}</h3>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" value={form.title} onChange={(title) => setForm({ ...form, title, slug: form.slug || slugify(title) })} />
        <Field label="Slug" value={form.slug} onChange={(slug) => setForm({ ...form, slug })} />
        <Field label="Category" value={form.category} onChange={(category) => setForm({ ...form, category })} />
        <Field label="Published Date" value={form.date} onChange={(date) => setForm({ ...form, date })} />
        <Field label="Read Time" value={form.readTime} onChange={(readTime) => setForm({ ...form, readTime })} />
        <Field label="Tags (comma-separated)" value={form.tags} onChange={(tags) => setForm({ ...form, tags })} />
        <Field label="Cover Image URL" value={form.image} onChange={(image) => setForm({ ...form, image })} />
        <label className="flex cursor-pointer items-center gap-2 rounded border border-border bg-background px-3 py-2 text-sm text-muted-foreground hover:text-primary">
          <ImagePlus size={16} />
          Upload cover image
          <input type="file" accept="image/*" className="hidden" onChange={imageUpload((image) => setForm({ ...form, image }))} />
        </label>
        <Field label="Excerpt" value={form.excerpt} onChange={(excerpt) => setForm({ ...form, excerpt })} textarea />
        <Field label="SEO Title" value={form.seoTitle} onChange={(seoTitle) => setForm({ ...form, seoTitle })} />
        <Field label="SEO Description" value={form.seoDescription} onChange={(seoDescription) => setForm({ ...form, seoDescription })} textarea />
      </div>
      <div className="mt-4">
        <Field label="Content (Markdown supported)" value={form.content} onChange={(content) => setForm({ ...form, content })} textarea rows={10} />
      </div>
      <label className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} />
        Published
      </label>
      <EditorActions disabled={!form.title || !form.excerpt || !form.content} onSave={onSave} onCancel={onCancel} />
    </div>
  );
}

function Checks(props: {
  featured: boolean;
  published: boolean;
  onFeatured: (value: boolean) => void;
  onPublished: (value: boolean) => void;
}) {
  return (
    <div className="mt-5 flex flex-wrap gap-4">
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={props.featured} onChange={(event) => props.onFeatured(event.target.checked)} />
        Featured project
      </label>
      <label className="flex items-center gap-2 text-sm text-muted-foreground">
        <input type="checkbox" checked={props.published} onChange={(event) => props.onPublished(event.target.checked)} />
        Published
      </label>
    </div>
  );
}

function EditorActions({ disabled, onSave, onCancel }: { disabled: boolean; onSave: () => void; onCancel: () => void }) {
  return (
    <div className="mt-6 flex gap-3">
      <button disabled={disabled} onClick={onSave} className="inline-flex items-center gap-2 rounded bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
        <Save size={15} />
        Save
      </button>
      <button onClick={onCancel} className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm">
        <X size={15} />
        Cancel
      </button>
    </div>
  );
}
