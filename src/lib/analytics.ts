import { safeGetStorage, safeSetStorage } from "./safeStorage";

const EVENTS_KEY = "portfolio-analytics-events-v1";
const VISITOR_KEY = "portfolio-visitor-id";
const SESSION_KEY = "portfolio-session";
const LEADS_KEY = "portfolio-contact-leads-v1";
const GEO_KEY = "portfolio-session-geo";

export type AnalyticsEventType =
  | "page_load"
  | "section_view"
  | "click"
  | "project_click"
  | "resume_download"
  | "contact_action"
  | "contact_submit";

export interface AnalyticsEvent {
  id: string;
  type: AnalyticsEventType;
  name: string;
  path: string;
  createdAt: string;
  visitorId: string;
  sessionId: string;
  referrer: string;
  source: string;
  medium: string;
  campaign: string;
  device: "mobile" | "tablet" | "desktop";
  browser: string;
  os: string;
  country?: string;
  city?: string;
  region?: string;
  timezone?: string;
  meta?: Record<string, string | number | boolean | undefined>;
}

export interface ContactLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  budget: string;
  message: string;
  sourcePage: string;
  sourceSection: string;
  utmSource: string;
  createdAt: string;
  status: "New" | "Contacted" | "Converted" | "Rejected";
  notes: string;
  likelyVisitor: VisitorKind;
}

export type VisitorKind = "Likely recruiter" | "Likely client" | "Likely developer" | "Random visitor" | "Unknown";

interface SessionData {
  id: string;
  startedAt: string;
  lastSeenAt: string;
}

interface GeoData {
  country: string;
  region: string;
  city: string;
  timezone: string;
}

function uid(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readJson<T>(key: string, fallback: T): T {
  const raw = safeGetStorage("local", key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  safeSetStorage("local", key, JSON.stringify(value));
}

function getCachedGeo(): GeoData {
  const raw = safeGetStorage("session", GEO_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as GeoData;
    } catch {
      // Use fallback below.
    }
  }

  return {
    country: "Unknown",
    region: "",
    city: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "",
  };
}

function saveGeo(geo: GeoData) {
  safeSetStorage("session", GEO_KEY, JSON.stringify(geo));
}

export async function loadVisitorGeo() {
  const cached = safeGetStorage("session", GEO_KEY);
  if (cached) return getCachedGeo();

  try {
    const response = await fetch("/api/geo", { cache: "no-store" });
    if (!response.ok) throw new Error("Geo lookup failed");
    const geo = (await response.json()) as Partial<GeoData>;
    const normalized: GeoData = {
      country: geo.country || "Unknown",
      region: geo.region || "",
      city: geo.city || "",
      timezone: geo.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || "",
    };
    saveGeo(normalized);
    return normalized;
  } catch {
    const fallback = getCachedGeo();
    saveGeo(fallback);
    return fallback;
  }
}

export function getVisitorId() {
  const existing = safeGetStorage("local", VISITOR_KEY);
  if (existing) return existing;
  const visitorId = uid("visitor");
  safeSetStorage("local", VISITOR_KEY, visitorId);
  return visitorId;
}

export function getSession() {
  const now = new Date();
  const existing = safeGetStorage("session", SESSION_KEY);

  if (existing) {
    try {
      const session = JSON.parse(existing) as SessionData;
      session.lastSeenAt = now.toISOString();
      safeSetStorage("session", SESSION_KEY, JSON.stringify(session));
      return session;
    } catch {
      // Create a fresh session below.
    }
  }

  const session: SessionData = {
    id: uid("session"),
    startedAt: now.toISOString(),
    lastSeenAt: now.toISOString(),
  };
  safeSetStorage("session", SESSION_KEY, JSON.stringify(session));
  return session;
}

function getUtm() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get("utm_source") || params.get("source") || inferSource(document.referrer),
    medium: params.get("utm_medium") || "",
    campaign: params.get("utm_campaign") || "",
  };
}

function inferSource(referrer: string) {
  const value = referrer.toLowerCase();
  if (!value) return "Direct";
  if (value.includes("linkedin")) return "LinkedIn";
  if (value.includes("upwork")) return "Upwork";
  if (value.includes("fiverr")) return "Fiverr";
  if (value.includes("google")) return "Google";
  return "Other website";
}

function getDevice(): AnalyticsEvent["device"] {
  const width = window.innerWidth;
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

function getBrowser() {
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "Edge";
  if (ua.includes("Chrome/")) return "Chrome";
  if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
  if (ua.includes("Firefox/")) return "Firefox";
  return "Other";
}

function getOs() {
  const ua = navigator.userAgent;
  if (ua.includes("Windows")) return "Windows";
  if (ua.includes("Mac OS")) return "macOS";
  if (ua.includes("Android")) return "Android";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Linux")) return "Linux";
  return "Other";
}

export function trackEvent(type: AnalyticsEventType, name: string, meta?: AnalyticsEvent["meta"]) {
  if (typeof window === "undefined") return;

  const session = getSession();
  const utm = getUtm();
  const geo = getCachedGeo();
  const event: AnalyticsEvent = {
    id: uid("event"),
    type,
    name,
    path: `${window.location.pathname}${window.location.hash}`,
    createdAt: new Date().toISOString(),
    visitorId: getVisitorId(),
    sessionId: session.id,
    referrer: document.referrer,
    source: utm.source,
    medium: utm.medium,
    campaign: utm.campaign,
    device: getDevice(),
    browser: getBrowser(),
    os: getOs(),
    country: geo.country,
    city: geo.city,
    region: geo.region,
    timezone: geo.timezone,
    meta,
  };

  const events = readJson<AnalyticsEvent[]>(EVENTS_KEY, []);
  events.push(event);
  writeJson(EVENTS_KEY, events.slice(-1000));
}

export function getAnalyticsEvents() {
  return readJson<AnalyticsEvent[]>(EVENTS_KEY, []);
}

export function addContactLead(lead: Omit<ContactLead, "id" | "createdAt" | "status" | "notes" | "likelyVisitor">) {
  const leads = getContactLeads();
  const newLead: ContactLead = {
    ...lead,
    id: uid("lead"),
    createdAt: new Date().toISOString(),
    status: "New",
    notes: "",
    likelyVisitor: classifyVisitor({ email: lead.email, source: lead.utmSource, projectType: lead.projectType }),
  };
  writeJson(LEADS_KEY, [newLead, ...leads].slice(0, 500));
  trackEvent("contact_submit", "Contact form submitted", {
    projectType: lead.projectType,
    budget: lead.budget,
    likelyVisitor: newLead.likelyVisitor,
  });
  return newLead;
}

export function getContactLeads() {
  return readJson<ContactLead[]>(LEADS_KEY, []);
}

export function updateContactLead(id: string, updates: Partial<ContactLead>) {
  const updated = getContactLeads().map((lead) => (lead.id === id ? { ...lead, ...updates } : lead));
  writeJson(LEADS_KEY, updated);
  return updated;
}

export function classifyVisitor(input?: { email?: string; source?: string; projectType?: string }): VisitorKind {
  const events = getAnalyticsEvents();
  const source = (input?.source || events.at(-1)?.source || "").toLowerCase();
  const email = (input?.email || "").toLowerCase();
  const projectType = (input?.projectType || "").toLowerCase();
  const names = events.map((event) => `${event.type}:${event.name}`.toLowerCase()).join(" ");

  if (source.includes("recruiter") || names.includes("resume") || names.includes("experience")) {
    return "Likely recruiter";
  }
  if (source.includes("upwork") || source.includes("fiverr") || projectType.includes("mvp") || names.includes("hire")) {
    return "Likely client";
  }
  if (email.endsWith("@gmail.com") && names.includes("blog")) {
    return "Likely developer";
  }
  if (events.length < 2) return "Unknown";
  return "Random visitor";
}

export function summarizeAnalytics() {
  const events = getAnalyticsEvents();
  const visitorIds = new Set(events.map((event) => event.visitorId));
  const today = new Date().toISOString().slice(0, 10);
  const thisWeek = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const thisMonth = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const sessions = new Map<string, AnalyticsEvent[]>();

  for (const event of events) {
    sessions.set(event.sessionId, [...(sessions.get(event.sessionId) || []), event]);
  }

  const sessionDurations = Array.from(sessions.values()).map((sessionEvents) => {
    const times = sessionEvents.map((event) => new Date(event.createdAt).getTime());
    return Math.max(...times) - Math.min(...times);
  });

  const avgDuration = sessionDurations.length
    ? Math.round(sessionDurations.reduce((sum, duration) => sum + duration, 0) / sessionDurations.length / 1000)
    : 0;

  return {
    totalEvents: events.length,
    totalVisitors: visitorIds.size,
    uniqueVisitors: visitorIds.size,
    todayVisitors: new Set(events.filter((event) => event.createdAt.startsWith(today)).map((event) => event.visitorId)).size,
    weekVisitors: new Set(events.filter((event) => new Date(event.createdAt).getTime() >= thisWeek).map((event) => event.visitorId)).size,
    monthVisitors: new Set(events.filter((event) => new Date(event.createdAt).getTime() >= thisMonth).map((event) => event.visitorId)).size,
    sectionViews: countBy(events.filter((event) => event.type === "section_view").map((event) => event.name)),
    clicks: countBy(events.filter((event) => event.type.includes("click") || event.type === "resume_download" || event.type === "contact_action").map((event) => event.name)),
    devices: countBy(events.map((event) => event.device)),
    browsers: countBy(events.map((event) => event.browser)),
    os: countBy(events.map((event) => event.os)),
    countries: countBy(events.map((event) => event.country || "Unknown")),
    cities: countBy(events.map((event) => event.city || "Unknown")),
    regions: countBy(events.map((event) => event.region || "Unknown")),
    timezones: countBy(events.map((event) => event.timezone || "Unknown")),
    sources: countBy(events.map((event) => event.source || "Direct")),
    campaigns: countBy(events.map((event) => event.campaign || "None")),
    avgDuration,
    bounceSessions: Array.from(sessions.values()).filter((sessionEvents) => sessionEvents.length <= 1).length,
  };
}

export function exportCsv(filename: string, rows: Array<Record<string, unknown>>) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const csv = [
    headers.join(","),
    ...rows.map((row) => headers.map((header) => JSON.stringify(row[header] ?? "")).join(",")),
  ].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function countBy(values: string[]) {
  return values.reduce<Record<string, number>>((result, value) => {
    result[value || "Unknown"] = (result[value || "Unknown"] || 0) + 1;
    return result;
  }, {});
}
