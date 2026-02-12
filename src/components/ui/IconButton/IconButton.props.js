import PropTypes from 'prop-types'

export const IconButtonProps = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md']),
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
}
