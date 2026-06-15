import { createHash } from "node:crypto";

const allowedKeys = new Set(["site", "projects", "blogs"]);

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

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  const key = request.query.key;
  if (!allowedKeys.has(key)) {
    return json(response, 400, { error: "Invalid content key." });
  }

  if (request.method === "GET") {
    try {
      const rows = await supabaseRequest(`portfolio_content?key=eq.${encodeURIComponent(key)}&select=data,updated_at&limit=1`);
      return json(response, 200, { data: rows?.[0]?.data || null, updatedAt: rows?.[0]?.updated_at || null });
    } catch (error) {
      return json(response, 503, { data: null, error: error instanceof Error ? error.message : "Content backend unavailable." });
    }
  }

  if (request.method === "PUT") {
    const { email, password, data } = request.body || {};
    if (!verifyAdmin(email, password)) {
      return json(response, 401, { error: "Unauthorized." });
    }

    try {
      const rows = await supabaseRequest("portfolio_content?on_conflict=key", {
        method: "POST",
        body: JSON.stringify({
          key,
          data,
          updated_at: new Date().toISOString(),
        }),
      });
      return json(response, 200, { data: rows?.[0]?.data || data, updatedAt: rows?.[0]?.updated_at || null });
    } catch (error) {
      return json(response, 503, { error: error instanceof Error ? error.message : "Content backend unavailable." });
    }
  }

  response.setHeader("Allow", "GET, PUT");
  return json(response, 405, { error: "Method not allowed." });
}
