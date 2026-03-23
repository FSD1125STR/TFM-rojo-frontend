import PropTypes from 'prop-types';

export const LiveMatchFiltersProps = {
  activeFilter: PropTypes.oneOf(['ALL', 'GOAL', 'YELLOW', 'RED', 'SUB']).isRequired,
  onFilterChange: PropTypes.func.isRequired,
};
