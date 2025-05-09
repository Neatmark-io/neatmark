import React, { useContext, useEffect, useRef, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";

/**
 * SearchBar Component
 *
 * A component that provides a search input field for filtering bookmarks.
 * It utilizes React's Context API for managing search query state and theme-related actions.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the search bar.
 */
const SearchBar: React.FC = () => {
  /**
   * Access the search query and the function to update it from the SearchContext.
   */
  const { searchQuery, setSearchQuery } = useContext(SearchContext)!;

  /**
   * State variable to manage the input value of the search bar.
   * Initialized with the value from the searchQuery context.
   */
  const [input, setInput] = useState(searchQuery);

  /**
   * Access the hideSidebar function from the ThemeContext.
   */
  const { hideSidebar } = useContext(ThemeContext)!;

  /**
   * A ref to the input element for programmatic focus.
   */
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles changes to the input field.
   * Updates the local state (`input`) immediately and then updates the global search query
   * after a 1-second delay (debouncing).
   * @param {React.ChangeEvent<HTMLInputElement>} e The event object.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 1000);
  };

  /**
   * Clears the input field and the search query.
   */
  const handleClear = () => {
    setInput("");
    setSearchQuery("");
  };

  /**
   * Handles keydown events in the input field.
   * If the Enter key is pressed, it calls the hideSidebar function.
   * @param {React.KeyboardEvent<HTMLInputElement>} e The event object.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      hideSidebar();
    }
  };

  /**
   * Sets up a global keydown event listener that focuses the input field when Ctrl+K (or Cmd+K) is pressed.
   * Prevents the default browser behavior for this key combination.
   */
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        inputRef.current?.focus();
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
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
      {input && <button title="Clear" onClick={handleClear} />}
    </div>
  );
};

export default SearchBar;
