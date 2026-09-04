import React, { useRef } from "react";
import {
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { useRefreshScrollRestore } from "@/hooks/useRefreshScrollRestore";
import { useIsoLayoutEffect } from "@/lib/ssr";
import { ClientOnly } from "@/components/ui/common/client-only";
import Home from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import Services from "./pages/Services.tsx";
import { settings } from "@/config/settings";
import { useToasts, dismissToast } from "@/lib/toast";
import { ToastContainer } from "@/components/ui/common/toast-container";

function PathnameScroll(): null {
  const { pathname } = useLocation();
  const isFirst = useRef(true);

  useIsoLayoutEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

function Layout(): React.ReactElement {
  useRefreshScrollRestore();
  return (
    <>
      <PathnameScroll />
      <Navbar />
      <Outlet />
    </>
  );
}

function ServicesRoute(): React.ReactElement {
  return settings.services.enabled ? (
    <Services />
  ) : (
    <Navigate to="/" replace />
  );
}

function Root(): React.ReactElement {
  const toasts = useToasts();
  const handleDismiss = (id: string) => dismissToast(id);
  return (
    <>
      <Outlet />
      <ToastContainer toasts={toasts} onDismiss={handleDismiss} />
      <ClientOnly>
        <Analytics />
        <SpeedInsights />
      </ClientOnly>
    </>
  );
}

function App(): React.ReactElement {
  return (
    <Routes>
      <Route element={<Root />}>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesRoute />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
