import React, { useContext } from "react";
import { SearchContext } from "../context/SearchContext";
import { BookmarkContext } from "../context/BookmarkContext";
import { Folder } from "../types";

const FolderTree: React.FC = () => {
  const { bookmarks } = useContext(BookmarkContext)!;
  const { selectedFolder, setSelectedFolder } = useContext(SearchContext)!;

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
  };

  const renderFolder = (folder: Folder) => (
    <div key={folder.title} className="ml-4">
      <div
        className={`flex items-center cursor-pointer p-2 rounded ${
          selectedFolder === folder.title ? "bg-zinc-200 dark:bg-gray-50" : "hover:bg-gray-50 dark:hover:bg-gray-700"
        }`}
        onClick={() => handleFolderClick(folder)}
      >
        <span className="mr-2">{folder.icon || "📁"}</span>
        <span>{folder.title}</span>
      </div>
      {folder.children.map((child) => child.type === "folder" && renderFolder(child))}
    </div>
  );

  return <div className="p-4">{bookmarks.map((item) => item.type === "folder" && renderFolder(item))}</div>;
};

export default FolderTree;
