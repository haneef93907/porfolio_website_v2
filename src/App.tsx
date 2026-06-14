import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Blog from "./sections/Blog";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  return (
    <>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}
