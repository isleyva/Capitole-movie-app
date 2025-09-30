import { TMDBService } from "@/shared/services/tmdb";
import { TMDBMovie } from "@/shared/types/tmdbDataTypes";
import { convertTMDBToMovie } from "@/shared/utils";
import { Movie } from "@/shared/types/commonTypes";

/**
 * Movie Details API - handles individual movie operations
 * Consolidates: TMDB calls + data conversion + business logic
 */
export class MovieDetailsAPI {
  /**
   * Gets complete movie details by ID
   */
  static async getMovieDetails(movieId: number): Promise<Movie> {
    try {
      const appendToResponse = ["recommendations"];

      let endpoint = `/movie/${movieId}`;

      if (appendToResponse && appendToResponse.length > 0) {
        const appendParams = appendToResponse.join(",");
        endpoint += `?append_to_response=${appendParams}`;
      }

      const details = await TMDBService.makeRequest<TMDBMovie>(endpoint);
      const movie = convertTMDBToMovie(details);

      return movie;
    } catch (error) {
      console.error("Error loading movie details:", error);
      throw new Error(`Failed to load movie details for ID ${movieId}`);
    }
  }
}
