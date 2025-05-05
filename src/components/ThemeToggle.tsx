import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Theme } from "../types";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="theme-toggle">
      <button onClick={() => handleThemeChange("system")} className={`${theme === "system" ? "selected" : ""}`}>
        monitor
      </button>
      <button onClick={() => handleThemeChange("light")} className={`${theme === "light" ? "selected" : ""}`}>
        light_mode
      </button>
      <button onClick={() => handleThemeChange("dark")} className={`${theme === "dark" ? "selected" : ""}`}>
        dark_mode
      </button>
    </div>
  );
};

export default ThemeToggle;
