"use client";
import { ReactNode, useEffect, useState } from "react";
import { Theme, ThemeContext } from "./ThemeContext";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const initialTheme = saved || "system";
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    const applyResolvedTheme = () => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const resolved = theme === "system" ? (prefersDark ? "dark" : "light") : theme;
      setResolvedTheme(resolved);
      document.documentElement.setAttribute("data-theme", resolved);
    };

    applyResolvedTheme();
    localStorage.setItem("theme", theme);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        applyResolvedTheme();
      }
    };

    if (theme === "system") {
      mediaQuery.addEventListener("change", handleChange);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
