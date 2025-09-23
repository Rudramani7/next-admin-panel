"use client";
import "../globals.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { ArrowUp } from "lucide-react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) setDarkMode(saved === "true");
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode, mounted]);

  return (
    <html lang="en">
      <body className="h-screen overflow-hidden">
        {/* prevent full page scroll */}
        <AuthProvider>
          <ConditionalLayout
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
          >
            {children}
          </ConditionalLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

function ConditionalLayout({
  mobileOpen,
  setMobileOpen,
  darkMode,
  setDarkMode,
  children,
}: {
  mobileOpen: boolean;
  setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  const { token, loading } = useAuth();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const handleScroll = () => {
      setShowScroll(main.scrollTop > 200);
    };

    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const main = document.getElementById("main-content");
    if (main) main.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) return null;

  // Login page only — no sidebar/navbar
  if (!token) return <>{children}</>;

  // Logged-in pages layout
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar always fixed on left */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Right side (Navbar + content) */}
      <div className="flex-1 flex flex-col relative">
        {/* Navbar fixed at top */}
        <Navbar
          setMobileOpen={setMobileOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        {/* Main content scrolls independently */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto p-6 bg-gray-500 bg-opacity-15 dark:bg-gray-950"
        >
          {children}
        </main>

        {/* Scroll-to-top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 
            ${showScroll ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}
            bg-blue-600 text-white hover:bg-blue-700
            dark:bg-gray-700 dark:hover:bg-gray-600`}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
