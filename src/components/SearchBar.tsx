import React, { useState, useContext, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)!;
  const [input, setInput] = useState(searchQuery);
  const { hideSidebar } = useContext(ThemeContext)!;
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 1000);
  };

  const handleClear = () => {
    setInput("");
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      hideSidebar();
    }
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        inputRef.current?.focus();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
  }, []);

  return (
    <div className="searchbar">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search bookmarks..."
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {input && <button onClick={handleClear} />}
    </div>
  );
};

export default SearchBar;
