import PropTypes from 'prop-types'

export const ButtonProps = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
}
