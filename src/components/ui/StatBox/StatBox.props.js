import PropTypes from 'prop-types';

export const StatBoxProps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['default', 'yellow', 'red', 'green']),
};
