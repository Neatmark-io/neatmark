import { motion } from "framer-motion";
import React, { useContext } from "react";
import FolderTree from "../components/FolderTree";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import ThemeToggle from "../components/ThemeToggle";
import { ThemeContext } from "../context/ThemeContext";

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isSidebarCollapsed: isCollapsed, setSidebarCollapsed } = useContext(ThemeContext)!;

  return (
    <>
      <motion.aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: isCollapsed ? "-100%" : 0 }}
      >
        <button onClick={() => setSidebarCollapsed(true)} className="sidebar-toggle-btn" />
        <Logo />
        <SearchBar />
        <FolderTree />
        <ThemeToggle />
      </motion.aside>
      {children}
    </>
  );
};

export default Sidebar;
