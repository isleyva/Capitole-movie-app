import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Import providers
import { WishlistProvider } from "./providers/WishlistProvider";
import { ThemeProvider } from "./providers/ThemeProvider";

// Import route components (lazy loaded for code splitting)
import { lazy } from "react";

// Lazy load route components
const HomeRoute = lazy(() => import("@/features/home").then(module => ({ default: module.HomeRoute })));
const FilmRoute = lazy(() => import("@/features/film").then(module => ({ default: module.FilmRoute })));
const WishlistRoute = lazy(() => import("@/features/wishlist").then(module => ({ default: module.WishlistRoute })));

// Import shared components
import { Loading } from "@/shared/components/Loading";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";
import { Layout } from "@/shared/components";

// Import global styles
import "@/shared/styles/main.scss";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <WishlistProvider>
          <Layout>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<HomeRoute />} />
                <Route path="/film/:id" element={<FilmRoute />} />
                <Route path="/wishlist" element={<WishlistRoute />} />
                <Route path="*" element={<div>404 - Page not found</div>} />
              </Routes>
            </Suspense>
          </Layout>
        </WishlistProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
