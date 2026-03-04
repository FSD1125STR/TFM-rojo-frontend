import PropTypes from 'prop-types';

export const AvatarProps = {
  src: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  variant: PropTypes.oneOf(['neutral', 'primary']),
  className: PropTypes.string,
};
