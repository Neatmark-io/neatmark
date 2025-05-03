import React, { useState, useEffect } from "react";
import FolderTree from "./FolderTree";

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
    <div
      className={`flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      } border-r border-gray-200 bg-zinc-100 dark:pintree-bg-gray-900 h-full font-semibold transition-width duration-300`}
    >
      <button onClick={toggleSidebar} className="p-4 text-lg">
        {isCollapsed ? "☰" : "✖"}
      </button>
      {!isCollapsed && <FolderTree />}
    </div>
  );
};

export default Sidebar;
