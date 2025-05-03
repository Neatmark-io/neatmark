export interface Bookmark {
  type: "link";
  title: string;
  icon: string; // Base64 encoded icon
  url: string;
  clicks: number; // For analytics
  meta?: {
    image?: string; // OG image
    description?: string;
  };
}

export interface Folder {
  type: "folder";
  title: string;
  children: (Folder | Bookmark)[];
  icon: string; // Emoji
}

export interface AppData {
  bookmarks: (Folder | Bookmark)[];
  selectedFolder: string | null;
}

export type Theme = "system" | "light" | "dark";
