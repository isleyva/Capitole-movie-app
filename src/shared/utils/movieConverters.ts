import { Movie } from '@/shared/types/commonTypes'
import { getPosterUrl } from './imageUtils'
import type { TMDBMovie } from '@/shared/types/tmdbDataTypes'

/**
 * Convert TMDB movie data to app Movie format
 * Works with both basic TMDB movies and detailed movie objects
 */
export function convertTMDBToMovie(tmdbMovie: TMDBMovie): Movie {
  return {
    id: tmdbMovie.id,
    title: tmdbMovie.title,
    brand: "MYTHERESA HUB",
    image: getPosterUrl(tmdbMovie.poster_path),
    vote_average: tmdbMovie.vote_average ? `PG-${Math.floor(tmdbMovie.vote_average)}` : 'No Rating',
    revenue: tmdbMovie.revenue,
    release_date: new Date(tmdbMovie.release_date).toLocaleDateString() || 'N/A',
    recommendations: tmdbMovie.recommendations?.results.map(convertTMDBToMovie) || []                           
  }
}