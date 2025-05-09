import React, { useContext, useMemo } from "react";
import { motion } from "framer-motion";
import { SearchContext } from "../context/SearchContext";
import { Bookmark, Folder } from "../types";

const FolderCard: React.FC<{ folder: Folder }> = ({ folder }) => {
  const { setSelectedFolder } = useContext(SearchContext)!;

  const handleFolderClick = (folder: Folder) => {
    setSelectedFolder(folder.title);
  };

  return (
    <div key={folder.title} className="folder-card" onClick={() => handleFolderClick(folder)}>
      <span className="icon" />
      <h3 className="title">{folder.title}</h3>
    </div>
  );
};

const BookmarkCard: React.FC<{ bookmark: Bookmark }> = ({ bookmark }) => (
  <a key={bookmark.url} href={bookmark.url} target="_blank" rel="noopener noreferrer">
    <div className="bookmark-card">
      {!bookmark.icon && <span className="icon" />}
      {bookmark.icon && <img src={bookmark.icon} alt={bookmark.title} className="icon-image" />}

      <div className="info">
        <h3 className="title">{bookmark.title}</h3>
        <p className="url">{bookmark.url}</p>
      </div>

      {/* {bookmark.meta?.description && <p className="text-sm mt-2">{bookmark.meta.description}</p>} */}
    </div>
  </a>
);

const CardGrid: React.FC = () => {
  const { filteredBookmarks } = useContext(SearchContext)!;
  const folders = useMemo(() => filteredBookmarks.filter((item) => item.type === "folder"), [filteredBookmarks]);
  const bookmarks = useMemo(() => filteredBookmarks.filter((item) => item.type === "link"), [filteredBookmarks]);

  return (
    <motion.div className="card-grid" layout>
      {folders.length > 0 && (
        <div className="folder-grid">
          {folders.map((folder) => (
            <FolderCard folder={folder} />
          ))}
        </div>
      )}

      {folders.length > 0 && bookmarks.length > 0 && <hr className="divider"></hr>}

      {bookmarks.length > 0 && (
        <div className="bookmark-grid">
          {bookmarks.map((bookmark) => (
            <BookmarkCard bookmark={bookmark} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CardGrid;
