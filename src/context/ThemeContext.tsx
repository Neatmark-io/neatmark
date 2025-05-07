import React, { createContext, useState, useEffect } from "react";
import { Theme } from "../types";

interface ThemeContextProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (bool: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "system";
  });
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(window.innerWidth < 1280);

  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 1280); // Collapse on mobile and tablet
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const applyTheme = (theme: Theme) => {
      if (theme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        document.documentElement.classList.toggle("dark", systemTheme === "dark");
      } else {
        document.documentElement.classList.toggle("dark", theme === "dark");
      }
    };

    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isSidebarCollapsed, setSidebarCollapsed }}>
      {children}
    </ThemeContext.Provider>
  );
};
