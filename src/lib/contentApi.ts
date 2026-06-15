import { safeGetStorage, safeSetStorage } from "./safeStorage";

export interface AdminWriteCredentials {
  email: string;
  password: string;
}

export interface ContentResult<T> {
  data: T;
  source: "backend" | "local";
  error?: string;
}

export type ContentKey = "site" | "projects" | "blogs";

export async function loadContent<T>(key: ContentKey, fallback: T): Promise<ContentResult<T>> {
  try {
    const response = await fetch(`/api/content?key=${key}`, { cache: "no-store" });
    const payload = await response.json();

    if (response.ok && payload.data) {
      safeSetStorage("local", localKey(key), JSON.stringify(payload.data));
      return { data: payload.data as T, source: "backend" };
    }

    const local = readLocal<T>(key);
    return {
      data: local || fallback,
      source: "local",
      error: payload.error || "Backend content is not configured yet.",
    };
  } catch (error) {
    const local = readLocal<T>(key);
    return {
      data: local || fallback,
      source: "local",
      error: error instanceof Error ? error.message : "Backend content is unavailable.",
    };
  }
}

export async function saveContent<T>(
  key: ContentKey,
  data: T,
  credentials: AdminWriteCredentials
): Promise<ContentResult<T>> {
  safeSetStorage("local", localKey(key), JSON.stringify(data));

  try {
    const response = await fetch(`/api/content?key=${key}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...credentials, data }),
    });
    const payload = await response.json();

    if (!response.ok) {
      return { data, source: "local", error: payload.error || "Backend save failed." };
    }

    return { data: (payload.data || data) as T, source: "backend" };
  } catch (error) {
    return {
      data,
      source: "local",
      error: error instanceof Error ? error.message : "Backend save failed.",
    };
  }
}

export async function uploadImage(
  fileName: string,
  dataUrl: string,
  folder: "projects" | "blogs" | "uploads",
  credentials: AdminWriteCredentials
): Promise<{ url: string; source: "backend" | "local"; error?: string }> {
  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...credentials, fileName, dataUrl, folder }),
    });
    const payload = await response.json();

    if (!response.ok || !payload.url) {
      return { url: dataUrl, source: "local", error: payload.error || "Image upload failed." };
    }

    return { url: payload.url as string, source: "backend" };
  } catch (error) {
    return {
      url: dataUrl,
      source: "local",
      error: error instanceof Error ? error.message : "Image upload failed.",
    };
  }
}

function readLocal<T>(key: ContentKey) {
  const raw = safeGetStorage("local", localKey(key));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function localKey(key: ContentKey) {
  if (key === "projects") return "portfolio-projects-v3";
  if (key === "blogs") return "portfolio-blogs-v2";
  return "portfolio-site-v1";
}
