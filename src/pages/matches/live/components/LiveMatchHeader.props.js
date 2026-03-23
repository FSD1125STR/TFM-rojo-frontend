import PropTypes from 'prop-types';

export const LiveMatchHeaderProps = {
  match: PropTypes.shape({
    homeTeamId: PropTypes.shape({ name: PropTypes.string }),
    awayTeamId: PropTypes.shape({ name: PropTypes.string }),
    homeScore: PropTypes.number,
    awayScore: PropTypes.number,
  }),
  liveStatus: PropTypes.oneOf(['NOT_STARTED', 'FIRST_HALF', 'HALF_TIME', 'SECOND_HALF', 'FINISHED']),
};
