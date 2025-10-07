import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "./components/ui/common/toaster";
import { Navbar } from "./components/layout/Navbar";
import { useScrollPreservation } from "./hooks/use-scroll-preservation";
import { useScrollToSection } from "./hooks/use-scroll-to-section";
import { THEME_CONFIG } from "./config/theme";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";

function App() {
  // Enable scroll position preservation
  useScrollPreservation();
  
  // Enable scroll to section functionality
  useScrollToSection();
  
  // Get current path to determine which page to render
  const currentPath = window.location.pathname;
  
  // Determine which page component to render
  const getCurrentPage = () => {
    switch (currentPath) {
      case '/':
        return <Home />;
      case '/services':
        return <ServicesPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme={THEME_CONFIG.defaultTheme} storageKey={THEME_CONFIG.storageKey}>
        <div className="min-h-screen bg-background font-mono">
          <Navbar />
          <div className="pt-4">
            {getCurrentPage()}
          </div>
          <Toaster />
        </div>
      </ThemeProvider>
    </HelmetProvider>
  );
}

function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Page not found</p>
        <a href="/" className="text-emerald-600 hover:text-emerald-700">
          Go back home
        </a>
      </div>
    </div>
  );
}

export default App;
