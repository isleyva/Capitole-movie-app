const TMDB_BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// Core TMDB configuration and utilities only
// Feature-specific types are defined in their respective features
// In this case I defined a generic fuction to make requests, but this file is more oriented towards configuration
// or authentication with TMDB.

const getHeaders = () => {
  return {
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
    "Content-Type": "application/json",
  };
};

export class TMDBService {
  private static async request<T>(endpoint: string): Promise<T> {
    const url = `${TMDB_BASE_URL}${endpoint}`;
    const headers = getHeaders();

    try {
      const response = await fetch(url, {
        headers,
      });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("Error response body:", errorBody);
        throw new Error(
          `TMDB API error: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Generic method for making requests - can be used by feature-specific services
  static async makeRequest<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }
}


