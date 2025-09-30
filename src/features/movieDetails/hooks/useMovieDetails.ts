import { useState, useEffect } from "react";
import { MovieDetailsAPI } from "../api";
import { Movie } from "@/shared/types/commonTypes";


/**
 * Hook for managing movie details state
 */
export function useMovieDetails(movieId: number) {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovieDetails = async () => {
    if (!movieId) return;

    try {
      setIsLoading(true);
      setError(null);

      const  movie  = await MovieDetailsAPI.getMovieDetails(movieId);

      setMovie(movie);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error loading movie details";
      setError(errorMessage);
      console.error("Error in useMovieDetails:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovieDetails();
  }, [movieId]);

  return {
    movie,
    isLoading,
    error,
  };
}
