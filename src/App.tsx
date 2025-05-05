import React from "react";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import Sidebar from "./components/Sidebar";
import AnimatedCardGrid from "./components/AnimatedCardGrid";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <SearchProvider>
          <div className="page-container">
            <Sidebar />
            <main className="main-container">
              <AnimatedCardGrid />
            </main>
          </div>
        </SearchProvider>
      </BookmarkProvider>
    </ThemeProvider>
  );
};

export default App;
