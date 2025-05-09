import { motion } from "framer-motion";
import React, { useContext } from "react";
import FolderTree from "../components/FolderTree";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

/**
 * SidebarLayout Component.
 *
 * This component provides a layout with a sidebar and a main content area.
 * The sidebar can be toggled collapsed or expanded using a button.
 *
 * @param {React.PropsWithChildren} props - The component props.
 * @param {React.ReactNode} props.children - The main content to be displayed alongside the sidebar.
 * @returns {JSX.Element} The rendered SidebarLayout component.
 */
const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  /**
   * Access the theme context to determine the sidebar's collapsed state and a function to toggle it.
   * Using the non-null assertion operator (!) as we know ThemeContext will always have a provider.
   */
  const { isSidebarCollapsed: isCollapsed, hideSidebar } = useContext(ThemeContext)!;

  /**
   * The motion.aside component creates an animated sidebar.
   * - className:  Applies 'sidebar' class and conditionally adds 'collapsed' class based on isCollapsed.
   * - initial: Starts the sidebar off-screen to the left (-100% x position).
   * - animate: Animates the sidebar's x position to either -100% (collapsed) or 0 (expanded) based on isCollapsed.
   * - The sidebar contains a toggle button, logo, search bar, folder tree, and theme toggle.
   */
  return (
    <>
      <motion.aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: isCollapsed ? "-100%" : 0 }}
      >
        <button title="Hide Sidebar" onClick={hideSidebar} className="sidebar-toggle-btn" />
        <Logo />
        <SearchBar />
        <FolderTree />
        <ThemeToggle />
      </motion.aside>
      {children}
    </>
  );
};

export default SidebarLayout;
