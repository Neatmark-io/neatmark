import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";
import { Folder } from "../types";

const FolderTree: React.FC = () => {
  const { bookmarks } = useContext(BookmarkContext)!;
  const { selectedFolder, setSelectedFolder } = useContext(SearchContext)!;
  const { hideSidebar } = useContext(ThemeContext)!;

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
    hideSidebar();
  };

  const renderFolder = (folder: Folder) => (
    <li key={folder.title} className={`folder ${selectedFolder === folder.title ? "selected" : ""}`}>
      <div className="title" onClick={() => handleFolderClick(folder)}>
        <span className={`icon ${folder.icon ? "" : "default"}`}>{folder.icon}</span>
        <span>{folder.title}</span>
      </div>
      <ul>{folder.children.map((child) => child.type === "folder" && renderFolder(child))}</ul>
    </li>
  );

  return (
    <nav className="folder-tree">
      <ul>{bookmarks.map((item) => item.type === "folder" && renderFolder(item))}</ul>
    </nav>
  );
};

export default FolderTree;
