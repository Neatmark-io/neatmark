import { motion } from "framer-motion";
import React, { useContext } from "react";
import FolderTree from "../components/FolderTree";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const SidebarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isSidebarCollapsed: isCollapsed, hideSidebar } = useContext(ThemeContext)!;

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
