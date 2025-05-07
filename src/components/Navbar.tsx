import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const { isSidebarCollapsed: isCollapsed, setSidebarCollapsed } = useContext(ThemeContext)!;

  const toggleSidebar = () => {
    setSidebarCollapsed(!isCollapsed);
  };

  return (
    <header className="navbar">
      <button onClick={toggleSidebar} className={`navbar-toggle-btn ${isCollapsed ? "collapsed" : ""}`} />
      <Logo />
    </header>
  );
};

export default Navbar;
