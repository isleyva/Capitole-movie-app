import './Loading.scss'

interface LoadingProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function Loading({ 
  message = 'Loading...', 
  size = 'medium',
  className = '' 
}: LoadingProps) {
  return (
    <div className={`loading loading--${size} ${className}`}>
      <div className="loading__spinner">
        <div className="loading__spinner-inner"></div>
      </div>
      <p className="loading__message">{message}</p>
    </div>
  )
}