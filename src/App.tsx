import React from "react";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import { Toaster } from "./components/ui/toaster";
import { Navbar } from "./components/Navbar";
import { ScrollToTop } from "./components/ScrollToTop";
import Home from "./pages/Home";
import ServicesPage from "./pages/Services";

function App() {
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
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">Loading...</p>
            </div>
          </div>
        }>
          <ScrollToTop />
          <Navbar />
          <div className="min-h-screen pt-4">
            {getCurrentPage()}
          </div>
        </Suspense>
        <Toaster />
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
