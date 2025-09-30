import { TMDBService } from "@/shared/services/tmdb";
import { convertTMDBToMovie } from "@/shared/utils";
import type { MovieSectionData } from "../types/HomeRouteTypes";
import type { TMDBResponse } from "@/shared/types/tmdbDataTypes";
import { Movie } from "@/shared/types/commonTypes";

/**
 * Home Movies API - handles all movie collection operations
 * Consolidates: TMDB calls + data conversion + business logic
 */
export class HomeMoviesAPI {
  /**
   * Get popular movies converted to app format
   */
  static async getPopularMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response = await TMDBService.makeRequest<TMDBResponse>(
        `/movie/popular?page=${page}`
      );
      return response.results.slice(0, 10).map(convertTMDBToMovie);
    } catch (error) {
      throw new Error("Failed to load popular movies");
    }
  }

  /**
   * Get top rated movies converted to app format
   */
  static async getTopRatedMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response = await TMDBService.makeRequest<TMDBResponse>(
        `/movie/top_rated?page=${page}`
      );
      return response.results.slice(0, 10).map(convertTMDBToMovie);
    } catch (error) {
      throw new Error("Failed to load top rated movies");
    }
  }

  /**
   * Get upcoming movies converted to app format
   */
  static async getUpcomingMovies(page: number = 1): Promise<Movie[]> {
    try {
      const response = await TMDBService.makeRequest<TMDBResponse>(
        `/movie/upcoming?page=${page}`
      );
      return response.results.slice(0, 10).map(convertTMDBToMovie);
    } catch (error) {
      throw new Error("Failed to load upcoming movies");
    }
  }

  /**
   * Gets all movie sections for the home page
   */
  static async getMovieSections(): Promise<MovieSectionData[]> {
    try {
      const [popularMovies, topRatedMovies, upcomingMovies] = await Promise.all(
        [
          this.getPopularMovies(),
          this.getTopRatedMovies(),
          this.getUpcomingMovies(),
        ]
      );

      return [
        {
          id: "popular",
          title: "POPULAR MOVIES",
          movies: popularMovies,
        },
        {
          id: "top-rated",
          title: "TOP RATED",
          movies: topRatedMovies,
        },
        {
          id: "upcoming",
          title: "UPCOMING RELEASES",
          movies: upcomingMovies,
        },
      ];
    } catch (error) {
      throw new Error("Failed to load movie sections");
    }
  }
}
