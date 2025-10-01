import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

import { WishlistProvider } from "./providers/WishlistProvider";

import { lazy } from "react";

// Lazy load route components
const MovieCatalogRoute = lazy(() =>
  import("@/features/MovieCatalog").then((module) => ({
    default: module.MovieCatalogRoute,
  }))
);
const MovieDetailsRoute = lazy(() =>
  import("@/features/MovieDetails").then((module) => ({
    default: module.MovieDetailsRoute,
  }))
);
const FavoriteMoviesRoute = lazy(() =>
  import("@/features/FavoriteMovies").then((module) => ({
    default: module.FavoriteMoviesRoute,
  }))
);

import { Loading, ErrorBoundary, Layout } from "@/shared/components";

import "@/shared/styles/index.scss";

function App() {
  return (
    <ErrorBoundary>
      <WishlistProvider>
        <Suspense fallback={<Loading message="Loading application..." />}>
          <Layout>
            <Routes>
              <Route path="/" element={<MovieCatalogRoute />} />
              <Route path="/movie/:id" element={<MovieDetailsRoute />} />
              <Route path="/favorites" element={<FavoriteMoviesRoute />} />
              <Route path="*" element={<div>404 - Page not found</div>} />
            </Routes>
          </Layout>
        </Suspense>
      </WishlistProvider>
    </ErrorBoundary>
  );
}

export default App;
