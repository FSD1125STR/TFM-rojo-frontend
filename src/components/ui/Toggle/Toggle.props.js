import PropTypes from 'prop-types';

export const ToggleProps = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'error', 'info']),
};
