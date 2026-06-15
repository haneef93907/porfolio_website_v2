import { createHash } from "node:crypto";

const maxEvents = 5000;
const maxLeads = 1000;

function json(response, status, payload) {
  response.status(status).json(payload);
}

function supabaseConfig() {
  const projectId = process.env.SUPABASE_PROJECT_ID;
  const derivedUrl = projectId ? `https://${projectId}.supabase.co` : "";

  return {
    url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || derivedUrl,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function verifyAdmin(email, password) {
  const expectedEmail = process.env.VITE_ADMIN_EMAIL || process.env.ADMIN_EMAIL || "haneef93907@gmail.com";
  const expectedHash = process.env.VITE_ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD_HASH || "";
  const expectedPassword = process.env.VITE_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD || "Jobs@123";

  if (String(email || "").trim().toLowerCase() !== String(expectedEmail).trim().toLowerCase()) {
    return false;
  }

  if (expectedHash) {
    const secret = String(expectedHash).trim();
    return /^[a-f0-9]{64}$/i.test(secret) ? sha256(password || "") === secret.toLowerCase() : password === secret;
  }

  return password === expectedPassword;
}

async function supabaseRequest(path, options = {}) {
  const { url, serviceKey } = supabaseConfig();
  if (!url || !serviceKey) {
    throw new Error("Supabase env vars are not configured.");
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Supabase request failed with ${response.status}`);
  }

  return response.json();
}

async function readRow(key, fallback) {
  const rows = await supabaseRequest(`portfolio_content?key=eq.${encodeURIComponent(key)}&select=data&limit=1`);
  return rows?.[0]?.data || fallback;
}

async function writeRow(key, data) {
  const rows = await supabaseRequest("portfolio_content?on_conflict=key", {
    method: "POST",
    body: JSON.stringify({ key, data, updated_at: new Date().toISOString() }),
  });
  return rows?.[0]?.data || data;
}

async function appendRow(key, item, limit) {
  const current = await readRow(key, []);
  const next = [item, ...(Array.isArray(current) ? current : [])].slice(0, limit);
  return writeRow(key, next);
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { error: "Method not allowed." });
  }

  const { action, email, password, event, lead, id, updates } = request.body || {};

  try {
    if (action === "track") {
      await appendRow("analytics_events", event, maxEvents);
      return json(response, 200, { ok: true });
    }

    if (action === "lead") {
      await appendRow("contact_leads", lead, maxLeads);
      return json(response, 200, { ok: true });
    }

    if (!verifyAdmin(email, password)) {
      return json(response, 401, { error: "Unauthorized." });
    }

    if (action === "read") {
      const [events, leads] = await Promise.all([
        readRow("analytics_events", []),
        readRow("contact_leads", []),
      ]);
      return json(response, 200, { events, leads });
    }

    if (action === "updateLead") {
      const leads = await readRow("contact_leads", []);
      const next = Array.isArray(leads)
        ? leads.map((item) => (item.id === id ? { ...item, ...updates } : item))
        : [];
      const saved = await writeRow("contact_leads", next);
      return json(response, 200, { leads: saved });
    }

    return json(response, 400, { error: "Invalid analytics action." });
  } catch (error) {
    return json(response, 503, { error: error instanceof Error ? error.message : "Analytics backend unavailable." });
  }
}
