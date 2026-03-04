import PropTypes from 'prop-types';

export const ProgressBarProps = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  color: PropTypes.string,
  animated: PropTypes.bool,
};
