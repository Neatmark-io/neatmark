import React, { useContext } from "react";
import { BookmarkContext } from "../context/BookmarkContext";
import { SearchContext } from "../context/SearchContext";
import { ThemeContext } from "../context/ThemeContext";
import { Folder } from "../types";

/**
 * Represents a single row in the folder tree, displaying a folder and its children.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {Folder} props.folder - The folder object to display.
 * @returns {JSX.Element} The rendered folder row.
 */
const FolderRow: React.FC<{ folder: Folder }> = ({ folder }) => {
  const { selectedFolder, setSelectedFolder } = useContext(SearchContext)!;
  const { hideSidebar } = useContext(ThemeContext)!;

  /**
   * Handles the click event on a folder.
   * Selects the clicked folder and hides the sidebar.
   * @param {Folder} folder - The folder that was clicked.
   */
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

/**
 * Represents the entire folder tree, displaying a hierarchical structure of folders.
 *
 * @returns {JSX.Element} The rendered folder tree.
 */
const FolderTree: React.FC = () => {
  const { bookmarks } = useContext(BookmarkContext)!;

  return (
    <nav className="folder-tree">
      <ul>{bookmarks.map((item) => item.type === "folder" && <FolderRow key={item.title} folder={item} />)}</ul>
    </nav>
  );
};

export default FolderTree;
