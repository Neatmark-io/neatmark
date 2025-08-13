import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Theme } from "../types";

/**
 * ThemeButton Component
 *
 * This component represents a single theme button that allows the user to switch between different themes.
 *
 * @param {object} props - The component's props.
 * @param {string} props.title - The title of the theme button, which corresponds to the theme name.
 * @returns {JSX.Element} The rendered ThemeButton component.
 */
const ThemeButton: React.FC<{ title: Theme }> = ({ title }) => {
  /**
   * Access the current theme and the function to set the theme from the ThemeContext.
   * The non-null assertion operator (!) is used because we assume that the component is always used within a ThemeProvider.
   */
  const { theme, setTheme } = useContext(ThemeContext)!;

  /**
   * Handles the theme change when the button is clicked.
   * @param {Theme} newTheme - The new theme to set.
   */
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

/**
 * ThemeToggle Component
 *
 * This component provides a toggle for switching between different themes (system, light, and dark).
 *
 * @returns {JSX.Element} The rendered ThemeToggle component.
 */
const ThemeToggle: React.FC = () => {
  return (
    <div className="theme-toggle">
      <ThemeButton title="auto" />
      <ThemeButton title="light" />
      <ThemeButton title="dark" />
    </div>
  );
};

export default ThemeToggle;
