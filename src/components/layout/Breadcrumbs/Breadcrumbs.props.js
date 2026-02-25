import PropTypes from 'prop-types';

export const BreadcrumbsProps = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      to: PropTypes.string,
    })
  ),
  variant: PropTypes.oneOf(['default', 'compact']),
};
