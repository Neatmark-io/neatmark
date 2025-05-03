import React from "react";
import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle.tsx";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800">
      <SearchBar />
      <ThemeToggle />
    </header>
  );
};

export default Header;
