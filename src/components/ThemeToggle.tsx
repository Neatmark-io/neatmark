import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Theme } from "../types";

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="relative">
      <button className="p-2 text-gray-700 dark:text-gray-300">
        {theme === "light" ? "☀️" : theme === "dark" ? "🌙" : "⚙️"}
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
        <button
          onClick={() => handleThemeChange("system")}
          className={`block w-full text-left px-4 py-2 text-sm ${
            theme === "system" ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
        >
          System
        </button>
        <button
          onClick={() => handleThemeChange("light")}
          className={`block w-full text-left px-4 py-2 text-sm ${
            theme === "light" ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
        >
          Light
        </button>
        <button
          onClick={() => handleThemeChange("dark")}
          className={`block w-full text-left px-4 py-2 text-sm ${
            theme === "dark" ? "bg-gray-200 dark:bg-gray-700" : ""
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
};

export default ThemeToggle;
