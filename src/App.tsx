import { lazy, Suspense, useEffect } from "react";
import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Blog from "./sections/Blog";
import ProjectDetail from "./pages/ProjectDetail";
import BlogDetail from "./pages/BlogDetail";
import { ThemeToggle } from "./components/ThemeToggle";

const Admin = lazy(() => import("./pages/Admin"));

export default function App() {
  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        window.location.assign("/admin");
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route
          path="/admin"
          element={
            <Suspense fallback={<main className="min-h-screen bg-background" />}>
              <Admin />
            </Suspense>
          }
        />
      </Routes>
    </>
  );
}
