import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Resume from "@/pages/Resume";
import { NewNavbar } from "@/components/NewNavbar";
import ServicesPage from "@/pages/Services";

const router = createBrowserRouter([
  {
    element: (
      <>
        <NewNavbar />
      </>
    ),
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
    ],
  },
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true,
  },
});

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

export default router;
