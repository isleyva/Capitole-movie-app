/**
 * Shared types used across multiple features
 */

// Core Movie type used throughout the application
export type Movie = {
  id: number;
  title: string;
  brand: string;
  image: string;
  revenue: number;
  vote_average: string;
  release_date: string;
  recommendations: Movie[];
};
