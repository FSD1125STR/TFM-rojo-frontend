import PropTypes from 'prop-types';

export const PlayerCardProps = {
  player: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    photoUrl: PropTypes.string,
    position: PropTypes.string,
    dorsal: PropTypes.number,
  }).isRequired,
  isBlocked: PropTypes.bool,
  reasonBadge: PropTypes.node,
  className: PropTypes.string,
};
