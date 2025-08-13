import React, { createContext, useEffect, useState } from "react";
import daisyuiThemes from "daisyui/theme/object";
import { Theme } from "../types";

/**
 * Defines the shape of the ThemeContext's value.
 * @interface ThemeContextProps
 */
interface ThemeContextProps {
  /**
   * The current theme. Can be 'light', 'dark', or 'system'.
   * @property {Theme} theme
   */
  theme: Theme;
  /**
   * Function to set the theme.
   * @function setTheme
   * @param {Theme} theme - The theme to set.
   */
  setTheme: (theme: Theme) => void;
  /**
   * Indicates whether the sidebar is collapsed.
   * @property {boolean} isSidebarCollapsed
   */
  isSidebarCollapsed: boolean;
  /**
   * Function to hide the sidebar. Collapses the sidebar if on a mobile device.
   * @function hideSidebar
   */
  hideSidebar: () => void;
  /**
   * Function to show the sidebar.
   * @function showSidebar
   */
  showSidebar: () => void;
}

/**
 * Creates a context for managing the application's theme and sidebar state.
 * @constant ThemeContext
 */
export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

/**
 * Provides the theme and sidebar state to the application.
 * @component ThemeProvider
 * @param {React.PropsWithChildren} props - The component props.
 * @returns {React.ReactElement} - The ThemeProvider component.
 */
export const ThemeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  /**
   * State for managing the current theme.
   * @state {Theme} theme
   */
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "auto";
  });

  /**
   * Effect to apply the theme to the document and save it to local storage.
   * @effect useEffect
   * @param {Theme} theme - The current theme.
   */
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.setAttribute("data-color-scheme", daisyuiThemes[theme]?.["color-scheme"] ?? "auto");
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Checks if the window width is less than 1280px.
   * @function isMobile
   * @returns {boolean} - True if the window width is less than 1280px, false otherwise.
   */
  const isMobile = () => window.innerWidth < 1280;
  /**
   * State for managing the sidebar's collapsed state.
   * @state {boolean} isSidebarCollapsed
   */
  const [isSidebarCollapsed, setSidebarCollapsed] = useState<boolean>(isMobile());

  /**
   * Effect to handle window resize events and update the sidebar's collapsed state.
   * @effect useEffect
   */
  useEffect(() => {
    const handleResize = () => {
      setSidebarCollapsed(isMobile()); // Collapse on mobile and tablet
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
  }, []);

  /**
   * Function to hide the sidebar. Collapses the sidebar if on a mobile device.
   * @function hideSidebar
   */
  const hideSidebar = () => {
    if (isMobile()) {
      setSidebarCollapsed(true);
    }
  };
  /**
   * Function to show the sidebar.
   * @function showSidebar
   */
  const showSidebar = () => {
    setSidebarCollapsed(false);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isSidebarCollapsed, hideSidebar, showSidebar }}>
      {children}
    </ThemeContext.Provider>
  );
};
