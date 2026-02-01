import PropTypes from 'prop-types'

const sizeClasses = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-3xl',
}

export function Icon({ name, size = 'md', className = '' }) {
  return (
    <span className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}>
      {name}
    </span>
  )
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
}
