import PropTypes from 'prop-types';

export const UserCardProps = {
  user: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    role: PropTypes.string,
    avatar: PropTypes.string,
    club: PropTypes.shape({
      name: PropTypes.string,
      shortName: PropTypes.string,
    }),
    category: PropTypes.shape({
      name: PropTypes.string,
      season: PropTypes.string,
    }),
  }).isRequired,
  variant: PropTypes.oneOf(['default', 'compact']),
  collapsed: PropTypes.bool,
  onLogout: PropTypes.func,
};
