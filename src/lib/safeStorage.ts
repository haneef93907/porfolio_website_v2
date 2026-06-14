export function safeGetStorage(type: "local" | "session", key: string): string | null {
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    return storage.getItem(key);
  } catch {
    return null;
  }
}

export function safeSetStorage(type: "local" | "session", key: string, value: string): void {
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    storage.setItem(key, value);
  } catch {
    // Storage may be blocked in private mode or by browser extensions.
  }
}

export function safeRemoveStorage(type: "local" | "session", key: string): void {
  try {
    const storage = type === "local" ? window.localStorage : window.sessionStorage;
    storage.removeItem(key);
  } catch {
    // Storage may be blocked in private mode or by browser extensions.
  }
}
