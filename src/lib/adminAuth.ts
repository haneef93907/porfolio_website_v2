import { safeGetStorage, safeRemoveStorage, safeSetStorage } from "./safeStorage";

const ADMIN_SESSION_KEY = "portfolio-admin-session";
const SESSION_HOURS = 8;

interface AdminSession {
  authenticated: true;
  expiresAt: number;
}

function readSession(): AdminSession | null {
  const raw = safeGetStorage("session", ADMIN_SESSION_KEY);
  if (!raw) return null;

  try {
    const session = JSON.parse(raw) as AdminSession;
    if (session.authenticated && session.expiresAt > Date.now()) return session;
  } catch {
    // Ignore malformed session data.
  }

  safeRemoveStorage("session", ADMIN_SESSION_KEY);
  return null;
}

export function isAdminAuthenticated() {
  return Boolean(readSession());
}

export function createAdminSession() {
  const session: AdminSession = {
    authenticated: true,
    expiresAt: Date.now() + SESSION_HOURS * 60 * 60 * 1000,
  };
  safeSetStorage("session", ADMIN_SESSION_KEY, JSON.stringify(session));
}

export function clearAdminSession() {
  safeRemoveStorage("session", ADMIN_SESSION_KEY);
}

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export async function verifyAdminCredentials(email: string, password: string) {
  const expectedEmail = import.meta.env.VITE_ADMIN_EMAIL || "haneef93907@gmail.com";
  const expectedHash = import.meta.env.VITE_ADMIN_PASSWORD_HASH;
  const fallbackPassword = import.meta.env.VITE_ADMIN_PASSWORD || "Jobs@123";

  if (email.trim().toLowerCase() !== expectedEmail.trim().toLowerCase()) {
    return false;
  }

  if (expectedHash) {
    const configuredSecret = expectedHash.trim();
    const looksLikeSha256 = /^[a-f0-9]{64}$/i.test(configuredSecret);
    return looksLikeSha256
      ? (await sha256(password)) === configuredSecret.toLowerCase()
      : password === configuredSecret;
  }

  return password === fallbackPassword;
}

export function hasProductionAuthConfig() {
  return Boolean(import.meta.env.VITE_ADMIN_PASSWORD_HASH || import.meta.env.VITE_ADMIN_PASSWORD);
}
