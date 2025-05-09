import React, { createContext, useState, useContext, useEffect } from "react";
import { BookmarkContext } from "./BookmarkContext";
import { Bookmark, Folder } from "../types";

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedFolder: string | null;
  setSelectedFolder: React.Dispatch<React.SetStateAction<string | null>>;
  filteredBookmarks: (Folder | Bookmark)[];
}

export const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { bookmarks } = useContext(BookmarkContext)!;
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [filteredBookmarks, setFilteredBookmarks] = useState<(Folder | Bookmark)[]>(bookmarks);

  useEffect(() => {
    if (bookmarks.length > 0) {
      setSelectedFolder(bookmarks[0].title);
    }
  }, [bookmarks]);

  useEffect(() => {
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

    const getFolderItems = (folderTitle: string | null): (Folder | Bookmark)[] => {
      if (!folderTitle) return bookmarks;

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
