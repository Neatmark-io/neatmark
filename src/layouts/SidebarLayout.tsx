import { motion } from "framer-motion";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../components/Logo";
import SearchBar from "../components/SearchBar";
import { BookmarkContext } from "../context/BookmarkContext";
import { SearchContext } from "../context/SearchContext";
import { Folder, Theme } from "../types";

const Sidebar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { bookmarks } = useContext(BookmarkContext)!;
  const { selectedFolder, setSelectedFolder } = useContext(SearchContext)!;
  const { theme, setTheme, isSidebarCollapsed: isCollapsed, setSidebarCollapsed } = useContext(ThemeContext)!;

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
  };

  const renderFolder = (folder: Folder) => (
    <li key={folder.title} className={`folder ${selectedFolder === folder.title ? "selected" : ""}`}>
      <div className="title" onClick={() => handleFolderClick(folder)}>
        <span className={`icon ${folder.icon ? "" : "default"}`}>{folder.icon}</span>
        <span>{folder.title}</span>
      </div>
      <ul>{folder.children.map((child) => child.type === "folder" && renderFolder(child))}</ul>
    </li>
  );

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <>
      <motion.aside
        className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
        initial={{ x: "-100%" }}
        animate={{ x: isCollapsed ? "-100%" : 0 }}
      >
        {!isCollapsed && (
          <>
            <button onClick={() => setSidebarCollapsed(true)} className="sidebar-toggle-btn" />
            <Logo />
            <SearchBar />

            {/* FolderTree */}
            <nav className="folder-tree">
              <ul>{bookmarks.map((item) => item.type === "folder" && renderFolder(item))}</ul>
            </nav>

            {/* ThemeToggle */}
            <div className="theme-toggle">
              <button onClick={() => handleThemeChange("system")} className={`${theme === "system" ? "selected" : ""}`}>
                monitor
              </button>
              <button onClick={() => handleThemeChange("light")} className={`${theme === "light" ? "selected" : ""}`}>
                light_mode
              </button>
              <button onClick={() => handleThemeChange("dark")} className={`${theme === "dark" ? "selected" : ""}`}>
                dark_mode
              </button>
            </div>
          </>
        )}
      </motion.aside>
      {children}
    </>
  );
};

export default Sidebar;
