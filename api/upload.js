import { createHash } from "node:crypto";

function json(response, status, payload) {
  response.status(status).json(payload);
}

function supabaseConfig() {
  const projectId = process.env.SUPABASE_PROJECT_ID;
  const derivedUrl = projectId ? `https://${projectId}.supabase.co` : "";

  return {
    url: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || derivedUrl,
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
    bucket: process.env.SUPABASE_BUCKET || "Portfoliobucket",
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

function parseDataUrl(dataUrl) {
  const match = String(dataUrl || "").match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;
  return {
    contentType: match[1],
    buffer: Buffer.from(match[2], "base64"),
  };
}

function safeName(name) {
  return String(name || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return json(response, 405, { error: "Method not allowed." });
  }

  const { email, password, fileName, dataUrl, folder = "uploads" } = request.body || {};
  if (!verifyAdmin(email, password)) {
    return json(response, 401, { error: "Unauthorized." });
  }

  const { url, serviceKey, bucket } = supabaseConfig();
  if (!url || !serviceKey) {
    return json(response, 503, { error: "Supabase env vars are not configured." });
  }

  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    return json(response, 400, { error: "Invalid image data." });
  }

  const path = `${safeName(folder)}/${Date.now()}-${safeName(fileName)}`;
  const uploadUrl = `${url}/storage/v1/object/${encodeURIComponent(bucket)}/${path}`;

  const upload = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": parsed.contentType,
      "x-upsert": "true",
    },
    body: parsed.buffer,
  });

  if (!upload.ok) {
    return json(response, 503, { error: await upload.text() });
  }

  return json(response, 200, {
    url: `${url}/storage/v1/object/public/${bucket}/${path}`,
    path,
    bucket,
  });
}
