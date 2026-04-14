import PropTypes from 'prop-types';

export const StatsCardProps = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.node,
  icon: PropTypes.string,
  layout: PropTypes.oneOf(['horizontal', 'vertical']),
  iconElement: PropTypes.node,
  variant: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'accent',
    'success',
    'warning',
    'error',
    'purple',
    'blue',
  ]),
  className: PropTypes.string,
};
