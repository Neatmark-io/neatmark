import React, { useContext } from "react";
import { motion } from "framer-motion";
import { SearchContext } from "../context/SearchContext";
import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";
import { Bookmark, Folder } from "../types";

const AnimatedCardGrid: React.FC = () => {
  const { filteredBookmarks, setSelectedFolder } = useContext(SearchContext)!;

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
  };

  const renderItems = (items: (Folder | Bookmark)[]) => {
    return items.map((item, index) => {
      if (item.type === "folder") {
        return <FolderCard key={index} folder={item} onClick={() => handleFolderClick(item)} />;
      }
      return <BookmarkCard key={index} bookmark={item} />;
    });
  };

  return (
    <motion.div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4" layout>
      {renderItems(filteredBookmarks)}
    </motion.div>
  );
};

export default AnimatedCardGrid;
