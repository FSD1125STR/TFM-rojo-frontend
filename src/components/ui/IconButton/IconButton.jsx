import { Icon } from '../Icon/Icon'
import { IconButtonProps } from './IconButton.props'

const variantClasses = {
  primary: 'btn-primary',
  ghost: 'btn-ghost',
  danger: 'btn-error',
}

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
}

export function IconButton({
  icon,
  variant = 'ghost',
  size = 'md',
  ariaLabel,
  className = '',
  ...props
}) {
  const classes = [
    'btn btn-square',
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      test-id="el-c9d0e1f2"
      className={classes}
      aria-label={ariaLabel}
      {...props}
    >
      <Icon name={icon} size={size === 'sm' ? 'sm' : 'md'} />
    </button>
  )
}

IconButton.propTypes = IconButtonProps
