import PropTypes from 'prop-types';

const BadgeShape = PropTypes.shape({
  label: PropTypes.string.isRequired,
  variant: PropTypes.string,
  icon: PropTypes.string,
  size: PropTypes.string,
  outline: PropTypes.bool,
});

const MetaShape = PropTypes.shape({
  icon: PropTypes.string,
  text: PropTypes.string.isRequired,
});

export const CardListRowProps = {
  title: PropTypes.string,
  badges: PropTypes.arrayOf(BadgeShape),
  meta: PropTypes.arrayOf(MetaShape),
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['default', 'white']),
  padding: PropTypes.oneOf(['sm', 'md', 'lg']),
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string,
      onClick: PropTypes.func.isRequired,
      variant: PropTypes.string,
      show: PropTypes.func,
    })
  ),
  actionsMode: PropTypes.oneOf(['menu', 'buttons']),
  row: PropTypes.object,
  className: PropTypes.string,
};
