import PropTypes from 'prop-types';

export const LiveMatchTimelineProps = {
  events: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.oneOf(['goal', 'yellow_card', 'red_card', 'substitution', 'half_time', 'full_time']),
    minute: PropTypes.number,
    playerId: PropTypes.shape({ fullName: PropTypes.string }),
    playerOutId: PropTypes.shape({ fullName: PropTypes.string }),
    playerInId: PropTypes.shape({ fullName: PropTypes.string }),
    matchId: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool,
};
