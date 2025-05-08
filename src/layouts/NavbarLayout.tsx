import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../components/Logo";

const Navbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { setSidebarCollapsed } = useContext(ThemeContext)!;

  return (
    <>
      <header className="navbar">
        <button onClick={() => setSidebarCollapsed(false)} className="navbar-toggle-btn" />
        <Logo />
      </header>
      {children}
    </>
  );
};

export default Navbar;
