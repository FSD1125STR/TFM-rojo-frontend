import PropTypes from 'prop-types'

export const CardProps = {
  title: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'primary', 'secondary', 'white']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  className: PropTypes.string,
}
