import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Theme } from "../types";

const ThemeButton: React.FC<{ title: Theme }> = ({ title }) => {
  const { theme, setTheme } = useContext(ThemeContext)!;

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <button
      title={`${title} theme`}
      onClick={() => handleThemeChange(title)}
      className={`${theme === title ? "selected" : ""}`}
    >
      <div className={`${title}-icon`} />
    </button>
  );
};

const ThemeToggle: React.FC = () => {
  return (
    <div className="theme-toggle">
      <ThemeButton title="system" />
      <ThemeButton title="light" />
      <ThemeButton title="dark" />
    </div>
  );
};

export default ThemeToggle;
