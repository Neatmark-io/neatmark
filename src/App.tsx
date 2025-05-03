import React from "react";
import { BookmarkProvider } from "./context/BookmarkContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SearchProvider } from "./context/SearchContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AnimatedCardGrid from "./components/AnimatedCardGrid";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <SearchProvider>
          <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <AnimatedCardGrid />
            </div>
          </div>
        </SearchProvider>
      </BookmarkProvider>
    </ThemeProvider>
  );
};

export default App;
