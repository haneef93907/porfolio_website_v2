import { envValue } from "./env.js";

export default function handler(_request, response) {
  const projectId = envValue("SUPABASE_PROJECT_ID");
  const url = envValue("SUPABASE_URL") || envValue("NEXT_PUBLIC_SUPABASE_URL") || (projectId ? `https://${projectId}.supabase.co` : "");

  response.status(200).json({
    supabaseUrl: Boolean(url),
    serviceRoleKey: Boolean(envValue("SUPABASE_SERVICE_ROLE_KEY")),
    bucket: envValue("SUPABASE_BUCKET", "Portfoliobucket"),
    adminEmail: Boolean(envValue("VITE_ADMIN_EMAIL") || envValue("ADMIN_EMAIL")),
  });
}
