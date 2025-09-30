import { Movie } from "@/shared/types/commonTypes";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

interface WishlistState {
  movies: Movie[];
  isLoading: boolean;
}

type WishlistAction =
  | { type: "ADD_MOVIE"; payload: Movie }
  | { type: "REMOVE_MOVIE"; payload: number }
  | { type: "CLEAR_WISHLIST" }
  | { type: "LOAD_WISHLIST"; payload: Movie[] }
  | { type: "SET_LOADING"; payload: boolean };

function wishlistReducer(
  wishlist: WishlistState,
  action: WishlistAction
): WishlistState {
  switch (action.type) {
    case "ADD_MOVIE":
      // Don't add if already exists
      if (wishlist.movies.some((movie) => movie.id === action.payload.id)) {
        return wishlist;
      }
      return {
        ...wishlist,
        movies: [...wishlist.movies, action.payload],
      };

    case "REMOVE_MOVIE":
      return {
        ...wishlist,
        movies: wishlist.movies.filter((movie) => movie.id !== action.payload),
      };

    case "CLEAR_WISHLIST":
      return {
        ...wishlist,
        movies: [],
      };

    case "LOAD_WISHLIST":
      return {
        ...wishlist,
        movies: action.payload,
        isLoading: false,
      };

    case "SET_LOADING":
      return {
        ...wishlist,
        isLoading: action.payload,
      };

    default:
      return wishlist;
  }
}

// Context type
interface WishlistContextType {
  movies: Movie[];
  isLoading: boolean;
  addMovie: (movie: Movie) => void;
  removeMovie: (movieId: number) => void;
  clearWishlist: () => void;
  isInWishlist: (movieId: number) => boolean;
  totalMovies: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(
  undefined
);

interface WishlistProviderProps {
  children: ReactNode;
}

export function WishlistProvider({ children }: WishlistProviderProps) {
  const [wishlistState, dispatch] = useReducer(wishlistReducer, {
    movies: [],
    isLoading: true,
  });

  // TODO: Replace with real persistence (backend)

  // Actions memoized
  const addMovie = useCallback((movie: Movie) => {
    dispatch({ type: "ADD_MOVIE", payload: movie });
  }, []);

  const removeMovie = useCallback((movieId: number) => {
    dispatch({ type: "REMOVE_MOVIE", payload: movieId });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: "CLEAR_WISHLIST" });
  }, []);

  const isInWishlist = useCallback(
    (movieId: number) => {
      return wishlistState.movies.some((movie) => movie.id === movieId);
    },
    [wishlistState.movies]
  );

  const value: WishlistContextType = useMemo(
    () => ({
      movies: wishlistState.movies,
      isLoading: wishlistState.isLoading,
      addMovie,
      removeMovie,
      clearWishlist,
      isInWishlist,
      totalMovies: wishlistState.movies.length,
    }),
    [
      wishlistState.movies,
      wishlistState.isLoading,
      addMovie,
      removeMovie,
      clearWishlist,
      isInWishlist,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook
export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
