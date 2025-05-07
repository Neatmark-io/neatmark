import { motion } from "framer-motion";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import FolderTree from "./FolderTree";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";

const Sidebar: React.FC = () => {
  const { isSidebarCollapsed: isCollapsed } = useContext(ThemeContext)!;

  return (
    <>
      <motion.div
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: isCollapsed ? "-100%" : 0 }}
      >
        {!isCollapsed && (
          <>
            <header className="header">
              <Logo />
            </header>
            <SearchBar />
            <FolderTree />
            <ThemeToggle />
          </>
        )}
      </motion.div>
    </>
  );
};

export default Sidebar;
