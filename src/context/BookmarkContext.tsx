import React, { createContext, useEffect, useState } from "react";
import { Bookmark, Folder } from "../types";

interface BookmarkContextProps {
  bookmarks: (Folder | Bookmark)[];
  setBookmarks: React.Dispatch<React.SetStateAction<(Folder | Bookmark)[]>>;
}

export const BookmarkContext = createContext<BookmarkContextProps | undefined>(undefined);

export const BookmarkProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<(Folder | Bookmark)[]>([]);

  useEffect(() => {
    fetch("/data/bookmarks.json")
      .then((response) => response.json())
      .then((data) => setBookmarks(data));
  }, []);

  return <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>{children}</BookmarkContext.Provider>;
};
