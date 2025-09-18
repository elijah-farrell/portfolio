import React from "react";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import router from "./config/routes";
import { Toaster } from "./components/ui/toaster";
import { useScrollPreservation } from "./hooks/use-scroll-preservation";

function App() {
  // Enable scroll position preservation
  useScrollPreservation();
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
          <RouterProvider 
            router={router} 
            future={{
              v7_startTransition: true,
            }}
          />
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
