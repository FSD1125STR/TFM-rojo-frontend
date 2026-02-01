import PropTypes from 'prop-types'

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn-error',
}

const sizeClasses = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isDisabled = false,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    variantClasses[variant],
    sizeClasses[size],
    isLoading && 'loading',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      test-id="el-e5f6g7h8"
      className={classes}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading && <span className="loading loading-spinner loading-sm"></span>}
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}
