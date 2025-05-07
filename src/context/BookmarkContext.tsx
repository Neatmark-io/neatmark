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
    fetch("data/bookmarks.html")
      .then((response) => response.text())
      .then((html) => parseBookmarks(html))
      .then((data) => setBookmarks(data));
  }, []);

  const parseBookmarks = (text: string) => {
    const lines = text.split("\n");
    const stack = [];
    let currentFolder = { type: "folder", title: "", children: [] } as Folder;
    let folderName = "Bookmarks";
    let attributes;

    for (const line of lines) {
      const trimmed = line.trim();
      // Folder name
      if (trimmed.startsWith("<DT><H3")) {
        const folderMatch = trimmed.match(/<DT><H3([^>]*)>([^<]*)<\/H3>/);
        if (folderMatch) {
          attributes = parseAttributes(folderMatch[1] || "");
          folderName = folderMatch[2];
        }
      }
      // Folder start
      else if (trimmed === "<DL><p>") {
        const newFolder = {
          type: "folder",
          ...attributes,
          title: folderName,
          children: [],
        } as Folder;
        currentFolder.children.push(newFolder);
        stack.push(newFolder);
        currentFolder = newFolder;
      }
      // Folder end
      else if (trimmed === "</DL><p>") {
        if (stack.length > 1) {
          stack.pop();
          currentFolder = stack[stack.length - 1];
        }
      }
      // Bookmark item
      else if (trimmed.startsWith("<DT><A")) {
        const linkMatch = trimmed.match(/<DT><A\s+HREF="([^"]*)"([^>]*)>([^<]*)<\/A>/);
        if (linkMatch && linkMatch[1]) {
          const attributes = parseAttributes(linkMatch[2] || "");

          currentFolder.children.push({
            type: "link",
            title: linkMatch[3],
            icon: attributes["icon"],
            url: linkMatch[1],
          } as Bookmark);
        }
      }
    }

    return stack.length > 0 ? stack[0].children : [];
  };

  // Helper function to convert snake_case to camelCase
  const toCamelCase = (snakeCaseStr: string) => {
    return snakeCaseStr.toLowerCase().replace(/(_\w)/g, (substring) => substring.toUpperCase());
  };

  // Helper function to parse attributes from a tag
  const parseAttributes = (attrText: string) => {
    const attributes = Object.create({});
    const attrMatches = attrText.matchAll(/(\w+)="([^"]*)"/g);
    for (const match of attrMatches) {
      const camelCaseName = toCamelCase(match[1]);
      attributes[camelCaseName] = match[2];
    }
    return attributes;
  };

  return <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>{children}</BookmarkContext.Provider>;
};
