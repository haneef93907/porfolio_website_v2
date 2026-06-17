import { createHash } from "node:crypto";
import { envValue } from "./env.js";

function json(response, status, payload) {
  response.status(status).json(payload);
}

function supabaseConfig() {
  const projectId = envValue("SUPABASE_PROJECT_ID");
  const derivedUrl = projectId ? `https://${projectId}.supabase.co` : "";

  return {
    url: envValue("SUPABASE_URL") || envValue("NEXT_PUBLIC_SUPABASE_URL") || derivedUrl,
    serviceKey: envValue("SUPABASE_SERVICE_ROLE_KEY"),
    bucket: envValue("SUPABASE_BUCKET", "Portfoliobucket"),
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function verifyAdmin(email, password) {
  const expectedEmail = envValue("VITE_ADMIN_EMAIL") || envValue("ADMIN_EMAIL") || "haneef93907@gmail.com";
  const expectedHash = envValue("VITE_ADMIN_PASSWORD_HASH") || envValue("ADMIN_PASSWORD_HASH") || "";
  const expectedPassword = envValue("VITE_ADMIN_PASSWORD") || envValue("ADMIN_PASSWORD") || "Jobs@123";

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
    contentType: match[1].toLowerCase(),
    buffer: Buffer.from(match[2], "base64"),
  };
}

const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/jpg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/svg+xml", "svg"],
]);

const imageTypesByExtension = new Map([
  ["jpg", "image/jpeg"],
  ["jpeg", "image/jpeg"],
  ["png", "image/png"],
  ["webp", "image/webp"],
  ["gif", "image/gif"],
  ["svg", "image/svg+xml"],
]);

function safeName(name) {
  return String(name || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extensionFromName(fileName) {
  const match = String(fileName || "").toLowerCase().match(/\.([a-z0-9]+)$/);
  return match ? match[1] : "";
}

function normalizedImageType(contentType, fileName) {
  if (allowedImageTypes.has(contentType)) return contentType;
  return imageTypesByExtension.get(extensionFromName(fileName)) || contentType;
}

function isValidSvg(buffer) {
  const text = buffer.toString("utf8", 0, Math.min(buffer.length, 4096));
  return /<svg[\s>]/i.test(text);
}

function imagePath(folder, fileName, contentType) {
  const safeFile = safeName(fileName) || "upload";
  const extension = allowedImageTypes.get(contentType) || "bin";
  const hasExtension = /\.[a-z0-9]+$/i.test(safeFile);
  const uploadName = hasExtension ? safeFile : `${safeFile}.${extension}`;
  return `${safeName(folder) || "uploads"}/${Date.now()}-${uploadName}`;
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

  const contentType = normalizedImageType(parsed.contentType, fileName);
  if (!allowedImageTypes.has(contentType)) {
    return json(response, 400, { error: "Unsupported image type. Use JPG, PNG, WebP, GIF, or SVG." });
  }

  if (contentType === "image/svg+xml" && !isValidSvg(parsed.buffer)) {
    return json(response, 400, { error: "Invalid SVG image data." });
  }

  const path = imagePath(folder, fileName, contentType);
  const uploadUrl = `${url}/storage/v1/object/${encodeURIComponent(bucket)}/${path}`;

  const upload = await fetch(uploadUrl, {
    method: "POST",
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      "Content-Type": contentType,
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
