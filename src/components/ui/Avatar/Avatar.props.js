import PropTypes from 'prop-types'

export const AvatarProps = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  className: PropTypes.string,
}
