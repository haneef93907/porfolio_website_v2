import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

let cachedFileEnv;

function readEnvFile() {
  if (cachedFileEnv) return cachedFileEnv;
  const env = {};
  const files = [".env.local", ".env", ".env.example"];
  const apiDir = path.dirname(fileURLToPath(import.meta.url));
  const roots = [
    process.cwd(),
    apiDir,
    path.dirname(apiDir),
  ];

  for (const root of roots) {
    for (const file of files) {
      const fullPath = path.join(root, file);
      if (!fs.existsSync(fullPath)) continue;

      for (const line of fs.readFileSync(fullPath, "utf8").split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const index = trimmed.indexOf("=");
        if (index === -1) continue;
        env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
      }
    }
  }

  cachedFileEnv = env;
  return env;
}

export function envValue(key, fallback = "") {
  return process.env[key] || readEnvFile()[key] || fallback;
}
