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

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt handler
 * before a user is prompted to "install" a web site to a home screen on mobile.
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
    outcome: 'accepted' | 'dismissed',
    platform: string
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own choosing.
   * This method returns a Promise.
   */
  prompt(): Promise<void>;

}