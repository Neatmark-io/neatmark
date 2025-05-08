import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";
import { Folder } from "../types";

const FolderRow: React.FC<{ folder: Folder }> = ({ folder }) => {
  const { selectedFolder, setSelectedFolder } = useContext(SearchContext)!;
  const { hideSidebar } = useContext(ThemeContext)!;

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
    hideSidebar();
  };

  return (
    <li className={`folder ${selectedFolder === folder.title ? "selected" : ""}`}>
      <div className="title" onClick={() => handleFolderClick(folder)}>
        <span className={`icon ${folder.icon ? "" : "default"}`}>{folder.icon}</span>
        <span className="folder-name">{folder.title}</span>
      </div>
      <ul>{folder.children.map((child) => child.type === "folder" && <FolderRow folder={child} />)}</ul>
    </li>
  );
};

const FolderTree: React.FC = () => {
  const { bookmarks } = useContext(BookmarkContext)!;

  return (
    <nav className="folder-tree">
      <ul>{bookmarks.map((item) => item.type === "folder" && <FolderRow key={item.title} folder={item} />)}</ul>
    </nav>
  );
};

export default FolderTree;
