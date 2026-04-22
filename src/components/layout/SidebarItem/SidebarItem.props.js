import PropTypes from 'prop-types';

export const SidebarItemProps = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  end: PropTypes.bool,
  collapsed: PropTypes.bool,
  onClick: PropTypes.func,
  showLiveDot: PropTypes.bool,
};
