import { useState, useEffect } from "react";
import { HomeMoviesAPI } from "../api";
import { MovieSectionData } from "../types/HomeRouteTypes";

/**
 * Hook for managing movie sections state on the home page
 */
export function useMovieSections() {
  const [movieSections, setMovieSections] = useState<MovieSectionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const sections = await HomeMoviesAPI.getMovieSections();
      setMovieSections(sections);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error loading movies";
      setError(errorMessage);
      console.error("Error in useMovieSections:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return {
    movieSections,
    isLoading,
    error,
  };
}
