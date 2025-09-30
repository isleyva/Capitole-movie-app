import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";

// Import providers
import { WishlistProvider } from "./providers/WishlistProvider";

// Import route components (lazy loaded for code splitting)
import { lazy } from "react";

// Lazy load route components
const MovieCatalogRoute = lazy(() =>
  import("@/features/movieCatalog").then((module) => ({ default: module.MovieCatalogRoute }))
);
const MovieDetailsRoute = lazy(() =>
  import("@/features/movieDetails").then((module) => ({ default: module.MovieDetailsRoute }))
);
const FavoriteMoviesRoute = lazy(() =>
  import("@/features/favoriteMovies").then((module) => ({
    default: module.FavoriteMoviesRoute,
  }))
);

// Import shared components
import { Loading, ErrorBoundary, Layout } from "@/shared/components";

// Import global styles
import "@/shared/styles/main.scss";

function App() {
  return (
    <ErrorBoundary>
      <WishlistProvider>
        <Suspense fallback={<Loading />}>
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
