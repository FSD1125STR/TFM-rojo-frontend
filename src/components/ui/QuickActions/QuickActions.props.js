import PropTypes from 'prop-types';

export const QuickActionsProps = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
      icon: PropTypes.string,
    })
  ),
};
