import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Home from "./pages/Home";
import { Navbar } from "./pages/Navbar";
import Services from "./pages/Services.tsx";
import { settings } from "./config/settings";
import { useScrollPreservation } from "@/hooks/useScrollPreservation";
import { useToasts, dismissToast } from "@/lib/toast";
import { ToastContainer } from "@/components/ui/common/toast-container";

function Layout(): React.ReactElement {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App(): React.ReactElement {
  useScrollPreservation();
  const toasts = useToasts();

  const handleDismiss = (id: string) => {
    dismissToast(id);
  };

  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/services"
            element={
              settings.services.enabled ? <Services /> : <Navigate to="/" replace />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <ToastContainer toasts={toasts} onDismiss={handleDismiss} />
      <SpeedInsights />
    </>
  );
}

export default App;
