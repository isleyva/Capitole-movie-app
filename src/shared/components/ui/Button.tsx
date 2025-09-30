import { memo, useMemo, ComponentProps } from 'react'

import '../../styles/components/_button.scss'

export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean
}

// Simple className utility function
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

const Button = memo<ButtonProps>(({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}) => {
  const buttonClasses = useMemo(() => cn(
    'button',
    `button--${variant}`,
    size === 'default' ? 'button--default-size' : `button--${size}`,
    className
  ), [variant, size, className]);

  return (
    <button
      className={buttonClasses}
      {...props}
    />
  )
})

export { Button }
