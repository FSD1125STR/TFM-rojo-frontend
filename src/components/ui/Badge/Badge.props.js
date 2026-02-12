import PropTypes from 'prop-types'

export const BadgeProps = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'success', 'warning', 'error', 'info', 'neutral', 'custom']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  icon: PropTypes.string,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  pill: PropTypes.bool,
  outline: PropTypes.bool,
  customColor: PropTypes.shape({
    bg: PropTypes.string,
    text: PropTypes.string,
  }),
  minWidth: PropTypes.string,
  className: PropTypes.string,
}
