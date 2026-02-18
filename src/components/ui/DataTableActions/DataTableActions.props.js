import PropTypes from 'prop-types';

export const DataTableActionsProps = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.oneOf(['default', 'danger']),
      show: PropTypes.func,
    })
  ).isRequired,
  row: PropTypes.object.isRequired,
  title: PropTypes.string,
};
