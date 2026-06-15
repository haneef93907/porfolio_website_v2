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
  new Function("exports", "module", js)(exports, module);
  return module.exports;
}

const env = {
  ...readEnvFile(".env.example"),
  ...readEnvFile(".env"),
  ...readEnvFile(".env.local"),
  ...process.env,
};
const url = env.SUPABASE_URL || (env.SUPABASE_PROJECT_ID ? `https://${env.SUPABASE_PROJECT_ID}.supabase.co` : "");
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  throw new Error("Missing Supabase URL or service role key.");
}

const { defaultSiteContent } = loadTsExports("src/data/siteContent.ts");
const response = await fetch(`${url}/rest/v1/portfolio_content?on_conflict=key`, {
  method: "POST",
  headers: {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates,return=representation",
  },
  body: JSON.stringify({
    key: "site",
    data: defaultSiteContent,
    updated_at: new Date().toISOString(),
  }),
});

if (!response.ok) {
  throw new Error(`${response.status} ${await response.text()}`);
}

const rows = await response.json();
console.log(JSON.stringify({
  uploaded: true,
  key: "site",
  sections: Object.keys(rows?.[0]?.data || {}).length,
  updatedAt: rows?.[0]?.updated_at,
}, null, 2));
