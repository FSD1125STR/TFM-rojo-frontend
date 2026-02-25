import PropTypes from 'prop-types';

export const EmptyStateProps = {
  message: PropTypes.node.isRequired,
  icon: PropTypes.string.isRequired,
  hasActiveFilters: PropTypes.bool,
  onClearFilters: PropTypes.func,
};

export const ErrorStateProps = {
  error: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
};
