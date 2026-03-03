import PropTypes from 'prop-types';

export const RadioChipGroupProps = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      activeColor: PropTypes.shape({ bg: PropTypes.string, text: PropTypes.string }),
    })
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
