import fs from "node:fs";
import ts from "typescript";

function readEnvFile(file) {
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
  }
  return env;
}

function loadEnv() {
  return {
    ...readEnvFile(".env.example"),
    ...readEnvFile(".env"),
    ...readEnvFile(".env.local"),
    ...process.env,
  };
}

function loadTsExports(file) {
  const source = fs.readFileSync(file, "utf8");
  const js = ts.transpileModule(source, {
    compilerOptions: {
      esModuleInterop: true,
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;

  const exports = {};
  const module = { exports };
  const require = () => ({ safeGetStorage: () => null, safeSetStorage: () => undefined });
  new Function("exports", "module", "require", js)(exports, module, require);
  return module.exports;
}

async function supabaseRequest(url, key, path, options = {}) {
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function upsertContent(url, key, contentKey, data) {
  return supabaseRequest(url, key, "portfolio_content?on_conflict=key", {
    method: "POST",
    body: JSON.stringify({
      key: contentKey,
      data,
      updated_at: new Date().toISOString(),
    }),
  });
}

async function readContent(url, key, contentKey) {
  const rows = await supabaseRequest(
    url,
    key,
    `portfolio_content?key=eq.${encodeURIComponent(contentKey)}&select=key,data,updated_at&limit=1`,
    { headers: { Prefer: "" } }
  );
  return rows[0] || null;
}

async function ensureContent(url, key, contentKey, fallbackData) {
  const existing = await readContent(url, key, contentKey);
  if (existing) return existing;
  await upsertContent(url, key, contentKey, fallbackData);
  return readContent(url, key, contentKey);
}

const env = loadEnv();
const url = env.SUPABASE_URL || (env.SUPABASE_PROJECT_ID ? `https://${env.SUPABASE_PROJECT_ID}.supabase.co` : "");
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error("Missing SUPABASE_URL/SUPABASE_PROJECT_ID or SUPABASE_SERVICE_ROLE_KEY. Put secrets in .env.local or Vercel, not .env.example.");
}

const { defaultSiteContent } = loadTsExports("src/data/siteContent.ts");
const { defaultProjects } = loadTsExports("src/data/projects.ts");
const { defaultBlogs } = loadTsExports("src/data/blogs.ts");

await upsertContent(url, serviceKey, "site", defaultSiteContent);
await upsertContent(url, serviceKey, "projects", defaultProjects);
await upsertContent(url, serviceKey, "blogs", defaultBlogs);
await ensureContent(url, serviceKey, "analytics_events", []);
await ensureContent(url, serviceKey, "contact_leads", []);

const [site, projects, blogs, events, leads] = await Promise.all([
  readContent(url, serviceKey, "site"),
  readContent(url, serviceKey, "projects"),
  readContent(url, serviceKey, "blogs"),
  readContent(url, serviceKey, "analytics_events"),
  readContent(url, serviceKey, "contact_leads"),
]);

console.log(JSON.stringify({
  uploaded: true,
  siteSections: site?.data ? Object.keys(site.data).length : 0,
  projects: Array.isArray(projects?.data) ? projects.data.length : 0,
  blogs: Array.isArray(blogs?.data) ? blogs.data.length : 0,
  analyticsEvents: Array.isArray(events?.data) ? events.data.length : 0,
  contactLeads: Array.isArray(leads?.data) ? leads.data.length : 0,
  siteUpdatedAt: site?.updated_at,
  projectUpdatedAt: projects?.updated_at,
  blogUpdatedAt: blogs?.updated_at,
}, null, 2));
