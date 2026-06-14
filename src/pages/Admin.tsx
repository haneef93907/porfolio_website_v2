import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject,
  resetProjects,
  type Project,
} from "../data/projects";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  RotateCcw,
  Shield,
} from "lucide-react";

interface ProjectForm {
  title: string;
  description: string;
  technologies: string;
  date: string;
  features: string;
  impact: string;
  image: string;
  link: string;
}

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  technologies: "",
  date: "",
  features: "",
  impact: "",
  image: "/project-amanah.jpg",
  link: "",
};

const IMAGE_OPTIONS = [
  "/project-amanah.jpg",
  "/project-gemini.jpg",
  "/project-tapdonate.jpg",
  "/project-salim.jpg",
  "/project-myclone.jpg",
  "/project-gtc.jpg",
  "/project-rocklove.jpg",
  "/project-morebetters.jpg",
  "/project-bestbuy.jpg",
];

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleSave = () => {
    const techs = form.technologies
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const feats = form.features
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    if (editingId) {
      const updated = updateProject(editingId, {
        title: form.title,
        description: form.description,
        technologies: techs,
        date: form.date,
        features: feats,
        impact: form.impact || undefined,
        image: form.image,
        link: form.link || undefined,
      });
      setProjects(updated);
      setEditingId(null);
    } else {
      const updated = addProject({
        title: form.title,
        description: form.description,
        technologies: techs,
        date: form.date,
        features: feats,
        impact: form.impact || undefined,
        image: form.image,
        link: form.link || undefined,
      });
      setProjects(updated);
    }

    setForm(emptyForm);
    setShowForm(false);
  };

  const handleEdit = (project: Project) => {
    setForm({
      title: project.title,
      description: project.description,
      technologies: project.technologies.join(", "),
      date: project.date,
      features: project.features.join("\n"),
      impact: project.impact || "",
      image: project.image,
      link: project.link || "",
    });
    setEditingId(project.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const updated = deleteProject(id);
      setProjects(updated);
    }
  };

  const handleReset = () => {
    if (
      window.confirm(
        "This will reset all projects to defaults. Are you sure?"
      )
    ) {
      const updated = resetProjects();
      setProjects(updated);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-void text-off-white">
      {/* Header */}
      <div className="bg-navy border-b border-white/5">
        <div className="max-w-[1200px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-slate hover:text-saffron transition-colors"
              >
                <ArrowLeft size={20} />
              </Link>
              <div className="flex items-center gap-2">
                <Shield size={18} className="text-saffron" />
                <h1 className="font-grotesk font-bold text-xl">
                  Project Manager
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 text-xs font-mono text-slate hover:text-saffron transition-colors px-3 py-2 rounded border border-white/10 hover:border-saffron/30"
              >
                <RotateCcw size={12} />
                Reset
              </button>
              <button
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-1.5 bg-saffron text-void font-grotesk font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded hover:bg-[#E67D00] transition-colors"
              >
                <Plus size={14} />
                Add Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Form */}
        {showForm && (
          <div className="bg-[#111] border border-white/10 rounded-lg p-6 mb-8">
            <h2 className="font-grotesk font-semibold text-lg mb-4">
              {editingId ? "Edit Project" : "New Project"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-mono text-slate mb-1.5">
                  Title *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors"
                  placeholder="Project name"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate mb-1.5">
                  Date *
                </label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors"
                  placeholder="e.g., Jan 2023 - Present"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-mono text-slate mb-1.5">
                Description *
              </label>
              <textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors resize-none"
                placeholder="Brief project description"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-mono text-slate mb-1.5">
                Technologies (comma-separated) *
              </label>
              <input
                type="text"
                value={form.technologies}
                onChange={(e) =>
                  setForm({ ...form, technologies: e.target.value })
                }
                className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors"
                placeholder="Flutter, Firebase, AI/ML"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-mono text-slate mb-1.5">
                Features (one per line) *
              </label>
              <textarea
                value={form.features}
                onChange={(e) =>
                  setForm({ ...form, features: e.target.value })
                }
                rows={4}
                className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors resize-none"
                placeholder="Feature one&#10;Feature two&#10;Feature three"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-slate mb-1.5">
                  Impact (optional)
                </label>
                <input
                  type="text"
                  value={form.impact}
                  onChange={(e) =>
                    setForm({ ...form, impact: e.target.value })
                  }
                  className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors"
                  placeholder="e.g., Improved engagement by 30%"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate mb-1.5">
                  Image
                </label>
                <select
                  value={form.image}
                  onChange={(e) =>
                    setForm({ ...form, image: e.target.value })
                  }
                  className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors"
                >
                  {IMAGE_OPTIONS.map((img) => (
                    <option key={img} value={img}>
                      {img}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-mono text-slate mb-1.5">
                Project Link (optional)
              </label>
              <input
                type="url"
                value={form.link}
                onChange={(e) =>
                  setForm({ ...form, link: e.target.value })
                }
                className="w-full bg-void border border-white/10 rounded px-3 py-2.5 text-sm focus:border-saffron focus:outline-none transition-colors"
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={
                  !form.title ||
                  !form.description ||
                  !form.technologies ||
                  !form.date
                }
                className="flex items-center gap-1.5 bg-saffron text-void font-grotesk font-semibold text-xs uppercase tracking-wider px-5 py-2.5 rounded hover:bg-[#E67D00] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={14} />
                {editingId ? "Update" : "Save"}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-1.5 text-slate hover:text-off-white font-mono text-xs uppercase tracking-wider px-5 py-2.5 rounded border border-white/10 hover:border-white/20 transition-colors"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Projects list */}
        <div className="space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111] border border-white/10 rounded-lg p-5 flex flex-col sm:flex-row gap-4 hover:border-saffron/20 transition-colors"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full sm:w-32 h-20 object-cover rounded shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-grotesk font-semibold text-lg text-off-white truncate">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs text-saffron">
                      {project.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleEdit(project)}
                      className="p-2 text-slate hover:text-saffron transition-colors rounded hover:bg-white/5"
                      aria-label="Edit"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="p-2 text-slate hover:text-red-400 transition-colors rounded hover:bg-white/5"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate line-clamp-2 mb-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[10px] text-cyan bg-cyan/10 px-1.5 py-0.5 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-slate text-lg mb-4">No projects yet</p>
            <button
              onClick={() => {
                setForm(emptyForm);
                setEditingId(null);
                setShowForm(true);
              }}
              className="inline-flex items-center gap-2 bg-saffron text-void font-grotesk font-semibold text-sm uppercase tracking-wider px-6 py-3 rounded hover:bg-[#E67D00] transition-colors"
            >
              <Plus size={16} />
              Add Your First Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
