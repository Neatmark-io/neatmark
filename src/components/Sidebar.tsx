import React, { useState, useEffect } from "react";
import FolderTree from "./FolderTree";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import Header from "./Header";
import { motion } from "framer-motion";

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768); // Collapse on mobile and tablet
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <button onClick={toggleSidebar} className={`sidebar-toggle-btn ${isCollapsed ? "collapsed" : ""}`} />

      <motion.div
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: isCollapsed ? "-100%" : 0 }}
      >
        {!isCollapsed && (
          <>
            <Header />
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
