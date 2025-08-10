import { motion } from "framer-motion";
import React, { useContext, useMemo } from "react";
import { SearchContext } from "../context/SearchContext";
import { Bookmark, Folder } from "../types";

/**
 * Represents a folder card component.
 *
 * @param {Object} props - The component props.
 * @param {Folder} props.folder - The folder object to display.
 * @returns {JSX.Element} The folder card component.
 */
const FolderCard: React.FC<{ folder: Folder }> = ({ folder }) => {
  const { setSelectedFolder } = useContext(SearchContext)!;

  /**
   * Handles the click event on the folder card.
   * Sets the selected folder in the search context.
   *
   * @param {Folder} folder - The folder object that was clicked.
   */
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

/**
 * Represents a bookmark card component.
 *
 * @param {Object} props - The component props.
 * @param {Bookmark} props.bookmark - The bookmark object to display.
 * @returns {JSX.Element} The bookmark card component.
 */
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

/**
 * Represents a grid of cards displaying folders and bookmarks.
 *
 * @returns {JSX.Element} The card grid component.
 */
const CardGrid: React.FC = () => {
  const { filteredBookmarks } = useContext(SearchContext)!;

  /**
   * Filters the bookmarks to get only the folders.
   *
   * @memo This ensures the result is cached and only recalculated when `filteredBookmarks` changes.
   * @param {Array<Bookmark | Folder>} filteredBookmarks - The array of filtered bookmarks and folders.
   * @returns {Array<Folder>} An array of folders.
   */
  const folders = useMemo(() => filteredBookmarks.filter((item) => item.type === "folder"), [filteredBookmarks]);

  /**
   * Filters the bookmarks to get only the links (bookmarks).
   *
   * @memo This ensures the result is cached and only recalculated when `filteredBookmarks` changes.
   * @param {Array<Bookmark | Folder>} filteredBookmarks - The array of filtered bookmarks and folders.
   * @returns {Array<Bookmark>} An array of bookmarks.
   */
  const bookmarks = useMemo(() => filteredBookmarks.filter((item) => item.type === "link"), [filteredBookmarks]);

  return (
    <motion.div className="card-grid" layout>
      {folders.length > 0 && (
        <div className="folder-grid">
          {folders.map((folder) => (
            <FolderCard key={folder.title} folder={folder} />
          ))}
        </div>
      )}

      {folders.length > 0 && bookmarks.length > 0 && <hr className="divider"></hr>}

      {bookmarks.length > 0 && (
        <div className="bookmark-grid">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark.url} bookmark={bookmark} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default CardGrid;
