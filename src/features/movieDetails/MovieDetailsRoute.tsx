import { useParams } from 'react-router-dom'
import { MovieDetail } from './components'
import { useMovieDetails } from './hooks'

function MovieDetailsRoute() {
  const { id } = useParams<{ id: string }>()
  const movieId = id ? parseInt(id) : 0
  const { movie, isLoading, error } = useMovieDetails(movieId)

  if (!id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Movie not found</h1>
          <p className="text-gray-600">The movie ID is not valid.</p>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading movie...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-2">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Movie not found</h1>
          <p className="text-gray-600">Could not find the requested movie.</p>
        </div>
      </div>
    )
  }

  return <MovieDetail movie={movie} />
}

export default MovieDetailsRoute