/**
 * Represents a bookmark with associated metadata.
 */
export interface Bookmark {
  /**
   * The type of item, always "link" for bookmarks.
   */
  type: "link";
  /**
   * The title of the bookmark.
   */
  title: string;
  /**
   * A Base64 encoded icon for the bookmark.
   */
  icon: string;
  /**
   * The URL the bookmark points to.
   */
  url: string;
  /**
   * The number of times the bookmark has been clicked (for analytics).
   */
  clicks: number;
  /**
   * Optional metadata for the bookmark, such as an image or description.
   */
  meta?: {
    /**
     * The Open Graph image URL for the bookmark.
     */
    image?: string;
    /**
     * A description for the bookmark.
     */
    description?: string;
  };
}

/**
 * Represents a folder containing bookmarks and other folders.
 */
export interface Folder {
  /**
   * The type of item, always "folder" for folders.
   */
  type: "folder";
  /**
   * The title of the folder.
   */
  title: string;
  /**
   * An array of children, which can be either folders or bookmarks.
   */
  children: (Folder | Bookmark)[];
  /**
   * An optional emoji icon for the folder.
   */
  icon?: string;
}

/**
 * Represents the entire application data, including bookmarks, folders, and the currently selected folder.
 */
export interface AppData {
  /**
   * An array of top-level folders and bookmarks.
   */
  bookmarks: (Folder | Bookmark)[];
  /**
   * The ID of the currently selected folder, or null if no folder is selected.
   */
  selectedFolder: string | null;
}

/**
 * Represents the application's theme.
 */
export type Theme = "auto" | "light" | "dark";

/**
 * Represents the BeforeInstallPromptEvent, triggered before a user is prompted to install the web app.
 */
export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the event was dispatched.
   * This is provided for user agents that want to present a choice of versions to the user such as,
   * for example, "web" or "play" which would allow the user to chose between a web version or
   * an Android version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted" or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;
}
