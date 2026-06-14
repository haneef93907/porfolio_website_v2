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
import {
  ArrowLeft,
  BarChart3,
  Eye,
  ImagePlus,
  Lock,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Shield,
  Trash2,
  X,
} from "lucide-react";

type Tab = "overview" | "projects" | "blogs";

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
  const [loggedIn, setLoggedIn] = useState(() => sessionStorage.getItem("portfolio-admin") === "true");
  const [password, setPassword] = useState("");
  const [tab, setTab] = useState<Tab>("overview");
  const [projects, setProjects] = useState<Project[]>(() => getProjects());
  const [blogs, setBlogs] = useState<BlogPost[]>(() => getBlogs());
  const [projectForm, setProjectForm] = useState<ProjectForm | null>(null);
  const [blogForm, setBlogForm] = useState<BlogForm | null>(null);

  const stats = useMemo(
    () => [
      ["Projects", projects.length],
      ["Published Projects", projects.filter((item) => item.published).length],
      ["Blogs", blogs.length],
      ["Published Blogs", blogs.filter((item) => item.published).length],
    ],
    [blogs, projects]
  );

  const login = (event: React.FormEvent) => {
    event.preventDefault();
    const expected = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    if (password === expected) {
      sessionStorage.setItem("portfolio-admin", "true");
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
              <p className="text-sm text-muted-foreground">Default password: admin123</p>
            </div>
          </div>
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
              sessionStorage.removeItem("portfolio-admin");
              setLoggedIn(false);
            }}
            className="rounded border border-border px-3 py-2 text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1200px] px-6 py-8">
        <div className="mb-6 flex flex-wrap gap-3">
          {(["overview", "projects", "blogs"] as Tab[]).map((item) => (
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
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(([label, value]) => (
                <div key={label} className="rounded border border-border bg-card p-5">
                  <BarChart3 className="mb-4 text-primary" />
                  <p className="text-3xl font-bold">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded border border-border bg-card p-6">
              <h2 className="font-grotesk text-2xl font-bold">Backend notes</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This dashboard currently stores content in browser localStorage.
                The forms include Firestore/Supabase-ready fields: title, slug,
                images, category, links, SEO title, SEO description, published
                state, and featured state. For production, connect these helpers
                to Firebase Auth, Firestore, and Storage or Supabase Auth,
                Database, and Storage.
              </p>
            </div>
          </section>
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
