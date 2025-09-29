import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Suspense, useCallback } from "react";

// Import providers
import { WishlistProvider, useWishlist } from "./providers/WishlistProvider";
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

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalMovies } = useWishlist();

  const getCurrentView = useCallback((): "home" | "detail" | "wishlist" => {
    if (location.pathname === '/') return 'home';
    if (location.pathname === '/wishlist') return 'wishlist';
    if (location.pathname.startsWith('/film/')) return 'detail';
    return 'home';
  }, [location.pathname]);

  const handleHomeClick = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleWishListClick = useCallback(() => {
    navigate('/wishlist');
  }, [navigate]);

  return (
    <Layout
      onHomeClick={handleHomeClick}
      onWishListClick={handleWishListClick}
      wishListCount={totalMovies}
      currentView={getCurrentView()}
    >
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/film/:id" element={<FilmRoute />} />
          <Route path="/wishlist" element={<WishlistRoute />} />
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <WishlistProvider>
          <AppContent />
        </WishlistProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
