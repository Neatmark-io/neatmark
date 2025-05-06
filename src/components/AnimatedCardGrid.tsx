import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchContext } from "../context/SearchContext";
import BookmarkCard from "./BookmarkCard";
import FolderCard from "./FolderCard";
import { Folder } from "../types";

const AnimatedCardGrid: React.FC = () => {
  const { filteredBookmarks, setSelectedFolder } = useContext(SearchContext)!;
  const folders = useMemo(() => filteredBookmarks.filter((item) => item.type === "folder"), [filteredBookmarks]);
  const bookmarks = useMemo(() => filteredBookmarks.filter((item) => item.type === "link"), [filteredBookmarks]);

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
  };

  return (
    <motion.div className="card-grid" layout>
      {folders.length > 0 && (
        <div className="folder-grid">
          {folders.map((item) => (
            <FolderCard key={item.title} folder={item} onClick={() => handleFolderClick(item)} />
          ))}
        </div>
      )}

      {folders.length > 0 && bookmarks.length > 0 && <hr className="divider"></hr>}

      {bookmarks.length > 0 && (
        <div className="bookmark-grid">
          {bookmarks.map((item) => (
            <BookmarkCard key={item.url} bookmark={item} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedCardGrid;
