import { getContext, setContext } from 'svelte';
import type { Bookmark, Folder, Theme } from './types';

export class AppState {
  // Theme State
  theme = $state<Theme>('auto');
  isSidebarCollapsed = $state<boolean>(false);

  // Bookmark State
  bookmarks = $state<(Folder | Bookmark)[]>([]);

  // Search State
  searchQuery = $state<string>('');
  selectedFolder = $state<string | null>(null);

  constructor() {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme) {
        this.theme = savedTheme;
      }

      this.isSidebarCollapsed = window.innerWidth < 1280;
      window.addEventListener('resize', () => {
        this.isSidebarCollapsed = window.innerWidth < 1280;
      });

      this.applyTheme(this.theme);

      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.theme === 'auto') {
          this.applyTheme('auto');
        }
      });

      this.fetchBookmarks();
    }
  }

  // Derived state for filtered bookmarks
  filteredBookmarks = $derived.by(() => {
    if (this.searchQuery) {
      return this.filterItems(this.bookmarks);
    }
    return this.getFolderItems(this.selectedFolder);
  });

  // Actions
  setTheme(newTheme: Theme) {
    this.theme = newTheme;
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      this.applyTheme(newTheme);
    }
  }

  private applyTheme(theme: Theme) {
    if (typeof window !== 'undefined') {
      let activeTheme = theme;
      if (theme === 'auto') {
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', activeTheme);
    }
  }

  hideSidebar() {
    if (typeof window !== 'undefined' && window.innerWidth < 1280) {
      this.isSidebarCollapsed = true;
    }
  }

  showSidebar() {
    this.isSidebarCollapsed = false;
  }

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  async fetchBookmarks() {
    try {
      const response = await fetch('/data/bookmarks.html');
      if (!response.ok) throw new Error('Failed to fetch bookmarks');
      const html = await response.text();
      this.bookmarks = this.parseBookmarks(html);
    } catch (e) {
      console.error('Failed to fetch bookmarks', e);
    }
  }

  private filterItems(items: (Folder | Bookmark)[]): (Folder | Bookmark)[] {
    return items.reduce<(Folder | Bookmark)[]>((acc, item) => {
      if (item.type === 'folder') {
        const filteredChildren = this.filterItems(item.children);
        if (filteredChildren.length > 0) {
          acc.push(...filteredChildren);
        }
      } else if (
        item.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(this.searchQuery.toLowerCase())
      ) {
        acc.push(item);
      }
      return acc;
    }, []);
  }

  private getFolderItems(folderId: string | null): (Folder | Bookmark)[] {
    if (!folderId) return this.bookmarks;

    const findFolder = (folders: (Folder | Bookmark)[], id: string): Folder | null => {
      for (const item of folders) {
        if (item.type === 'folder' && item.id === id) {
          return item;
        } else if (item.type === 'folder') {
          const result = findFolder(item.children, id);
          if (result) return result;
        }
      }
      return null;
    };

    const selected = findFolder(this.bookmarks, folderId);
    return selected ? selected.children : [];
  }

  private parseBookmarks(text: string) {
    const lines = text.split("\n");
    const stack: Folder[] = [];
    let currentFolder: Folder = { type: "folder", id: "root", title: "", children: [] };
    let folderName = "Bookmarks";
    let attributes: { [key: string]: string } | undefined;

    const toCamelCase = (snakeCaseStr: string) => {
      return snakeCaseStr.toLowerCase().replace(/(_\w)/g, (substring) => substring[1].toUpperCase());
    };

    const parseAttributes = (attrText: string) => {
      const attrs: { [key: string]: string } = {};
      const attrMatches = attrText.matchAll(/(\w+)="([^"]*)"/g);
      for (const match of attrMatches) {
        const camelCaseName = toCamelCase(match[1]);
        attrs[camelCaseName] = match[2];
      }
      return attrs;
    };

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith("<DT><H3")) {
        const folderMatch = trimmed.match(/<DT><H3([^>]*)>([^<]*)<\/H3>/);
        if (folderMatch) {
          attributes = parseAttributes(folderMatch[1] || "");
          folderName = folderMatch[2];
        }
      } else if (trimmed === "<DL><p>") {
        const folderId = stack.length > 0 ? stack.map(f => f.title).join('::') + '::' + folderName : folderName;
        const newFolder: Folder = {
          type: "folder",
          id: folderId,
          ...attributes,
          title: folderName,
          children: [],
        };
        currentFolder.children.push(newFolder);
        stack.push(newFolder);
        currentFolder = newFolder;
      } else if (trimmed === "</DL><p>") {
        if (stack.length > 1) {
          stack.pop();
          currentFolder = stack[stack.length - 1];
        }
      } else if (trimmed.startsWith("<DT><A")) {
        const linkMatch = trimmed.match(/<DT><A\s+HREF="([^"]*)"([^>]*)>([^<]*)<\/A>/);
        if (linkMatch && linkMatch[1]) {
          const attrs = parseAttributes(linkMatch[2] || "");
          currentFolder.children.push({
            type: "link",
            title: linkMatch[3],
            icon: attrs?.icon || "",
            url: linkMatch[1],
            clicks: 0
          });
        }
      }
    }

    let parsed = stack.length > 0 ? stack : [];
    
    // If the root has only a single folder, unwrap it to show its contents directly
    if (parsed.length === 1 && parsed[0].type === 'folder') {
      parsed = parsed[0].children as Folder[];
    }
    
    return parsed;
  }
}

const APP_STATE_KEY = Symbol('APP_STATE');

export function setAppState() {
  return setContext(APP_STATE_KEY, new AppState());
}

export function getAppState(): AppState {
  return getContext<AppState>(APP_STATE_KEY);
}
