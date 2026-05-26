export interface Bookmark {
  type: "link";
  title: string;
  icon: string;
  url: string;
  clicks: number;
  meta?: {
    image?: string;
    description?: string;
  };
}

export interface Folder {
  type: "folder";
  id: string;
  title: string;
  children: (Folder | Bookmark)[];
  icon?: string;
  addDate?: string;
  lastModified?: string;
}

export interface AppData {
  bookmarks: (Folder | Bookmark)[];
  selectedFolder: string | null;
}

export type Theme = "auto" | "light" | "dark";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}
