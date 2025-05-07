import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "./Logo";

const Navbar: React.FC = () => {
  const { setSidebarCollapsed } = useContext(ThemeContext)!;

  return (
    <header className="navbar">
      <button onClick={() => setSidebarCollapsed(false)} className="navbar-toggle-btn" />
      <Logo />
    </header>
  );
};

export default Navbar;
