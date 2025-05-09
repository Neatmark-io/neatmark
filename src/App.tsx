import React from "react";
import { BookmarkProvider } from "./context/BookmarkContext";
import { SearchProvider } from "./context/SearchContext";
import { ThemeProvider } from "./context/ThemeContext";
import NavbarLayout from "./layouts/NavbarLayout";
import SidebarLayout from "./layouts/SidebarLayout";
import CardGrid from "./components/CardGrid";

/**
 * The main App component that wraps the application with context providers and layouts.
 * @returns {JSX.Element} The App component
 */
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BookmarkProvider>
        <SearchProvider>
          <div className="page-container">
            <NavbarLayout>
              <SidebarLayout>
                <main className="main-container">
                  <CardGrid />
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
