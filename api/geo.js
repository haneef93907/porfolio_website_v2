export default function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  response.status(200).json({
    country: request.headers["x-vercel-ip-country"] || "Unknown",
    region: request.headers["x-vercel-ip-country-region"] || "",
    city: decodeURIComponent(String(request.headers["x-vercel-ip-city"] || "")),
    timezone: request.headers["x-vercel-ip-timezone"] || "",
  });
}
