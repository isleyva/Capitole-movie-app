import { memo } from 'react'

interface MovieDetailErrorProps {
  message: string
  onRetry?: () => void
  retryLabel?: string
  icon?: string
  title?: string
}

export const MovieDetailError = memo<MovieDetailErrorProps>(({
  message,
  onRetry,
  retryLabel = 'TRY AGAIN',
  icon = '⚠',
  title = 'ERROR'
}) => {
  const handleRetry = () => {
    if (onRetry) return onRetry()
    window.location.reload()
  }

  return (
    <div className="movie-detail">
      <div className="movie-detail__container">
        <div className="movie-detail__state-container">
          <div className="movie-detail__error" role="alert" aria-live="assertive">
            <div className="movie-detail__error-icon" aria-hidden="true">{icon}</div>
            <h2 className="movie-detail__error-title">{title}</h2>
            <p className="movie-detail__error-message">{message}</p>
            <button
              type="button"
              className="movie-detail__error-button"
              onClick={handleRetry}
            >
              {retryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
