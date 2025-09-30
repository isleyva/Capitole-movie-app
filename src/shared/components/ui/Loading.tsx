import { memo, useMemo } from 'react'

interface LoadingProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const Loading = memo<LoadingProps>(({ 
  message = 'Loading...', 
  size = 'md',
  className = '' 
}) => {
  const overlayClassName = useMemo(() => 
    `loading-overlay ${className}`, 
    [className]
  );

  const spinnerClassName = useMemo(() => 
    `spinner spinner--${size}`, 
    [size]
  );

  return (
    <div className={overlayClassName}>
      <div className="flex flex-col items-center gap-4">
        <div className={spinnerClassName}></div>
        {message && (
          <p className="text-sm text-muted-foreground">{message}</p>
        )}
      </div>
    </div>
  )
})