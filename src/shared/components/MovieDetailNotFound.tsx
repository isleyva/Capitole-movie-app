import { memo } from 'react'

interface MovieDetailNotFoundProps {
  message?: string
  onBack?: () => void
  backLabel?: string
  icon?: string
  title?: string
}

export const MovieDetailNotFound = memo<MovieDetailNotFoundProps>(({
  message = 'The requested movie could not be found in our collection.',
  onBack,
  backLabel = 'GO BACK',
  icon = '🎬',
  title = 'MOVIE NOT FOUND'
}) => {
  const handleBack = () => {
    if (onBack) return onBack()
    window.history.back()
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail__container">
        <div className="movie-detail__state-container">
          <div className="movie-detail__not-found">
            <div className="movie-detail__not-found-icon" aria-hidden="true">{icon}</div>
            <h2 className="movie-detail__not-found-title">{title}</h2>
            <p className="movie-detail__not-found-message">{message}</p>
            <button
              type="button"
              className="movie-detail__not-found-button"
              onClick={handleBack}
            >
              {backLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
