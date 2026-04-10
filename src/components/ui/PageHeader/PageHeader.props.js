import PropTypes from 'prop-types';

export const PageHeaderProps = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  showBack: PropTypes.bool,
  onBack: PropTypes.func,
  actionLabel: PropTypes.string,
  actionIcon: PropTypes.string,
  onAction: PropTypes.func,
};
