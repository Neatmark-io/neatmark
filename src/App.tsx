import React from "react";
import { BookmarkProvider } from "./context/BookmarkContext";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";
import NavbarLayout from "./layouts/NavbarLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import AnimatedCardGrid from "./components/AnimatedCardGrid";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <SearchProvider>
          <div className="page-container">
            <NavbarLayout>
              <SidebarLayout>
                <main className="main-container">
                  <AnimatedCardGrid />
                </main>
              </SidebarLayout>
            </NavbarLayout>
          </div>
        </SearchProvider>
      </BookmarkProvider>
    </ThemeProvider>
  );
};

export default App;
