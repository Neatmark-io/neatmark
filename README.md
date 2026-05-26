# Neatmark

A Notion-inspired bookmark manager with offline support. Organize, search, and access your links beautifully across devices.

![Neatmark](https://raw.githubusercontent.com/Neatmark-io/neatmark/main/static/assets/screenshot.png "Neatmark")

## ✨ Features

### 🗂️ Notion-like Organization
- Nested folders with Google Material Symbols icons
- Collapsible sidebar (responsive for mobile/desktop)

### 🔍 Smart Discovery
- Real-time search with keyboard shortcuts (`Ctrl+K/Cmd+K`)

### ⚡ Performance
- Offline-first PWA (works without internet)
- Instant search with memoized filtering
- Smooth animations (card transitions, UI feedback)

### 🎨 Personalized
- Light/dark mode + custom CSS theming

## 🛠️ Tech Stack

- **Frontend**: SvelteKit 5 + TypeScript + Vite
- **Styling**: TailwindCSS + Bits UI primitives
- **Offline**: Workbox + IndexedDB
- **Icons**: Google Material Symbols
- **Animations**: View Transitions API

## 🚀 Quick Start

### Step 1: Fork the Project
1. Visit the [Neatmark GitHub repository](https://github.com/Neatmark-io/neatmark).
2. Click the *Fork* button in the upper right corner of the page to fork the project to your GitHub account.


### Step 2: Export Browser Bookmarks
1. Open your browser Bookmark Manager.
2. Click **Export Bookmarks**.
3. Save as `bookmarks.html` file.


### Step 3: Replace the Bookmarks File
1. Open the **Neatmark** repository in your GitHub account (the one you just forked).
2. Click on the `data` folder in the repository (or create it if it's missing).
3. Click the **Upload files** button, select the HTML file you saved earlier, and upload it.
4. Make sure the uploaded file is named `bookmarks.html`, and select **Commit changes**.


### Step 4: Enable GitHub Pages
1. In your **Neatmark** repository page, click on Settings.
2. Find the **Pages** option.
3. In the **Source** dropdown menu, select the **gh-pages** branch and click **Save**.
4. After a few minutes, your static website will be available at `https://yourusername.github.io/neatmark`. Remember to replace `yourusername`.

## 🧑‍💻 Development

1. Clone repo:
   ```bash
   git clone https://github.com/Neatmark-io/neatmark.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev server:
   ```bash
   npm start
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## 📦 PWA Installation
- Desktop: Click "Install" in Chrome/Edge
- Mobile: "Add to Home Screen" from browser menu

## 🌐 Hosting Recommendations
- Static hosting: GitHub Pages, Cloudflare Pages

## 🤝 Contributing
PRs welcome! See our [contribution guidelines](CONTRIBUTING.md).

## 📄 License
MIT
