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
    <div className="searchbar">
      <input type="text" value={input} onChange={handleChange} placeholder="Search bookmarks..." />
      {input && <button onClick={handleClear} />}
    </div>
  );
};

export default SearchBar;
