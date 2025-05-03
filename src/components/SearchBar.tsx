import React, { useState, useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery } = useContext(SearchContext)!;
  const [input, setInput] = useState(searchQuery);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setSearchQuery(e.target.value);
  };

  const handleClear = () => {
    setInput("");
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search bookmarks..."
        className="p-2 border rounded w-full"
      />
      {input && (
        <button onClick={handleClear} className="absolute right-2 top-2 text-gray-500">
          ×
        </button>
      )}
    </div>
  );
};

export default SearchBar;
