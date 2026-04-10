import PropTypes from 'prop-types';

export const InsightCardProps = {
  type: PropTypes.oneOf(['warning', 'info', 'success']),
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};
