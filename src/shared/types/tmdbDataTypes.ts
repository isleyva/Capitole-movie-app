/**
 * TMDB API specific types
 */

// TMDB API response structure for movie lists
export interface TMDBResponse {
  page: number;
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

// Base TMDB Movie interface from TMDB API
export type TMDBMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  revenue: number;
  release_date: string;
  vote_average: number;
  recommendations: TMDBResponse;
};
