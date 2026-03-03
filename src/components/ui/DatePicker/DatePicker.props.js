import PropTypes from 'prop-types';

export const DatePickerProps = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
};
