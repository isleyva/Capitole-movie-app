import { useParams } from 'react-router-dom'
import { MovieDetail } from './components'
import { useMovieDetails } from './hooks'

function MovieDetailsRoute() {
  const { id } = useParams<{ id: string }>()
  const movieId = id ? parseInt(id) : 0
  const { movie, isLoading, error } = useMovieDetails(movieId)


  if (isLoading) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__container">
          <div className="movie-detail__state-container">
            <div className="movie-detail__loading">
              <div className="movie-detail__loading-spinner"></div>
              <h2 className="movie-detail__loading-title">LOADING</h2>
              <p className="movie-detail__loading-message">Fetching movie details...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__container">
          <div className="movie-detail__state-container">
            <div className="movie-detail__error">
              <div className="movie-detail__error-icon">⚠</div>
              <h2 className="movie-detail__error-title">ERROR</h2>
              <p className="movie-detail__error-message">{error}</p>
              <button 
                className="movie-detail__error-button"
                onClick={() => window.location.reload()}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="movie-detail">
        <div className="movie-detail__container">
          <div className="movie-detail__state-container">
            <div className="movie-detail__not-found">
              <div className="movie-detail__not-found-icon">🎬</div>
              <h2 className="movie-detail__not-found-title">MOVIE NOT FOUND</h2>
              <p className="movie-detail__not-found-message">
                The requested movie could not be found in our collection.
              </p>
              <button 
                className="movie-detail__not-found-button"
                onClick={() => window.history.back()}
              >
                GO BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return <MovieDetail movie={movie} />
}

export default MovieDetailsRoute