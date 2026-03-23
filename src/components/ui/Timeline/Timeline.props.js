import PropTypes from 'prop-types';

export const TimelineProps = {
  items: PropTypes.array,
  getKey: PropTypes.func,
  isSystem: PropTypes.func,
  isLeft: PropTypes.func,
  renderSlot: PropTypes.func.isRequired,
  renderSystem: PropTypes.func,
  renderMarker: PropTypes.func.isRequired,
  title: PropTypes.string,
  emptyMessage: PropTypes.string,
  className: PropTypes.string,
};
