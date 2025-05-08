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
        <div className="system-icon" />
      </button>
      <button onClick={() => handleThemeChange("light")} className={`${theme === "light" ? "selected" : ""}`}>
        <div className="light-icon" />
      </button>
      <button onClick={() => handleThemeChange("dark")} className={`${theme === "dark" ? "selected" : ""}`}>
        <div className="dark-icon" />
      </button>
    </div>
  );
};
export default ThemeToggle;
