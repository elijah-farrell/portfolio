import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { Suspense } from "react";
import router from "./config/routes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
          <RouterProvider 
            router={router} 
            future={{
              v7_relativeSplatPath: true,
              v7_fetcherPersist: true,
              v7_normalizeFormMethod: true,
              v7_partialHydration: true,
              v7_skipActionErrorRevalidation: true,
            }}
          />
        </Suspense>
        <Analytics />
        <Toaster />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
