import PropTypes from 'prop-types';

export const KanbanColumnProps = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number,
  total: PropTypes.number,
  icon: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'error']),
  isOver: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};
