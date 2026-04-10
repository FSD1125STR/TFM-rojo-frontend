import PropTypes from 'prop-types';

export const CollapseProps = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  defaultOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
