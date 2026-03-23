import PropTypes from 'prop-types';

export const LiveMatchTimelineProps = {
  events: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    type: PropTypes.oneOf(['GOAL', 'YELLOW', 'RED', 'SUB']),
    minute: PropTypes.number,
    playerId: PropTypes.shape({ name: PropTypes.string }),
    playerOutId: PropTypes.shape({ name: PropTypes.string }),
    playerInId: PropTypes.shape({ name: PropTypes.string }),
    matchId: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool,
};
