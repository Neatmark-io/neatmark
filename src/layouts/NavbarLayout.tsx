import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Logo from "../components/Logo";

const NavbarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { showSidebar } = useContext(ThemeContext)!;

  return (
    <>
      <header className="navbar">
        <button title="Show Sidebar" onClick={showSidebar} className="navbar-toggle-btn" />
        <Logo />
      </header>
      {children}
    </>
  );
};

export default NavbarLayout;
