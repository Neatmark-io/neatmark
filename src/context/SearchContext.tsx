import React, { createContext, useContext, useEffect, useState } from "react";
import { Bookmark, Folder } from "../types";
import { BookmarkContext } from "./BookmarkContext";

/**
 * Represents the context value for the Search Context.
 * It holds the search query, functions to update the search query and selected folder,
 * and the filtered list of bookmarks based on the current search and folder selection.
 */
interface SearchContextProps {
  /**
   * The current search query string.
   */
  searchQuery: string;
  /**
   * A function to update the search query string.
   */
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  /**
   * The currently selected folder title, or null if no folder is selected.
   */
  selectedFolder: string | null;
  /**
   * A function to update the selected folder title.
   */
  setSelectedFolder: React.Dispatch<React.SetStateAction<string | null>>;
  /**
   * The list of bookmarks that have been filtered based on the current search query and selected folder.
   */
  filteredBookmarks: (Folder | Bookmark)[];
}

/**
 * The Search Context.  Provides the search state to components.
 */
export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

/**
 * The Search Provider component.  Wraps the application to provide search functionality.
 * @param {React.ReactNode} children - The children components that will have access to the search context.
 * @returns {JSX.Element} The Search Provider component.
 */
export const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { bookmarks } = useContext(BookmarkContext)!;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [filteredBookmarks, setFilteredBookmarks] = useState<(Folder | Bookmark)[]>(bookmarks);

  /**
   * Effect hook that automatically selects the first folder if there are bookmarks available.
   * @param {Array<Folder | Bookmark>} bookmarks - The list of bookmarks.
   */
  useEffect(() => {
    if (bookmarks.length > 0) {
      setSelectedFolder(bookmarks[0].title);
    }
  }, [bookmarks]);

  /**
   * Effect hook that filters bookmarks based on the search query and selected folder.
   * @param {string} searchQuery - The current search query.
   * @param {string | null} selectedFolder - The currently selected folder.
   * @param {Array<Folder | Bookmark>} bookmarks - The list of bookmarks.
   */
  useEffect(() => {
    /**
     * Filters the list of bookmarks recursively based on the search query.
     * @param {Array<Folder | Bookmark>} items - The list of bookmarks to filter.
     * @returns {Array<Folder | Bookmark>} The filtered list of bookmarks.
     */
    const filterItems = (items: (Folder | Bookmark)[]): (Folder | Bookmark)[] => {
      return items.reduce<(Folder | Bookmark)[]>((acc, item) => {
        if (item.type === "folder") {
          const filteredChildren = filterItems(item.children);
          if (filteredChildren.length > 0) {
            filteredChildren.map((item) => acc.push(item));
          }
        } else if (
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.url.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          acc.push(item);
        }
        return acc;
      }, []);
    };

    /**
     * Retrieves the bookmarks associated with a specific folder title.
     * @param {string | null} folderTitle - The title of the folder.
     * @returns {Array<Folder | Bookmark>} The list of bookmarks in the folder.
     */
    const getFolderItems = (folderTitle: string | null): (Folder | Bookmark)[] => {
      if (!folderTitle) return bookmarks;

      /**
       * Recursively searches for a folder with the given title.
       * @param {Array<Folder | Bookmark>} folders - The list of folders to search.
       * @param {string} title - The title of the folder to find.
       * @returns {Folder | null} The folder if found, otherwise null.
       */
      const findFolder = (folders: (Folder | Bookmark)[], title: string): Folder | null => {
        for (const item of folders) {
          if (item.type === "folder" && item.title === title) {
            return item;
          } else if (item.type === "folder") {
            const result = findFolder(item.children, title);
            if (result) return result;
          }
        }
        return null;
      };

      const selected = findFolder(bookmarks, folderTitle);
      return selected ? selected.children : [];
    };

    const filtered = searchQuery ? filterItems(bookmarks) : getFolderItems(selectedFolder);
    setFilteredBookmarks(filtered);
  }, [searchQuery, selectedFolder, bookmarks]);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, selectedFolder, setSelectedFolder, filteredBookmarks }}
    >
      {children}
    </SearchContext.Provider>
  );
};
