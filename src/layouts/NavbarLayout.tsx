import React, { useContext } from "react";
import Logo from "../components/Logo";
import { ThemeContext } from "../context/ThemeContext";

/**
 * NavbarLayout Component: A layout component that renders a navbar with a toggle button and logo,
 * and renders its children content.
 *
 * @param {React.PropsWithChildren} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the layout.
 * @returns {React.ReactElement} A React element representing the NavbarLayout component.
 */
const NavbarLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  /**
   * Access the ThemeContext to get the showSidebar function.
   * The non-null assertion operator (!) is used because we are confident that the ThemeContext will always have a value.
   */
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
