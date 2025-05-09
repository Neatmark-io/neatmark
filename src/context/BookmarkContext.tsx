import React, { createContext, useEffect, useState } from "react";
import { Bookmark, Folder } from "../types";

/**
 * Defines the properties of the Bookmark Context.
 * @interface BookmarkContextProps
 */
interface BookmarkContextProps {
  /**
   * The array of bookmarks and folders.
   */
  bookmarks: (Folder | Bookmark)[];
  /**
   * A function to update the bookmarks array.
   */
  setBookmarks: React.Dispatch<React.SetStateAction<(Folder | Bookmark)[]>>;
}

/**
 * Creates the Bookmark Context.  Initialized to undefined.
 * @constant BookmarkContext
 */
export const BookmarkContext = createContext<BookmarkContextProps | undefined>(undefined);

/**
 * Bookmark Provider component that fetches, parses, and manages bookmarks.
 * @component BookmarkProvider
 * @param {React.PropsWithChildren} children - The child components to render within the context.
 * @returns {JSX.Element} - The Bookmark Provider component.
 */
export const BookmarkProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<(Folder | Bookmark)[]>([]);

  /**
   * Fetches bookmarks from a remote HTML file and parses them.
   * @useEffect
   */
  useEffect(() => {
    fetch("data/bookmarks.html")
      .then((response) => response.text())
      .then((html) => parseBookmarks(html))
      .then((data) => setBookmarks(data));
  }, []);

  /**
   * Parses the HTML content of the bookmarks file to extract bookmarks and folders.
   * @function parseBookmarks
   * @param {string} text - The HTML content as a string.
   * @returns {(Folder | Bookmark)[]} - An array of parsed bookmarks and folders.
   */
  const parseBookmarks = (text: string) => {
    const lines = text.split("\n");
    const stack = [];
    let currentFolder = { type: "folder", title: "", children: [], icon: "" } as Folder;
    let folderName = "Bookmarks";
    let attributes: { [key: string]: string } | undefined;

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
            icon: attributes?.icon,
            url: linkMatch[1],
          } as Bookmark);
        }
      }
    }

    return stack.length > 0 ? stack : [];
  };

  /**
   * Converts a snake_case string to camelCase.
   * @function toCamelCase
   * @param {string} snakeCaseStr - The string in snake_case.
   * @returns {string} - The string in camelCase.
   */
  const toCamelCase = (snakeCaseStr: string) => {
    return snakeCaseStr.toLowerCase().replace(/(_\w)/g, (substring) => substring.toUpperCase());
  };

  /**
   * Parses attributes from an HTML tag string.
   * @function parseAttributes
   * @param {string} attrText - The string containing the tag attributes.
   * @returns {{ [key: string]: string }} - An object containing the parsed attributes in camelCase.
   */
  const parseAttributes = (attrText: string) => {
    const attributes: { [key: string]: string } = Object.create({});
    const attrMatches = attrText.matchAll(/(\w+)="([^"]*)"/g);
    for (const match of attrMatches) {
      const camelCaseName = toCamelCase(match[1]);
      attributes[camelCaseName] = match[2];
    }
    return attributes;
  };

  return <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>{children}</BookmarkContext.Provider>;
};
